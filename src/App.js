import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books:[]
  };

  componentDidMount=()=>{
    this.loadBooks()
  };

  loadBooks=()=>{
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books
      });
    });
  };

  onSearch=(query,maxResults)=>{
    return new Promise((resolve,reject)=>{
        BooksAPI.search(query,maxResults).then(
          (books)=>resolve(books)
        );
    });
  };

  onShelfChange=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(
      (shelfs)=>{
        this.loadBooks();
      });
  };

  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <Route path="/search" render={
          ()=>(
            <SearchBooks books={this.state.books} onSearch={this.onSearch} onShelfChange={this.onShelfChange}/>
          )
        }/>

        <Route exact path="/" render={
          ()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf onShelfChange={this.onShelfChange} title="Currently Reading" books={this.state.books.filter((book)=>book.shelf==='currentlyReading')}/>
                  <Bookshelf onShelfChange={this.onShelfChange} title="Want to Read" books={this.state.books.filter((book)=>book.shelf==='wantToRead')}/>
                  <Bookshelf onShelfChange={this.onShelfChange} title="Read" books={this.state.books.filter((book)=>book.shelf==='read')}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )
        }/>
        </div>
        </BrowserRouter>
    )
  }
}

export default BooksApp
