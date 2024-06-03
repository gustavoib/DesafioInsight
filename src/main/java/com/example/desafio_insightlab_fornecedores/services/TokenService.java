package com.example.desafio_insightlab_fornecedores.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.desafio_insightlab_fornecedores.models.UsersModel;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;
    public String generateToken(UsersModel user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("api-fornecedores")
                    .withSubject(user.getUsername())
                    .withExpiresAt(getExpiresAt())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token");
        }
    }

    private Instant getExpiresAt() {
        return LocalDateTime.now().plusMinutes(20).toInstant(ZoneOffset.of("-03:00"));
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWT.require(algorithm).withIssuer("api-fornecedores").build().verify(token);
            return JWT.decode(token).getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

}
