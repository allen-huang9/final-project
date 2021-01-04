import React from 'react';

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
            <a className='d-flex justify-content-center align-items-center' href='#'>Home</a>
          </div>
        </div>

      </>
    );
  }
}

export default Menu;
