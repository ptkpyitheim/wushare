//Change with different folders

import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne:'',
  passwordTwo:'',
  error:null,
}

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();

    const { passwordOne } = this.state;

    this.props.firebase 
      .doPasswordUpdate(passwordOne)
      .then( () => {
        this.setState( {...INITIAL_STATE});
        alert("Your password was reset! Log in again.");
        this.props.firebase.doSignOut();
      })
      .catch(error => {
        this.setState({ error });
      });


  };

  onChange = event => {
    this.setState( {[event.target.name]: event.target.value});
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === ''
  

    return (
      <form onSubmit= { this.onSubmit }>

        <p> Reset your password: </p>

        <div className="mt-2">
          <input className="px-2"
            name="passwordOne"
            value={passwordOne}
            onChange = {this.onChange}
            type="password"
            placeholder="New Password"
          />
        </div>

        <div className="mt-2">

          <input className="px-2"
            name="passwordTwo"
            value={passwordTwo}
            onChange = {this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
        </div>

        <button className="mt-2 btn btn-sm btn-secondary" disable={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}

      </form>

    );
  }
}

export default withFirebase(PasswordChangeFormBase);

