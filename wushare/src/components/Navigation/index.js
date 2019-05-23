import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import carpic from '../../images/car.png';

import { AuthUserContext } from '../Session';

// const Navigation = ({ authUser }) => (
//   <div> 
//     {authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
//   </div>
// );

/*
The authUser doesn’t need to be passed to the Navigation component anymore. Instead, the Navigation component uses the new context to consume the authenticated user:
*/

const Car = () => (
  <img className="mr-2" id="carimg-nav" src={carpic} alt="carpicture"></img>
);

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (

  // Bootstrap
  <nav className="bg-dark fixed-top">
    {/* <a class="navbar-brand" href="#">WuShare</a> */}
    <div className="container">
      <div className="row pt-2 pb-1">
        <div className="col-2">
          <Car/>
          <Link className="navbar-brand align-self-center" to={ROUTES.LANDING}>WuShare</Link>
        </div>

        <div className="col align-self-center">
          <Link className="nav-item text-white" to={ROUTES.HOME}>Home</Link>
        </div>
      
        <div className="col align-self-center text-right">
          <Link className="mr-4 nav-item text-white" to={ROUTES.ADMIN}>Admin</Link>

          <Link className="mr-4 nav-item text-white" to={ROUTES.ACCOUNT}>Account</Link>
          <SignOutButton />
        </div>
        
       
      </div>
    </div>
  </nav>

);

const NavigationNonAuth = () => (

    // Bootstrap
    <nav className="bg-dark fixed-top">
    {/* <a class="navbar-brand" href="#">WuShare</a> */}
    <div className="container">
      <div className="row pt-2 pb-1">
        <div className="col align-self-center">
          <Car/>
          <Link className="navbar-brand" to={ROUTES.LANDING}>WuShare</Link>
        </div>
      
        <div className="col text-right align-self-center">
          <Link className="mr-4 navbar-brand text-white" to={ROUTES.SIGN_IN}>Sign In</Link>
        </div>
       
      </div>
    </div>
  </nav>
  // <ul>
  //   <li>
  //     <Link to={ROUTES.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  //   </li>
  // </ul>
);

export default Navigation;