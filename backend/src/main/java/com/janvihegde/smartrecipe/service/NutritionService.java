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
    private static final String API_KEY = "mDns5iBkXk9mfPSk3TvKtQ==DUtoIjMY0DU0p0N2"; // ✅ Your key looks fine

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> analyzeIngredients(List<String> ingredients) {
        try {
            // ✅ Combine ingredients into a single query string
            String query = String.join(", ", ingredients);
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = API_URL + "?query=" + encodedQuery; // ✅ FIXED

            // ✅ Set headers with API key
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Api-Key", API_KEY);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            System.out.println("📤 Sending to CalorieNinjas API: " + url);

            // ✅ Send GET request
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("✅ Nutrition data received!");
                return response.getBody();
            } else {
                System.err.println("❌ Nutrition API returned status: " + response.getStatusCode());
                return Map.of("error", "Nutrition analysis failed: " + response.getStatusCode());
            }

        } catch (Exception e) {
            System.err.println("❌ Error calling CalorieNinjas API: " + e.getMessage());
            return Map.of("error", "Nutrition analysis failed: " + e.getMessage());
        }
    }
}
