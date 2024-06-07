import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { Form, Button, Modal, Input, message, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputMask from 'antd-mask-input';

interface ModalEditProps {
    id: string;
}

function ModalEdit({ id }: ModalEditProps) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const { updateFornecedor, getOneFornecedores } = useContext(AuthContext);

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                const fornecedor = await getOneFornecedores(id);
                if (fornecedor) {
                    form.setFieldsValue({
                        id: fornecedor.id,
                        nome: fornecedor.nome,
                        cnpj: fornecedor.cnpj,
                        telefone: fornecedor.telefone,
                        email: fornecedor.email,
                        categoria: fornecedor.categoria,
                        cep: fornecedor.cep,
                        rua: fornecedor.rua,
                        numero: fornecedor.numero,
                        bairro: fornecedor.bairro,
                        cidade: fornecedor.cidade,
                        estado: fornecedor.estado
                    });
                }
            }
            fetchData();
        } else {
            form.resetFields();
        }
    }, [ id, form, open]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const success = await updateFornecedor(
                values.id,
                values.nome,
                values.cnpj,
                values.telefone,
                values.email,
                values.categoria,
                values.cep,
                values.rua,
                values.numero,
                values.bairro,
                values.cidade,
                values.estado
            );

            if (success) {
                message.success('Fornecedor editado com sucesso!');
                setOpen(false);
                window.location.reload();
            } else {
                message.error('Erro ao editar fornecedor!');
            }
        } catch (error) {
            message.error('Erro ao validar campos do formulário!');
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const categorias = [
        { value: 'Alimentos', label: 'Alimentos' },
        { value: 'Eletrônicos', label: 'Eletrônicos'},
        { value: 'Informática', label: 'Informática' },
        { value: 'Móveis', label: 'Móveis' },
        { value: 'Automotivo', label: 'Automotivo' },
        { value: 'Cosméticos', label: 'Cosméticos' },
        { value: 'Farmacêutico', label: 'Farmacêutico' },
        { value: 'Brinquedos', label: 'Brinquedos' },
        { value: 'Calçados', label: 'Calçados' },
        { value: 'Decoração', label: 'Decoração' },
        { value: 'Esportes', label: 'Esportes' },
        { value: 'Ferramentas', label: 'Ferramentas' },
        { value: 'Jogos', label: 'Jogos' },
        { value: 'Limpeza', label: 'Limpeza' },
        { value: 'Papelaria', label: 'Papelaria' },
        { value: 'Vestuário', label: 'Vestuário' },
        { value: 'Outros', label: 'Outros' }
    ];

    const estados = [
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' }        
    ];

    return (
        <>
            <a>
                <EditOutlined onClick={() => setOpen(true)} />
            </a>
            <Modal
                title="Editar fornecedor"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={700}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                ]}
            >
                <Form {...formItemLayout} form={form} name='form_edit'>
                    <Form.Item
                        name="id"
                        label="ID"
                        hidden
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="nome"
                        label="Nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="cnpj"
                        label="CNPJ"
                        rules={[{ required: true, message: 'Por favor, insira o CNPJ do fornecedor!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="telefone"
                        label="Telefone"
                        rules={[{ required: true, message: 'Por favor, insira o telefone do fornecedor!' }]}
                    >
                        <InputMask mask={'(00)00000-0000'} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Por favor, insira o email do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="categoria"
                        label="Categoria"
                        rules={[{ required: true, message: 'Por favor, insira a categoria do fornecedor!' }]}
                    >
                        <Select options={categorias} />
                    </Form.Item>

                    <Form.Item
                        name="cep"
                        label="CEP"
                        rules={[{ required: true, message: 'Por favor, insira o CEP do fornecedor!' }]}
                    >
                        <InputMask mask={'00000-000'} />
                    </Form.Item>

                    <Form.Item
                        name="rua"
                        label="Rua"
                        rules={[{ required: true, message: 'Por favor, insira a rua do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="numero"
                        label="Número"
                        rules={[{ required: true, message: 'Por favor, insira o número do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="bairro"
                        label="Bairro"
                        rules={[{ required: true, message: 'Por favor, insira o bairro do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="cidade"
                        label="Cidade"
                        rules={[{ required: true, message: 'Por favor, insira a cidade do fornecedor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="estado"
                        label="Estado"
                        rules={[{ required: true, message: 'Por favor, insira o estado do fornecedor!' }]}
                    >
                        <Select options={estados} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default ModalEdit;
