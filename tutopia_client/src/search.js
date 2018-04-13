import React,{Component} from 'react';
import './search.css';

class Search extends Component{
  render(){
    return (
      <form className="searchbox">
        <label>Buscar</label>
        <input onChange={this.props.onChangeHandler} type="text" name="searchtxt" placeholder="Buscar Tutoria"/>
      </form>
    );
  }
}

export default Search;
