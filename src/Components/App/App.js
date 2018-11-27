import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify';



class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    /*this.state = {
      searchResults:[
        {
          id: '001',
          name: 'Track 001',
          artist: 'Alan',
          album: 'The Very, Very Best of AB'
        },
        {
          id: '002',
          name: 'Track 002',
          artist: 'Alan',
          album: 'The Very, Very Best of AB'
        },
        {
          id: '003',
          name: 'Track 003',
          artist: 'Alan',
          album: 'The Very, Very Best of AB'
        }
      ],
      playlistTracks:[
        {
          id: '001',
          name: 'Track 001',
          artist: 'Alan',
          album: 'The Very, Very Best of AB'
        },
        {
          id: '005',
          name: 'Track 005',
          artist: 'Alan',
          album: 'The Very, Very Best of AB'
        }
      ],
      playlistName:'Whatta Plalist'
    }
    */
    this.state = {searchResults:[],playlistTracks:[],playlistName:'New Playlist'};
  }//End of constructor



  addTrack(track){
    //Check the track doesn't already exist in the playlist
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    if(!this.state.playlistTracks.find( playlistTrack => playlistTrack.id ===track.id)){
      //Append track to playlistTracks in state
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] })
      //this.setState({ playlistTracks: this.state.playlistTracks.push(track) })

    }
  }

  removeTrack(track){
    this.setState({ playlistTracks:this.state.playlistTracks.filter(t => t !== track)})
  }

  updatePlaylistName(name){
    console.log(`Setting the playlist name to ${name}`)
    this.setState({ playlistName: name});

  }

  savePlaylist(){
    let trackURIs =[]
    trackURIs= this.state.playlistTracks.map(a => a.id);
    console.log('TrackURIs = ' + trackURIs);
    const mySpotify=new Spotify;
    mySpotify.savePlaylist(this.state.playlistName,trackURIs);
    //Now clear the tracks from the local playlist and reset the name
    console.log('About to clear the playlist tracks and name')
    this.setState({playlistTracks:[]});
    //TODO - this is not working.  Why????
    this.setState({ playlistName: 'New Playlist'});
  }


search(term){
    console.log('About to search for term - ' + term);
  const mySpotify=new Spotify;
  mySpotify.search(term).then(tracks=>{
    this.setState({searchResults:tracks})
  })
}


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove = {this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>

        </div>
      </div>
    </div>
    );
  }
}

export default App;
