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

    const entryListItem = this.state.entryList.map(entry => {
      return (
        <div key={entry.entryId} className="singleEntry">
          <div>{entry.date}</div>
          <div>{entry.amount}</div>
        </div>
      );
    });

    return (
      <>
        <header>
          APP NAME
        </header>
        <div className="list-container">
          {entryListItem}
        </div>
      </>
    );
  }
}
export default Home;
