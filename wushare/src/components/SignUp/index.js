
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div id="sign-up-container">
    <h1>SignUp </h1>
    <SignUpForm />

  </div>
);

//initializing state of the component to capture user info (username, email, password)
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '', //for password confirmation
  error: null, //error state capture
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    // The state is initialized by an object destructuring. This way, we can use the initial state object to reset the state after a successful sign up.
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const {username, email, passwordOne} = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne) //Calling sign up function from firebase
      .then(authUser => {
        this.setState({ ...INITIAL_STATE});
        //Create a user in my Firebase realtime database
        return this.props.firebase 
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        //If request goes through, set local state of component to its initial state. Empties the inputs basically.
        this.setState({ ...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
        alert("Successfully signed up");

      })
      .catch (error => {
        this.setState({ error });
      });

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //If user info are valid
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' || 
      !(/@wustl.edu\s*$/.test(email)) || //also needs to check for wustl.edu using regex
      username === '';

    return (
      <form onSubmit = { this.onSubmit }>
        <div className="mt-2">
          <span className="float-left"> Full name </span>
          <input  className="form-control"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="mt-2">
          <span className="float-left"> Email: </span>
          <input  className="form-control"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="@wustl.edu"
          />
        </div>
        <div className="mt-2">
          <span className="float-left"> Password: </span>
          <input  className="form-control"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="mt-2">
          <span className="float-left"> Retype password: </span>
          <input className="form-control"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>


        <button className="mt-4 btn btn-success" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {/* Firebase has .message property by default */}
        {error && <p>{error.message}</p>}
      
      </form>
    );
  }

}

const SignUpLink =  () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
