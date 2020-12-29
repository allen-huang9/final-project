import React from 'react';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <div>{`Form Place Holder ${this.props.entryId}`} </div>
      </form>
    );
  }
}

export default EditForm;
