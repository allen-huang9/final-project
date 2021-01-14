import React from 'react';
import Menu from '../components/menu-component';
import UserInfoContext from '../lib/UserInfoContext';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null,
      categoryList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const customHeader = new Headers();
    customHeader.append('X-Access-Token', this.context.token);
    const init = {
      method: 'GET',
      headers: customHeader
    };
    fetch(`/api/entry/${this.props.entryId}`, init)
      .then(response => response.json())
      .then(entry => this.setState({ entry }));

    fetch('/api/category-table', init)
      .then(response => response.json())
      .then(categoryList => this.setState({ categoryList }));
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
      },
      body: JSON.stringify({
        amount: this.state.entry.amount,
        date: this.state.entry.date,
        description: this.state.entry.description,
        categoryId: this.state.entry.categoryId
      })
    };

    fetch(`/api/update-entry/${this.props.entryId}`, req)
      .then(respone => {
        window.location.hash = `#single-entry?entryId=${this.props.entryId}`;
      });

  }

  render() {

    const entry = this.state.entry;
    if (!entry) {
      return <div>LOADING...</div>;
    }

    const dateComponents = entry.date.split('/');
    if (dateComponents.length === 3) {
      entry.date = `${dateComponents[2]}-${dateComponents[0]}-${dateComponents[1]}`;
    }

    const categoryList = this.state.categoryList;
    const categoryOptions = categoryList.map(category => {
      return (
        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
      );
    });

    return (
      <>
        <header>
          <Menu />
          <h2 className="header-text m-0">Money Bluff</h2>
        </header>
        <div className="text-center py-2">
          <h4>{`Entry ${entry.entryId}`}</h4>
        </div>
        <div className="pt-1 d-flex justify-content-center">
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
              <button className="btn button-config">Save</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

EditForm.contextType = UserInfoContext;
export default EditForm;
