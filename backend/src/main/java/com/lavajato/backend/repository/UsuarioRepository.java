package com.lavajato.backend.repository;

import com.lavajato.backend.model.Usuario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> findAllByOrderByIdDesc();
}
