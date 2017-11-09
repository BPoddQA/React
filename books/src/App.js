import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Book from './Book/Book';

class App extends Component {
  state = {
    books: [
      {
        id: 1,
        isbn: "0-7475-3269-9",
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K.Rowling",
        num_pages: 223
      },
      {
        id: 2,
        isbn: "0-7475-3849-2",
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K.Rowling",
        num_pages: 251
      },
      {
        id: 3,
        isbn: "0-7475-4215-5",
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K.Rowling",
        num_pages: 317
      },
      {
        id: 4,
        isbn: "0-7475-4624-X",
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K.Rowling",
        num_pages: 636
      },
      {
        id: 5,
        isbn: "0-7475-5100-6",
        title: "Harry Potter and the Order of the Phoenix",
        author: "J.K.Rowling",
        num_pages: 766
      },
      {
        id: 6,
        isbn: "0-7475-8108-8",
        title: "Harry Potter and the Half-Blood Prince",
        author: "J.K.Rowling",
        num_pages: 607
      },
      {
        id: 7,
        isbn: "0-545-01022-5",
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K.Rowling",
        num_pages: 607
      },
      {
        id: 8,
        isbn: "0007350821",
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        num_pages: 200
      },
      {
        id: 9,
        isbn: "0141346426",
        title: "The BFG",
        author: "Roald Dahl",
        num_pages: 208
      },
      {
        id: 10,
        isbn: "0141393041",
        title: "1984",
        author: "George Orwell",
        num_pages: 268
      },
      {
        id: 11,
        isbn: "1534962859",
        title: "Frankenstein",
        author: "Mary Shelley",
        num_pages: 280
      }
    ]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Library</h1>
        </header>
        <table border="1" id="bookTable">
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
          key = {book.isbn}
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
