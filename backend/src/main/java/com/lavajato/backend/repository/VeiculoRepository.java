package com.lavajato.backend.repository;

import com.lavajato.backend.model.Veiculo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findAllByOrderByIdDesc();
    void deleteByClienteId(Long clienteId);
}
