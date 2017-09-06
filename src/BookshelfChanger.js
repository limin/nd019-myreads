import React from 'react'

class BookshelfChanger extends React.Component{
  onChange=(e)=>{
    this.props.onShelfChange(this.props.book,e.target.value);
  }
  render(){
    return (
      <div className="book-shelf-changer">
        <select name="shelfName" value={this.props.book.shelf?this.props.book.shelf:'none'} onChange={this.onChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading" >Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
