import React, { Component } from 'react';

import User from './user';
import Register from './Register.js'

class Users extends Component {

  render() {
    return (
      <div className="Users">
        <h1>Users</h1>
        <h3><Register/> Add A User</h3>
        <ul>
          {this.props.users.map(user => {
            return (
              <User
              user={user.username}
                id={user.id}
                key={user.id}
                password={user.password}
                department={user.department}
                deleteUser={this.props.deleteUser}
                updateUser={this.props.updateUser}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

User.defaultProps = {
 users: [],
};

export default Users;