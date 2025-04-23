import React, { useContext } from "react";
import NavbarItem from "./navbarItem";
import AuthContext from "../app/service/authContext";

function Navbar() {
  const context = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a href="#/home" className="navbar-brand fw-bold">
          Minhas Finanças
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          {context.isAutenticado && (
            <ul className="navbar-nav ms-auto gap-2">
              <NavbarItem href="#/home" label="Home" />
              <NavbarItem href="#/consulta-lancamentos" label="Lançamentos" />
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={context.encerrarSessao}
                  href="#/login"
                >
                  Sair
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
