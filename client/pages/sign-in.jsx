import React from 'react';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const inputName = event.target.name;
    const updatedState = this.state;
    updatedState[inputName] = event.target.value;
    this.setState({ [inputName]: updatedState[inputName] });
  }

  handleSubmit() {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/apis/sign-in', init);
  }

  render() {
    return (
      <>
        <header>
          <p className="header-text">Money Bluff</p>
        </header>
        <div className="sign-in-form-container pt-5 d-flex justify-content-center">
          <form className="w-75" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}>
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}>
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
