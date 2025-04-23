import React from "react";
import UsuarioService from "../app/service/usuarioService";
import AuthContext from "../app/service/authContext";

class Home extends React.Component {
  static contextType = AuthContext;

  state = {
    saldo: 0,
  };

  constructor() {
    super();
    this.usuarioService = new UsuarioService();
  }

  componentDidMount() {
    const usuarioLogado = this.context.usuarioAutenticado;

    if (!usuarioLogado) {
      this.props.history.push("/login");
      return;
    }

    this.usuarioService
      .obterSaldoPorUsuario(usuarioLogado.id)
      .then((response) => {
        this.setState({ saldo: response.data });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card shadow-sm">
        <div className="card border-0 shadow-sm p-4 bg-body-tertiary">
          <h1 className="display-5 text-primary fw-bold">Bem-vindo!</h1>
          <p className="lead">Esse é seu sistema de finanças pessoais.</p>
          <p className="fs-5 mb-3">
            Saldo para o mês atual:{" "}
            <span className="badge bg-success fs-6">R$ {this.state.saldo}</span>
          </p>
          <hr />
          <p className="text-muted">Use os botões abaixo para navegar.</p>
          <div className="d-flex flex-wrap gap-3">
            <a href="#/consulta-lancamentos" className="btn btn-outline-primary btn-lg">
              Consultar Lançamentos
            </a>
            <a href="#/cadastro-lancamentos" className="btn btn-primary btn-lg">
              Cadastrar Lançamento
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
