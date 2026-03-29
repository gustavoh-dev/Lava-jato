package com.lavajato.backend.dto;

public record DashboardHighlightResponse(
    String title,
    long value,
    String description,
    String accentClass
) {
}
