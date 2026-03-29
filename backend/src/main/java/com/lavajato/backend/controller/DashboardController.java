package com.lavajato.backend.controller;

import com.lavajato.backend.dto.DashboardSummaryResponse;
import com.lavajato.backend.service.LavaJatoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final LavaJatoDataService dataService;

    public DashboardController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {
        return dataService.getDashboardSummary();
    }
}
