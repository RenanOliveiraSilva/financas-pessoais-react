import React from "react";
import Login from "../views/login";
import CadastroUsuarios from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos"
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos";

import { Route, Switch, HashRouter } from "react-router-dom";

function Routes() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} /> 
                <Route path="/cadastro-usuarios" component={CadastroUsuarios} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Routes;