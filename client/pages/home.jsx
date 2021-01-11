import React from 'react';
import Menu from '../components/menu-component';
import UserInfoContext from '../lib/UserInfoContext';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: null
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    const userId = this.context.user.userId;

    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch(`/api/entries/${userId}`, init)
      .then(response => response.json())
      .then(jsonData => {

        this.setState({
          entryList: jsonData
        });
      })
      .catch(err => console.error(err));
  }

  handleClickAdd() {
    window.location.hash = '#add-entry';
  }

  render() {

    const entriesList = this.state.entryList;
    if (!entriesList) {
      return <div>LOADING...</div>;
    }

    const entryListItems = this.state.entryList.map(entry => {
      return (
        <tr key={entry.entryId}>
          <td>{entry.date}</td>
          <td>${entry.amount}</td>
          <td>
            <a className="view-single-entry-button"
              href={`#single-entry?entryId=${entry.entryId}`}>
                View
            </a>
          </td>
        </tr>
      );
    });

    return (
      <>
        <header>
          <Menu />
          <p className="header-text">Money Bluff</p>
        </header>
        <div className="list-container">
          <table className="list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {entryListItems}
            </tbody>
          </table>
          <div className="add-entry-button d-flex
                          justify-content-center align-items-center"
                onClick={this.handleClickAdd}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </>
    );
  }
}

Home.contextType = UserInfoContext;

export default Home;
