//import liraries
import React from 'react';
import { Text, TouchableOpacity ,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// create a component
class RandomNumber extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
  }

  handlePress = () => {
    if(this.props.isDisabled) return;
    this.props.onPress(this.props.id);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, 
          this.props.isDisabled && styles.disabled]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 15,
    fontSize: 35,
    textAlign: 'center',
    color: '#fff'
  },
  disabled: {
    opacity: 0.3
  }
});

//make this component available to the app
export default RandomNumber;