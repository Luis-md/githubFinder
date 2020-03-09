import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

    searchUsersHandler = async (text) => {
      this.setState({ loading: true })
      
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.REACT_APP_GITHUB_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`)
      
      this.setState({ users: res.data.items, loading: false })
    }

    getUserHandler = async (username) => {
        this.setState({ loading: true })
        const res = await axios.get(`https://api.github.com/users/${username}?client_id${process.env.REACT_APP_GITHUB_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`)
        this.setState({
          user: res.data,
          loading: false
         })
    }

    clearUsersHandler = () => {
      this.setState({ users: [], loading: false })
    }

    setAlertHandler = (msg, type) => {
      this.setState({
        alert: { msg, type }
      })
      setTimeout(() => {
        this.setState({
          alert: null
        })
      }, 5000)
    }

  render () {
    const { users, user, loading } = this.state
    return (
      <Router>
    <div className="App">
      <Navbar />
      <div className='container'>
        <Alert alert={this.state.alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
                searchUsers={this.searchUsersHandler} 
                clearUsers={this.clearUsersHandler}
                showClear={users.length > 0 ? true : false}
                setAlert={this.setAlertHandler}/>
              <Users loading={loading} users={users}/>
            </Fragment>
          )} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={ props => (
            <User {...props} getUser={this.getUserHandler} user={user} loading={loading} />
          )}/>
        </Switch>
      </div>
     </div>
     </Router>
    )
  }
}

export default App;
