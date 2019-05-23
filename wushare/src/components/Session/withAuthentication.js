
// For separtion of concerns, use higher-order component

import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class withAuthentication extends React.Component {
        constructor(props) {
            super(props);
        
            this.state = {
                authUser: null,
            };
            }
        
        
            /*
            onAuthStateChanged() receives a function as parameter that has access to the authenticated user. Also, the passed function is called every time something changes for the authenticated user. It is called when a user signs up, signs in, and signs out. If a user signs out, the authUser object becomes null, so the authUser property in the local state is set to null and all components depending on it adjust their behavior (e.g. display different options like the Navigation component).
            */
        
            componentDidMount() {
            //FIrebase offers a listener function to get the authenticated user from Firebase.
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
            })
            }
        
            componentWillUnmount() {
            this.listener();
            }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                  <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(withAuthentication);
};

export default withAuthentication;