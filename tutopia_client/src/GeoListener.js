import React, {Component} from 'react';

class GeoListener extends Component{
  constructor(){
    super();
    this.state= {
      hasGeoApi: false,
      GeoLocation:{
        latitud:0,
        longitud:0
      },
      LastUpdate: 0
    };
    this.timeoutId = null;
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchGeoPosition = this.fetchGeoPosition.bind(this);
  }
  componentWillMount(){
    let hasGeoApi = (navigator.geolocation && true);
    this.setState({hasGeoApi:hasGeoApi});
  }
  componentDidMount(){
    this.fetchGeoPosition();
  }
  fetchGeoPosition(){
    navigator.geolocation.getCurrentPosition((position)=>{
      var geolocation = {
        latitud:position.coords.latitude,
        longitud:position.coords.longitude
      }
      if(this.state.GeoLocation.latitud !== geolocation.latitud || this.state.GeoLocation.longitud !== geolocation.logitud){
        if(typeof(this.props.locationChanged) ==="function"){
            this.props.locationChanged(geolocation);
        }
      }

      this.setState({GeoLocation:geolocation,LastUpdate: new Date().getTime()});
      this.timeoutId = setTimeout(this.fetchGeoPosition, 5000);
    })
  }
  render(){
    const { latitud, longitud} = this.state.GeoLocation;
    return(<div>
        Lat: {latitud} | Lon: {longitud} |
        HasGeo: {this.state.hasGeoApi?'Si':'No'}
        | Last Update : {this.state.LastUpdate}
    </div>)
  }
}

export default GeoListener;
