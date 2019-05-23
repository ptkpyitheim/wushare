
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import '../../index.css';

const PasswordForgetPage = () => (
  <div id="pw-forget-container">
    <h3>Password Forget</h3>
    
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email:'',
  error:null,
};

class PasswordForgetFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();

    const { email } = this.state;

    this.props.firebase 
      .doPasswordReset(email)
      .then( () => {
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState({email:'', error:error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email,error} = this.state;

    const isInvalid = email === '' || !(/@wustl.edu\s*$/.test(email));

    return (
      <form onSubmit = {this.onSubmit}>
        <div className="mt-3">
          <input className="px-2"
            name = "email"
            value = {this.state.email}
            onChange = {this.onChange}
            type = "text"
            placeholder="Email Address"
          />
        </div>
        <button className="mt-3 btn btn-sm btn-primary" disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error ? <p className="mt-3">{error.message}</p> : <p className="mt-3">You should receive an email to reset your password.</p>}
      </form>
    );
  }

}

const PasswordForgetLink = () => (
  <p className="mt-4">
    <Link to={ROUTES.PASSWORD_FORGET}> Forgot Password? </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };