import React from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component{
  search=(e)=>{
    //e.preventDefault();
    //const obj=serializeForm(e.target,{hash:true});
    this.props.onSearch(e.target.value,10).then(
      (bks)=>{
        let callback=(book)=>{
          let fbks=this.props.books.filter((b)=>b.id===book.id);
          if(fbks.length===0){
            return book;
          }else{
            return fbks[0];
          }
        }
        let books=[];
        if(Array.isArray(bks)){
          books=bks.map(callback);
        }
        this.setState({books});
      }
    );
  };

  onShelfChange=(book,shelf)=>{
    this.props.onShelfChange(book,shelf);
    let books=this.state.books.map(
      (bk)=>{
        if(book.id===bk.id){
          book.shelf=shelf;
          return book;
        }else{
          return bk;
        }
      }
    );
    this.setState({books});
  }
  state={
    books:[]
  };
  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="btn-search close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input name="query" type="text" placeholder="Search by title or author" onChange={this.search}/>

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.books}  onShelfChange={this.onShelfChange}/>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
