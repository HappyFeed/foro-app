import './App.css';
import ForumPage from "./pages/ForumPage/ForumPage"
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import React from 'react';

import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';

import { AuthProvider } from './context/AuthContext.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';



function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={ForumPage} />
            
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
