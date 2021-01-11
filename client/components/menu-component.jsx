import React from 'react';
import UserInfoContext from '../lib/UserInfoContext';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.className !== 'open-menu') {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {

    let displayStatus = 'd-none';

    if (this.state.isOpen) {
      displayStatus = 'show-menu';
    }

    return (
      <>
        <div className="burger-menu" onClick={this.handleClick}>
          <i className="fas fa-bars"></i>
        </div>
        <div className={displayStatus} onClick={this.handleClick}>
          <div className='open-menu'>
            <a className='pl-2 d-flex align-items-center' href='#home'>Home</a>
            <a className='pl-2 d-flex align-items-center' href='#monthly-expense'>Monthly Expense</a>
            <div className='pl-2 d-flex align-items-center' onClick={this.context.handleSignOut}>Sign Out</div>
          </div>
        </div>

      </>
    );
  }
}

Menu.contextType = UserInfoContext;
export default Menu;
