import React from 'react';
import { Link } from 'react-router';
import Sound from 'react-sound';
import Inventory from './Inventory'
import Riddle from './Riddle'
import Story from './Story'
import EasterEgg from './EasterEgg'


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    const {map, hero}  = this.props;
    const {images, items, descriptions, enemyIds, features, easterEggs, riddles } = map

    let row = map.location.row
    let col = map.location.col

    let arrowRight = "http://i.imgur.com/MBUmoeF.png"
    let arrowLeft = "http://i.imgur.com/ztCX2UV.png"
    let arrowUp = "http://i.imgur.com/2rXcG5r.png"
    let arrowDown = "http://i.imgur.com/9gnJyue.png"

    let north = images[row - 1] ? images[row - 1][col] ? arrowUp : undefined : undefined
    let east = images[row] ? images[row][col + 1] ? arrowRight : undefined : undefined
    let south = images[row + 1] ? images[row + 1][col] ? arrowDown : undefined : undefined
    let west = images[row] ? images[row][col - 1] ? arrowLeft : undefined : undefined

    let image, item, itemName, description, enemyId, enemyName, feature, easterEgg, riddle;
    image = item = itemName = description = enemyId = enemyName = feature = easterEgg = riddle = undefined;

    if (images[row] && images[row][col]) {
      image = images[row][col];
      item = items[row][col];
      if (item){
        if(this.props.hero.inventory.filter((heroItem)=> heroItem.name === item.name )[0]){
          itemName = undefined;
        } else{
          itemName = item.name;
        }
      }
      description = descriptions[row][col];
      enemyId = enemyIds[row][col];

      if(this.props.battle[features[row][col]]) {
        feature = ""
      } else {
        feature = features[row][col];
      }
      easterEgg = easterEggs[row][col];
      riddle = riddles[row][col];
    }


    if(enemyId && this.props.enemy[enemyId].status.health > 0) {
      enemyName = this.props.enemy[enemyId].name
    }

    return(
      <div>
        <div id="map">
          <img id="north" src={north} width="150" height="150" onClick={north ? this.props.goNorth : null} />
          <img id="east" src={east} width="150" height="150" onClick={east ? this.props.goEast: null} />
          <img id="south" src={south} width="150" height="150" onClick={south ? this.props.goSouth: null} />
          <img id="west" src={west} width="150" height="150" onClick={west ? this.props.goWest: null} />
          <div> {description} </div>
          <Riddle riddle={riddle} pickUp={this.props.pickUp}/>
          <div onClick={this.props.pickUp.bind(null, item)}>{itemName} </div>
          <div onClick={this.props.pickUpFeature.bind(null, feature)}>{feature} </div>
          <div>
            {easterEgg ? (easterEgg).map((item) =>
              <EasterEgg egg={item} soundEffect={this.props.soundEffect}/>):undefined}
          </div>
          <Link to='/battle' onClick={this.props.changeEnemy.bind(null, this.props.enemy, enemyId)}>{enemyName}</Link>
          <img id="background" src={image}/>
        </div>
        <div className='inv'>
          {(hero.inventory).map((item, i) =>
                <Inventory item={item} equip={this.props.equip} key={i} i={i}/>)}
        </div>

        <div className='story'>
          <Story row={row} col={col} messages={map.messages}/>
        </div>
      </div>
    )
  }
}
