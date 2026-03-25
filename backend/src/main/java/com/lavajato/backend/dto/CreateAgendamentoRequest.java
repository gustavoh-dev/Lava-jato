package com.lavajato.backend.dto;

import java.time.LocalDate;

public record CreateAgendamentoRequest(
    Long clienteId,
    Long veiculoId,
    String tipoServico,
    LocalDate data
) {
}
