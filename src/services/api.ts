import axios from "axios";

export const api = axios.create({
    baseURL: "https://desafioinsight-production.up.railway.app"
});

export const loginUser = async (username: string, password: string) => {
    return api.post("/auth/login", { username, password });
}

export const register = async (nome: string, cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
    return api.post("/fornecedores/save", { nome, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado });
}

export const getAll = async () => {
    return api.get("/fornecedores/list");
}

export const getOne = async (id: string) => {
    return api.get("/fornecedores/list/" + id);
}

export const del = async (id: string) => {
    return api.delete("/fornecedores/delete/" + id);
}

export const update = async (id: string, nome: string, cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
    return api.put("/fornecedores/update/" + id, { nome, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado});
}