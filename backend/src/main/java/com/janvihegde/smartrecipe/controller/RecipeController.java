package com.janvihegde.smartrecipe.controller;

import com.janvihegde.smartrecipe.model.Recipe;
import com.janvihegde.smartrecipe.repository.RecipeRepository;
import com.janvihegde.smartrecipe.service.NutritionService;
import com.janvihegde.smartrecipe.service.SubstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private NutritionService nutritionService;

    @Autowired
    private MongoTemplate mongoTemplate;

    // GET all recipes
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Autowired
    private SubstitutionService substitutionService;

    // POST: add recipe and perform nutrition analysis
    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        System.out.println("🍳 Received POST request to add recipe: " + recipe.getName());

        try {
            // Call CalorieNinjas API
            Map<String, Object> nutritionData = nutritionService.analyzeIngredients(recipe.getIngredients());
            recipe.setNutritionInfo(nutritionData);
            System.out.println("✅ Nutrition data added successfully!");
        } catch (Exception e) {
            System.err.println("❌ Error analyzing nutrition: " + e.getMessage());
            // If the API call fails, still save the recipe without nutrition data
        }
        // 2. Smart Substitutions
        try {
            Map<String, String> suggestions = substitutionService.suggestSubstitutions(recipe.getIngredients());
            recipe.setSubstitutions(suggestions);
            System.out.println("✨ Substitutions added: " + suggestions);
        } catch (Exception e) {
            System.err.println("❌ Substitution error: " + e.getMessage());
        }

        // Always save the recipe (with or without nutrition)
        return recipeRepository.save(recipe);
    }

    // GET by ID
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable String id) {
        return recipeRepository.findById(id).orElse(null);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable String id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return "Recipe deleted successfully!";
        } else {
            return "Recipe not found!";
        }
    }

    // PUT: update existing recipe
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable String id, @RequestBody Recipe updatedRecipe) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    recipe.setName(updatedRecipe.getName());
                    recipe.setIngredients(updatedRecipe.getIngredients());
                    recipe.setInstructions(updatedRecipe.getInstructions());
                    return recipeRepository.save(recipe);
                })
                .orElse(null);
    }

    @GetMapping("/test")
    public String testDB() {
        try {
            long count = recipeRepository.count();
            return "Connected! Recipe count = " + count;
        } catch (Exception e) {
            return "DB ERROR: " + e.getMessage();
        }
    }

    @GetMapping("/debug")
    public String debug() {
        long count = recipeRepository.count();
        return "Cluster reachable. Recipe count = " + count;
    }

    @GetMapping("/search")
    public List<Recipe> searchRecipes(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) Integer maxCalories) {

        Query mongoQuery = new Query();

        if (query != null && !query.isEmpty()) {
            // Criteria for partial, case-insensitive search across three fields
            Criteria textSearch = new Criteria().orOperator(
                    Criteria.where("name").regex(query, "i"),
                    Criteria.where("instructions").regex(query, "i"),
                    Criteria.where("ingredients").regex(query, "i")
            );
            // This is where addCriteria is used on the Query object
            mongoQuery.addCriteria(textSearch);
        }

        if (cuisine != null && !cuisine.isEmpty()) {
            // Filter by Cuisine (exact match, case-insensitive)
            mongoQuery.addCriteria(Criteria.where("cuisine").regex("^" + cuisine + "$", "i"));
        }

        if (maxCalories != null) {
            // Filter by Calories (Less than or equal to)
            mongoQuery.addCriteria(Criteria.where("calories").lte(maxCalories));
        }

        // If no filters are provided, return all recipes (same as /api/recipe GET)
        if (!mongoQuery.getQueryObject().isEmpty()) {
            return mongoTemplate.find(mongoQuery, Recipe.class);
        } else {
            return recipeRepository.findAll();
        }
    }


}
