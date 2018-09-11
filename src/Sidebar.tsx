
import * as React from 'react';
import { Link } from 'react-router-dom';
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
        this.regionClicked = this.regionClicked.bind(this);
    }

    regionClicked = (regionId: number) => {

        this.setState({
            activeRegionId: regionId
        });

    }

    render() {

        regionsData.regions.map( region => {
            const to = `/region/${region.id}`;
            return <li>
                <Link to={to}>Region{region.id}</Link>
            </li>
        })

        return (
            <nav id='sidebar'>
                <div className='sidebar-header'>
                    <h3>TLV Traffic Monitor</h3>
                </div>
                <ul className="list-unstyled components">
                    <li className='active'>
                        <Link to="/home">Home</Link>
                    </li>

                    <li onClick={ () => this.regionClicked(1) }>
                        <Link to='/region/1'>Region1</Link>
                    </li>
                    <li onClick={ () => this.regionClicked(2) }>
                        <Link to='/region/2'>Region2</Link>
                    </li>                    
                </ul>
            </nav>
        )
    }
};

export default Sidebar;
