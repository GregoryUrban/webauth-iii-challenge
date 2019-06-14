import React from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';

import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js'
import Users from './components/users.js';

function App(props) {
  function logout() {
    localStorage.removeItem('jwt');
    props.history.push('/login')
  }
  return (
    <>
      <header>
       <NavLink to='/login'>Login</NavLink>
       <NavLink to='/users'>Users</NavLink>
       <NavLink to='/register'>Sign Up!</NavLink>

        <button type='button' onClick={logout}>Logout</button>
      </header>

      <main>
        <Route path='/login' component={Login}></Route>
        <Route path='/users' component={Users}></Route>
        <Route path='/register' component={Register}></Route>

        </main>
    </>
  );
  
}

export default withRouter(App); // withrouter will save the history prop
