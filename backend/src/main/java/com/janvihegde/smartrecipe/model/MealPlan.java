package com.janvihegde.smartrecipe.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "mealplan")
public class MealPlan {
    @Id
    private String id;

    // Structure: { Day: { MealType: [RecipeId], ... }, ... }
    private Map<String, Map<String, List<String>>> weeklyPlan;

    private Date dateCreated = new Date();

    // Constructors (omitted for brevity, assume default and full constructor exist)

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Map<String, Map<String, List<String>>> getWeeklyPlan() {
        return weeklyPlan;
    }

    public void setWeeklyPlan(Map<String, Map<String, List<String>>> weeklyPlan) {
        this.weeklyPlan = weeklyPlan;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}