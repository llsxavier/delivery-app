import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import GetNewPass from './pages/GetPass';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/getNewPassword" component={GetNewPass} />
    </Switch>
  </BrowserRouter>
);

export default App;
