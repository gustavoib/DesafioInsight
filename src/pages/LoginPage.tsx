import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Button, Form, Input, Card, message } from 'antd';

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    const [form] = Form.useForm();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
      
        const values = await form.validateFields();
        const success = await login(values.username, values.password);

        if (success) {
            message.success('Login realizado com sucesso!');
        } else {
            message.error('Credenciais inválidas!');
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
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                height: '100vh',
                background: '#f0f2f5'
            }}> 
                <Card title="Realize Login com suas credencias" hoverable style={{ width: 400, textAlign: 'center' }}>
                    <Form
                        form={form}
                        name="form_login"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
                        autoComplete="off"
                        onSubmitCapture={handleSubmit}>

                        <Form.Item<FieldType>
                            label="Credencial"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Senha"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' },]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                    <p style={{ marginTop: '30px', fontSize: '12px' }}>
                        <strong>Usuário:</strong> admin@insightlab_desafio.com <br /><br />
                        <strong>Senha:</strong> adMIN@cad_fornecedores!!
                    </p>
                </Card>
                
            </div>
        </>
    );
};

export default LoginPage;