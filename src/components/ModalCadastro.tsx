import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Select, Form, Button, Modal, Input, message } from 'antd';
import { IoAdd } from 'react-icons/io5';
import InputMask from 'antd-mask-input';
import { InputNumber } from 'antd/lib';

interface ModalCadastroProps {
    updatePage: () => void;
}

function ModalCadastro( {updatePage} : ModalCadastroProps ) {
    const [open, setOpen] = useState(false);
    const { registerFornecedor } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
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
                updatePage();
            } else {
                message.error('Erro ao cadastrar fornecedor!');
            }
        } catch (error) {
            console.error('Erro ao validar campos do formulário!');
        }
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 }
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
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Cadastrar
            </Button>
          ]}
      >
        <Form form={form} {...formItemLayout} style={{ maxWidth: 1000 }} name='form_register'>
            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, escreva um Nome.' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true, message: 'Por favor, escreva um CNPJ.' }]}>
                <InputMask mask={"00.000.000/0000-00"} />
            </Form.Item>

            <Form.Item label="Telefone" name="telefone" rules={[{ required: true, message: 'Por favor, escreva um Telefone.' }]}>
                <InputMask mask={"(00)00000-0000"}/>
            </Form.Item>

            <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Por favor, escreva um E-mail.' }]}>
                <Input/>
            </Form.Item>

            <Form.Item name="categoria" label="Categoria" rules={[{ required: true, message: 'Por favor, escreva uma Categoria.' }]}>
              <Select options={categorias} />
            </Form.Item>

            <Form.Item label="CEP" name="cep" rules={[{ required: true, message: 'Por favor, escreva um CEP.' }]}>
                <InputMask mask={"00000-000"} />
            </Form.Item>

            <Form.Item label="Rua" name="rua" rules={[{ required: true, message: 'Por favor, escreva uma Rua.' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Número" name="numero" rules={[{ required: true, message: 'Por favor, escreva um Número.' }]}>
                <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>

            <Form.Item label="Bairro" name="bairro" rules={[{ required: true, message: 'Por favor, escreva um Bairro.' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Cidade" name="cidade" rules={[{ required: true, message: 'Por favor, escreva um Cidade.' }]}>
                <Input/>
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