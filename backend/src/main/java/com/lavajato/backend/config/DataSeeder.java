package com.lavajato.backend.config;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.model.Veiculo;
import com.lavajato.backend.service.LavaJatoDataService;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(LavaJatoDataService dataService) {
        return args -> {
            if (!dataService.listarClientes().isEmpty()) {
                return;
            }

            Cliente mariana = dataService.criarCliente(
                new CreateClienteRequest("Mariana Costa", "(11) 99999-1234", "mariana@lavajato.com")
            );
            Cliente carlos = dataService.criarCliente(
                new CreateClienteRequest("Carlos Lima", "(11) 98888-4321", "carlos@lavajato.com")
            );
            Cliente fernanda = dataService.criarCliente(
                new CreateClienteRequest("Fernanda Alves", "(11) 97777-0101", "fernanda@lavajato.com")
            );

            Veiculo onix = dataService.criarVeiculo(
                new CreateVeiculoRequest("Onix LT", "BRA2E19", mariana.getId())
            );
            Veiculo hb20 = dataService.criarVeiculo(
                new CreateVeiculoRequest("HB20 Comfort", "QWE4H67", carlos.getId())
            );
            Veiculo toro = dataService.criarVeiculo(
                new CreateVeiculoRequest("Toro Volcano", "XYZ8K21", fernanda.getId())
            );

            dataService.criarAgendamento(
                new CreateAgendamentoRequest(mariana.getId(), onix.getId(), "Lavagem completa", LocalDate.now())
            );
            dataService.criarAgendamento(
                new CreateAgendamentoRequest(carlos.getId(), hb20.getId(), "Polimento tecnico", LocalDate.now())
            );
            dataService.criarAgendamento(
                new CreateAgendamentoRequest(fernanda.getId(), toro.getId(), "Higienizacao interna", LocalDate.now().plusDays(1))
            );
        };
    }
}
