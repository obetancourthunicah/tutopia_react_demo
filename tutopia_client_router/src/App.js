import React, { Component } from "react";
import Login from "./Modules/Login.js";
import Register from "./Modules/Register.js";
import PrivateRoute from "./Modules/PrivateRoute.js";
import Inicio from "./Modules/Inicio.js";
import Acerca from "./Modules/Acerca.js";
import Tutoria from "./Modules/Tutoria.js";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      security: {
        islogged: false,
        userid: "",
        username: "anonimo",
        tocken: ""
      },
      tutorias: {
        data: [],
        isLoading: false,
        current: {}
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    if (window.localStorage) {
      let _tocken = localStorage.getItem("jwt") || "";
      if (_tocken !== "") {
        let nSecurity = Object.assign(this.state.security, {
          islogged: true,
          tocken: _tocken
        });
        this.setState({ security: nSecurity });
      }
    }
  }
  onClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let nSecurity = Object.assign(this.state.security, {
      islogged: true,
      tocken: "Un Tocken de Mentiritas"
    });
    this.setState({ security: nSecurity });
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Tutopia V2</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign In</Link>
                </li>
                <li>
                  <Link to="/tutorias">Mis Tutorias</Link>
                </li>
                <li>
                  <Link to="/search">Buscar Tutorias</Link>
                </li>
                <li>
                  <Link to="/add">Crear Tutoría</Link>
                </li>
                <li>
                  <Link to="/acerca">Acerca</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Route exact path="/" component={Inicio} />
            <Route
              exact
              path="/login"
              render={() => {
                return <Login onClickHandler={this.onClickHandler} />;
              }}
            />
            <Route
              exact
              path="/register"
              render={() => {
                return <Register onClickHandler={this.onClickHandler} />;
              }}
            />
            <PrivateRoute
              exact
              path="/tutorias"
              islogged={this.state.security.islogged}
              component={Tutoria}
            />
            <PrivateRoute
              exact
              path="/acerca"
              islogged={this.state.security.islogged}
              component={Acerca}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
