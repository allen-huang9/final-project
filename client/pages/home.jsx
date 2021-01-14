import React from 'react';
import Menu from '../components/menu-component';
import UserInfoContext from '../lib/UserInfoContext';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: null
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    const userId = this.context.user.userId;

    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch(`/api/entries/${userId}`, init)
      .then(response => response.json())
      .then(jsonData => {

        this.setState({
          entryList: jsonData
        });
      })
      .catch(err => console.error(err));
  }

  handleClickAdd() {
    window.location.hash = '#add-entry';
  }

  render() {

    const entriesList = this.state.entryList;
    if (!entriesList) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary spinner-config"></div>;
        </div>
      );
    }

    const entryListItems = this.state.entryList.map(entry => {
      let formattedAmount = new Intl.NumberFormat().format(parseFloat(parseFloat(entry.amount).toFixed(2)));
      if (!formattedAmount.includes('.')) {
        formattedAmount += '.00';
      }
      return (
        <tr key={entry.entryId} className="d-flex justify-content-around">
          <td>{entry.date}</td>
          <td>
            <a href={`#single-entry?entryId=${entry.entryId}`}>
                ${formattedAmount}
              </a>
            </td>
        </tr>
      );
    });

    return (
      <>
        <header>
          <Menu />
          <h2 className="header-text m-0">Money Bluff</h2>

        </header>
        <div className="list-container pt-1">
          <div className="text-center">
            <h4>All Expenses</h4>
          </div>
          <table className="list-table entries-table-font-size">
            <thead className="w-100 text-center">
              <tr className="d-flex justify-content-around">
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {entryListItems}
            </tbody>
          </table>
          <div className="add-entry-button d-flex
                          justify-content-center align-items-center"
                onClick={this.handleClickAdd}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </>
    );
  }
}

Home.contextType = UserInfoContext;

export default Home;
