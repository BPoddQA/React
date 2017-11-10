import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  state = {
    books: []
  }

  newEntryButton = () => {
    let array = this.state.books;
    array.push({ id: 12, isbn: "test", title: "test", author: "test", num_pages: 123 });
    this.setState({ books: array });
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
        <TableComponent library={this.state.books} reload={this.loadBooks}/>

      </div>
    );
  }
}

class NewEntryComponent extends Component {


  render() {
    return (
      <div>
        <input id="inputTitle" type="text" placeholder="Enter a title"></input>
        <input id="inputAuthor" type="text" placeholder="Enter an author"></input>
        <input id="inputPages" type="Number" placeholder="Enter number of pages"></input>
        <input id="inputIsbn" type="text" placeholder="Enter an isbn"></input>
        <button onClick={this.props.newEntry}>Add</button>
      </div>
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
              reload={this.props.reload}/>
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
