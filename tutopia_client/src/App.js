import React, { Component } from 'react';

import Header from './header.js';
import Tutoria from './tutoria.js';
import Search from './search.js';
import GeoListener from './GeoListener.js';
import TutoriaForm from './TutorialForm.js';
import path from 'path';
import {obtenerVersion, obtenerTutorias,guardarTutoria} from './api.js';

class App extends Component {
  constructor(){
    super();
    // this.filter ="";
    this.state = {
      filter:"",
      isLoading:true,
      tutorias: [],
      version:{},
      position:{}
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.geoHandler = this.geoHandler.bind(this);
  }
  onSearchChange(e){
    this.setState({filter:e.target.value});
  }
 componentDidMount(){
   obtenerTutorias( (err, data) => {
     if(err) console.log(err);
     this.setState({"tutorias": data, "isLoading":false});
   } );
 }

  geoHandler(position){
  //  alert(position.latitud + " - " + position.longitud);
  this.setState({position:position});
  }
  handleFormData(titulo, descripcion){
    //this.setState({formData:{titulo:titulo, descripcion:descripcion}});
    guardarTutoria({name:titulo,
      description:descripcion,
      latitud:this.state.position.latitud,
      longitud:this.state.position.longitud}, (err,data)=>{
        alert(err);
      });
  }
  render() {
    if(this.state.isLoading) return (<div>Cargando ....</div>);
    const renderTutorias = this.state.tutorias.map(
      (item, i)=>{
        //if(item.titulo.indexOf(this.state.filter) >=0 || this.state.filter===""){
        if( new RegExp(this.state.filter,"i").test(item.titulo) || this.state.filter===""){
          return (<Tutoria key={i} titulo={item.name} descripcion={item.description} />);
        }
      }
    )// recorre todos los datos
    return (
      <div className="App">
      <Header />
        <main>
          <Search onChangeHandler={this.onSearchChange} />
          <GeoListener locationChanged={this.geoHandler} />
          {renderTutorias}
          <TutoriaForm  onSubmit={this.handleFormData}/>
        </main>
      </div>
    );
  }
}

export default App;
