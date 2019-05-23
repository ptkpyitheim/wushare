
import React from 'react';

import { withAuthorization } from '../Session';
import { RidesForm } from '../Rides';
import { FetchRides } from '../FetchRides';

const HomePage = () => (
  <div className="mt-5">
    <div id="home-header">
      <div id="home-text">
        <div className="p-3 text-white" id="home-text-container">
          <span><h1>Home</h1></span>
          <h4> See rides and manage rides below. </h4>
        </div>

      </div>
    </div>

    <div className="py-3">
      <RidesForm />
    </div>

    <div className="py-3">
      <FetchRides />
    </div>


  </div>
);

const condition = authUser => {
  return authUser !== null;
};

export default withAuthorization(condition)(HomePage);
