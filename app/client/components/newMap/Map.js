import React from 'react';
import { Link } from 'react-router';
import GoSouth from './goSouth';
import GoNorth from './goNorth';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMap:'Start',
      message:"Alex:Welcome to our game! It isn't much yet (we're still coding it as you play:D ) but we hope you enjoy it so far",

    }

  }

  switchPage(direction, message) {
    // if (direction === 'south') {
    //   break;
    // }
    this.state.currentMap = page;
    this.state.message = message
  }

  render(){
    let toRender = [];
    if (this.props.map.locationY <= 10){
      toRender.push(<GoSouth {...this.props} switchPage={this.switchPage.bind(this)}/>)
    }
    if (this.props.map.locationY <= 9){
      toRender.unshift(<GoNorth {...this.props} switchPage={this.switchPage.bind(this)}/>)
    }
    // } else if (this.state.currentMap === 'souther'){
    //   toRender = <Souther {...this.props} switchPage={this.switchPage.bind(this)}/>
    // } else if (this.state.currentMap === 'southerer'){
    //   toRender = <Southerer {...this.props} switchPage={this.switchPage.bind(this)}/>
    // } else if (this.state.currentMap === 'evenMoreSouth'){
    //   toRender = <EvenMoreSouth {...this.props} switchPage={this.switchPage.bind(this)}/>
    // } else if (this.state.currentMap === 'southest'){
    //   toRender = <Southest {...this.props} switchPage={this.switchPage.bind(this)}/>
    // }
    console.log(this.props)
    return(
      <div>
        MAP <br/>
        {this.state.message}
        <br/> <br/>
        {this.state.currentMap}
        {toRender}
      </div>
    )
  }
}

