//import liraries
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

// create a component
class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };

  target = 10 + Math.floor(40 * Math.random());
  gameStatus = 'PLAYING'

  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));


  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((accumulator, currentElement) => accumulator + currentElement, 0);
  // TODO: Shuffle the random numbers

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex]
    }));
  }


  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds
      .reduce((accumulator, currentElement) => accumulator + this.randomNumbers[currentElement], 0);

    if (sumSelected < this.target)
      return 'PLAYING';

    if (sumSelected === this.target)
      return 'WON';

    if (sumSelected > this.target)
      return 'LOST';
  };

  componentWillMount() {
    this.randomNumbers = shuffle(this.randomNumbers);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedIds !== this.state.selectedIds || 
      nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);

      if(this.gameStatus !== 'PLAYING')
        clearInterval(this.intervalId);
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      },
      () => {
        if (this.state.remainingSeconds === 0)
          clearInterval(this.intervalId);
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) =>
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}>
            </RandomNumber>
          )}
        </View>
        <View style={styles.resultContainer}>
          {
            this.gameStatus !== 'PLAYING' &&
            (
              <Text style={[styles.result, styles[`STATUS_${this.gameStatus}`]]}>YOU {this.gameStatus}!</Text>
            )
          }
        </View>
        {
          this.gameStatus !== 'PLAYING' && (
            <Button
              onPress={this.props.onPlayAgain}
              title="Play Again"
              color="#841584"
              accessibilityLabel="Play Again Button."
            />)
        }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ddd',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 100,
    alignItems: 'center'
  },
  target: {
    fontSize: 40,
    backgroundColor: '#999',
    marginHorizontal: 50,
    textAlign: 'center',
    color: '#fff'
  },
  STATUS_PLAYING: {
    backgroundColor: '#999',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
  result: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    width: '80%',
    color: '#fff'
  }
});

//make this component available to the app
export default Game;