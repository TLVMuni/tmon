import * as React from 'react';
import { withRouter } from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import { Card, CardBody, CardFooter, 
        Row, Col } from 'reactstrap';
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

    static getDerivedStateFromProps(props: RegionProps, state: RegionState) {
        console.log('GDSFP');           

        const regionId = parseInt(props.match.params.regionId, 10);

        if( state.regionId != regionId) {

            let _selectedPlace = state.selectedPlace;
            let _region= regionsData.regions.find( (region: IRegion) => {
                return region.id === regionId;
            });
            _selectedPlace.cameraId = _region.cameras[0].id;
            return {
                selectedPlace: _selectedPlace,
                regionId: parseInt(props.match.params.regionId, 10)
            };

        } else {
            return null;
        }

    }

    componentDidUpdate(prevProps: RegionProps, prevState: RegionState) {
        // Get external data here
        console.log('CDU');
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

        var data = {
            labels: ['Su', 'Mo', 'Tu'],
            series: [
              [100, 204, 406]
            ]
          };

        var pieData = {
            labels: ['Su', 'Mo', 'Tu'],
            series: [{
                value: 20,
              }, {
                value: 10,
              }, {
                value: 70,
              }]
        };

        const options = {
            high: 500,
            low: 0,
            // axisX: {
            //     labelInterpolationFnc: function(value, index) {
            //       return index % 2 === 0 ? value : null;
            //     }
            //   }
        };

        const pieChartOptions = {
            labelDirection: 'explode'
        }

        const typeBar = 'Bar';

        return (

            <React.Fragment>
                <Row style={
                    {
                        width: '80%',
                        height: '300px',
                        position: 'absolute',
                        left: '20%',
                        zIndex: 99
                    }
                }>
                    <Col md='4'>
                        <Card>
                            <CardBody>
                                <ChartistGraph className='ct-octave ct-chart-1' 
                                               data={data} 
                                               options={options} 
                                               type={'Line'} />
                            </CardBody>
                            <CardFooter>
                                Week's days distribution
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md='4'>
                        <Card>
                            <CardBody>
                                <ChartistGraph className='ct-octave ct-chart-2' 
                                                data={data} 
                                                options={options} 
                                                type={'Bar'} />
                            </CardBody>
                            <CardFooter>
                                ssss
                            </CardFooter>                            
                        </Card>
                    </Col>
                    <Col md='4'>
                        <Card>
                            <CardBody>
                                <ChartistGraph className='ct-octave ct-chart-3' 
                                                data={pieData} 
                                                options={pieChartOptions}
                                                type={'Pie'} />
                            </CardBody>
                            <CardFooter>
                                ssss
                            </CardFooter>                            
                        </Card>
                    </Col>
                </Row>
                <Map google={this.props.google}
                    style={{width: '100%', 
                            height: '100%', 
                            position: 'relative',
                            top: '20%'
                        }}
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
