import React, {Component} from 'react';

class Tutoria extends Component{
  render(){
    const {titulo, descripcion} = this.props;
    return (
      <div>
        <h2>{titulo||"No hay Titulo"}</h2>
        <p>{descripcion||"No hay Descripción"}</p>
        <a >Mostrar Más</a>
      </div>
    );
  }
}

export default Tutoria;
