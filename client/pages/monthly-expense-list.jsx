import React from 'react';
import Menu from '../components/menu-component';
import Chart from 'chart.js';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      monthlyExpenseList: [],
      modalDisplay: false,
      totalSpent: 0
    };
    this.graph = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/category-table')
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList }));

    fetch('/api/monthly-expense/' + 1)
      .then(response => response.json())
      .then(monthlyExpenseList => {
        this.setState({ monthlyExpenseList });
      })
      .catch(err => console.error(err));
  }

  handleClickCloseModal() {
    this.setState({ modalDisplay: false });
  }

  handleClick(event) {
    const list = this.state.categoryList;

    const userId = 1;
    let date = event.target.id.split(' ');
    date = date.filter(value => value !== '');

    const categoryName = [];
    let spentOnCategory = [];
    for (let i = 0; i < list.length; i++) {
      categoryName.push(list[i].name);
      spentOnCategory.push({
        id: list[i].categoryId,
        value: 0
      });
    }

    let totalExpense = 0;

    fetch(`/api/monthly-expense-graph/${userId}/${date[0]}/${date[1]}`)
      .then(response => response.json())
      .then(list => {

        for (let i = 0; i < list.length; i++) {
          for (let k = 0; k < spentOnCategory.length; k++) {
            if (list[i].categoryId !== spentOnCategory[k].id) {
              continue;
            } else {
              spentOnCategory[k].value += parseFloat(list[i].amount);
              break;
            }
          }
        }

        spentOnCategory = spentOnCategory.map(category => category.value);

        for (let j = 0; j < spentOnCategory.length; j++) {
          totalExpense += spentOnCategory[j];
        }

        // eslint-disable-next-line no-unused-vars
        const barChart = new Chart(this.graph.current.getContext('2d'), {
          type: 'bar',
          data: {
            labels: categoryName,
            datasets: [{
              barPercentage: 0.9,
              minBarLength: 2,
              backgroundColor: [
                '#ff2e2e',
                '#9933ff',
                '#3381ff',
                '#33ff92',
                '#adff33',
                '#de38ff'
              ],
              data: spentOnCategory
            }]
          },
          options: {
            title: {
              display: true,
              text: `${date[0]} ${date[1]}`
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  lineHeight: 1.5,
                  beginAtZero: true
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: true
          }
        });

        this.setState({ totalSpent: totalExpense });
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
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="canvas-background">
              <div className="text-right px-2" onClick={this.handleClickCloseModal}>
                <i className="fas fa-times"></i>
              </div>
              <canvas ref={this.graph}></canvas>
              <div className="p-2"> {'Total spent: ' + this.state.totalSpent} </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default MonthlyExpenseList;
