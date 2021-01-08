import React from 'react';

class SignIn extends React.Component {
  render() {
    return (
      <>
        <header>
          <p className="header-text">Sign In</p>
        </header>
        <div className="sign-in-form-container pt-5 d-flex justify-content-center">
          <form className="w-75">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control"
                type="text"
                name="username"
                id="username">
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control"
                type="password"
                name="password"
                id="password">
              </input>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success w-50">Sign In</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignIn;
