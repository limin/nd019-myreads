import React from 'react'
import serializeForm from 'form-serialize'
import BooksGrid from './BooksGrid'

class SearchBooks extends React.Component{
  handleSubmit=(e)=>{
    e.preventDefault();
    const obj=serializeForm(e.target,{hash:true});
    this.props.onSearch(obj.query,10).then(
      (bks)=>{
        let callback=(book)=>{
          let fbks=this.props.books.filter((b)=>b.id===book.id);
          if(fbks.length===0){
            return book;
          }else{
            return fbks[0];
          }
        }
        let books=bks.map(callback);
        this.setState({books});
      }
    );
  };
  state={
    books:[]
  };
  render(){
    return (
      <div className="search-books">
        <form onSubmit={this.handleSubmit}>
        <div className="search-books-bar">
          <a className="btn-search close-search" onClick={this.props.closeSearch}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input name="query" type="text" placeholder="Search by title or author"/>

          </div>
          <button className="btn-search active-search" type="submit">Search</button>
        </div>
        </form>
        <div className="search-books-results">
          <BooksGrid books={this.state.books}  getShelfName={this.props.getShelfName} onShelfChange={this.props.onShelfChange}/>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
