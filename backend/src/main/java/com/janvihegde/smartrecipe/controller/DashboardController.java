package com.janvihegde.smartrecipe.controller;

import com.janvihegde.smartrecipe.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")   // allow frontend
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public String getDashboard() {
        return service.getWelcomeMessage();
    }
}
