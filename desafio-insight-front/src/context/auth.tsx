import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, loginUser, registerFornecedor, getAllFornecedores, getOneFornecedores, delFornecedor, updateFornecedores } from '../services/api.ts';

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
    const registerFornecedor = async (name: string, cnpj: string, telefone: string, email: string, categoria: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
      try {
        await registerFornecedor(name, cnpj, telefone, email, categoria, cep, rua, numero, bairro, cidade, estado);
        return true;
      } catch (error) {
        return false;
      }
    };

    //função de listagem de fornecedores
    const getAllFornecedores = async (): Promise<any[]> => {
        try {
            const response = await getAllFornecedores();
            return response.map((fornecedor: any) => fornecedor);
        } catch (error) {
            return [];
        }
    };

    //função de listagem de um fornecedor
    const getOneFornecedores = async (id: string): Promise<any> => {
        try {
            const response = await getOneFornecedores(id);
            return response.data;
        } catch (error) {
            return [];
        }
    };

    //função de exclusão de fornecedor
    const delFornecedor = async (id: string) => {
      try {
        await delFornecedor(id);
        return true;
      } catch (error) {
        return false;
      }
    };


    return (
        <AuthContext.Provider value={{authenticated: !!user, login, loading, logout, registerFornecedor, getAllFornecedores, getOneFornecedores, delFornecedor, updateFornecedores}}>
            {children}
        </AuthContext.Provider>
    )
}