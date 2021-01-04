import React from 'react';
import Menu from '../components/menu-component';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyExpenseList: []
    };
  }

  componentDidMount() {
    fetch('/api/monthly-expense/' + 1)
      .then(response => response.json())
      .then(monthlyExpenseList => {
        this.setState({ monthlyExpenseList });
      })
      .catch(err => console.error(err));
  }

  render() {

    const monthlyExpenses = this.state.monthlyExpenseList.map(monthlyExpense => {

      const date = monthlyExpense.date;

      return (
        <tr key={date}>
          <td>{date}</td>
          <td className="amount-td">${monthlyExpense.sum}</td>
          <td>
            <a className="view-single-entry-button"
              href={''}>
              View
            </a>
          </td>
        </tr>
      );
    });

    return (
      <>
        <header>
          <Menu />
          <p className="header-text">Monthly Expenses</p>
        </header>
        <div className="list-container">
          <table className="monthly-expense-list-table">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="amount-td">Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlyExpenses}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default MonthlyExpenseList;
