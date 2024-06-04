import { useState, useContext } from 'react';
import { ILogin } from '../interfaces/Login';
import { AuthContext } from '../context/auth';
import { toast } from 'react-toastify';
import { Button, Form, Input, Card } from 'antd';

const LoginPage = () => {
    const [access, setAccess] = useState<ILogin>({} as ILogin);
    const [/*incorrectPassword*/, setIncorrectPassword] = useState(false);
    const { login } = useContext(AuthContext);


    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const success = await login(access.username, access.password);

      if (success) {
        toast.success('Login realizado com sucesso!');
      } else {
        setIncorrectPassword(true);
      }
    }

    type FieldType = {
        username?: string;
        password?: string;
    };

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f0f2f5'
            }}> 
                <Card title="Realize Login com suas credencias" hoverable style={{ width: 400, textAlign: 'center' }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
                        autoComplete="off"
                        onSubmitCapture={handleSubmit}>

                        <Form.Item<FieldType>
                            label="Credencial"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input value={login.username} onChange={(e) => setAccess({...access, username: e.target.value})}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Senha"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' },]}>
                            <Input.Password value={login.password} onChange={(e) => setAccess({...access, password: e.target.value})}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;