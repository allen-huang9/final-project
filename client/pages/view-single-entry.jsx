import React from 'react';
import Menu from '../components/menu-component';
import UserInfoContext from '../lib/UserInfoContext';

class SingleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null
    };
  }

  componentDidMount() {

    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch(`/api/entry/${this.props.entryId}`, init)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));
  }

  render() {
    if (!this.state.entry) {
      return <div>LOADING...</div>;
    }

    const { amount, description, date, category } = this.state.entry;

    return (
      <>
        <header>
          <Menu />
          <p className="header-text">{`Entry ${this.props.entryId}`}</p>
        </header>
        <div className="single-entry-container">
          <table className="w-100 p-1">
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
            <a className="btn btn-success"
               href={`#edit-form?entryId=${this.props.entryId}`}>
                 Edit
            </a>
          </div>
        </div>
      </>
    );
  }
}

SingleEntry.contextType = UserInfoContext;

export default SingleEntry;
