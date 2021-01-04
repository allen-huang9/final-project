import React from 'react';
import Menu from '../components/menu-component';

class MonthlyExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyExpenseList: []
    };
  }

  render() {
    return (
      <>
        <header>
          <Menu />
          <p className="header-text">APP Name</p>
        </header>
        <div>
          monthly expense place holder
        </div>
      </>
    );
  }
}

export default MonthlyExpenseList;
