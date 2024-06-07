import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';


interface DeleteWarningProps {
    updatePage: () => void;
    id: string;
}

function DeleteWarning({id, updatePage}: DeleteWarningProps) {
    const { delFornecedor } = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            const success = await delFornecedor(id);
            if (success) {
                message.success('Fornecedor deletado com sucesso!');
                updatePage();
            } else {
                message.error('Erro ao deletar fornecedor!');
            }
        } catch (error) {
            console.error('Erro ao deletar fornecedor:', error);
        }  
    }

    return(
        <Popconfirm
            title="Deletar fornecedor"
            description="Tem certeza que deseja deletar o fornecedor?"
            onConfirm={handleDelete}
            okText="Sim"
            cancelText="cancelar"
            okButtonProps={{ danger: true }}
        >
            <a><DeleteOutlined style={{ color:'red' }}/></a>
        </Popconfirm>
    );
}

export default DeleteWarning;