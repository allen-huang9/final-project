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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
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

    const categoryList = this.state.categoryList;
    const categoryOptions = categoryList.map(category => {
      return (
        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
      );
    });

    let categoryId = null;

    for (let i = 0; i < categoryList.length; i++) {
      if (entry.category === categoryList[i].name) {
        categoryId = categoryList[i].categoryId;
      }
    }
    return (
      <>
      <header>
          <p className="header-text">{`Entry ${entry.entryId}`}</p>
        </header>
      <div className="edit-form">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select className="form-control" value={categoryId} onChange={this.handleChangeCategory}>
              {categoryOptions}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount </label>
            <input className="form-control" type="text" id="amount" value={entry.amount} onChange={this.handleChangeAmount}></input>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date </label>
            <input className="form-control" type="date" id="date" value={entry.date} onChange={this.handleChangeDate}></input>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" value={entry.description} onChange={this.handleChangeDescription}></textarea>
          </div>

          <div className="edit-button-container">
            <a className="btn btn-success" href={`#single-entry?entryId=${this.props.entryId}`}>
              Save
            </a>
          </div>
        </form>
      </div>
      </>
    );
  }
}

export default EditForm;
