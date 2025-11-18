package com.janvihegde.smartrecipe.service;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    public String getWelcomeMessage() {
        return "Welcome to Smart Recipe Planner!";
    }
}
