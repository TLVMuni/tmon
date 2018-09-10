
import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

class Sidebar extends React.Component {

    state = {
        sideBarOpen: true
    }

    constructor(props) {
        super(props);

        this.onSetSidedabarOpen = this.onSetSidedabarOpen.bind(this);
    }

    onSetSidedabarOpen(open) {
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        })
    }

    render() {
        return (
            <nav id='sidebar'>
                <div className='sidebar-header'>
                    <h3>TLV Traffic Monitor</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to='/region/1'>Region1</Link>
                    </li>
                    <li>
                        <Link to='/region/2'>Region2</Link>
                    </li>                    
                </ul>
            </nav>
        )
    }
};

export default Sidebar;
