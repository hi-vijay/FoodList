import React, {useRef, useState} from 'react';
import {View, TextInput, Image, StyleSheet, Pressable} from 'react-native';

const ICON_SIZE = 22;
const PLACE_HOLDER_TEXT = 'Try searching for healty food...';
const SearchBox = props => {
  const handleFocus = () => {
    console.log('focused');
  };
  const handleBlur = () => {
    console.log('out of focus');
  };

  const {rootContainerStyle, startIconStyle, textInputStyle} = styles;
  return (
    <View style={[rootContainerStyle]}>
      <Image
        style={startIconStyle}
        source={require('../../assets/images/search.png')}
      />
      <TextInput
        style={textInputStyle}
        //onChangeText={val => props.onChangeText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={PLACE_HOLDER_TEXT}
        maxLength={28}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  rootContainerStyle: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 6,
    backgroundColor: '#dae5ed',
    alignItems: 'center',
  },
  startIconStyle: {
    flex: 1,
    width: ICON_SIZE,
    height: ICON_SIZE,
    margin: 12,
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInputStyle: {
    paddingStart: 32,
    fontSize: 16,
    fontWeight: '500',
  },
});
