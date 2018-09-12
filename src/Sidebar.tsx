
import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as classNames from 'classnames';
import * as regionsData from './regions.json';

interface SidebarState {
    activeRegionId: number
}

class Sidebar extends React.Component<{}, SidebarState> {

    state = {
        activeRegionId: 0
    }

    constructor(props: {}) {

        super(props);

        const isRegionPath = this.props.location.pathname.includes('region');
        if( isRegionPath ) {
            const tokens = this.props.location.pathname.split('/');
            this.state.activeRegionId = parseInt(tokens[2], 10);
        }

        this.regionClicked = this.regionClicked.bind(this);
    }

    regionClicked = (regionId: number) => {

        this.setState({
            activeRegionId: regionId
        });

    }

    render() {

        const self = this;

        const regionLinks = regionsData.regions.map( (region: IRegion, index: number) => {
            
            const to = `/region/${region.id}`;
            const listItemClassNames = classNames({
                'active': region.id === self.state.activeRegionId
            });

            return <li key={index} className={listItemClassNames} 
                       onClick={ () => self.regionClicked(region.id)}>
                <Link to={to}>Region {region.id}</Link>
            </li>
        });


        const homeItemClassName = classNames({
            'active': this.state.activeRegionId === 0
        })

        return (
            <nav id='sidebar'>
                <div className='sidebar-header'>
                    <h3>TLV Traffic Monitor</h3>
                </div>
                <ul className="list-unstyled components">
                    <li className={homeItemClassName} onClick={ () => self.regionClicked(0) }>
                        <Link to="/home">Home</Link>
                    </li>
                    {regionLinks}                 
                </ul>
            </nav>
        );
    };
};

export default withRouter(Sidebar);
