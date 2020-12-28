import React from 'react';
import Home from './pages/home';
import SingleEntry from './pages/view-single-entry';

function parseRoute(hashRoute) {
  let route = '';
  if (hashRoute.startsWith('#')) {
    route = hashRoute.replace('#', '');
  }
  return route;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  render() {
    if (this.state.route === '') {
      return <Home />;
    }

    if (this.state.route === 'single-entry') {
      return <SingleEntry />;
    }

    return <div>Not Found</div>;
  }
}
