import React from 'react';

class SingleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null
    };
  }

  componentDidMount() {
    fetch(`/api/entry/${this.props.entryId}`)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));
  }

  render() {
    if (!this.state.entry) {
      return null;
    }

    const { amount, description, date, category } = this.state.entry[0];

    return (
      <>
      <header>
          <p>Entry</p>
        </header>
      <div className="single-entry-container">
        <p>Catergory: {category}</p>
        <p>Date: {date}</p>
        <p>Amount: {amount}</p>
        <p>Description: {description}</p>
      </div>
      </>
    );
  }
}

export default SingleEntry;
