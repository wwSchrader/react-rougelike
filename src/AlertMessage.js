import React, { Component } from 'react';
import {Alert, Button} from 'react-bootstrap';


class AlertMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winMessageVisible: this.props.winMessageState,
            lossMessageVisible: this.props.lossMessageState
        };

        this.handleWinMessageDismiss = this.handleWinMessageDismiss.bind(this);
        this.handleLossMessageDismiss = this.handleLossMessageDismiss.bind(this);
    }

    handleWinMessageDismiss() {
        this.props.handleWinAlert();
    }

    handleLossMessageDismiss() {
        this.props.handleLossAlert();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            winMessageVisible: nextProps.winMessageState,
            lossMessageVisible: nextProps.lossMessageState
        });
    }

    render() {
        if (this.state.winMessageVisible) {
            return (
                <div>
                    <Alert bsStyle="success" onDismiss={this.handleWinMessageDismiss}>
                        <h2>Congrats! You won the game. You're a champion!</h2>
                        <Button onClick={this.handleWinMessageDismiss}>Yup, I'm awesome!</Button>
                    </Alert>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default AlertMessage