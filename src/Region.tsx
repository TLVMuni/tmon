import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RegionProps from './RegionRouterProps';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Footer from './Footer';
import * as regionsData from './regions.json';

interface RegionState {
    selectedPlace: any
    activeMarker: any
    showingInfoWindow: boolean
}

class Region extends React.Component<RegionProps, RegionState> {

    state = {
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false
    }

    mapReady() {
        console.log('map ready');        
    }

    onCameraClick = (props, marker, e) => {
 
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = () => {

        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })

    }

    render() {

        const triangleCoords = [
            {lat: parseFloat("37.772"), lng: parseFloat("-122.214")},
            {lat: parseFloat("21.291"), lng: parseFloat("-157.821")},
            {lat: parseFloat("-18.142"), lng: parseFloat("178.431")},
            {lat: parseFloat("-27.467"), lng: parseFloat("153.027")}
          ];

        const regionData = regionsData.regions[this.props.match.params.regionId];
        const _center = regionData.center;
        const centerRegion = {
            lat: _center.lat,
            lng: _center.lon
          };

          const cameraMarkers = regionData.cameras.map( (camera, index) => {
              const position = {
                  lat:  camera.lat,
                  lng: camera.lon
              }
              return <Marker key={index}
                        name={camera.id}
                        onClick={this.onCameraClick}
                        position={position}>
                     </Marker>
          });

        return (

            <React.Fragment>
                <Map google={this.props.google}
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    onClick={this.onMapClicked}
                    center={centerRegion}
                    zoom={16}
                    onReady={this.mapReady}>
                        
                    {cameraMarkers} 
                     
                     <InfoWindow marker={this.state.activeMarker}
                                 visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                     </InfoWindow>
                </Map>
                <Footer cameras={regionData.cameras} />
            </React.Fragment>
        )
    }

};

export default withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDquW_Bmru-uQ1e8PAj9ogpL8SC4BxSTgI'})(Region));