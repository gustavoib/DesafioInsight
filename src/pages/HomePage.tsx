import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { api } from '../services/api';
import { AuthContext } from '../context/auth';
import { Button, Table, Layout, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { IoLogOutOutline } from 'react-icons/io5';
import ModalCadastro from '../components/ModalCadastro';
import DeleteWarning from '../components/DeleteWarning';
import ModalEdit from '../components/ModalEdit';
import ModalView from '../components/ModalView';
import React from 'react';

const { Header, Content } = Layout;

function HomePage() {
    const { logout, getAllFornecedores } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [data, setData] = useState<any[]>([]);

    const handleLogout = () => {
        logout();
        message.success('Logout realizado com sucesso!');
      };

      useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                api.defaults.headers.Authorization = `Bearer ${token}`;
                const response = await getAllFornecedores();
                const sortedData = response.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setData(sortedData);
            } catch (error) {
                console.error('Erro ao carregar fornecedores:', error);
            }
        };
        fetchData();
    }, []);

    const updateDataAfterCRUD = async () => {
        try {
            const response = await getAllFornecedores();
            const sortedData = response.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setData(sortedData);
        } catch (error) {
            console.error(error);
        }
    };

    const columns: TableColumnsType = [
        {
            title: 'Detalhes',
            render: (record) => (
                <React.Fragment>
                    <div>
                        <strong>Nome do Fornecedor:</strong>
                        <br />
                        {record.nome}
                    </div>
                    <br />
                    <div>
                        <strong>Ações:</strong>
                        <br />
                        <span style={{ display: 'flex', gap: '10px' }}>
                            <ModalView id={record.id} />
                            <ModalEdit id={record.id} updatePage={updateDataAfterCRUD} />
                            <DeleteWarning id={record.id} updatePage={updateDataAfterCRUD} />
                        </span>
                    </div>
                </React.Fragment>
            ),
            responsive: ["xs"]
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'name',
            responsive: ["sm"]
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
            responsive: ["sm"]
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
            sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            responsive: ["lg"]
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            responsive: ["sm"]
        },
        {
            title: 'Ações',
            key: 'action',
            render: (record: any) => (
                <span style={{ display: 'flex', gap: '40px' }}>
                    <ModalView id={record.id} />
                    <ModalEdit id={record.id} updatePage={updateDataAfterCRUD} />
                    <DeleteWarning id={record.id} updatePage={updateDataAfterCRUD} />
                </span>
            ),
            responsive: ["sm"]
        },
    ];

    return (
        <Layout style={{minHeight:'100vh'}}>
            <Header
                style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: "0 20px",
                }}>
                <div>
                    <span style={{ fontSize: 16, color: 'white' }}>
                        {user.username}
                    </span>
                </div>
                <Button
                    type="primary"
                    onClick={handleLogout}
                    danger
                    style={{ marginLeft: 'auto', background:'grey' }}>
                    <IoLogOutOutline /> Sair
                </Button>
            </Header>
            <Content style={{ padding: '0 20px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px 0 10px 0', 
                    flexWrap: 'wrap'
                    }}>
                    <h1>Cadastro de Fornecedores</h1>
                    <ModalCadastro updatePage={updateDataAfterCRUD}/>
                </div>
                <Table columns={columns} dataSource={data} rowKey="id" pagination={{pageSize:8}}/>
            </Content>
        </Layout>
    );
};

export default HomePage;