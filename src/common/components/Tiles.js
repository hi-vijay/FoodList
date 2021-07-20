import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Tiles = props => {
  const {style = {backgroundColor: 'white'}, text = 'Default Text'} = props;
  console.log('tiles');

  const onClick = () => {
    try {
      props.onClick();
    } catch (error) {
      console.log(error);
    }
  };

  const {rootContainerStyle, textStyle} = styles;
  return (
    <TouchableOpacity
      onPress={() => onClick()}
      activeOpacity={0.7}
      style={[rootContainerStyle, style]}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowRadius: 12,
    elevation: 4,
    shadowOpacity: 6,
    shadowColor: 'lightgrey',
  },
  textStyle: {
    padding: 12,
    fontSize: 22,
    fontWeight: '400',
    color: 'dodgerblue',
    textAlign: 'center',
  },
});

export default Tiles;
