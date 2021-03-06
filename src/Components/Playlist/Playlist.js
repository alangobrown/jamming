import React from 'react';
import TrackList from '../TrackList/TrackList'

import './Playlist.css';

class Playlist extends React.Component{
constructor(props){
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
}

  handleNameChange(event){
    //console.log('Handling a name change to ' + event.target.value)
    this.props.onNameChange(event.target.value)
  }

  render(){

    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} value = {this.props.playlistName}/>
        <TrackList onRemove={this.props.onRemove} isRemoval = {true} tracks={this.props.playlistTracks}/>
        <a onClick={this.props.onSave}className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
      )
  }

}

export default Playlist;
