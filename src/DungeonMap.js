import React, { Component } from 'react';
import classNames from 'classnames';
import './DungeonMap.css';

class DungeonMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dungeon: this.props.dungeonMap
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dungeon: nextProps.dungeonMap
        });
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
          <div>
            {dungeonMap}
          </div>
        );
    }
}

export default DungeonMap;