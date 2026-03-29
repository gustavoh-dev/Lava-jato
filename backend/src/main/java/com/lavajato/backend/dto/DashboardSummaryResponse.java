package com.lavajato.backend.dto;

import java.util.List;

public record DashboardSummaryResponse(
    DashboardTotalsResponse totals,
    List<DashboardHighlightResponse> highlights
) {
    public record DashboardTotalsResponse(
        long clients,
        long vehicles,
        long servicesToday
    ) {
    }
}
