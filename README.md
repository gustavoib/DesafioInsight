# Desafio Insight Lab - Cadastro de Fornecedores

Este repositório contém a solução **back-end** para o desafio proposto para a vaga de bolsista graduando full-stack no Insight Lab.

## Descrição do Desafio

O desafio consiste em criar uma aplicação que permita o cadastro de fornecedores e outras operações de CRUD, além de ser aberto para a criação de novas funcionalidades.

## Detalhes da Solução

A aplicação foi desenvolvida utilizando o framework Spring Boot, cumprindo a restrição do desafio para a implementação do backend. Foram utilizadas diversas dependências do Spring Boot, como Spring Data JPA, Spring Web e Spring Security, além do banco de dados PostgreSQL.

### Tecnologias Utilizadas

- Spring Boot
- Spring Data JPA
- Spring Web
- Spring Security
- PostgreSQL

## Funcionamento da API

A API permite o gerenciamento de fornecedores com as seguintes operações:

### Endpoints

| Método | Endpoint                              | Descrição                                            |
| ------ | ------------------------------------- | ---------------------------------------------------- |
| POST   | /auth/login                           | Login de usuários                                    |
| POST   | /fornecedores/save                   | Cadastro de fornecedores                             |
| GET    | /fornecedores/list                   | Listagem de fornecedores                             |
| GET    | /fornecedores/list/{id}              | Listagem de fornecedores específicos                 |
| PUT    | /fornecedores/update/{id}            | Atualização de fornecedores                          |
| DELETE | /fornecedores/delete/{id}            | Exclusão de fornecedores                             |
| GET    | /fornecedores/list/order/{order}     | Ordenar fornecedores por data de cadastro (asc e desc)|
| GET    | /fornecedores/list/category/{category}| Filtrar fornecedores por categoria                   |

**Atenção**: Para realizar operações de cadastro, atualização, exclusão e listagem de fornecedores, é necessário autenticar-se na aplicação. Utilize as credenciais de administrador fornecidas abaixo:

**Credenciais do Admin:**
- **Username:** admin@insightlab_desafio.com
- **Password:** adMIN@cad_fornecedores!!

**Exemplo de Requisição de Login:**
```json
{
  "username": "admin@insightlab_desafio.com",
  "password": "adMIN@cad_fornecedores!!"
}
```
Após realizar o login, copie o token gerado e adicione-o no header da requisição com a chave `Authorization`.
