import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.state = {};
  }
  search(){
    this.props.onSearch(this.state.term)
    console.log('Term Submitted is -  ' + this.state.term);

  }

handleTermChange(event){
  this.setState({term:event.target.value})
  console.log('Building the term in state -  ' + this.state.term);

}

  render(){
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
      )
  }

}

export default SearchBar;
