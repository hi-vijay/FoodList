import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingScreen = () => {
  const {rootContainerStyle, textStyle} = styles;
  return (
    <View style={rootContainerStyle}>
      <ActivityIndicator />
      <Text style={textStyle}>fetching data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
  },
});

export default LoadingScreen;
