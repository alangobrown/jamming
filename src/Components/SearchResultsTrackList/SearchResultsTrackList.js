import React from 'react';
import Track from '../Track/Track'
import './SearchResultsTrackList.css';

class SearchResultsTrackList extends React.Component{
  constructor(props){
    super(props);
    this.filterTrackList= this.filterTrackList.bind(this);
  }


  //Takes a track list and removes those already in the playlist
  filterTrackList(tracks){
    return this.props.filter();
  }

  render(){
    //alert('Search Results: ' + JSON.stringify(this.props.tracks));

    return(
      <div className="SearchResultsTrackList">
        {this.filterTrackList().map(track => {
          return <Track isRemoval = {false} onRemove = {this.props.onRemove} onAdd={this.props.onAdd} key={track.id} track={track}/>;
        })}

      </div>
      )
  }

}

export default SearchResultsTrackList;
