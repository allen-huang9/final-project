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
        <div key={entry.entryId} className="singleEntry-row">
          <div className="entry-col">
            <div>{entry.date}</div>
          </div>
          <div className="entry-col">{entry.amount}</div>
          <div className="entry-col">
            <div className="view-single-entry-button">View</div>
          </div>
        </div>
      );
    });

    return (
      <>
        <header>
          <div className="burger-menu">
            <i className="fas fa-bars"></i>
          </div>
          <p>APP Name</p>
        </header>
        <div className="list-container">
          <div className="singleEntry-row">
            <div className="entry-col">Date</div>
            <div className="entry-col">Amount</div>
            <div className="entry-col"></div>
          </div>
          {entryListItems}
        </div>
        <div className="add-entry-button">
          <i className="fas fa-plus"></i>
        </div>
      </>
    );
  }
}
export default Home;
