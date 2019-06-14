import React from 'react';
import axios from 'axios';
import requiresAuth from './requiresAuth.js'

class Users extends React.Component {
    state = {
        users:[]
    }

    componentDidMount() {
        const endpoint = '/users'; // the full URL doesnt need to be here because its in the axios defaults basurl 
      
        axios
            .get(endpoint) // no more requestConfig, it autimatically comes with axios interceptor in requiresAuth
            .then(res => {
                this.setState({ users: res.data.users })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <>
                <h2>User List</h2>
                <ul>
                    {this.state.users.map(u => (
                        <li key={u.id}>Name: {u.username} - Dpt: {u.department}</li>
                    ))}
                </ul>

            </>
        )
    }

}

export default requiresAuth(Users); // this function is what is actually being rendered from this component

