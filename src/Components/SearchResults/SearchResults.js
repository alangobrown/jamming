import React from 'react';
import SearchResultsTrackList from '../SearchResultsTrackList/SearchResultsTrackList'
import './SearchResults.css';

class SearchResults extends React.Component{


  render(){

    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <SearchResultsTrackList onAdd={this.props.onAdd} filter={this.props.filter} tracks={this.props.searchResults}/>
      </div>
    )
  }
};

export default SearchResults;
