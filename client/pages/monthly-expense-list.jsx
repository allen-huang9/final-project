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
          <td>${monthlyExpense.sum}</td>
          <td></td>
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
          <table className="list-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
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
