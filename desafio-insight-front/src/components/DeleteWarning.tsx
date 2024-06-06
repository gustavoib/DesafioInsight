import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';


interface DeleteWarningProps {
    id: string;
}

function DeleteWarning({id}: DeleteWarningProps) {
    const { delFornecedor } = useContext(AuthContext);

    const handleDelete = () => {
        console.log('id', id)
        delFornecedor(id);    
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