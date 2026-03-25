package com.lavajato.backend.controller;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.model.Agendamento;
import com.lavajato.backend.service.LavaJatoDataService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final LavaJatoDataService dataService;

    public AgendamentoController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Agendamento> listarAgendamentos() {
        return dataService.listarAgendamentos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Agendamento criarAgendamento(@RequestBody CreateAgendamentoRequest request) {
        return dataService.criarAgendamento(request);
    }
}
