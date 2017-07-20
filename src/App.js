import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);

    this.dungeonHeight = 100;
    this.dungeonWidth = 100;

    this.state = {
      dungeon: this.dungeonGenerator()
    };
  }

  dungeonGenerator() {

    //var wallHashMap = new this.HashTable({});

    //create empty dungeon
    var dungeon = new Array(this.dungeonHeight);
    for (var i = 0; i < this.dungeonHeight;) {
      dungeon[i++] = new Array(this.dungeonWidth);
      for(var j = 0; j < this.dungeonWidth;) {
        dungeon[i - 1][j++] = 'earth';
      }
    }

    return dungeon;
  }

  HashTable (obj){
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }
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
