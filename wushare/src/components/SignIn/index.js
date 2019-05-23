import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const SignInPage = () => (
  <div id="sign-in-container">
    <h1>Sign In</h1>
    <p> You must sign in with your wustl email </p>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error:null,
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }


  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    //Call firebase to sign in the user with authentication
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
        console.log("Logged in!");
      })
      .catch(error => {
        this.setState({email:'', password:'', error: error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {email, password, error } = this.state;

    //Email needs to be wustl email.
    const isInvalid = password === '' || email === '' || !(/@wustl.edu\s*$/.test(email));

    return (
      <form className="w-50" onSubmit={this.onSubmit}>
        <div className="my-2">
          <input className="text-center form-control"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="my-2">
          <input className="text-center form-control"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="btn btn-primary btn-sm my-2" disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  } 
}

const SignInForm = compose (
  withRouter,
  withFirebase,
) (SignInFormBase);

export default SignInPage;
export { SignInForm };
