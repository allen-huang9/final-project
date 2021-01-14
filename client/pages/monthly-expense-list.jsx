import React from 'react';
import Menu from '../components/menu-component';
import Chart from 'chart.js';
import JSPDF from 'jspdf';
import UserInfoContext from '../lib/UserInfoContext';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyExpenseList: null,
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

    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch('/api/monthly-expense/' + this.context.user.userId, init)
      .then(response => response.json())
      .then(monthlyExpenseList => {
        this.setState({ monthlyExpenseList });
      })
      .catch(err => console.error(err));
  }

  handleDownload() {
    const canvasImage = this.graph.current.toDataURL();
    const doc = new JSPDF('landscape', 'px');
    const imageWidth = 477.4;
    const imageHeight = 403.2;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const graphPositionX = (pageWidth - imageWidth) / 2;
    const graphPositionY = (pageHeight - imageHeight) / 2 - 20;
    const textPositionX = (pageWidth / 2) - 70;
    const textPositionY = pageHeight - 20;
    doc.addImage(canvasImage, 'JPEG', graphPositionX, graphPositionY, imageWidth, imageHeight);
    doc.setFontSize(25);
    doc.text(`Total spent: $${this.state.totalSpent.toFixed(2)}`, textPositionX, textPositionY);
    doc.save(`${this.state.monthYear[0]}-${this.state.monthYear[1]}.pdf`);
  }

  handleClickCloseModal() {
    this.setState({ modalDisplay: false });
  }

  handleClick(event) {
    const userId = this.context.user.userId;
    let date = event.target.id.split(' ');
    date = date.filter(value => value !== '');

    const categoryNames = [];
    const spentOnCategory = [];

    let totalExpense = 0;

    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch(`/api/monthly-expense-graph/${userId}/${date[0]}/${date[1]}`, init)
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

    if (!this.state.monthlyExpenseList) {
      return <div>LOADING...</div>;
    }

    let modalVisibility = 'd-none';

    if (this.state.modalDisplay) {
      modalVisibility = '';
    }

    const monthlyExpenses = this.state.monthlyExpenseList.map(monthlyExpense => {

      const date = monthlyExpense.month;

      return (
        <tr key={date}>
          <td>{date}</td>
          <td>${parseFloat(monthlyExpense.sum).toFixed(2)}</td>
          <td className="p-1">
            <div className="view-single-entry-button text-center btn" id={date} onClick={this.handleClick}>
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
          <h2 className="header-text m-0">Money Bluff</h2>
        </header>
        <div className="list-container pt-2">
          <div className="text-center">
            <h4>Monthly Expenses</h4>
          </div>
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
                <div className="text-right px-2" onClick={this.handleClickCloseModal}>
                  <i className="fas fa-times"></i>
                </div>
                <canvas ref={this.graph}></canvas>
              </div>
              <div className="d-flex pt-4 pr-2">
                <div className="p-2 w-75"> {'Total spent: $' + this.state.totalSpent.toFixed(2)} </div>
                <div className="download-button btn" onClick={this.handleDownload}>Download</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MonthlyExpenseList.contextType = UserInfoContext;

export default MonthlyExpenseList;
