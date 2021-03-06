import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
  super(props)
  this.addTrack = this.addTrack.bind(this)
  this.removeTrack = this.removeTrack.bind(this)
  }

  //Conditional function to decide whether to render a + (search results) or a - (playlist)
  renderAction(isRemoval){
    if(isRemoval)
    {
      return (<a onClick={this.removeTrack} className="Track-action">-</a>)}
    else {
      return (<a onClick={this.addTrack} className="Track-action">+</a>)}

  }

  //Call the parents onAdd method
  addTrack(){
    this.props.onAdd(this.props.track)
  }

  //Call the parents onRemove method
  removeTrack(){
    this.props.onRemove(this.props.track)
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} {this.renderAction(this.props.isRemoval)}</p>
        </div>

      </div>
      )
  }

}

export default Track;
