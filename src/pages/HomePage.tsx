import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { api } from '../services/api';
import { AuthContext } from '../context/auth';
import { toast } from 'react-toastify';
import { Button, Table, Layout } from 'antd';
import type { TableColumnsType } from 'antd';
import { IoLogOutOutline } from 'react-icons/io5';
import ModalCadastro from '../components/ModalCadastro';
import DeleteWarning from '../components/DeleteWarning';
import ModalEdit from '../components/ModalEdit';
import ModalView from '../components/ModalView';

const { Header, Content } = Layout;

function HomePage() {
    const { logout, getAllFornecedores } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        logout();
        toast.success('Logout realizado com sucesso!');
      };

      const [data, setData] = useState([]);

      useEffect(() => {
          (async () => {
              const token = localStorage.getItem('token');
  
              api.defaults.headers.Authorization = `Bearer ${token}`;
  
              const response = await getAllFornecedores();
              
            
                const sortedData = response.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setData(sortedData);
          })();
      }, []);

    const columns: TableColumnsType = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'name',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
        },
        {
            title: 'Criado em',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: Date) => {
                const formattedDate = new Date(createdAt).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
                return formattedDate;
            },
            sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado'
        },
        {
            title: 'Ações',
            key: 'action',
            render: (record: any) => (
                <span style={{ display: 'flex', gap: '40px' }}>
                    <ModalView id={record.id}/>
                    <ModalEdit id={record.id}/>
                    <DeleteWarning id={record.id}/>
                </span>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: 'white' }}>credencial: {user.username}</span>
                    <Button type="primary" onClick={handleLogout} danger>
                        <IoLogOutOutline /> Sair
                    </Button>
                </div>
            </Header>
            <Content style={{ padding: '0 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 10px 0' }}>
                    <h1>Cadastro de Fornecedores</h1>
                    <ModalCadastro />
                </div>
                <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 8 }} />
            </Content>
        </Layout>
    );
};

export default HomePage;