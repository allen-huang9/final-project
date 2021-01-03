import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {

    let displayStatus = 'd-none';

    if (this.state.isOpen) {
      displayStatus = 'open-menu';
    }

    return (
      <>
        <div className="burger-menu" onClick={this.handleClick}>
          <i className="fas fa-bars"></i>
        </div>
        <div className={displayStatus}>
          <a href='#'>Home</a>
        </div>
      </>
    );
  }
}

export default Menu;
