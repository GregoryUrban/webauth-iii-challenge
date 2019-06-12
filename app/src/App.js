import React from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import Users from './components/users.js';
// import ErrorBoundary from './components/errorBoundary.js'
import Register from './components/Register.js'
import Login from './components/Login.js';


class App extends React.Component {
constructor() {
  super()
  this.state = {
    users: []
  }
}


componentDidMount(){
  this.getUsers();
}
getUsers = () => {
    axios
    .get('http://localhost:5000/api/users')
    .then(res => this.setState({ users: res.data }))
    .catch(err => console.log(err,{message: err}));
}
deleteUser = id => {
  axios.delete(`http://localhost:5000/api/users/${id}`)
    .then(res => this.setState({ users: res.data }))
    .catch(err => console.log(err));
}
updateUser = (id, info) => {
  axios.put(`http://localhost:5000/api/users/${id}`, info)
    .then(res => this.setState({ users: res.data }))
    .catch(err => console.log(err));
}
render() {
  return (
    <div className="App">
    

         <li>
            <NavLink exact to="/login" >
              Login
            </NavLink>
          </li>

      <Route 
        exact path="/"
        render={props => 
            <Users 
              {...props} 
              users={this.state.users} 
              deleteUser={this.deleteUser} 
              updateUser={this.updateUser}
              />
        }
        />
  <Route path="/register"
    render={props => 
    <Register {...props} getUsers={this.getUsers} />
    }
    />
  
  <Route exact path='/login' component={Login}/>

    </div>
  );
}
}

export default App;
