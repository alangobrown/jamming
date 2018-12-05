import React from 'react';
import Track from '../Track/Track'
import './PlaylistTrackList.css';

class PlaylistTrackList extends React.Component{

  render(){
    //alert('Search Results: ' + JSON.stringify(this.props.tracks));

    return(
      <div className="PlaylistTrackList">
        {this.props.tracks.map(track => {
          return <Track isRemoval = {true} onRemove = {this.props.onRemove} onAdd={this.props.onAdd} key={track.id} track={track}/>;
        })}

      </div>
      )
  }

}

export default PlaylistTrackList;
