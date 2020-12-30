import React from 'react';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null,
      categoryList: []
    };

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  componentDidMount() {
    fetch(`/api/entry/${this.props.entryId}`)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));

    fetch('/api/category-table')
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList }));
  }

  handleChangeCategory(event) {
    const newEntry = this.state.entry;
    newEntry.category = event.target.value;
    this.setState({ entry: newEntry });
  }

  handleChangeDate() {
    const newEntry = this.state.entry;
    newEntry.date = event.target.value;
    this.setState({ entry: newEntry });
  }

  handleChangeAmount() {
    const newEntry = this.state.entry;
    newEntry.amount = event.target.value;
    this.setState({ entry: newEntry });
  }

  handleChangeDescription() {
    const newEntry = this.state.entry;
    newEntry.description = event.target.value;
    this.setState({ entry: newEntry });
  }

  render() {

    const entry = this.state.entry;
    if (!entry) {
      return <div>LOADING...</div>;
    }

    // console.log(this.state.entry);
    // console.log(this.state.entry.date);
    // console.log(this.state.categoryList);

    const dateComponents = entry.date.split('/');
    if (dateComponents.length > 1) {
      entry.date = `${dateComponents[2]}-${dateComponents[0]}-${dateComponents[1]}`;
    }

    const categoryOptions = this.state.categoryList.map(category => {
      return (
        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
      );
    });

    return (
      <form>
        <div>{`Entry ${this.props.entryId}`} </div>

        <label htmlFor="category">Category</label>
        <select value={entry.category} onChange={this.handleChangeCategory}>
          {categoryOptions}
        </select>

        <label htmlFor="amount">Amount: </label>
        <input type="text" id="amount" value={entry.amount} onChange={this.handleChangeAmount}></input>

        <label htmlFor="date">Date: </label>
        <input type="date" id="date" value={entry.date} onChange={this.handleChangeDate}></input>

        <label htmlFor="description">Description:</label>
        <input type="textfield" id="description" value={entry.description} onChange={this.handleChangeDescription}></input>
      </form>
    );
  }
}

export default EditForm;
