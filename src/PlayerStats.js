import React, { Component } from 'react';
import "./PlayerStats.css";

class PlayerStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: this.props.playerStats
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            player: nextProps.playerStats
        });
    }

    render() {
        return(
            <div className="infoBlock">
                <div className="statsLine">
                    <span className="healthStats"></span><p>Health: {this.state.player.health}</p>
                </div>
                <div className="statsLine">
                    <span className="weaponStats"></span><p>Weapon: {this.state.player.weapon}</p>
                </div>
                <div className="statsLine">
                    <span className="experienceStats"></span><p className="experienceLine">Experience: {this.state.player.experience}</p>
                </div>
                <div className="statsLine">
                    <span className="dungeonLevelStats"></span><p>Dungeon Level: {this.state.player.dungeonLevel}</p>
                </div>
            </div>
        );
    }
}

export default PlayerStats;