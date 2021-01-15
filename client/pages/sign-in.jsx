import React from 'react';
import UserInfoContext from '../lib/UserInfoContext';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isDisabled: false
    };
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.handleDemo = this.handleDemo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDemo() {
    const demoUsers = [
      {
        username: 'fredCh4',
        password: 'password1'
      },
      {
        username: 'Jace',
        password: 'testuser'
      },
      {
        username: 'AlvinMa',
        password: 'l@Ndfi11'
      }
    ];

    const demoUserIndex = Math.floor(Math.random() * 3);
    const demoUser = demoUsers[demoUserIndex];

    const username = this.usernameInput.current.value = demoUser.username;
    const password = this.passwordInput.current.value = demoUser.password;

    this.setState({
      username,
      password,
      isDisabled: true
    });
  }

  handleChange(event) {
    const inputName = event.target.name;
    const updatedState = this.state;
    updatedState[inputName] = event.target.value;
    this.setState({ [inputName]: updatedState[inputName] });
  }

  handleSubmit(event) {
    event.preventDefault();
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/sign-in', init)
      .then(res => res.json())
      .then(response => {
        if (response.user && response.signedToken) {
          this.context.handleSignIn(response);
        }
      });
  }

  render() {
    return (
      <>
        <header className="d-flex justify-content-center">
          <h1 className="header-text m-0">Money Bluff</h1>
        </header>
        <div className="sign-in-form-container pt-5 d-flex justify-content-center">
          <form className="w-75" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input ref={this.usernameInput}
                className="form-control"
                required
                type="text"
                name="username"
                id="username"
                disabled={this.state.isDisabled}
                onChange={this.handleChange}>
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input ref={this.passwordInput}
                className="form-control"
                required
                type="password"
                name="password"
                id="password"
                disabled={this.state.isDisabled}
                onChange={this.handleChange}>
              </input>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success w-50">Sign In</button>
            </div>

            <div onClick={this.handleDemo}
              className="d-flex justify-content-center btn btn-success mt-3 mx-auto w-50 ">
              Demo
            </div>
          </form>
        </div>
      </>
    );
  }
}

SignIn.contextType = UserInfoContext;
export default SignIn;
