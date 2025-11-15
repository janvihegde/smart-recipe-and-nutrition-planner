package com.janvihegde.smartrecipe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.List;
import java.util.Map;
@Document(collection = "recipe")
public class Recipe {
        @Id
        private String id;
        private String name;
        private List<String> ingredients;
        private int calories;
        private String instructions;
        private String cuisine;

    private Map<String, Object> nutritionInfo;


    public Recipe() {}

    public Recipe(String id, String name, List<String> ingredients, int calories, String instructions, String cuisine) {
        this.name = name;
        this.ingredients = ingredients;
        this.calories = calories;
        this.instructions = instructions;
        this.cuisine = cuisine;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<String> getIngredients() { return ingredients; }
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public Map<String, Object> getNutritionInfo() {
        return nutritionInfo;
    }

    public void setNutritionInfo(Map<String, Object> nutritionInfo) {
        this.nutritionInfo = nutritionInfo;
    }

    private Map<String, String> substitutions;

    public Map<String, String> getSubstitutions() {
        return substitutions;
    }

    public void setSubstitutions(Map<String, String> substitutions) {
        this.substitutions = substitutions;
    }

}
