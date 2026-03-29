package com.lavajato.backend.controller;

import com.lavajato.backend.dto.CreateServicoRequest;
import com.lavajato.backend.model.Servico;
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
@RequestMapping("/servicos")
public class ServicoController {

    private final LavaJatoDataService dataService;

    public ServicoController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Servico> listarServicos() {
        return dataService.listarServicos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Servico criarServico(@RequestBody CreateServicoRequest request) {
        return dataService.criarServico(request);
    }
}
