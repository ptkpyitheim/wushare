import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

class SearchRidesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rides: [],
            query: ''
        };
    }

    onChange = event => {
        this.setState({ query: event.target.value });
    }
    findRides = event => {
        event.preventDefault();
        const ride_query = this.state.query;
        this.setState({ loading: true });

        this.props.firebase.rides().on('value', snapshot => {
            const ridesObject = snapshot.val();

            const ridesList = Object.keys(ridesObject).map(key => ({
                ...ridesObject[key],
                rid: key,
            }));
            //////////////////
            var foundRide = false;
            const tempState = [];
            for (var i = 0; i < ridesList.length; i++) {

                if (ridesList[i].to === ride_query) {

                    tempState.push(ridesList[i]);

                    foundRide = true;
                }

            }

            if (foundRide === false) {
                alert('no ride found');
            }
            // ////////////////////////////////
            this.setState({
                rides: tempState,
                loading: false,
            });


        });
    };

    render() {
        const { loading, rides } = this.state;
        return (
            <div>
                <form className="text-center" onSubmit={this.findRides}>
                    <input name="query" value={this.state.query} type="text" onChange={this.onChange} placeholder="Heading to?" />
                    <button className="btn btn-sm btn-primary ml-2" type='submit'>Find Rides</button>
                </form>

                <RidesList rides={rides} />
            </div>

        );
    }
}

const RidesList = ({ rides }) => (
    <div className="d-flex flex-row my-4 mx-2" id="fetch-rides-cards">
        {rides.map(rides => (
            <div className="card text-dark ml-1">
                <div class="card-header">
                    <span className="type-of-ride h5 text-secondary">{rides.ride_type} </span>
                </div>

                <div className="card-body">
                    <h5 className="card-title text-info">
                        <span className="name-on-card">{rides.username}</span>
                        <span className="float-right">Year: {rides.year}</span>
                    </h5>
                    <p className="card-text">
                        <span className="dest-from h6">{rides.from}</span>
                        <span className="dest-to h6 float-right">{rides.to}</span>
                    </p>

                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="">

                            <span className="leaving-on">{rides.leave_date}</span>
                            <span className="time-leaving-on float-right">{rides.leave_time}</span>
                        </div>

                    </li>

                    <li className="list-group-item">Amount:
                    <span className="pay-amount ml-2">{rides.amount}</span>
                    </li>
                </ul>
                <div className="card-body">
                    <a href="#" className="">More Info</a>
                    <button className="btn btn-sm btn-primary float-right">Contact Me</button>
                </div>
            </div>
        ))}
    </div>
);



const SearchRide = compose(
    withRouter, withFirebase)(SearchRidesForm)

export { SearchRide };