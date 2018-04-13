import path from 'path';
import axios from 'axios';

const baseUrl = "http://localhost:3000/api/app";
export const obtenerVersion = (handler)=>{
    const url = baseUrl + '/about';
    axios.get(url)
          .then( (resp) => {
            console.log(resp);
            handler(null, resp.data);
          } )
          .catch( (err) => {
            handler(err, null);
          }
      );
}; // obtenerVersion

export const guardarTutoria = (data,handler)=>{
  const url = baseUrl + '/tutoria/new';
  axios.post(url,data)
      .then((response)=>{
        handler(null,response);
      })
      .catch((errors)=>{
        handler(errors,null);
      });
}

export const obtenerTutorias = (handler)=>{
    const url = baseUrl + '/tutoria/all';
    axios.get(url)
          .then( (resp) => {
            console.log(resp);
            handler(null, resp.data);
          } )
          .catch( (err) => {
            handler(err, null);
          }
      );
}; // obtenerTutorias
