import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  }

  componentDidMount=()=>{
    this.loadBooks()
  }

  loadBooks=()=>{
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books
      });
    });
  }

  onSearch=(query,maxResults)=>{
    return new Promise((resolve,reject)=>{
        BooksAPI.search(query,maxResults).then(
          (books)=>resolve(books)
        );
    });
  }

  onShelfChange=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(
      (shelfs)=>{
        this.loadBooks();
      });
  }

  closeSearch=()=>{
    this.setState({
      showSearchPage:false
    });
  }

  openSearch=()=>{
    this.setState({
      showSearchPage:true
    });
  }

  render() {
    /*
    //sample book object
    {
      "title": "Best Android Apps",
      "subtitle": "The Guide for Discriminating Downloaders",
      "authors": [
        "Mike Hendrickson",
        "Brian Sawyer"
      ],
      "publisher": "\"O'Reilly Media, Inc.\"",
      "publishedDate": "2010-04-27",
      "description": "Contains descriptions of over two hundred recommended applications and games for android/mobile devices, including apps for business, communication, lifestyle, entertainment, utility/tool, and reference.",
      "industryIdentifiers": [
        {
          "type": "ISBN_13",
          "identifier": "9781449382551"
        },
        {
          "type": "ISBN_10",
          "identifier": "144938255X"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 240,
      "printType": "BOOK",
      "categories": [
        "Computers"
      ],
      "averageRating": 4,
      "ratingsCount": 3,
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": "preview-1.0.0",
      "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=bUybAgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=bUybAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "language": "en",
      "previewLink": "http://books.google.com/books?id=bUybAgAAQBAJ&dq=android&hl=&cd=1&source=gbs_api",
      "infoLink": "http://books.google.com/books?id=bUybAgAAQBAJ&dq=android&hl=&source=gbs_api",
      "canonicalVolumeLink": "https://books.google.com/books/about/Best_Android_Apps.html?hl=&id=bUybAgAAQBAJ",
      "id": "bUybAgAAQBAJ"
    }

    */

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={this.state.books} closeSearch={this.closeSearch} onSearch={this.onSearch} onShelfChange={this.onShelfChange}/>
        ) : (
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
              <a onClick={this.openSearch}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
