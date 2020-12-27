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
        <div key={entry.entryId} className="single-entry-row">
          <div className="entry-col">
            <div>{entry.date}</div>
          </div>
          <div className="entry-col">{entry.amount}</div>
          <div className="entry-col">
            <button className="view-single-entry-button">View</button>
          </div>
        </div>
      );
    });

    return (
      <>
        <header>
          <p>APP Name</p>
        </header>
        <div className="list-container">
          <div className="single-entry-row">
            <div className="entry-col">Date</div>
            <div className="entry-col">Amount</div>
            <div className="entry-col"></div>
          </div>
          {entryListItems}
        </div>
      </>
    );
  }
}
export default Home;
