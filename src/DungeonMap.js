import React, { Component } from 'react';
import classNames from 'classnames';
import './DungeonMap.css';

class DungeonMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dungeon: this.props.dungeonMap,
            playerRow: this.props.playerRow,
            playerColumn: this.props.playerColumn
        };

        this.lightedArea = this.lightedArea.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dungeon: nextProps.dungeonMap,
            playerRow: nextProps.playerRow,
            playerColumn: nextProps.playerColumn
        });
    }

    lightedArea(rowIndex, columnIndex) {
        let playerRow = this.state.playerRow;
        let playerColumn = this.state.playerColumn;
        //check to see if tile is within a certain range from player tile
        if (
            (rowIndex === playerRow && columnIndex === playerColumn) ||
            (rowIndex === playerRow - 1 && columnIndex === playerColumn) ||
            (rowIndex === playerRow - 1 && columnIndex === playerColumn - 1) ||
            (rowIndex === playerRow - 1 && columnIndex === playerColumn - 2) ||
            (rowIndex === playerRow - 1 && columnIndex === playerColumn + 1) ||
            (rowIndex === playerRow - 1 && columnIndex === playerColumn + 2) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn ) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn - 1) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn - 2) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn + 1) ||
            (rowIndex === playerRow + 1 && columnIndex === playerColumn + 2) ||
            (rowIndex === playerRow && columnIndex === playerColumn - 1) ||
            (rowIndex === playerRow && columnIndex === playerColumn + 1) ||
            (rowIndex === playerRow - 2 && columnIndex === playerColumn) ||
            (rowIndex === playerRow - 2 && columnIndex === playerColumn - 1) ||
            (rowIndex === playerRow - 2 && columnIndex === playerColumn + 1) ||
            (rowIndex === playerRow + 2 && columnIndex === playerColumn) ||
            (rowIndex === playerRow + 2 && columnIndex === playerColumn - 1) ||
            (rowIndex === playerRow + 2 && columnIndex === playerColumn + 1) ||
            (rowIndex === playerRow && columnIndex === playerColumn - 2) ||
            (rowIndex === playerRow && columnIndex === playerColumn + 2) ||
            (rowIndex === playerRow + 3 && columnIndex === playerColumn) ||
            (rowIndex === playerRow - 3 && columnIndex === playerColumn) ||
            (rowIndex === playerRow && columnIndex === playerColumn + 3) ||
            (rowIndex === playerRow && columnIndex === playerColumn - 3)
        ) {
            return true;
        }
    }

    render() {
        var dungeonMap = this.state.dungeon.map((row, rowIndex) => {
          var dungeonRow = row.map((column, columnIndex) => {
            var tileClass = null;
            if (this.lightedArea(rowIndex, columnIndex)) {
                tileClass = classNames('tile', column);
            } else {
                tileClass = classNames('tile', column, 'dark');
            }

            return (<span key={rowIndex + columnIndex} className={tileClass}></span>);
          });
          return (<div className="dungeonRow" key={'row' + rowIndex}>{dungeonRow}</div>);
        });
        return (
          <div>
            {dungeonMap}
          </div>
        );
    }
}

export default DungeonMap;