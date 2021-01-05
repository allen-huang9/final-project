import React from 'react';
import Menu from '../components/menu-component';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: []
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    fetch('/api/entries/' + 1)
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
          <p className="header-text">APP Name</p>
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
export default Home;
