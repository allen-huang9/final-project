import React from 'react';

class SignIn extends React.Component {
  render() {
    return (
      <>
        <header>
          <p className="header-text">Sign In</p>
        </header>
        <form>
          <label htmlFor="username">Username</label>
          <input className="form-control"
            type="text"
            name="username"
            id="username">
          </input>

          <label htmlFor="password">Password</label>
          <input className="form-control"
            type="password"
            name="password"
            id="password">
          </input>
        </form>
      </>
    );
  }
}

export default SignIn;
