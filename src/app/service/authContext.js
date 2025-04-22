import React, { createContext } from "react";

const AuthContext = createContext({
  usuarioAutenticado: null,
  isAutenticado: false,
  iniciarSessao: () => {},
  encerrarSessao: () => {}
});

export class AuthProvider extends React.Component {
    state = {
      usuarioAutenticado: JSON.parse(localStorage.getItem('usuarioLogado')),
      isAutenticado: !!localStorage.getItem('usuarioLogado')
    };
  
    iniciarSessao = (usuario) => {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      this.setState({ usuarioAutenticado: usuario, isAutenticado: true });
    };
  
    encerrarSessao = () => {
      localStorage.removeItem('usuarioLogado');
      this.setState({ usuarioAutenticado: null, isAutenticado: false });
    };
  
    render() {
      const contexto = {
        usuarioAutenticado: this.state.usuarioAutenticado,
        isAutenticado: this.state.isAutenticado,
        iniciarSessao: this.iniciarSessao,
        encerrarSessao: this.encerrarSessao
      };
  
      return (
        <AuthContext.Provider value={contexto}>
          {this.props.children}
        </AuthContext.Provider>
      );
    }
  }

  
export default AuthContext;