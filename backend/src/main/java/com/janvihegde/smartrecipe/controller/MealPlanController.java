package com.janvihegde.smartrecipe.controller;


import com.janvihegde.smartrecipe.model.MealPlan;
import com.janvihegde.smartrecipe.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mealplan")
@CrossOrigin(origins = "*")
public class MealPlanController {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    // POST: Save or Update the Weekly Meal Plan (Saves/overwrites the latest)
    @PostMapping
    public MealPlan savePlan(@RequestBody MealPlan newPlan) {
        // Find the latest plan to see if we should update an existing one
        Optional<MealPlan> existingPlan = mealPlanRepository.findTopByOrderByDateCreatedDesc();

        if (existingPlan.isPresent()) {
            MealPlan planToUpdate = existingPlan.get();
            // Update the plan and the creation date to mark it as the newest
            planToUpdate.setWeeklyPlan(newPlan.getWeeklyPlan());
            planToUpdate.setDateCreated(new java.util.Date());
            System.out.println("✅ Updated existing meal plan: " + planToUpdate.getId());
            return mealPlanRepository.save(planToUpdate);
        } else {
            // Create a new one if none exists
            System.out.println("✅ Created new meal plan.");
            return mealPlanRepository.save(newPlan);
        }
    }

    // GET: Retrieve the latest saved weekly meal plan
    @GetMapping("/latest")
    public MealPlan getLatestPlan() {
        return mealPlanRepository.findTopByOrderByDateCreatedDesc().orElse(null);
    }
}