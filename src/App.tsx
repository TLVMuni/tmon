import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';

const App = (props:any) => {
    return <Switch>
        <Route path='/' component={Dashboard} />
    </Switch>
}

export default App;
