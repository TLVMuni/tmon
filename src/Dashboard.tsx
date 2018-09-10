import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from './Home';
import Region from './Region';

class Dashboard extends React.Component {
    render() {
        return <div className='wrapper'>
            <Sidebar {...this.props}/>
            <div className="main-panel" ref="mainPanel">
                <Header {...this.props}/>
                <Switch>
                    <Route exact path='/home' render={ () => <Home />} />
                    <Route path={this.props.match.path + 'region/:regionId'} component={Region} />
                </Switch>
            </div>
        </div>
    }
}

export default Dashboard;
