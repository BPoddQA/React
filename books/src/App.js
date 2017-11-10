import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  state = {
    books: []
  }

  newEntryButton = (book) => {
    if (book) {   
      const request = new Request("http://localhost:3001/book", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      fetch(request).then(() => this.loadBooks());
    }
  }

  addBook = (book) => {
    const request = new Request("http://localhost:3001/book", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    fetch(request).then(() => this.loadBooks());
  }

  loadBooks = () => {
    fetch("http://localhost:3001/books").then((a) => {
      a.json().then((b) => this.setState({ books: b }));

    })
  }

  constructor() {
    super();
    this.loadBooks();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Library</h1>
        </header>
        <NewEntryComponent newEntry={this.newEntryButton} />
        <TableComponent library={this.state.books} reload={this.loadBooks} />

      </div>
    );
  }
}

class NewEntryComponent extends Component {

  constructor(props) {
    super(props);

    this.update = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

    this.submit = (e) => {
      e.preventDefault();
      this.props.newEntry(this.state);
      this.setState({
        id: "",
        isbn: "",
        title: "",
        author: "",
        num_pages: ""
      });
    }


    this.state = {

      id: "",
      isbn: "",
      title: "",
      author: "",
      num_pages: ""

    }

  }
  render() {
    return (
      <form id="newEntry" onSubmit={this.submit}>
        <input name="inputTitle" type="text" value={this.state.title} onChange={this.update("title")}></input>
        <input name="inputAuthor" type="text" value={this.state.author} onChange={this.update("author")}></input>
        <input name="inputPages" type="text" value={this.state.num_pages} onChange={this.update("num_pages")}></input>
        <input name="inputIsbn" type="text" value={this.state.isbn} onChange={this.update("isbn")}></input>
        <button >Add</button>
      </form>
    )
  }
}

class TableComponent extends Component {
  render() {
    return (
      <table border="1" >
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Num_pages</th>
            <th colSpan="2">Isbn</th>
          </tr>

          {this.props.library.map((book, index) => {
            return <TableRow
              key={book.isbn}
              id={book.id}
              title={book.title}
              author={book.author}
              num_pages={book.num_pages}
              isbn={book.isbn}
              reload={this.props.reload} />
          })}
        </tbody>
      </table >
    )
  }
}

class TableRow extends Component {
  deleteBook = () => {
    const request = new Request(`http://localhost:3001/book/${this.props.id}`, {
      method: "DELETE"
    });
    fetch(request).then(() => this.props.reload());
  }

  render() {
    return (
      <tr className="Book">
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{this.props.num_pages}</td>
        <td>{this.props.isbn}</td>
        <td> <button onClick={this.deleteBook}> X  </button> </td>
      </tr>
    )
  }
}
export default App;
