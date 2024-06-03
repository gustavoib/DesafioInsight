import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const loginUser = async (username: string, password: string) => {
    return api.post("/auth/login", { username, password });
}

export const registerFornecedor = async (
    name: string, cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
    return api.post("/fornecedores/save", { name, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado });
}

export const getAllFornecedores = async () => {
    return api.get("/fornecedores/list");
}

export const getOneFornecedores = async (id: string) => {
    return api.get("/fornecedores/list/" + id);
}

export const delFornecedor = async (id: string) => {
    return api.delete("/fornecedores/delete/" + id);
}

export const updateFornecedores = async (id: string, name: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
    return api.put("/notes/update" + id, { name, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado});
}  