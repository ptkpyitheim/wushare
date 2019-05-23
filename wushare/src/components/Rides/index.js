
import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

// This is call upon in Home
// This class manage posting rides to database. 
//User can type in year, ride type, from, to, dates and amount to be posted to database.
//

const INITIAL_STATE = {
    username: '',
    email: '',
    year: '',
    ride_type: '',
    from: '',
    to: '',
    leave_date: '',
    leave_time: '',
    amount: ''
}


class RidesFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        console.log('here', this.props);
    }
    //Check for session user to see if the user is correct. 
    isValidUser = (userEmail) => {
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    alert(authUser.email);

                    return authUser.email;
                }
            }
        )
    }

    componentWillMount() {
        // this.props.firebase.auth.onAuthStateChanged(user => this.setState({ username: user }));
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    // alert(authUser.email);
                    this.props.firebase.users().on('value', snapshot => {
                        // const usersObject = snapshot.val();
                        snapshot.forEach(childNodes => {

                            if (authUser.email === childNodes.val().email) {
                                // console.log('here');
                                // console.log(childNodes.val().username);
                                this.setState({
                                    username: childNodes.val().username,
                                    email: childNodes.val().email
                                });
                            }
                            //This loop iterates over children of users
                            //childNodes.key is key of the children of userid 
                            //childNodes.val().username;
                            //childNodes.val().email;
                        });
                    });
                }
            }
        );
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }


    onSubmit = event => {
        event.preventDefault();

        const { username, email, year, ride_type, from, to, leave_date, leave_time, amount } = this.state;
        // Add the follow information to firebase according to user
        this.props.firebase.rides().push({
            username: username,
            email: email,
            from: from,
            to: to,
            leave_date: leave_date,
            leave_time: leave_time,
            amount: amount,
            ride_type: ride_type,
            year: year,
        });

        alert("Posted successfully");
        this.setState({

            ride_type: '',
            from: '',
            to: '',
            leave_date: '',
            leave_time: '',
            amount: ''
        });
        console.log(this.state);
    }

    //update the state according to the user input
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeSelect = e => {
        this.setState({ ride_type: e.target.value })
    }

    handleChangeSelectYear = e => {
        this.setState({ year: e.target.value })
    }

    render() {
        const { ride_type, from, to, leave_date, leave_time, amount } = this.state;

        //If user info are valid
        const isInvalid =
            from === '' ||
            to === '' ||
            leave_date === '' ||
            leave_time === '' ||
            amount === ''

        return (
            <form onSubmit={this.onSubmit}>
                <h4 className="text-center border-bottom pb-2"> Post a ride </h4>
                <div className="d-md-flex d-lg-flex justify-content-center" id="ride-form">
                    <div className="mt-2 ml-2">
                        <p>Choose a ride type: </p>
                        <select className="form-control" defaultValue={this.state.ride_type} onChange={this.handleChangeSelect} name="ride_type">
                            <option value="request">Request</option>
                            <option value="offer">Offer</option>
                        </select>
                    </div>
                    <div className="mt-2 ml-2">
                        <p>Year </p>
                        <select className="form-control" defaultValue={this.state.year} onChange={this.handleChangeSelectYear} name="ride_type">
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div className="mt-2 ml-2">
                        <div>
                            <p>Leave from: </p>
                            <input className="form-control"
                                name="from"
                                value={from}
                                onChange={this.onChange}
                                type="text"
                                placeholder="St.Louis"
                            />
                        </div>

                    </div>
                    <div className="mt-2 ml-2">
                        <div>
                            <p>Going to: </p>
                            <input className="form-control"
                                name="to"
                                value={to}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Chicago"
                            />
                        </div>

                    </div>
                    <div className="mt-2 ml-2">
                        <div className="">
                            <p>Date leaving: </p>
                            <input className="form-control"
                                name="leave_date"
                                value={leave_date}
                                onChange={this.onChange}
                                type="text"
                                placeholder="April 26 2019"
                            />
                        </div>
                        <div className="mt-1">
                            <p>Time leaving: </p>
                            <input className="form-control"
                                name="leave_time"
                                value={leave_time}
                                onChange={this.onChange}
                                type="text"
                                placeholder="05:00 pm"
                            />
                        </div>
                    </div>
                    <div className="mt-2 ml-2">
                        <p> Pay ($)</p>
                        <input className="form-control"
                            name="amount"
                            value={amount}
                            onChange={this.onChange}
                            type="number"
                            min="0.01"
                            step="0.01"
                            max="2500"
                            placeholder=""
                        />
                    </div>
                    <div className="mt-2 ml-4 d-flex align-items-center">
                        <button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={isInvalid}
                        >
                            Post</button>
                    </div>
                </div>
            </form>
        );
    }

}


const RidesForm = compose(
    withRouter,
    withFirebase,
)(RidesFormBase);


export { RidesForm };

