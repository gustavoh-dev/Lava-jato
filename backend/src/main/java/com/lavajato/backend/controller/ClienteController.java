package com.lavajato.backend.controller;

import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.service.LavaJatoDataService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final LavaJatoDataService dataService;

    public ClienteController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return dataService.listarClientes();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente criarCliente(@RequestBody CreateClienteRequest request) {
        return dataService.criarCliente(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarCliente(@PathVariable Long id) {
        dataService.deletarCliente(id);
    }
}
