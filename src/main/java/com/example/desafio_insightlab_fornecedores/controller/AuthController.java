package com.example.desafio_insightlab_fornecedores.controller;

import com.example.desafio_insightlab_fornecedores.dtos.AuthRecordDto;
import com.example.desafio_insightlab_fornecedores.models.UsersModel;
import com.example.desafio_insightlab_fornecedores.services.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthRecordDto authRecordDto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authRecordDto.username(), authRecordDto.password());
        var authenticate = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsersModel) authenticate.getPrincipal());

        return ResponseEntity.status(HttpStatus.OK).body(token);
    }
}
