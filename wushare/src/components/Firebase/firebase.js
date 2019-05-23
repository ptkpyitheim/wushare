import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

 const config = {
  apiKey: "AIzaSyDxYuaDueU1O95BVxDc8RL1YoleXqEFRkI",
  authDomain: "wushare-d1bdb.firebaseapp.com",
  databaseURL: "https://wushare-d1bdb.firebaseio.com",
  projectId: "wushare-d1bdb",
  storageBucket: "wushare-d1bdb.appspot.com",
  messagingSenderId: "270331277491"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  currentUser = () => this.auth.currentUser;

    // *** User API ***
    /*
    The paths in the ref() method match the location where your entities (users) will be stored in Firebase’s realtime database API. If you delete a user at “users/5”, the user with the identifier 5 will be removed from the database.
    */
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  rides = () => this.db.ref(`rides`);

}

export default Firebase;
