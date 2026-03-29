package com.lavajato.backend.repository;

import com.lavajato.backend.model.Pagamento;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    List<Pagamento> findAllByOrderByIdDesc();
    List<Pagamento> findByDataOrderByIdDesc(LocalDate data);
    long countByData(LocalDate data);
    void deleteByClienteNome(String clienteNome);
}
