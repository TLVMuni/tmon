import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserInterface from './UserInterface';

import Dashboard from './Dashboard';

class App extends React.Component<UserInterface, {}> {

    render() {

        return <Switch>
            <Route exact path='/' component={Dashboard} />
        </Switch>
    }
}
//sd
export default App;