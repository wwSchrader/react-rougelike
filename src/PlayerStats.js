import React, { Component } from 'react';

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
            <div>
                <p>Health: {this.state.player.health}</p>
                <p>Weapon: {this.state.player.weapon}</p>
                <p>Experience: {this.state.player.experience}</p>
            </div>
        );
    }
}

export default PlayerStats;