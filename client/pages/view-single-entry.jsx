import React from 'react';

class SingleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/entry/${this.props.entryId}`)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));
  }

  handleClick() {
    window.location.hash = `#edit-form?entryId=${this.props.entryId}`;
  }

  render() {
    if (!this.state.entry) {
      return null;
    }

    const { amount, description, date, category } = this.state.entry;

    return (
      <>
        <header>
          <p className="header-text">Entry</p>
        </header>
        <div className="single-entry-container">
          <table className="mx-2 w-100 p-1">
            <tbody>
              <tr>
                <th className="entry-information-table-th">Category:</th>
                <td> {category} </td>
              </tr>
              <tr>
                <th className="entry-information-table-th">Date:</th>
                <td> {date} </td>
              </tr>
              <tr>
                <th className="entry-information-table-th">Amount:</th>
                <td> ${amount} </td>
              </tr>
              <tr>
                <th className="entry-information-table-th">Description:</th>
                <td> {description} </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-success" onClick={this.handleClick}>Edit</button>
          </div>
        </div>
      </>
    );
  }
}

export default SingleEntry;
