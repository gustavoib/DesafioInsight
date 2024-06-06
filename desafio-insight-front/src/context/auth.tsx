import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, loginUser, register, getAll, getOne, del, update } from '../services/api.ts';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState<boolean>(true); 
    
    const navigate = useNavigate();

    useEffect(() => {
      const storagedUser = localStorage.getItem('user');
      
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }, []);

    //função de login
    const login = async (email:string, password:string) => {
      try {  
        const response = await loginUser(email, password);
        
        const loggedUser = response.data.user;
        const token = response.data.token

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate('/home');

        return true; // Login bem-sucedido
      } catch (error) {
        return false; // Login falhou
      }
    };

    //função de logout
    const logout = () => {
      console.log('logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('notes');

      api.defaults.headers.Authorization = null;

      setUser(null);
      navigate('/login'); 
    };

    //função de cadastro de fornecedor
    const registerFornecedor = async (nome: string, cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
      const token = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${token}`
      console.log('estado', estado);
      
      try {
        await register(nome, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado);
        
        console.log('nome', nome);
        console.log('cnpj', cnpj);
        console.log('telefone', telefone);
        console.log('email', email);

        return true;
      } catch (error) {
        return false;
      }
    };

    //função de listagem de fornecedores
    const getAllFornecedores = async () => {
      try {
        const response = await getAll();
        return response.data.map((fornecedor: any) => fornecedor);
      } catch (error) {
        return [];
      }
    };

    //função de listagem de um fornecedor
    const getOneFornecedores = async (id: string) => {
      console.log('id', id);
        try {
          const response = await getOne(id);
          return response.data;
        } catch (error) {
          return [];
        }
    };

    //função de atualização de fornecedor
    const updateFornecedor = async (id: string, nome: string,  cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
      try {
        await update(id, nome, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado);
        return true;
      } catch (error) {
        return false;
      }
    };

    //função de exclusão de fornecedor
    const delFornecedor = async (id: string) => {

      console.log(id)
      try {
        await del(id);
        return true;
      } catch (error) {
        return false;
      }
    };


    return (
        <AuthContext.Provider value={{authenticated: !!user, login, loading, logout, registerFornecedor, getAllFornecedores, getOneFornecedores, delFornecedor, updateFornecedor}}>
            {children}
        </AuthContext.Provider>
    )
}