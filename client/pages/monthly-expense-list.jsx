import React from 'react';
import Menu from '../components/menu-component';
import Chart from 'chart.js';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyExpenseList: [],
      modalDisplay: false
    };
    this.graph = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/monthly-expense/' + 1)
      .then(response => response.json())
      .then(monthlyExpenseList => {
        this.setState({ monthlyExpenseList });
      })
      .catch(err => console.error(err));
  }

  handleClick(event) {
    const userId = 1;
    let date = event.target.id.split(' ');
    date = date.filter(value => value !== '');
    fetch(`/api/monthly-expense-graph/${userId}/${date[0]}/${date[1]}`)
      .then(response => response.json())
      .then(list => {
        // eslint-disable-next-line no-unused-vars
        const barChart = new Chart(this.graph.current.getContext('2d'), {
          type: 'bar',
          data: {
            datasets: [{
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              data: [10, 20, 30, 40, 50, 60, 70]
            }]
          }
        });
      });
    this.setState({ modalDisplay: true });
  }

  render() {
    let modalVisibility = 'd-none';

    if (this.state.modalDisplay) {
      modalVisibility = '';
    }

    const monthlyExpenses = this.state.monthlyExpenseList.map(monthlyExpense => {

      const date = monthlyExpense.month;

      return (
        <tr key={date}>
          <td>{date}</td>
          <td>${monthlyExpense.sum}</td>
          <td>
            <div className="view-single-entry-button text-center" id={date} onClick={this.handleClick}>
              view
            </div>
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
        <div className={modalVisibility + ' modal-background'}>
          <div>
            <canvas ref={this.graph}></canvas>
          </div>
        </div>
      </>
    );
  }
}

export default MonthlyExpenseList;
