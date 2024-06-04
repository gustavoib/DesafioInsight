import { Button, Layout, Table, theme } from 'antd';
import Profile from '../components/Profile';
import { LeftOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { api, getAllFornecedores } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { toast } from 'react-toastify';

const { Content, Footer, Sider } = Layout;


function HomePage() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        toast.success('Logout realizado com sucesso!');
      };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const columns = [
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
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Ações',
            key: 'action',
            render: () => (
                <span style={{ display: 'flex', gap: '20px' }}>
                    <a><EyeOutlined /></a>
                    <a><EditOutlined /></a>
                    <a><DeleteOutlined /></a>
                </span>
            ),
        },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');

            api.defaults.headers.Authorization = `Bearer ${token}`;

            const response = await getAllFornecedores();
            setData(response.data);
            console.log(response.data);
        })();
    }, []);

    return (
        <Layout style={{minHeight:'100vh'}}>
        <Sider
        breakpoint="lg"
        collapsedWidth="0">
            <div className="demo-logo-vertical" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '100px' }}>
                <Profile />
                <span style={{color:'white', padding:'20px', textAlign:'center'}}> ADMINISTRADOR </span>
                <Button type="primary" danger onClick={handleLogout}><LeftOutlined />Logout</Button>
            </div>
        </Sider>
        <Layout 
        style={{minHeight:'100vh'}}>
            <Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                padding: 24,
                minHeight: 400,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                }}
            >
                <h1>Fornecedores cadastrados</h1>
                <Table columns={columns} dataSource={data} />
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            redes sociais
            </Footer>
        </Layout>
        </Layout>
    );
};

export default HomePage;