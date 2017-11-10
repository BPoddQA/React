import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Book from './Book/Book';

class App extends Component {
  state = {
    books: []
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
        <table border="1" >
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Num_pages</th>
            <th>Isbn</th>
          </tr>
          <TableComponent library={this.state.books} />
        </table>
      </div>
    );
  }
}

class TableComponent extends Component {
  render() {

    let books = (

      this.props.library.map((book, index) => {
        return <Book
          key={book.isbn}
          title={book.title}
          author={book.author}
          num_pages={book.num_pages}
          isbn={book.isbn} />
      })
    );
    return (
      <tbody>{books}</tbody>
    )
  }
}
export default App;
