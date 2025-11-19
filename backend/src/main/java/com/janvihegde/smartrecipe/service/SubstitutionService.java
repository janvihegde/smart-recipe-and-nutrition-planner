package com.janvihegde.smartrecipe.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Locale;

@Service
public class SubstitutionService {

    private final Map<String, String> substitutionMap;

    public SubstitutionService() {
        // Initialize a larger map of substitutions for common ingredients
        this.substitutionMap = new HashMap<>();
        this.substitutionMap.put("all-purpose flour", "whole wheat flour or oat flour (for healthier)");
        this.substitutionMap.put("butter", "coconut oil or avocado oil (for vegan)");
        this.substitutionMap.put("sugar", "honey, maple syrup, or stevia (for lower glycemic)");
        this.substitutionMap.put("heavy cream", "full-fat coconut milk or cashew cream (for dairy-free)");
        this.substitutionMap.put("milk", "almond milk, soy milk, or oat milk (for dairy-free)");
        this.substitutionMap.put("sour cream", "plain Greek yogurt or cottage cheese");
        this.substitutionMap.put("mayonnaise", "Greek yogurt or avocado mash");
        this.substitutionMap.put("eggs", "chia seed egg, flax egg, or mashed banana (for vegan baking)");
        this.substitutionMap.put("ground beef", "ground turkey or lentils (for vegetarian)");
        this.substitutionMap.put("chicken breast", "tofu, tempeh, or chickpeas (for vegetarian)");
        this.substitutionMap.put("cheese", "nutritional yeast or vegan cheese shreds");
        this.substitutionMap.put("rice", "quinoa or cauliflower rice (for low-carb)");
        this.substitutionMap.put("oil", "applesauce (in baking), or chicken/vegetable broth (in sauteing)");
        this.substitutionMap.put("pasta", "zucchini noodles or lentil pasta");
        this.substitutionMap.put("breadcrumbs", "crushed oats or almond flour");
    }

    public Map<String, String> suggestSubstitutions(List<String> ingredients) {
        Map<String, String> suggestions = new HashMap<>();
        if (ingredients == null) return suggestions;

        for (String ingredient : ingredients) {
            String lowerCaseIngredient = ingredient.toLowerCase(Locale.ROOT).trim();

            // Check for both direct and partial match
            for (Map.Entry<String, String> entry : substitutionMap.entrySet()) {
                if (lowerCaseIngredient.contains(entry.getKey())) {
                    suggestions.put(ingredient, entry.getValue());
                    break;
                }
            }
        }
        return suggestions;
    }
}