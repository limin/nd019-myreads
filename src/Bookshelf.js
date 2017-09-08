import React from 'react';
import BooksGrid from './BooksGrid'

function Bookshelf(props){
    let {title, books, onShelfChange}=props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <BooksGrid books={books} onShelfChange={onShelfChange}/>
        </div>
      </div>
    );
}

export default Bookshelf;
