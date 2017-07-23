import React, { Component } from 'react';
import './App.css';
import DungeonMap from './DungeonMap.js';
import PlayerStats from './PlayerStats.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.earthTile = 'earth';
    this.wallTile = 'wall';
    this.floorTile = 'floor';
    this.playerTile = 'player';
    this.healthTile = 'health';
    this.monsterTile = 'monster';

    this.dungeonHeight = 50;
    this.dungeonWidth = 50;

    this.smallRoom = {
      height: 8,
      width: 8
    };

    //array that holds all of the coordinates to the walls
    this.wallArray = [];
    this.floorArray = [];
    this.monsterStats = {};

    this.playerRow = 0;
    this.playerColumn = 0;

    this.state = {
      dungeon: this.dungeonGenerator(),
      player: {
        health: 100,
        weapon: 10,
        experience: 0,
        row: this.playerRow,
        column: this.playerColumn
      }
    };

    this.onKeyIsPressed = this.onKeyIsPressed.bind(this);
  }

  dungeonGenerator() {
    //create empty dungeon
    var dungeon = new Array(this.dungeonHeight);
    for (var i = 0; i < this.dungeonHeight;) {
      dungeon[i++] = new Array(this.dungeonWidth);
      for(var j = 0; j < this.dungeonWidth;) {
        dungeon[i - 1][j++] = this.earthTile;
      }
    }

    //create first room at the center of map
    dungeon = this.createRoom(25, 25, dungeon, null);

    //randomly create another set of rooms
    for (let i = 0; i < 20; i++) {
      dungeon = this.randomlyGenerateRoom(dungeon);
    }

    dungeon = this.generateHealthPacks(10, dungeon);

    dungeon = this.generateMonsters(5, dungeon);

    dungeon = this.spawnPlayer(dungeon);

    return dungeon;
  }

  spawnPlayer(dungeon) {
    let randomIndex = this.getRandomInt(0, this.floorArray.length - 1);
    let selectFloorTile = this.floorArray.splice(randomIndex, 1);

    dungeon[selectFloorTile[0].row][selectFloorTile[0].column] = this.playerTile;

    //set player position in state
    this.playerRow = selectFloorTile[0].row;
    this.playerColumn = selectFloorTile[0].column;

    return dungeon;
  }

  generateMonsters(numberOfMonsters, dungeon) {
    for (let i = 0; i < numberOfMonsters; i++) {
      let randomIndex = this.getRandomInt(0, this.floorArray.length - 1);
      //remove floor tile from floorArray to remove from future consideration for placement
      let selectFloorTile = this.floorArray.splice(randomIndex, 1);
      dungeon[selectFloorTile[0].row][selectFloorTile[0].column] = this.monsterTile;
      this.monsterStats[selectFloorTile[0].row + " " + selectFloorTile[0].column] = {
        health: 100
      };
    }
    return dungeon;
  }

  generateHealthPacks(numberOfHealthPacks, dungeon) {
    for (let i = 0; i < numberOfHealthPacks; i++) {
      let randomIndex = this.getRandomInt(0, this.floorArray.length - 1);
      //remove floor tile from floorArray to remove from future consideration for placement
      let selectFloorTile = this.floorArray.splice(randomIndex, 1);
      dungeon[selectFloorTile[0].row][selectFloorTile[0].column] = this.healthTile;
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
        if (dungeon[selectedWall.row][selectedWall.column - 1] === this.floorTile) {
          //check to the left of the tile for a floor space
          rowOffset = selectedWall.row - (this.smallRoom.height / 2);
          columnOffset = selectedWall.column;
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon, selectedWall);
          }

        } else if (dungeon[selectedWall.row][selectedWall.column + 1] === this.floorTile) {
          //to the right of the tile for a floor space
          rowOffset = selectedWall.row - (this.smallRoom.height / 2);
          columnOffset = selectedWall.column - (this.smallRoom.width) + 1;
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon, selectedWall);
          }
        } else if (dungeon[selectedWall.row - 1][selectedWall.column] === this.floorTile) {
          //check up a tile for a floor space
          rowOffset = selectedWall.row;
          columnOffset = selectedWall.column - (this.smallRoom.width / 2);
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon, selectedWall);
          }

        } else if (dungeon[selectedWall.row + 1][selectedWall.column] === this.floorTile) {
          //check down a tile for a floor space
          rowOffset = selectedWall.row - this.smallRoom.height + 1;
          columnOffset = selectedWall.column - (this.smallRoom.width / 2);
          if (this.roomForFloorSpace(dungeon, rowOffset, columnOffset)) {
            return this.createRoom(rowOffset, columnOffset, dungeon, selectedWall);
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
            if (dungeon[startingRow + k][startingColumn + l] !== this.wallTile && dungeon[startingRow + k][startingColumn + l] !== this.earthTile) {
              //ignore the edge of the proposed room since we can reuse existing walls
              //but will create an error is trying to reference a room
              return false;
            }
          } else if(dungeon[startingRow + k][startingColumn + l] !== this.earthTile) {
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

  createRoom(startingTileRow, startingTileColumn, dungeon, doorTile) {
    //starting tile column and row always starts in top left corner

    for (var k = 0; k < this.smallRoom.height; k++){
      for (var l = 0; l < this.smallRoom.width; l++) {
        //add wall class to edges
        if ((k === 0) || (k === this.smallRoom.height - 1) || (l === 0) || (l === this.smallRoom.width - 1)) {
          //if the tile is already a wall, ignore so it won't add duplicates to the wallArray
          if (dungeon[k + startingTileRow][l +  startingTileColumn] !== this.wallTile) {
            dungeon[k + startingTileRow][l +  startingTileColumn] = this.wallTile;
            //add wall cordinates to array to for choosing next placement of room
            this.wallArray.push({
              row: k + startingTileRow,
              column: l + startingTileColumn
            });
          }

        } else {
          dungeon[k + startingTileRow][l + startingTileColumn] = this.floorTile;
          this.floorArray.push({
            row: k + startingTileRow,
            column: l + startingTileColumn
          });
        }
      }
    }

    if (doorTile !== null) {
      dungeon[doorTile.row][doorTile.column] = this.floorTile;
    }

    return dungeon;
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyIsPressed, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyIsPressed, false);
  }

  onKeyIsPressed(e) {
    var canPlayerMove = false;
    var keyPress = e.key;
    var gameState = Object.assign({}, this.state);

    var rowToMoveTo = gameState.player.row;
    var columnToMoveTo = gameState.player.column;

    //changes the tile coordinates to move to based on keypress
    switch(keyPress) {
      case('ArrowUp'):
        rowToMoveTo--;
        break;
      case('ArrowDown'):
        rowToMoveTo++;
        break;
      case('ArrowLeft'):
        columnToMoveTo--;
        break;
      case('ArrowRight'):
        columnToMoveTo++;
        break;
      default:
        //end method if any other key is pressed
        return;
    }

    switch(gameState.dungeon[rowToMoveTo][columnToMoveTo]) {
      case this.healthTile:
        //increase player health and then move
        gameState.player.health += 20;
        canPlayerMove = true;
        break;
      case this.floorTile:
        canPlayerMove = true;
        break;
      case this.wallTile:
        canPlayerMove = false;
        break;
      case this.monsterTile:
        //player attacks monster and decreases it's health
        this.monsterStats[rowToMoveTo + " " + columnToMoveTo].health -= gameState.player.weapon;
        //monster attacks player
        gameState.player.health -= 5;
        //if monster health is less than or equal to zero, allow player to gain exp and move over it
        if (this.monsterStats[rowToMoveTo + " " + columnToMoveTo].health <= 0) {
          gameState.player.experience += 100;
          canPlayerMove = true;
        } else {
          canPlayerMove = false;
        }
        break;
      default:
        //if something else, do nothing
        return;
    }

    if (canPlayerMove) {
      //turn the current tile player is on into floor
        gameState.dungeon[gameState.player.row][gameState.player.column] = this.floorTile;
        //turn new tile into a player tile
        gameState.dungeon[rowToMoveTo][columnToMoveTo] = this.playerTile;
        //update player coordinates
        gameState.player.row = rowToMoveTo;
        gameState.player.column = columnToMoveTo;
    }

    this.setState(gameState);

  }

  render() {
    return (
      <div className="App">
        <PlayerStats playerStats={this.state.player} />
        <DungeonMap dungeonMap={this.state.dungeon} />
      </div>
    );
  }
}

export default App;
