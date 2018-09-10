import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RegionProps from './RegionRouterProps';
import { Map, GoogleApiWrapper } from "google-maps-react";

import * as regionsData from './regions.json';

interface RegionState {

}

class Region extends React.Component<RegionProps> {

    render() {

        const _center = regionsData.regions[this.props.match.params.regionId].center;
        const centerRegion = {
            lat: _center.lat,
            lng: _center.lon
          };

        return (

            <div>
                <div>{this.props.match.params.regionId}</div>
                <Map
                    google={this.props.google}
                    initialCenter={centerRegion}
                    zoom={16}>
                </Map>
            </div>
        )
    }

};

export default withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDquW_Bmru-uQ1e8PAj9ogpL8SC4BxSTgI'})(Region));