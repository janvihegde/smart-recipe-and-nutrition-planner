package com.janvihegde.smartrecipe.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubstitutionService {

    private static final Map<String, String> substitutionMap = new HashMap<>();

    static {
        substitutionMap.put("white sugar", "honey");
        substitutionMap.put("butter", "olive oil");
        substitutionMap.put("cream", "greek yogurt");
        substitutionMap.put("white bread", "whole wheat bread");
        substitutionMap.put("salt", "pink salt");
        substitutionMap.put("mayonnaise", "hung curd");
        substitutionMap.put("oil", "olive oil");
        substitutionMap.put("white rice", "brown rice");
    }

    public Map<String, String> suggestSubstitutions(List<String> ingredients) {
        Map<String, String> result = new HashMap<>();

        for (String item : ingredients) {
            String lower = item.toLowerCase();
            if (substitutionMap.containsKey(lower)) {
                result.put(item, substitutionMap.get(lower));
            }
        }

        return result;
    }
}
