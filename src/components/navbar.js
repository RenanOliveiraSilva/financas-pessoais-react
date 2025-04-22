import React, { useContext } from "react";
import NavbarItem from "./navbarItem";
import AuthContext from "../app/service/authContext";

function Navbar() {
  const context = useContext(AuthContext);

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">Minhas Finanças</a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          {context.isAutenticado && (
            <ul className="navbar-nav mr-auto">
              <NavbarItem href="#/home" label="Home" />
              <NavbarItem href="#/consulta-lancamentos" label="Lançamentos" />
              <li className="nav-item">
                <a className="nav-link" onClick={context.encerrarSessao} href="#/login">
                  Sair
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
