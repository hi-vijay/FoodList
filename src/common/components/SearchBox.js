import React from 'react';
import {TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native';

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
    <TouchableOpacity activeOpacity={1} style={[rootContainerStyle]}>
      <Image
        style={startIconStyle}
        source={require('../../assets/images/search.png')}
      />
      <TextInput
        style={textInputStyle}
        onChangeText={val => props.searchText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={PLACE_HOLDER_TEXT}
        maxLength={28}
      />
    </TouchableOpacity>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  rootContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 18,
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
    width: '100%',
    paddingStart: 32,
    paddingVertical: 18,
    fontSize: 16,
    fontWeight: '500',
  },
});
