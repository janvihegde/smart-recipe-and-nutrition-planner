package com.janvihegde.smartrecipe.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class NutritionService {

    private static final String API_URL = "https://api.calorieninjas.com/v1/nutrition";
    private static final String API_KEY = "mDns5iBkXk9mfPSk3TvKtQ==DUtoIjMY0DU0p0N2";

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> analyzeIngredients(List<String> ingredients) {
        try {
            String query = String.join(", ", ingredients);
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = API_URL + "?query=" + encodedQuery;

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Api-Key", API_KEY);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            System.out.println("📤 Sending to CalorieNinjas API: " + url);

            // Fetch the raw response map
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> rawResponse = response.getBody();

                // 🛑 CRITICAL FIX: Extract and aggregate data from the 'items' list
                List<Map<String, Object>> items = (List<Map<String, Object>>) rawResponse.get("items");

                if (items == null || items.isEmpty()) {
                    return Map.of("message", "No nutritional data found for ingredients.");
                }

                Map<String, Object> aggregatedNutrition = new HashMap<>();

                // Metrics to sum up (keys in the 'items' objects that are numeric)
                String[] metrics = {"calories", "protein_g", "fat_total_g", "carbohydrates_total_g", "sugar_g", "sodium_mg"};

                for (String metric : metrics) {
                    double totalValue = 0.0;
                    for (Map<String, Object> item : items) {
                        // Safely handle different number types returned by the API
                        Object value = item.get(metric);
                        if (value instanceof Number) {
                            totalValue += ((Number) value).doubleValue();
                        } else if (value instanceof String) {
                            try {
                                totalValue += Double.parseDouble((String) value);
                            } catch (NumberFormatException ignored) {
                                // Ignore unparsable string values
                            }
                        }
                    }
                    // Round the aggregated value for cleaner presentation
                    aggregatedNutrition.put(metric, Math.round(totalValue * 10.0) / 10.0);
                }

                System.out.println("✅ Nutrition data aggregated successfully!");
                // Optionally include the full list of analyzed ingredients for debugging
                // aggregatedNutrition.put("analyzed_ingredients", items);
                return aggregatedNutrition;

            } else {
                System.err.println("❌ Nutrition API returned status: " + response.getStatusCode());
                return Map.of("error", "Nutrition analysis failed: " + response.getStatusCode());
            }

        } catch (Exception e) {
            System.err.println("❌ Error calling CalorieNinjas API: " + e.getMessage());
            e.printStackTrace();
            return Map.of("error", "Nutrition analysis failed: " + e.getMessage());
        }
    }
}