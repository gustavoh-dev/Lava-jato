package com.lavajato.backend.dto;

import java.math.BigDecimal;

public record CreateServicoRequest(
    String nome,
    String descricao,
    BigDecimal valor
) {
}
