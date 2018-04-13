import React from "react";
import { Redirect, Link } from "react-router-dom";

const Register = ({
  onClickHandler,
  onEmailChange,
  onPasswordChange,
  useremail,
  userpassword,
  redirect
}) => {
  if (redirect) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <h1>Crear Nueva Cuenta</h1>
        <label>Correo Electrónico</label>
        <input type="text" onChange={onEmailChange} value={useremail} />
        <br />
        <label>Contraseña</label>
        <input type="text" onChange={onPasswordChange} value={userpassword} />
        <br />
        <button onClick={onClickHandler}>Registrar Cuenta</button>
        <hr />
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    );
  }
};
export default Register;
