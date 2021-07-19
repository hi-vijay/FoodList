import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TitleFoodItems from './TitleFoodItems';
import COLORS from '../../styles/Colors';
import {Transitioning, Transition} from 'react-native-reanimated';

// List expand/collapse transition
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={300} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={300} />
  </Transition.Together>
);

const FoodCategory = props => {
  const {
    categoryName,
    quote = '',
    colorCode = COLORS.TEXT_COLOR,
    subcategories = [],
    servingText = '',
  } = props.foodItemList.category;

  console.log('name= ', categoryName);
  const {
    rootContainerStyle,
    arrowStyle,
    imageContainer,
    imageStyle,
    textStyle,
    servingTextStyle,
    cardContainer,
    quoteTextContainer,
    quoteTextStyle,
  } = styles;

  const {index, expand = false} = props;
  const ref = React.useRef();

  const showOrHideBottomSheet = () => {
    console.log('show or hide');
    props.onClick(index);
  };

  return (
    <Transitioning.View
      transition={transition}
      style={rootContainerStyle}
      ref={ref}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          ref.current.animateNextTransition();
          showOrHideBottomSheet();
        }}
        style={cardContainer}>
        <View style={imageContainer}>
          <Image
            style={imageStyle}
            source={require('../../assets/images/ic_food.png')}
          />
          <Text style={[textStyle, {color: colorCode}]}>{categoryName}</Text>
          {false && (
            <Text numberOfLines={1} style={servingTextStyle}>
              {servingText}
            </Text>
          )}
        </View>
        <Image
          style={arrowStyle}
          source={require('../../assets/images/ic_up_arrow.png')}
        />
      </TouchableOpacity>
      {expand &&
        subcategories.map(subCategory => {
          const {subCategoryname, items} = subCategory;
          return (
            <TitleFoodItems
              key={subCategoryname}
              title={subCategoryname}
              titleColor={colorCode}
              foodItemList={items}
            />
          );
        })}
      {quote !== '' && expand && (
        <View style={quoteTextContainer}>
          <Text style={quoteTextStyle}>{quote}</Text>
        </View>
      )}
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 8,
    marginVertical: 12,
  },
  cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
    margin: 12,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  servingTextStyle: {
    fontSize: 15,
    color: COLORS.TEXT_COLOR,
    fontWeight: '400',
    marginStart: 4,
    flexShrink: 1,
  },
  arrowStyle: {
    width: 12,
    height: 12,
    margin: 10,
  },
  quoteTextContainer: {
    borderRadius: 8,
    backgroundColor: COLORS.SEPARATOR_LINE_COLOR,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 18,
  },
  quoteTextStyle: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    paddingHorizontal: 16,
    color: 'grey',
  },
});

export default FoodCategory;
