import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Header from './Header'
import axios from "axios"
import "./Login.css"

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      redirect: false,
    }
  }

  saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
  }

  componentDidUpdate = () => {
    //console.log(this.state)
  }

  getValidationStateEmail = () => {
    const email = this.state.email;

    if (email.length === 0) { return null; }
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(email).toLowerCase())) {
      return "success";
    }
    return "error"; 
  }

  getValidationStatePassword = () => {
    const length = this.state.password.length;
    if (length > 8) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const _this = this;

    let payload = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
    });

    fetch("https://passkeep.herokuapp.com/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      response.json().then(json => {
        if (json.status == "OK") {
          console.log(json)
          _this.saveToLocalStorage("token", json.token);
          _this.saveToLocalStorage("id", json.userId);
          _this.saveToLocalStorage("email", json.email);

          _this.setState({
            redirect: true,
          })
        } else {
          alert(json.message)
        }
      });
    })
  }

  renderLoginForm = () => {
    return (
      <div className="formm">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large" validationState={this.getValidationStateEmail()}>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              value={this.state.email}
              placeholder="Username"
              onChange={this.handleChangeEmail}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large" validationState={this.getValidationStatePassword()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChangePassword}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }

  renderRedirect = () => {
    if (this.state.redirect) { return (<Redirect to="/home" />) }
  }

  render() {
    return (
      <div className="login">
        <Header />
        <div className="heading">
          <strong><h1>Login</h1></strong>
        </div>
        <div className="form">
          {this.renderLoginForm()}
        </div>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default Login;