import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FoodItem from './FoodItem';
import COLORS from '../../styles/Colors';

const TitleFoodItems = props => {
  const {titleColor, title, foodItemList} = props;
  const LAST_INDEX = foodItemList.length - 1;

  const {containerStyle, titleStyle} = styles;

  return (
    <View style={containerStyle}>
      {title !== '' && (
        <Text style={[titleStyle, {color: titleColor}]}>{title}</Text>
      )}
      {foodItemList.map((foodItem, index) => {
        // eslint-disable-next-line prettier/prettier
        return (index === LAST_INDEX) ? (
          <FoodItem
            key={foodItem}
            foodItem={foodItem}
            style={{borderBottomWidth: 0}}
          />
        ) : (
          <FoodItem key={foodItem} foodItem={foodItem} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_COLOR,
    paddingTop: 16,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    paddingHorizontal: 12,
  },
});

export default TitleFoodItems;
