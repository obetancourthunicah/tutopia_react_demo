import React, { Component } from 'react';

class TutoriaForm extends Component {
  constructor(){
    super();
    this.state={
      titulo:"",
      descripcion:""
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
  }

  onClickHandler(e){
    e.preventDefault();
    e.stopPropagation();
    let {titulo, descripcion} = this.state;
    if(this.props.onSubmit && typeof(this.props.onSubmit) === "function"){
        this.props.onSubmit(titulo, descripcion);
        this.setState({titulo:"",descripcion:""});
    }else{
        alert("Click con esto");
    }
  }
  onChangeTitulo(e){
    this.setState({titulo:e.target.value});
  }
  onChangeDescripcion(e){
      this.setState({descripcion:e.target.value});
  }
  render(
  ){
    return (
      <div className="form">
        <form>
          <fieldset>
            <legend>Datos de Nueva Tutoría</legend>
            <label>Título</label>
            <input type="text" onChange={this.onChangeTitulo}
              value={this.state.titulo}/>
            <label>Descripción</label>
            <textarea name="descripcion" onChange={this.onChangeDescripcion}
              value={this.state.descripcion} />
          </fieldset>
          <fieldset>
            <button onClick={this.onClickHandler}>Guardar</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default TutoriaForm;
