import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './login';

const App = () => {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
    </Switch>
  </BrowserRouter>
  )
};

export default App;
