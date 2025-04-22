import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr'
import AuthContext from "../../app/service/authContext";

class CadastroLancamentos extends React.Component {
    static contextType = AuthContext; // Conecta o contexto

    state = {
        id: null,
        descricao: '',
        ano: '',
        mes: '',
        valor: '',
        status: '',
        tipo: ''
    }      

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado;
      
        if (!usuarioLogado) {
          this.props.history.push("/login");
          return;
        }
      
        const { id } = this.props.match.params;
      
        if (id) {
          this.service.buscarPorId(id)
            .then(response => {
                const { descricao, ano, mes, valor, tipo, status } = response.data;
                this.setState({ id, descricao, ano, mes, valor, tipo, status });
                
            })
            .catch(() => {
              messages.mensagemErro("Erro ao carregar lançamento para edição.");
            });
        }
      }
    
    atualizar = () => {
    const usuarioLogado = this.context.usuarioAutenticado;
    
    const lancamento = {
        id: this.state.id,
        descricao: this.state.descricao,
        ano: this.state.ano,
        mes: this.state.mes,
        valor: this.state.valor,
        tipo: this.state.tipo,
        status: this.state.status,
        usuario: usuarioLogado.id
    };
    
    this.service.atualizar(lancamento)
        .then(() => {
        messages.mensagemSucesso("Lançamento atualizado com sucesso!");
        this.props.history.push('/consulta-lancamentos');
        })
        .catch(() => {
        messages.mensagemErro("Erro ao atualizar lançamento.");
        });
    }
      

    salvar = () => {
        const usuarioLogado = this.context.usuarioAutenticado;

        const lancamento = {
            descricao: this.state.descricao,
            ano: this.state.ano,
            mes: this.state.mes,
            valor: this.state.valor,
            tipo: this.state.tipo,
            status: 'PENDENTE',
            usuario: usuarioLogado.id
        }

        this.service.salvar(lancamento).then(response => {
            messages.mensagemSucesso("Lançamento cadastrado com sucesso!")
            this.props.history.push('/consulta-lancamentos')
        }).catch(error => {
            console.log(error.response);
            messages.mensagemErro("Erro ao cadastrar lançamento.")
        });
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
          ];

          const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
          ];

        const status = [
            { label: 'Selecione...', value: '' },
            { label: 'Pendente', value: 'PENDENTE' },
            { label: 'Efetivado', value: 'EFETIVADO' },
            { label: 'Cancelado', value: 'CANCELADO' }
        ];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <Card title="Cadastro de Lançamentos">
                                <FormGroup htmlFor="inputDesc" label="Descricão: *">
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="inputDesc"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        placeholder="Digite a descrição" 
                                    />
                                </FormGroup>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup htmlFor="inputAno" label="Ano: *">
                                            <input type="text"
                                            className="form-control"
                                            id="inputAno"
                                            value={this.state.ano}
                                            onChange={e => this.setState({ ano: e.target.value })}
                                            placeholder="Digite o Ano" />
                                        </FormGroup>

                                    </div>

                                    <div className="col-md-6">
                                        <FormGroup htmlFor="inputMes" label="Mês: ">
                                            <SelectMenu id="inputMes"
                                            value={this.state.mes}
                                            onChange={e => this.setState({ mes: e.target.value })}
                                            className="form-control"
                                            lista={meses} />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <FormGroup htmlFor="inputValor" label="Valor: *">
                                            <input type="text"
                                            className="form-control"
                                            id="inputValor"
                                            value={this.state.valor}
                                            onChange={e => this.setState({ valor: e.target.value })}
                                            placeholder="Digite o Valor" />
                                        </FormGroup>

                                    </div>

                                    <div className="col-md-4">
                                        <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                            <SelectMenu id="inputTipo"
                                            value={this.state.tipo}
                                            onChange={e => this.setState({ tipo: e.target.value })}
                                            className="form-control"
                                            lista={tipos} />
                                        </FormGroup>

                                    </div>

                                    <div className="col-md-4">
                                        <FormGroup htmlFor="inputStatus" label="Status: ">
                                        <SelectMenu
                                            id="inputStatus"
                                            value={this.state.status}
                                            onChange={e => this.setState({ status: e.target.value })}
                                            className="form-control"
                                            lista={status}
                                            disabled={!this.state.id}
                                        />

                                        </FormGroup>

                                    </div>
                                
                                </div>

                                {/* Sessão dos Botões */}
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.state.id ? this.atualizar : this.salvar}
                                >
                                    <i className={`pi ${this.state.id ? 'pi-refresh' : 'pi-plus'} pr-2`}></i>
                                    {this.state.id ? 'Atualizar' : 'Cadastrar'}
                                </button>


                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={e => this.props.history.push('/consulta-lancamentos')}
                                >
                                    <i className="pi pi-info pr-2"></i>
                                    Cancelar
                                </button>
                                

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CadastroLancamentos;