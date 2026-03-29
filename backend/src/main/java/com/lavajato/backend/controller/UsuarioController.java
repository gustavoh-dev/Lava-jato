package com.lavajato.backend.controller;

import com.lavajato.backend.dto.CreateUsuarioRequest;
import com.lavajato.backend.model.Usuario;
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
@RequestMapping("/usuarios")
public class UsuarioController {

    private final LavaJatoDataService dataService;

    public UsuarioController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return dataService.listarUsuarios();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criarUsuario(@RequestBody CreateUsuarioRequest request) {
        return dataService.criarUsuario(request);
    }
}
