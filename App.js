import React from 'react';
import Game from './components/Game';

export default class App extends React.Component {
  state = {
    gameId: 1
  }

  resetGame = () => {
    this.setState((prevState) => {
      return {gameId: prevState.gameId + 1};
    });
  }

  render() {
    return (
      <Game
        key={this.state.gameId} 
        randomNumberCount={6} 
        initialSeconds={10}
        onPlayAgain={this.resetGame}
      />
    );
  }
}