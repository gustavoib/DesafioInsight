import { Fornecedores } from './interfaces/Fornecedores'
import { Table } from 'antd'


function App() {
  const data: Fornecedores[] = []

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Cadastrado em',
      dataIndex: 'created_at',
      key: 'created_at',
    }
  ];

  return (
    <div className="App">
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default App
