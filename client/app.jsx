import React from 'react';
import Home from './pages/home';
import SingleEntry from './pages/view-single-entry';
import AddEntry from './pages/add-entry';
import EditForm from './pages/edit-entry-form';
import MonthlyExpenseList from './pages/monthly-expense-list';
import SignIn from './pages/sign-in';
import UserInfoContext from './lib/UserInfoContext';

function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }

  const [path, queryString] = hashRoute.split('?');
  const params = new URLSearchParams(queryString);

  return { path, params };
}

function decodeToken(token) {
  const [, encodedPayload] = token.split('.');
  const jsonPayload = atob(encodedPayload);
  const payload = JSON.parse(jsonPayload);
  return payload;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      signedToken: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

    const token = window.localStorage.getItem('money-token');
    let user = null;
    if (token) {
      user = decodeToken(token);
      this.setState({ user, signedToken: token, isAuthorizing: false });
    }

  }

  handleSignIn(result) {
    const { user, signedToken } = result;
    window.localStorage.setItem('money-token', signedToken);
    window.location.hash = 'home';
    this.setState({ user, signedToken });
  }

  handleSignOut() {
    window.localStorage.removeItem('money-token');
    this.setState({ user: null, signedToken: null });
    window.location.hash = '';
  }

  render() {
    const path = this.state.route.path;

    let page = null;

    const context = {
      user: this.state.user,
      token: this.state.signedToken,
      handleSignIn: this.handleSignIn,
      handleSignOut: this.handleSignOut
    };

    if (path === '') {
      page = <SignIn />;
    } else if (path === 'home') {
      page = <Home />;
    } else if (path === 'single-entry') {
      const entryId = this.state.route.params.get('entryId');
      page = <SingleEntry entryId={entryId} />;
    } else if (path === 'edit-form') {
      const entryId = this.state.route.params.get('entryId');
      page = <EditForm entryId={entryId} />;
    } else if (path === 'add-entry') {
      page = <AddEntry />;
    } else if (path === 'monthly-expense') {
      page = <MonthlyExpenseList />;
    } else {
      page = <div>Not Found</div>;
    }

    if (this.state.isAuthorizing) {
      return (
        <UserInfoContext.Provider value={context}>
          <SignIn />;
        </UserInfoContext.Provider>
      );
    }

    return (
      <UserInfoContext.Provider value={context}>
        {page}
      </UserInfoContext.Provider>
    );

  }
}
