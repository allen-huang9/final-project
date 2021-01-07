import React from 'react';
import Menu from '../components/menu-component';
import Chart from 'chart.js';
import JSPDF from 'jspdf';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyExpenseList: [],
      modalDisplay: false,
      totalSpent: 0,
      categoryInfo: [],
      monthYear: []
    };
    this.graph = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount() {

    fetch('/api/monthly-expense/' + 1)
      .then(response => response.json())
      .then(monthlyExpenseList => {
        this.setState({ monthlyExpenseList });
      })
      .catch(err => console.error(err));
  }

  handleDownload() {
    const canvasImage = this.graph.current.toDataURL();
    const doc = new JSPDF('landscape');
    doc.addImage(canvasImage, 'JPEG', 10, 10, 280, 180);
    doc.setFontSize(25);
    doc.text(`Total spent: $${this.state.totalSpent.toFixed(2)}`, 100, 200);
    doc.save(`${this.state.monthYear[0]}-${this.state.monthYear[1]}.pdf`);
  }

  handleClickCloseModal() {
    this.setState({ modalDisplay: false });
  }

  handleClick(event) {
    const userId = 1;
    let date = event.target.id.split(' ');
    date = date.filter(value => value !== '');

    const categoryNames = [];
    const spentOnCategory = [];

    let totalExpense = 0;

    fetch(`/api/monthly-expense-graph/${userId}/${date[0]}/${date[1]}`)
      .then(response => response.json())
      .then(list => {

        for (let i = 0; i < list.length; i++) {
          categoryNames.push(list[i].name);
          if (list[i].sum) {
            spentOnCategory.push(list[i].sum);
            totalExpense += parseFloat(list[i].sum);
          } else {
            spentOnCategory.push(0);
            totalExpense += 0;
          }
        }

        // eslint-disable-next-line no-unused-vars
        const barChart = new Chart(this.graph.current.getContext('2d'), {
          type: 'bar',
          data: {
            labels: categoryNames,
            datasets: [{
              barPercentage: 0.9,
              minBarLength: 0,
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
              xAxes: [{
                ticks: {
                  fontSize: 12
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 9,
                  lineHeight: 3,
                  beginAtZero: true
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });

        this.setState({
          totalSpent: totalExpense,
          categoryInfo: list
        });
      });
    this.setState({
      modalDisplay: true,
      monthYear: date
    });
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
            <div className="modal-pop-up-bg">
              <div className="canvas-background">
                <div className="close-graph-button text-right px-2" onClick={this.handleClickCloseModal}>
                  <i className="fas fa-times"></i>
                </div>
                <canvas ref={this.graph}></canvas>
              </div>
              <div className="d-flex pt-2 pr-2">
                <div className="p-2 w-75"> {'Total spent: $' + this.state.totalSpent.toFixed(2)} </div>
                <div className="download-button" onClick={this.handleDownload}>Download</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MonthlyExpenseList;
