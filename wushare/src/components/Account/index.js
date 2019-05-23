
import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

import '../../index.css';

//In account page, user can reset their passwords

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="container mt-5 text-center py-4">
        <h1>My Account </h1>
        <h3>Username: {authUser.currentUser}</h3>
        <h3>Email: {authUser.email}</h3>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => authUser !== null;

export default withAuthorization(condition)(AccountPage);
