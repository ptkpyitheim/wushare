//Change with different folders

import React from 'react';

import { withFirebase } from '../Firebase';


const SignOutButton = ({ firebase }) => (

  <button class="btn btn-info btn-sm" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
