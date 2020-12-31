import React from 'react';

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    const dateObject = new Date();
    this.state = {
      categoryList: [],
      categoryId: null,
      date: `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`,
      amount: '',
      description: '',
      userId: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/category-table')
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList }));

  }

  handleChange(event) {
    const name = event.target.name;
    const newEntry = this.state;
    newEntry[name] = event.target.value;
    this.setState(newEntry);
  }

  render() {
    // console.log('state: ', this.state);

    const categoryOptions = this.state.categoryList.map(category => {
      return (
        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
      );
    });

    return (
      <>
        <header>
          <p className="header-text">Add Entry</p>
        </header>
        <div className="h-100 mt-5 d-flex justify-content-center">
          <form onSubmit={this.handleSubmit} className="w-100">
            <div className="mx-2 form-group">
              <label htmlFor="category">Category</label>
              <select className="form-control"
                name="categoryId"
                onChange={this.handleChange}>
                {categoryOptions}
              </select>
            </div>

            <div className="mx-2 form-group">
              <label htmlFor="amount">Amount </label>
              <input className="form-control"
                name="amount"
                type="text"
                id="amount"
                onChange={this.handleChange}></input>
            </div>

            <div className="mx-2 form-group">
              <label htmlFor="date">Date </label>
              <input className="form-control"
                name="date"
                type="date"
                id="date"
                value={this.state.date}
                onChange={this.handleChange}></input>
            </div>

            <div className="mx-2 form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control"
                name="description"
                id="description"
                onChange={this.handleChange}></textarea>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AddEntry;
