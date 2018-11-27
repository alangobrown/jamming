
const config = require('../config/config');

const clientID = config.local.clientID
const redirectURL =  config.local.redirectURL
const corsAnywhere =  config.local.corsAnywhere

let accessToken = '';
let expiresIn = '';

export class Spotify{
  constructor(props){
    this.search = this.search.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    console.log('from the constructor in Spotify, the accessToken is ' + accessToken);
  }

  getAccessToken(){
    console.log('A request to getAccessToken has been made. The access token is ' + accessToken)
    if(accessToken!=''){
      //alert(`getAccessToken called but already have one (${accessToken}), so just returning it`)
      return accessToken
    }
    else{
      console.log(`getAccessToken called but accessToken returns ${accessToken} so checking the URL next`)
      //Check the URL to see if it's been returned
      if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
      {
        //Set the accessToken and expirationTime
        accessToken = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        //expiresIn = window.location.href.match(/expires_in=([^&]*)/)
        var searchParams = new URLSearchParams(window.location.href)
        expiresIn = searchParams.get("expires_in")
        console.log(`Found in URL - expiresIn=${expiresIn} accessToken=${accessToken} and `)
        //Set the accessToken to expire
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }
      else{//The accessToken is empty and it's not in the URL
        console.log(`getAccessToken is not stored, nor present in the URL so redirecting to Spotify to get one`)
        //So redirect to Spotify Auth
        const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`
        window.location = authURL;
      }

    }
  }//End of getAccessToken


  search(term){

    const endpoint = `${corsAnywhere}https://api.spotify.com/v1/search?type=track&q=${term}`;

    const token = this.getAccessToken();
    console.log('Spotify.js search method - token is ' + token);
    //return fetch(endpoint,{headers:{Authorization:`Bearer ${myAccessToken}`}}).then(response=>{
    return fetch(endpoint,{headers:{Authorization:`Bearer ${token}`}}).then(response=>{
        return response.json()
      }).then(jsonResponse=>{
        console.log(`**********contains ${JSON.stringify(jsonResponse)}` );



          if(jsonResponse.tracks){
            return jsonResponse.tracks.items.map(item=>{
              const myItem = {};
              console.log(`**********contains ${item.name} by ${item.artists[0].name} from album ${item.album.name} [${item.uri}]` );
              myItem.name = item.name;
              myItem.artist = item.artists[0].name;
              myItem.album = item.album.name;
              myItem.id = item.uri;

              return myItem
            })
          }
          else{
            console.log('jsonResponse.tracks is null so returning empty tracks array')
            return []
          }
        })
      }//End of Search method

      savePlaylist(playlistName, playlistTracks){
        if(!playlistName && !playlistTracks){
          console.log(`Aborting save as cannot find playlistName (${playlistName}) or playlistTracks (${playlistTracks})`)
          return
        }
        const myAccessToken = this.getAccessToken();
        const headers = {headers:{Authorization:`Bearer ${myAccessToken}`}}
        console.log(`me headers set to ${JSON.stringify(headers)}`)
        let userId =''

        const meEndpoint = `${corsAnywhere}https://api.spotify.com/v1/me`
        return fetch(meEndpoint,headers).then(response=>{
            return response.json()
          }).then(jsonResponse=>{
            console.log(`**********Me Response contains ${JSON.stringify(jsonResponse)}` );
            userId = jsonResponse.id;
            console.log(`Saved ${userId} to userId`);

            const newPlaylistEndpoint = `${corsAnywhere}https://api.spotify.com/v1/users/${userId}/playlists`
            //POST TO CREATE THE PLAYLIST
            return fetch(newPlaylistEndpoint, {
                method: 'POST',
                body: JSON.stringify({name:playlistName}),
                headers:{Authorization:`Bearer ${myAccessToken}`}
                }).then(response=>{
                return response.json()
              }).then(jsonResponse=>{
                console.log(`**********Playlist Response contains ${JSON.stringify(jsonResponse)}` );
                let playlistID = jsonResponse.id;
                console.log(`Saved ${playlistID} to playlistID`);

                //POST TO CREATE THE PLAYLIST
                const addTracksEndpoint = `${corsAnywhere}https://api.spotify.com/v1/playlists/${playlistID}/tracks`
                console.log('About to post the following body to add tracks' + JSON.stringify({uris:playlistTracks}))
                return fetch(addTracksEndpoint, {
                    method: 'POST',
                    body: JSON.stringify({uris:playlistTracks}),
                    headers:{Authorization:`Bearer ${myAccessToken}`}
                    }).then(response=>{
                      return response.json()
                      }).then(jsonResponse=>{
                        console.log(`**********Add Tracks Response contains ${JSON.stringify(jsonResponse)}` );

                      })




                    }
          )
        }
      )
      }//End of savePlaylist



}//End of class



export default Spotify;


//http://localhost:3000/#access_token=BQB6Jv0mxV3PYW5pR_3lT00h6tb_KwxUnfGCgHNxgoWtw6EwZ9MO9yqJOx395oktxSGH1pTzZawEVxF96BBLckzT-HvshpMzoU2yEElgNrj6LomFTbWQKqgn1JTw8aPLo5fEYVJZlsuvl4DPbwy2SsBtBXEkDVdwv85a9Z7ot9ao4iU&token_type=Bearer&expires_in=3600
