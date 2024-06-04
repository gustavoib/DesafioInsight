package com.example.desafio_insightlab_fornecedores.controller;

import com.example.desafio_insightlab_fornecedores.dtos.AuthDto;
import com.example.desafio_insightlab_fornecedores.dtos.LoginResponseDto;
import com.example.desafio_insightlab_fornecedores.models.UsersModel;
import com.example.desafio_insightlab_fornecedores.repositories.UserRepository;
import com.example.desafio_insightlab_fornecedores.services.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthDto authRecordDto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authRecordDto.username(), authRecordDto.password());
        var authenticate = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsersModel) authenticate.getPrincipal());
        var user = userRepository.findByUsername(authRecordDto.username());
        var loginResponseDto = new LoginResponseDto(user, token);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
    }
}
