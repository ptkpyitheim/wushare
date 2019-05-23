//Change with different folders

import React from 'react';
import carpic from '../../images/car.png';
import { SearchRide } from '../SearchRides'


//Landing page is available to the public. Contains seraching rides.

const Landing = () => (
  <div className="mt-5">
    <div id="landing-header">
      <div id="landing-text">
        <div className="p-3 text-white" id="wushare">
          <CarPic />
          <span><h1>WUSHARE</h1></span>
          <p> Travelling? Car pool with your WashU friends.</p>
        </div>

      </div>
    </div>


    <div className="py-3 text-white" id="join-us-container">

      <div>

        <SearchRide />
      </div>

      <div className="text-center p-3">
        <h2>Join Us!</h2>
        <p className="h5"><span id="exclusive">Exclusive </span>carpooling app for Washington University in St. Louis</p>
      </div>

      <div className="container my-4">
        <div className="row">

          <div className="col mb-1">
            {/* Bootstrap card */}

            <div className="card text-dark">
              <div class="card-header">
                <span className="type-of-ride h5 text-secondary">Request </span>
              </div>

              <div className="card-body">
                <h5 className="card-title text-info">
                  <span className="name-on-card">Pyi Theim Kyaw</span>
                  <span className="float-right">Year: Junior</span>
                </h5>
                <p className="card-text">
                  <span className="dest-from h6">St.Louis</span>
                  <span className="dest-to h6 float-right">Chicago</span>
                </p>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="">

                    <span className="leaving-on">April 26th 2019</span>
                    <span className="time-leaving-on float-right">5 pm</span>
                  </div>

                </li>

                <li className="list-group-item">Amount:
                    <span className="pay-amount ml-2">30</span>
                </li>
              </ul>
              <div className="card-body">
                <a href="#" className="">More Info</a>
                <button className="btn btn-sm btn-primary float-right">Contact Me</button>
              </div>
            </div>
          </div>



          <div className="col d-none d-lg-block">
            {/* Bootstrap card */}
            <div className="card text-dark">
              <div class="card-header">
                <span className="type-of-ride h5 text-secondary">Offer </span>
              </div>

              <div className="card-body">
                <h5 className="card-title text-info">
                  <span className="name-on-card">Minh Vu</span>
                  <span className="float-right">Year: Senior</span>
                </h5>
                <p className="card-text">
                  <span className="dest-from h6">St.Louis</span>
                  <span className="dest-to h6 float-right">New York</span>
                </p>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="">

                    <span className="leaving-on">April 21th 2019</span>
                    <span className="time-leaving-on float-right">5 pm</span>
                  </div>
                </li>

                <li className="list-group-item">Amount:
                    <span className="pay-amount ml-2">120</span>
                </li>
              </ul>
              <div className="card-body">
                <a href="#" className="">More Info</a>
                <button className="btn btn-sm btn-primary float-right">Contact Me</button>
              </div>
            </div>
          </div>




          <div className="col">
            {/* Bootstrap card */}
            <div className="card text-dark">
              <div class="card-header">
                <span className="type-of-ride h5 text-secondary">Offer </span>
              </div>

              <div className="card-body">
                <h5 className="card-title text-info">
                  <span className="name-on-card">John Doe</span>
                  <span className="float-right">Year: Freshman</span>
                </h5>
                <p className="card-text">
                  <span className="dest-from h6">Indianapolis</span>
                  <span className="dest-to h6 float-right">St.Louis</span>
                </p>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="">

                    <span className="leaving-on">May 25th 2019</span>
                    <span className="time-leaving-on float-right">9 am</span>
                  </div>
                </li>

                <li className="list-group-item">Amount:
                    <span className="pay-amount ml-2">200</span>
                </li>
              </ul>
              <div className="card-body">
                <a href="#" className="">More Info</a>
                <button className="btn btn-sm btn-primary float-right">Contact Me</button>
              </div>
            </div>
          </div>


        </div>

      </div>

    </div>

    <div id="simple-container">

      <div className="text-center p-3">
        <h2 className="border-bottom my-3 pb-2 text-dark">So simple to use!</h2>
        <p className="h5 text-success">Offer a ride | Earn some money.</p>
        <p className="h5 text-primary">Request a ride | Make friends | Pay less.</p>
      </div>

      <div className="container mb-3 align-content-center" id="download-container">
        <div className="row">
          <div className="col text-center">
            <h1 className="text-white">Download our iOS App!</h1>
          </div>
          <div className="col text-center">
            <button className="btn btn-lg btn-outline-light">DOWNLOAD</button>
          </div>
        </div>
      </div>

    </div>


  </div>
);

const CarPic = () => (
  <img id="carimg" src={carpic} alt="carpicture"></img>
);


export default Landing;