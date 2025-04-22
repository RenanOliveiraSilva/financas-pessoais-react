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
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Bem vindo!</h1>
          <p className="lead">Esse é seu sistema de finanças.</p>
          <p className="lead">
            Seu saldo para o mês atual é de R$ {this.state.saldo}
          </p>
          <hr className="my-4" />
          <p>
            E essa é sua área administrativa, utilize um dos menus ou botões
            abaixo para navegar pelo sistema.
          </p>
          <p className="lead">
            <a className="btn btn-danger btn-lg" href="#/consulta-lancamentos" role="button">
              Consultar Lançamento
            </a>
            <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button">
              Cadastrar Lançamento
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
