
##Creative Project CSE503

### Creative Portion Description

**Password Reset**

- Click on the link 'Forget Password?' and user can reset their password.

- User doesn't need to be logged in

- To ensure privacy and authenticity, Firebase will send a link to the user's email to reset the password. 

**Password Change and Password Reset**

- Only logged in users can change their password, which the form is under the 'Account' page. 

- The password forget uses a form to submit the information (email address) needed by the Firebase authentication API to reset the password.  

- A class method (onSubmit) ensures the information is send to the API. It also resets the form’s input field on a successful request, and shows an error on an erroneous request.

- The form is validated before it is submitted as well. 

- The file implements a password forget link as a component which isn’t used directly in the form component.

**Protected Routes with Authorization**

- Unauthorized users (users not signed in) cannot change the URL of the page and get access to sensitive data of a user.

- We used React Routers, higher-order-components, and React Context API to route to different pages such as home, signIn, signUp, etc.

Implementation:

- Check for a condition in a file called withAuthorization.js and withAuthentication.js. If there is NO authorized user currently in session, whenever you try to changed the URL of the page, it will always take you back to Sign In page.


### Sources
https://reactjs.org/
https://stackoverflow.com/questions/38768576/in-firebase-when-using-push-how-do-i-get-the-unique-id-and-store-in-my-databas
https://stackoverflow.com/questions/45038040/how-to-iterate-over-firebase-data-object-to-list
https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-realtime-database



=======================================================================



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
