package com.example.desafio_insightlab_fornecedores.repositories;

import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

// Repositório de fornecedores do sistema com Spring Data JPA e Hibernate
// O repositório é uma interface que estende JpaRepository, que é uma interface do Spring Data JPA que fornece métodos CRUD para a entidade FornecedoresModel
@Repository
public interface FornecedoresRepository extends JpaRepository<FornecedoresModel, UUID> {
}