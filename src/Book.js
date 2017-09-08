import React from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends React.Component{
    render(){
      let {book,onShelfChange}=this.props;
      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
            <BookshelfChanger book={book} onShelfChange={onShelfChange}/>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors?book.authors.join(', '):''}</div>
        </div>
      );
    }
}

export default Book
