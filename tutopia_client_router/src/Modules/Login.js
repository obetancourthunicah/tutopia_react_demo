import React from "react";
import { Redirect, Link } from "react-router-dom";
const Login = ({
  onClickHandler,
  onEmailChange,
  onPasswordChange,
  useremail,
  userpassword,
  toUrl,
  islogged
}) => {
  if (islogged) {
    if (toUrl) {
      return <Redirect to={toUrl} />;
    }
  } else {
    return (
      <div>
        <h1>Iniciar Sesión</h1>
        <label>Correo Electrónico</label>
        <input type="text" onChange={onEmailChange} value={useremail} />
        <br />
        <label>Contraseña</label>
        <input type="text" onChange={onPasswordChange} value={userpassword} />
        <br />
        <button onClick={onClickHandler}>Iniciar Sesión</button>
        <hr />
        <Link to="/register">Crear una cuenta.</Link>
      </div>
    );
  }
};

export default Login;
