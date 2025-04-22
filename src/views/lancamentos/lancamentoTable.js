const LancamentoTable = ({ lancamentos, editarAction, deletarAction, efetivar, cancelar  }) => {
    const rows = lancamentos.map((lancamento) => {
      return (
        <tr key={lancamento.id}>
          <td>{lancamento.descricao}</td>
          <td>{lancamento.valor}</td>
          <td>{lancamento.tipo}</td>
          <td>{lancamento.mes}</td>
          <td>{lancamento.status}</td>
          <td>
            <button
              title="Editar"
              className="btn btn-primary btn-sm mx-1"
              onClick={() => editarAction(lancamento.id)}
            >
              <i className="pi pi-pencil"></i>
            </button>
  
            <button
              title="Deletar"
              className="btn btn-danger btn-sm mx-1"
              onClick={() => deletarAction(lancamento.id)}
            >
              <i className="pi pi-trash"></i>
            </button>
  
            <button
              title="Efetivar"
              className="btn btn-success btn-sm mx-1"
              disabled={lancamento.status === 'EFETIVADO' || lancamento.status === 'CANCELADO'}
              onClick={() => efetivar(lancamento)}
            >
              <i className="pi pi-check"></i>
            </button>

            <button
              title="Cancelar"
              className="btn btn-warning btn-sm mx-1"
              disabled={lancamento.status === 'EFETIVADO' || lancamento.status === 'CANCELADO'}
              onClick={() => cancelar(lancamento, 'PENDENTE')}
            >
              <i className="pi pi-info"></i>
            </button>
          </td>
        </tr>
      );
    });
  
    return (
      <table className="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Mês</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };
  
  export default LancamentoTable;