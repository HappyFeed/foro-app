import './App.css';
import ForumPage from "./pages/ForumPage/ForumPage"
import { AppContextWrapper } from "./context/AppContext";
import PrimarySearchAppBar from './components/BarComponent/PrimarySearchAppBar';

import React from 'react';

import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';

import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';



function App() {
  return ( 

      <AppContextWrapper>
      
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={ForumPage} />
            
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </AuthProvider>
      </Router>
    
      </AppContextWrapper>
  )
}

export default App;
