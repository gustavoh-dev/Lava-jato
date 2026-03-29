package com.lavajato.backend.repository;

import com.lavajato.backend.model.Servico;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    List<Servico> findAllByOrderByIdDesc();

    Optional<Servico> findByNomeIgnoreCase(String nome);
}
