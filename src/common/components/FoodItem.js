import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../styles/Colors';

const FoodItem = props => {
  const {foodItem, style = {}} = props;
  const {containerStyle, textStyle} = styles;
  return (
    <View style={[containerStyle, style]}>
      <Text style={textStyle}>{foodItem}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SEPARATOR_LINE_COLOR,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.TEXT_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 12,
    letterSpacing: 0.4,
  },
});

export default FoodItem;
