// higher order component, its why its filename starts with lower case
// this is to centralize the authorization of the user with a token
// this is not security, thats on the server. 

import React from 'react';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000/api';
// Axios interceptor. Theyre like middleware for axios. This is to centralize the 
// requestConfig header (originally in the Users.js CDM function, commented out instead of deleted)
axios.interceptors.request.use(
    function(requestConfig) { // this is doing what requestConfig was doing in Users
        requestConfig.headers.authorization = localStorage.getItem('jwt');

        return requestConfig
    },
    function(error) {
        return Promise.reject(error)
    }
);

export default function(Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('jwt')
            const notLoggedIn = <h3>Please login to see the users guy</h3>

            return <> { token ? <Component {...this.props} /> : notLoggedIn} </>
        }
    }
}

