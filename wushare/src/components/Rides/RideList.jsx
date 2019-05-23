import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import firebase from 'firebase/app';
import 'firebase/database';
import EditForm from './EditForm';

//This class render all a list of rides fetched from the database.
//Will be call upon in Home and FetchRides. 

const initialState = {
    username: '',
    email: '',

    year: '',
    ride_type: '',
    from: '',
    to: '',
    leave_date: '',
    leave_time: '',
    amount: '',
    display: 'none',
};
class RideList extends Component {

    constructor(props) {
        super(props);

        this.database = firebase.database().ref().child('rides');

        this.state = {
            username: '',
            email: '',
            year: '',
            ride_type: '',
            from: '',
            to: '',
            leave_date: '',
            leave_time: '',
            amount: '',
            display: 'none'        }
    }


    componentWillMount() {
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    // alert(authUser.email);
                    this.props.firebase.users().on('value', snapshot => {
                        // const usersObject = snapshot.val();
                        snapshot.forEach(childNodes => {

                            if (authUser.email === childNodes.val().email) {
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
    //This return the style for Delete Button
    getDeleteButtonStyle = (rides) => {
        if (rides.username !== this.state.username) {
            return {
                display: 'none',
            }
        }

    }
    //Access Database to delete Rides
    deleteRides = (e) => {
        console.log(e.target.id);
        this.database.child(e.target.id).remove();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    editRidesToggle = (e) => {
        
        console.log(e.target.id);
        // var element = document.getElementById('div_form');
        // element.style.display = (element.style.display != 'none' ? 'none' : 'block');
        var updateForm = document.getElementById('update_form');
        updateForm.setAttribute('name', e.target.id);
        if(this.state.display === 'none') {
            this.setState({display: 'block'});
        }
        else {
            this.setState({display: 'none'});

        }
    }


    //This update the rides on Firebase
    updateRides = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        const from = this.state.from;
        const to = this.state.to;
        const leave_date = this.state.leave_date;
        const leave_time = this.state.leave_time;
        const amountUpdate = this.state.amount;

        this.database.child(e.target.name).update({
            from: from,
            to: to,
            leave_date: leave_date,
            leave_time: leave_time,
            amount: amountUpdate,
        });
        
        // var element = document.getElementById('div_form');
        // element.style.display = 'none';
        this.setState({display: 'none'});

    }


    render() {

        const rides = this.props.rides;
        
        return (
            <div>

                < div className="d-flex flex-row-reverse my-4 mx-2" id="fetch-rides-cards" >
                    {
                        rides.map(rides => (
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

                                <div style={this.getDeleteButtonStyle(rides)}>
                                    <button onClick={this.editRidesToggle} id={rides.rid} className="btn btn-sm btn-primary ">Edit</button>
                                    <button onClick={this.deleteRides} id={rides.rid} name='delButton' className="btn btn-sm btn-primary float-right">Delete</button>
                                </div>





                            </div>

                        ))
                    }

                </div>
                
                <div id='div_form'>
                    <form id="update_form" onSubmit={this.updateRides} className="text-center text-white" style={{ display: this.state.display }} >
                        From:<input className="mx-1" name="from" type="text" onChange={this.onChange} />
                        To: <input className="mx-1" name="to" type="text" onChange={this.onChange} />
                        Amount: <input className="mx-1" name="amount" type="text" onChange={this.onChange} />
                        Leave Date: <input className="mx-1" name="leave_date" type="text" onChange={this.onChange} />
                        At: <input className="mx-1" type="text" name="leave_time" onChange={this.onChange} />
                        <button className="btn btn-sm btn-primary">Update</button>
                    </form>
                </div>
            </div >
        );
    }
}

const RidesListExport = compose(
    withRouter,
    withFirebase,
)(RideList);


export default RidesListExport;