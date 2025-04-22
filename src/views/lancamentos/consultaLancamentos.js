import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/formGroup'
import SelectMenu from '../../components/selectMenu'
import LancamentoTable from './lancamentoTable';

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {
  state = {
    ano: '',
    mes: '',
    tipo: '',
    lacamento: [],
    showModal: false,
    showConfirmDialog: false,
    lancamentoASerDeletado: null
  }

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  componentDidMount() {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    if (usuarioLogado === null) {
      this.props.history.push('/login')
      return;
    }

    this.buscar();
  }

  buscar = () => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      usuario: usuarioLogado.id
    }

    this.service.consultar(lancamentoFiltro).then(response => {
      const lista = response.data;

      if (lista.length < 1) {
        messages.mensagemAlerta("Nenhum resultado encontrado.")
      }

      this.setState({ lacamento: lista });

    }).catch(error => {
      messages.mensagemErro("Erro ao buscar lançamentos. Tente mais tarde.")
    });
  }

  deletar = (id) => {
    this.setState({
      showConfirmDialog: true,
      lancamentoASerDeletado: id
    });
  }

  confirmarDelecao = () => {
    const id = this.state.lancamentoASerDeletado;

    this.service.deletar(id)
      .then(() => {
        const listaAtualizada = this.state.lacamento.filter(l => l.id !== id);
        this.setState({
          lacamento: listaAtualizada,
          showConfirmDialog: false,
          lancamentoASerDeletado: null
        });
        messages.mensagemSucesso("Lançamento deletado com sucesso!");
      })
      .catch(error => {
        messages.mensagemErro("Erro ao deletar lançamento.");
        console.error(error);
      });
  }

  efetivar = (lancamento) => {
    this.service.efetivar(lancamento.id)
      .then(response => {
        const lista = this.state.lacamento;
        const index = lista.indexOf(lancamento);
        lista[index] = response.data;
        this.setState({ lacamento: lista });
        messages.mensagemSucesso("Lançamento efetivado com sucesso!");
      })
      .catch(error => {
        messages.mensagemErro("Erro ao efetivar lançamento.");
        console.error(error);
      });
  }

  cancelar = (lancamento) => {
    this.service.cancelar(lancamento.id)
      .then(response => {
        const lista = this.state.lacamento;
        const index = lista.indexOf(lancamento);
        lista[index] = response.data;
        this.setState({ lacamento: lista });
        messages.mensagemSucesso("Lançamento cancelado com sucesso!");
      })
      .catch(error => {
        messages.mensagemErro("Erro ao cancelar lançamento.");
        console.error(error);
      });
  }

  editar = (lancamento) => {
    this.props.history.push(`/cadastro-lancamentos/${lancamento}`);
  }

  render() {
    const meses = [
      { label: 'Selecione...', value: '' },
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 }
    ]

    const tipos = [
      { label: 'Selecione...', value: '' },
      { label: 'Despesa', value: 'DESPESA' },
      { label: 'Receita', value: 'RECEITA' }
    ]

    return (
      <div className="container">
        <Card title="Consulta Lançamentos">

          {/* Botões principais */}
          <div className="mb-3 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.setState({ showModal: true })}
            >
              <i className="pi pi-filter pr-2"></i>Filtrar
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={e => this.props.history.push('/cadastro-lancamentos')}
            >
              <i className="pi pi-plus pr-2"></i>Cadastrar
            </button>
          </div>

          {/* Tabela */}
          <div className="row">
            <div className="col-md-12">
              {this.state.lacamento.length === 0 ? (
                <div className="text-center p-4">
                  <img 
                    src="/lista.png"  // caminho correto dentro da pasta public
                    alt="Nenhum lançamento encontrado" 
                    style={{ maxWidth: '250px', opacity: 0.8 }} 
                  />
                  <p className="mt-3 text-muted">Nenhum lançamento encontrado...</p>
                </div>
              ) : (
                <LancamentoTable
                  lancamentos={this.state.lacamento}
                  deletarAction={this.deletar}
                  efetivar={this.efetivar}
                  cancelar={this.cancelar}
                  editarAction={this.editar}
                />
              )}

            </div>
          </div>

          {/* Modal de Filtro */}
          {this.state.showModal && (
            <div className="modal d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Filtrar Lançamentos</h5>
                    <button type="button" className="close" onClick={() => this.setState({ showModal: false })}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                          <input
                            type="text"
                            className="form-control"
                            id="inputAno"
                            value={this.state.ano}
                            onChange={e => this.setState({ ano: e.target.value })}
                            placeholder="Digite o Ano"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: ">
                          <SelectMenu
                            id="inputMes"
                            value={this.state.mes}
                            onChange={e => this.setState({ mes: e.target.value })}
                            className="form-control"
                            lista={meses}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                      <SelectMenu
                        id="inputTipo"
                        value={this.state.tipo}
                        onChange={e => this.setState({ tipo: e.target.value })}
                        className="form-control"
                        lista={tipos}
                      />
                    </FormGroup>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        this.buscar();
                        this.setState({ showModal: false });
                      }}
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal de confirmação */}
          {this.state.showConfirmDialog && (
            <div className="modal d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmação</h5>
                    <button type="button" className="close" onClick={() => this.setState({ showConfirmDialog: false, lancamentoASerDeletado: null })}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Tem certeza que deseja deletar este lançamento?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.confirmarDelecao}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => this.setState({ showConfirmDialog: false, lancamentoASerDeletado: null })}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default withRouter(ConsultaLancamentos);
