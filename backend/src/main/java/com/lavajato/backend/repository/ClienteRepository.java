package com.lavajato.backend.repository;

import com.lavajato.backend.model.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findAllByOrderByIdDesc();
}
