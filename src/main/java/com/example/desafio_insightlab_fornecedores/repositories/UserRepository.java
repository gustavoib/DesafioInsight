package com.example.desafio_insightlab_fornecedores.repositories;

import com.example.desafio_insightlab_fornecedores.models.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UsersModel, UUID> {
    UsersModel findByUsername(String username);
}
