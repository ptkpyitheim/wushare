

import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import RideList from '../Rides/RideList';


//FetchRides class fetch all the current rides

class FetchRidesBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rides: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        //Get all the current rides posted by all users
        this.props.firebase.rides().on('value', snapshot => {
            const ridesObject = snapshot.val();
            console.log(ridesObject);
            const ridesList = Object.keys(ridesObject).map(key => ({
                ...ridesObject[key],
                rid: key,
            }));


            this.setState({
                rides: ridesList,
                loading: false,
            });
        });

    }

    //To prevent memory leaks
    componentWillUnmount() {
        this.props.firebase.rides().off();
    }


    render() {
        const { loading, rides } = this.state;

        return (
            <div className="py-2" id="fetch-rides-container">
                <div className="text-center my-3 pt-3 text-white">
                    <h3>____ Rides Feed ____</h3>
                </div>
                {loading && <div>Loading ... </div>}
                <RideList rides={rides} />

            </div>

        );
    }
}


//Use React compose for higher order components
const FetchRides = compose(
    withRouter,
    withFirebase,
)(FetchRidesBase);


export { FetchRides }