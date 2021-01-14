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
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary spinner-config"></div>;
        </div>
      );
    }

    const { amount, description, date, category } = this.state.entry;
    let formattedAmount = new Intl.NumberFormat().format(parseFloat(parseFloat(amount).toFixed(2)));
    if (!formattedAmount.includes('.')) {
      formattedAmount += '.00';
    }
    return (
      <>
        <header>
          <Menu />
          <h2 className="header-text m-0">Money Bluff</h2>
        </header>
        <div className="single-entry-container">
          <div className="text-center py-2">
            <h4>{`Entry ${this.props.entryId}`}</h4>
          </div>
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
                <td> ${formattedAmount} </td>
              </tr>
              <tr>
                <th className="entry-information-table-th">Description:</th>
                <td> {description} </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center mt-3">
            <a className="btn button-config"
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
