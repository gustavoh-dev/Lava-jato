package com.lavajato.backend.config;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.dto.CreateServicoRequest;
import com.lavajato.backend.dto.CreateUsuarioRequest;
import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.model.Veiculo;
import com.lavajato.backend.service.LavaJatoDataService;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(LavaJatoDataService dataService) {
        return args -> {
            if (dataService.listarUsuarios().isEmpty()) {
                dataService.criarUsuario(
                    new CreateUsuarioRequest("Administrador", "admin@lavajato.com", "123456", "Administrador")
                );
                dataService.criarUsuario(
                    new CreateUsuarioRequest("Atendente", "atendimento@lavajato.com", "123456", "Atendente")
                );
            }

            if (dataService.listarServicos().isEmpty()) {
                dataService.criarServico(
                    new CreateServicoRequest("Lavagem simples", "Lavagem externa com acabamento rapido.", new BigDecimal("45.00"))
                );
                dataService.criarServico(
                    new CreateServicoRequest("Lavagem completa", "Lavagem externa e interna com aspiracao.", new BigDecimal("80.00"))
                );
                dataService.criarServico(
                    new CreateServicoRequest("Higienizacao interna", "Limpeza detalhada da parte interna do veiculo.", new BigDecimal("95.00"))
                );
                dataService.criarServico(
                    new CreateServicoRequest("Polimento tecnico", "Tratamento de pintura com polimento profissional.", new BigDecimal("150.00"))
                );
                dataService.criarServico(
                    new CreateServicoRequest("Enceramento", "Aplicacao de cera de protecao e brilho.", new BigDecimal("70.00"))
                );
            }

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
