import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Welcome from './Welcome'
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home'
import ViewRecord from './ViewRecord'
import './Main.css'

class Main extends Component {

  renderLinks = () => {
    return (
      <div className="links">          
          <Switch>          
            <Route exact path="/" component={Welcome} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/view-record" component={ViewRecord} />
          </Switch>
        </div>
    )
  }
  
  render() {
    return (
      <div className="main">
        {this.renderLinks()}
      </div>
    )
  }
}

export default Main;