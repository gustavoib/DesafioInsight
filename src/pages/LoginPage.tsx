import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Button, Form, Input, Card, message } from 'antd';

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleSubmit = async () => {
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
                minHeight: '100vh',
                background: '#f0f2f5',
                padding: '20px'
            }}>
                <Card
                    title="Realize Login com suas credenciais"
                    hoverable
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'
                    }}
                >
                    <Form
                        form={form}
                        name="form_login"
                        style={{ maxWidth: '100%' }}
                        autoComplete="off"
                        onSubmitCapture={handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item<FieldType>
                            label="Credencial"
                            name="username"
                            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Senha"
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Entrar
                            </Button>
                        </Form.Item>
                    </Form>
                    <p style={{ marginTop: '30px', fontSize: '12px', color: 'gray' }}>
                        <strong>Usuário:</strong> admin@insightlab_desafio.com <br /><br />
                        <strong>Senha:</strong> adMIN@cad_fornecedores!!
                    </p>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;
