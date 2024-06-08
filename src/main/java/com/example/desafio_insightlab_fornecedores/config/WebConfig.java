package com.example.desafio_insightlab_fornecedores.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://desafio-fullsatck-insight.netlify.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}