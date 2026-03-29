package com.lavajato.backend.repository;

import com.lavajato.backend.model.Agendamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findAllByOrderByIdDesc();
    void deleteByClienteId(Long clienteId);
}
