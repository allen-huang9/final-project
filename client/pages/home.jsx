import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: []
    };
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

  render() {

    const entryListItems = this.state.entryList.map(entry => {
      return (
        <tr key={entry.entryId}>
          <td>{entry.date}</td>
          <td className="amount-td">${entry.amount}</td>
          <td>
            <a className="view-single-entry-button" href={`#single-entry?entryId=${entry.entryId}`}>
              view
            </a>
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
