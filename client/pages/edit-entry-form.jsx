import React from 'react';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null,
      categoryList: []
    };
  }

  componentDidMount() {
    fetch(`/api/entry/${this.props.entryId}`)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));

    fetch('/api/category-table')
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList }));
  }

  render() {
    // const entryInformation = this.props.entryInformation;
    return (
      <form>
        <div>{`Form Place Holder ${this.props.entryId}`} </div>

        <label htmlFor="category">Category</label>
        <select>
          <option value="">Bill</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>

        <label htmlFor="amount">Amount: </label>
        <input type="text" id="amount"></input>

        <label htmlFor="date">Date: </label>
        <input type="date" id="date"></input>

        <label htmlFor="description">Description:</label>
        <input type="textfield" id="description"></input>
      </form>
    );
  }
}

export default EditForm;
