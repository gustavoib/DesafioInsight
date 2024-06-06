import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Select, Form, Button, Modal, Input, message } from 'antd';
import { IoAdd } from 'react-icons/io5';
import InputMask from 'antd-mask-input';

function ModalCadastro() {
    const [open, setOpen] = useState(false);
    const { registerFornecedor } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const values = await form.validateFields();
            const success = await registerFornecedor(
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
                message.success('Fornecedor cadastrado com sucesso!');
                form.resetFields();
                setOpen(false);
                window.location.reload();
            } else {
                message.error('Erro ao cadastrar fornecedor!');
            }
        } catch (error) {
            message.error('Erro ao cadastrar fornecedor');
        }
    }

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
        { value: 'alimentos', label: 'Alimentos' },
        { value: 'bebidas', label: 'Bebidas' },
        { value: 'vestuario', label: 'Vestuário' },
        { value: 'art_esportivos', label: 'Artigos esportivos' },
        { value: 'informatica', label: 'Informática' },
        { value: 'moveis', label: 'Móveis' },
        { value: 'madeira', label: 'Madeira' },
        { value: 'outros', label: 'Outros' }
    ];

    const estados = [
        { value: 'Acre', label: 'AC' },
        { value: 'Alagoas', label: 'AL' },
        { value: 'Amapá', label: 'AP' },
        { value: 'Amazonas', label: 'AM' },
        { value: 'Bahia', label: 'BA' },
        { value: 'Ceará', label: 'CE' },
        { value: 'Distrito Federal', label: 'DF' },
        { value: 'Espírito Santo', label: 'ES' },
        { value: 'Goiás', label: 'GO' },
        { value: 'Maranhão', label: 'MA' },
        { value: 'Mato Grosso', label: 'MT' },
        { value: 'Mato Grosso do Sul', label: 'MS' },
        { value: 'Minas Gerais', label: 'MG' },
        { value: 'Pará', label: 'PA' },
        { value: 'Paraíba', label: 'PB' },
        { value: 'Paraná', label: 'PR' },
        { value: 'Pernambuco', label: 'PE' },
        { value: 'Piauí', label: 'PI' },
        { value: 'Rio de Janeiro', label: 'RJ' },
        { value: 'Rio Grande do Norte', label: 'RN' },
        { value: 'Rio Grande do Sul', label: 'RS' },
        { value: 'Rondônia', label: 'RO' },
        { value: 'Roraima', label: 'RR' },
        { value: 'Santa Catarina', label: 'SC' },
        { value: 'São Paulo', label: 'SP' },
        { value: 'Sergipe', label: 'SE' },
        { value: 'Tocantins', label: 'TO' }
    ];
    

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Adicionar fornecedor <IoAdd />
      </Button>
      <Modal
        title="Adicionar fornecedor"
        centered
        open={open}
        onCancel={() => {setOpen(false); form.resetFields()}}
        width={700}
        footer={[
            <Button key="back" onClick={() => {setOpen(false); form.resetFields()}}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={(e) => {
                handleSubmit(e);
            }}>
              Cadastrar
            </Button>
          ]}
      >
        <Form form={form} {...formItemLayout} style={{ maxWidth: 1000 }} name='form_register'>
            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, escreva um Nome.' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true, message: 'Por favor, escreva um CNPJ.' }]}>
                <InputMask mask={"00.000.000/0000-00"} />
            </Form.Item>

            <Form.Item label="Telefone" name="telefone" rules={[{ required: true, message: 'Por favor, escreva um Telefone.' }]}>
                <InputMask mask={"(00)00000-0000"}/>
            </Form.Item>

            <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Por favor, escreva um E-mail.' }]}>
                <Input />
            </Form.Item>

            <Form.Item name="categoria" label="Select" rules={[{ required: true, message: 'Por favor, escreva uma Categoria.' }]}>
              <Select options={categorias} />
            </Form.Item>

            <Form.Item label="CEP" name="cep" rules={[{ required: true, message: 'Por favor, escreva um CEP.' }]}>
                <InputMask mask={"00000-000"} />
            </Form.Item>

            <Form.Item label="Rua" name="rua" rules={[{ required: true, message: 'Por favor, escreva uma Rua.' }]}>
                <Input 
                   />
            </Form.Item>

            <Form.Item label="Número" name="numero" rules={[{ required: true, message: 'Por favor, escreva um Número.' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Bairro" name="bairro" rules={[{ required: true, message: 'Por favor, escreva um Bairro.' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Cidade" name="cidade" rules={[{ required: true, message: 'Por favor, escreva um Cidade.' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Estado" name="estado" rules={[{ required: true, message: 'Por favor, escreva um Estado.' }]}>
                <Select options={estados} />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCadastro;