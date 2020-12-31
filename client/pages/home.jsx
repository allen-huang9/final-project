import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: []
    };
    this.handleClickView = this.handleClickView.bind(this);
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

  handleClickView(event) {
    window.location.hash = `#single-entry?entryId=${event.target.value}`;
  }

  render() {

    const entryListItems = this.state.entryList.map(entry => {
      return (
        <tr key={entry.entryId}>
          <td>{entry.date}</td>
          <td className="amount-td">${entry.amount}</td>
          <td>
            <button className="view-single-entry-button"
                    value={entry.entryId}
                    onClick={this.handleClickView}>View</button>
          </td>
        </tr>
      );
    });

    return (
      <>
        <header>
          <p className="header-text">APP Name</p>
        </header>
        <div className="list-container">
          <table className="entry-list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th className="amount-td">Amount</th>
              </tr>
            </thead>
            <tbody>
              {entryListItems}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default Home;
