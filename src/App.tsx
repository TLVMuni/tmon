import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserInterface from './UserInterface';

import Dashboard from './Dashboard';

class App extends React.Component<UserInterface, any> {

    render() {

        return <Switch>
            <Route exact path='/' component={Dashboard} />
        </Switch>
    }
}

export default App;
