package com.lavajato.backend.controller;

import com.lavajato.backend.model.Pagamento;
import com.lavajato.backend.service.LavaJatoDataService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    private final LavaJatoDataService dataService;

    public PagamentoController(LavaJatoDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Pagamento> listarPagamentos(
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate data
    ) {
        return dataService.listarPagamentos(data);
    }

    @PatchMapping("/{id}/pago")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void marcarComoPago(@PathVariable Long id) {
        dataService.marcarPagamentoComoPago(id);
    }
}
