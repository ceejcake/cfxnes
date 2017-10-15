import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Info} from '../../common';
import Gamepad from './Gamepad';
import './GamepadList.css';

export default class GamepadList extends PureComponent {

  static propTypes = {
    onMap: PropTypes.func.isRequired,
  };

  state = {
    gamepads: [],
  };

  componentDidMount() {
    if (navigator.getGamepads) {
      this.timer = setInterval(this.updateGamepads, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateGamepads = () => {
    const gamepads = navigator.getGamepads();
    this.setState({gamepads: Array.from(gamepads).filter(Boolean)});
  }

  renderUnsupportedMessage() {
    return (
      <Info icon="gamepad">
        Your browser does not support gamepad input.
      </Info>
    );
  }

  renderEmptyMessage() {
    return (
      <Info icon="gamepad">
        No gamepads seem to be connected.
        Plug in a gamepad and then press any of its buttons to activate it.
      </Info>
    );
  }

  renderGamepad = gamepad => {
    const {onMap} = this.props;
    return <Gamepad key={gamepad.index} gamepad={gamepad} onMap={onMap}/>;
  }

  render() {
    const {timer, state: {gamepads}} = this;
    return (
      <div className="gamepad-list">
        {!timer && this.renderUnsupportedMessage()}
        {timer && !gamepads.length && this.renderEmptyMessage()}
        {gamepads.map(this.renderGamepad)}
      </div>
    );
  }

}