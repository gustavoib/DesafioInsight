package com.example.desafio_insightlab_fornecedores.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "fornecedores")
public class FornecedoresModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cnpj", unique = true)
    private String cnpj;

    @Column(name = "telefone", unique = true)
    private String telefone;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();

    /* O endereço está representado como atributos na entidade fornecedores, pois,
    * pela abordagem da minha implementação um fornecedor possui apenas um endereço.
    * A criação de uma tabela filha contendo os endereços para esse caso era dispensável.*/

    @Column(name = "cep")
    private String cep;

    @Column(name = "rua")
    private String rua;

    @Column(name = "numero")
    private String numero;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "estado")
    private String estado;

}
