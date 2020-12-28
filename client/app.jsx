import React from 'react';
import Home from './pages/home';
import SingleEntry from './pages/view-single-entry';

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
    const path = this.state.route.path;
    if (path === '') {
      return <Home />;
    }

    if (path === 'single-entry') {
      const entryId = this.state.route.params.get('entryId');
      return <SingleEntry entryId={entryId} />;
    }

    return <div>Not Found</div>;
  }
}
