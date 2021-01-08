import React from 'react';
// import Home from './pages/home';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleSignIn(result) {
    const { user, signedToken } = result;
    window.localStorage.setItem('money-token', signedToken);
    this.setState({ user });
  }

  render() {
    const path = this.state.route.path;

    let page = null;

    if (path === '') {
      // return <Home />;
      page = <SignIn />;
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

    const context = {
      user: this.state.user,
      handleSignIn: this.handleSignIn
    };
    return (
      <UserInfoContext.Provider value={context}>
        {page}
      </UserInfoContext.Provider>
    );

  }
}
