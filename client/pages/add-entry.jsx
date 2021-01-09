import React from 'react';
import Menu from '../components/menu-component';
import UserInfoContext from '../lib/UserInfoContext';

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    const dateObject = new Date();
    this.state = {
      categoryList: [],
      entry: {
        categoryId: 1,
        date: `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`,
        amount: '',
        description: '',
        userId: null
      }

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const userEntry = this.state.entry;
    userEntry.userId = this.context.user.userId;

    fetch('/api/category-table')
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList, entry: userEntry }));
  }

  handleChange(event) {
    const name = event.target.name;
    const newEntry = this.state.entry;
    newEntry[name] = event.target.value;
    this.setState({ entry: newEntry });
  }

  handleSubmit(event) {
    event.preventDefault();

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.entry)
    };

    fetch('/api/add-entry', req)
      .then(response => {
        const dateObject = new Date();
        const defaultValue = {
          categoryId: 1,
          date: `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`,
          amount: '',
          description: '',
          userId: this.context.user.userId
        };

        this.setState({ entry: defaultValue });
      });
  }

  render() {

    const categoryOptions = this.state.categoryList.map(category => {
      return (
        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
      );
    });

    const entry = this.state.entry;

    return (
      <>
        <header>
          <Menu />
          <p className="header-text">Add Entry</p>
        </header>
        <div className="h-100 mt-5 d-flex justify-content-center">
          <form onSubmit={this.handleSubmit} className="w-100">
            <div className="mx-2 form-group">
              <label htmlFor="category">Category</label>
              <select className="form-control"
                name="categoryId"
                value={entry.categoryId}
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
                value={entry.amount}
                onChange={this.handleChange}></input>
            </div>

            <div className="mx-2 form-group">
              <label htmlFor="date">Date </label>
              <input className="form-control"
                name="date"
                type="date"
                id="date"
                value={entry.date}
                onChange={this.handleChange}></input>
            </div>

            <div className="mx-2 form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control"
                name="description"
                id="description"
                value={entry.description}
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

AddEntry.contextType = UserInfoContext;

export default AddEntry;
