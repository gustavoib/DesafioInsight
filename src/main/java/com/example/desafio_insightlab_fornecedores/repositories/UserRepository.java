package com.example.desafio_insightlab_fornecedores.repositories;

import com.example.desafio_insightlab_fornecedores.models.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

// Repositório de usuários do sistema com Spring Data JPA e Hibernate
// O repositório é uma interface que estende JpaRepository, que é uma interface do Spring Data JPA que fornece métodos CRUD para a entidade UsersModel
public interface UserRepository extends JpaRepository<UsersModel, UUID> {
    UsersModel findByUsername(String username);
}
