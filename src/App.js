import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
  
import GithubState from '../src/context/github/GithubState'

import './App.css';

const App = () => {

  const [alert, setAlert] = useState(null)

    const setAlertHandler = (msg, type) => {
      setAlert({ msg, type })
      
      setTimeout(() => {
       setAlert(null)
      }, 5000)
    };
    return (
      <GithubState>
      <Router>
     <div className="App">
      <Navbar />
      <div className='container'>
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
              setAlert={setAlertHandler}/>
            <Users />
          </Fragment>
        )} />
        <Route exact path='/about' component={About} />
        <Route exact path='/user/:login' component={ User }/>
        )}/>
      </Switch>
    </div>
    </div>
    </Router>
    </GithubState>
  )
}

export default App;
