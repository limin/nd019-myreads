import React from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends React.Component{
    render(){
      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+this.props.book.imageLinks.thumbnail+')' }}></div>
            <BookshelfChanger book={this.props.book} onShelfChange={this.props.onShelfChange}/>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors?this.props.book.authors.join(', '):''}</div>
        </div>
      );
    }
}

export default Book
