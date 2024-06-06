import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface ModalViewProps {
    id: string;
}

function ModalView({ id }: ModalViewProps) {
    const [fornecedor, setFornecedor] = useState<any>();
    const [open, setOpen] = useState(false);

    const { getOneFornecedores } = useContext(AuthContext);

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                const fornecedor = await getOneFornecedores(id);
                if (fornecedor) {
                    setFornecedor({
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
        }
    }, [ id, open]);

    return (
        <>
            <a>
                <EyeOutlined style={{ color: 'grey' }}onClick={() => setOpen(true)} />
            </a>
            <Modal
                title="Visualizar fornecedor"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={700}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Voltar
                    </Button>
                ]}
            >
                <p><strong>Nome: </strong>{fornecedor?.nome}</p>
                <p><strong>CNPJ: </strong>{fornecedor?.cnpj}</p>
                <p><strong>Telefone: </strong>{fornecedor?.telefone}</p>
                <p><strong>Email: </strong>{fornecedor?.email}</p>
                <p><strong>Categoria: </strong>{fornecedor?.categoria}</p>    
                <p><strong>Endereço: </strong> {fornecedor?.rua}, {fornecedor?.numero}, {fornecedor?.bairro}, {fornecedor?.cep}, {fornecedor?.cidade} - {fornecedor?.estado}</p>
            </Modal>
        </>
    );
}

export default ModalView;
