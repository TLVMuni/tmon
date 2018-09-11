import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RegionProps from './RegionRouterProps';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Footer from './Footer';
import CameraView from './CameraView';
import * as regionsData from './regions.json';

interface RegionState {
    regionId: number,
    selectedPlace: any,
    activeMarker: any,
    showingInfoWindow: boolean
}

class Region extends React.Component<RegionProps, RegionState> {

    // Instance members
    state = {
        selectedPlace: {
            cameraId: 0
        },
        regionId: parseInt(this.props.match.params.regionId, 10),
        activeMarker: {},
        showingInfoWindow: false
    }

    constructor(props: RegionProps) {
        super(props);

        const _region = regionsData.regions.find( (region: IRegion) => {
            return region.id === this.state.regionId;
        });
       
        this.state.selectedPlace.cameraId =  _region.cameras[0].id;

        this.cameraSelected = this.cameraSelected.bind(this);
    }

    componentDidUpdate(prevProps: RegionProps) {

        const regionId = parseInt(this.props.match.params.regionId, 10);

        if( this.state.regionId != regionId) {

            let _selectedPlace = this.state.selectedPlace;
            let _region= regionsData.regions.find( (region: IRegion) => {
                return region.id === regionId;
            });
            _selectedPlace.cameraId = _region.cameras[0].id;
            this.setState({
                selectedPlace: _selectedPlace,
                regionId: parseInt(this.props.match.params.regionId, 10)
            });
        }
    }

    mapReady() {
        console.log('map ready');        
    }

    onMarkerClick = (props, marker, e) => {
 
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

    // Callback called from Footer when the camera is clicked
    cameraSelected = (cameraId: number) => {
        let _selectedPlace = this.state.selectedPlace;
        _selectedPlace.cameraId = cameraId;
        this.setState({
            selectedPlace: _selectedPlace
        });
    }

    render() {

        const triangleCoords = [
            {lat: parseFloat("37.772"), lng: parseFloat("-122.214")},
            {lat: parseFloat("21.291"), lng: parseFloat("-157.821")},
            {lat: parseFloat("-18.142"), lng: parseFloat("178.431")},
            {lat: parseFloat("-27.467"), lng: parseFloat("153.027")}
          ];

       
        const regionData = regionsData.regions.find( (region: IRegion) => {
            return region.id === this.state.regionId;
        });

        const _center = regionData.center;
        const centerRegion = {
            lat: _center.lat,
            lng: _center.lon
          };

          const cameraMarkers = regionData.cameras.map( (camera: ICamera, index: number) => {
              const position = {
                  lat: camera.lat,
                  lng: camera.lon
              }
              return <Marker key={index}
                        name={camera.name}
                        cameraId={camera.id}
                        onClick={this.onMarkerClick}
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
                <CameraView cameraId={this.state.selectedPlace.cameraId} />
                <Footer cameras={regionData.cameras} 
                        activeCameraId={this.state.selectedPlace.cameraId} 
                        cameraSelected={this.cameraSelected}/>
            </React.Fragment>
        )
    }

};

export default withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDquW_Bmru-uQ1e8PAj9ogpL8SC4BxSTgI'})(Region));
