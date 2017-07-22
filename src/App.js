import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);

    this.dungeonHeight = 100;
    this.dungeonWidth = 100;

    this.smallRoom = {
      height: 8,
      width: 8
    };

    //array that holds all of the coordinates to the walls
    this.wallArray = [];

    this.state = {
      dungeon: this.dungeonGenerator()
    };
  }

  dungeonGenerator() {
    //create empty dungeon
    var dungeon = new Array(this.dungeonHeight);
    for (var i = 0; i < this.dungeonHeight;) {
      dungeon[i++] = new Array(this.dungeonWidth);
      for(var j = 0; j < this.dungeonWidth;) {
        dungeon[i - 1][j++] = 'earth';
      }
    }

    //create first room at the center of map
    dungeon = this.createRoom(50, 50, dungeon);

    for (let i = 0; i < 5; i++) {
      dungeon = this.randomlyGenerateRoom(dungeon);
    }

    return dungeon;
  }

  randomlyGenerateRoom(dungeon) {
    while(true) {
      var rowOffset = 0;
      var columnOffset = 0;
      //pick a random segment of wall
      var selectedWall = this.wallArray[this.getRandomInt(0, this.wallArray.length - 1)];
      try {
        //check for adjacent floor for a floor tile then determine upper left hand corner of potential room area
        if (dungeon[selectedWall.row][selectedWall.column - 1] === 'floor') {
          //check to the left of the tile for a floor space
          rowOffset = selectedWall.row - (this.smallRoom.height / 2);
          columnOffset = selectedWall.column;
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon);
          }

        } else if (dungeon[selectedWall.row][selectedWall.column + 1] === 'floor') {
          //to the right of the tile for a floor space
          rowOffset = selectedWall.row - (this.smallRoom.height / 2);
          columnOffset = selectedWall.column - (this.smallRoom.width) + 1;
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon);
          }
        } else if (dungeon[selectedWall.row - 1][selectedWall.column] === 'floor') {
          //check up a tile for a floor space
          rowOffset = selectedWall.row;
          columnOffset = selectedWall.column - (this.smallRoom.width / 2);
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon);
          }

        } else if (dungeon[selectedWall.row + 1][selectedWall.column] === 'floor') {
          //check down a tile for a floor space
          rowOffset = selectedWall.row - this.smallRoom.height + 1;
          columnOffset = selectedWall.column - (this.smallRoom.width / 2);
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon);
          }

        } else {
          //No suitable place to put a room is found. So we'll try again!
        }
      } catch (e) {
        //Tried to check for a space off the map. We'll just pick another wall space.
      }
    }
  }

  roomForFloorSpace(dungeon, startingRow, startingColumn) {
    for (var k = 0; k < this.smallRoom.height; k++){
      for (var l = 0; l < this.smallRoom.width; l++) {
        try {
          if ((k === 0) || (k === this.smallRoom.height - 1) || (l === 0) || (l === this.smallRoom.width - 1)) {
            if (dungeon[startingRow + k][startingColumn + l] !== 'wall' && dungeon[startingRow + k][startingColumn + l] !== 'earth') {
              //ignore the edge of the proposed room since we can reuse existing walls
              //but will create an error is trying to reference a room
              return false;
            }
          } else if(dungeon[startingRow + k][startingColumn + l] !== 'earth') {
           return false;
          }
        } catch (e) {
          return false;
        }
      }
    }
    return true;
  }

  //get a random int including the min and max inputs
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  createRoom(startingTileRow, startingTileColumn, dungeon) {
    //starting tile column and row always starts in top left corner

    for (var k = 0; k < this.smallRoom.height; k++){
      for (var l = 0; l < this.smallRoom.width; l++) {
        //add wall class to edges
        if ((k === 0) || (k === this.smallRoom.height - 1) || (l === 0) || (l === this.smallRoom.width - 1)) {
          dungeon[k + startingTileRow][l +  startingTileColumn] = 'wall';
          //add wall cordinates to array to for choosing next placement of room
          this.wallArray.push({
            row: k + startingTileRow,
            column: l + startingTileColumn
          });
        } else {
          dungeon[k + startingTileRow][l + startingTileColumn] = 'floor';
        }
      }
    }

    return dungeon;
  }

  render() {
    var dungeonMap = this.state.dungeon.map((row, rowIndex) => {
      var dungeonRow = row.map((column, columnIndex) => {
        var tileClass = classNames('tile', column);
        return (<span key={rowIndex + columnIndex} className={tileClass}></span>);
      });
      return (<div className="dungeonRow" key={'row' + rowIndex}>{dungeonRow}</div>);
    });
    return (
      <div className="App">
        {dungeonMap}
      </div>
    );
  }
}

export default App;
