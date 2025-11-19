package com.janvihegde.smartrecipe.repository;

import com.janvihegde.smartrecipe.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
    // This allows us to easily fetch the most recently created or updated plan
    Optional<MealPlan> findTopByOrderByDateCreatedDesc();
}
