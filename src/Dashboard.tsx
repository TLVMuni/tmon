import * as React from 'react';
import Sidebar from './Sidebar';

class Dashboard extends React.Component {
    render() {
        return <div className='wrapper'>
            <Sidebar {...this.props}/>
            Dashboard
        </div>
    }
}

export default Dashboard;
