package com.lavajato.backend.controller;

import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.model.Veiculo;
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
@RequestMapping("/veiculos")
public class VeiculoController {

    private final LavaJatoDataService dataService;

    public VeiculoController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Veiculo> listarVeiculos() {
        return dataService.listarVeiculos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Veiculo criarVeiculo(@RequestBody CreateVeiculoRequest request) {
        return dataService.criarVeiculo(request);
    }
}
