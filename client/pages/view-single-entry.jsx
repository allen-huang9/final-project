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
          <p className="header-text">Entry</p>
        </header>
        <div className="single-entry-container">
          <table className="single-entry-information-table">
            <tbody>
              <tr>
                <th>Category:</th>
                <td> {category} </td>
              </tr>
              <tr>
                <th>Date:</th>
                <td> {date} </td>
              </tr>
              <tr>
                <th>Amount:</th>
                <td> ${amount} </td>
              </tr>
              <tr>
                <th>Description:</th>
                <td> {description} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default SingleEntry;
