import React, {useState} from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SearchBox from '../common/components/SearchBox';
import FoodCategory from '../common/components/FoodCategory';
import LoadingScreen from '../common/components/LoadingScreen';
import COLORS from '../styles/Colors';
import RestService from '../restService/FoodRepository';
import {KEY_FOOD_ITEMS} from '../config/Const';

const App = () => {
  const [foodItemList, setFoodItemList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleView = index => {
    setCurrentIndex(index === currentIndex ? null : index);
  };

  const saveData = async data => {
    //save into async storage
    console.log('save data');
    try {
      if (data === null || data === undefined) {
        console.log('save data, null');
        return;
      }
      console.log('savedata, not null');
      //console.log('save this data ', data);
      const jsonValue = JSON.stringify(data);
      if (jsonValue === null) {
        console.log('NULL json');
        return;
      }
      //console.log('json string ', jsonValue);
      //AsyncStorage.setItem(KEY_FOOD_ITEMS, jsonValue); //error on this line
    } catch (e) {
      //console.log('unable to save data ', e);
    }
  };

  RestService.then(data => {
    console.log('fetch complete ', data);
    setFoodItemList(data.categories);
    saveData(data.categories);
    setLoading(false);
  }).catch(error => console.log('error' + error));

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.BACKGROUND_THEME_COLOR}}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.backgroundStyle}>
          <View style={styles.elevation}>
            <SearchBox />
            {!isLoading &&
              foodItemList.map((items, index) => {
                return (
                  <FoodCategory
                    key={index}
                    foodItemList={items}
                    index={index}
                    expand={index === currentIndex}
                    onClick={itemID => toggleView(itemID)}
                  />
                );
              })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_THEME_COLOR,
  },
  backgroundStyle: {
    marginHorizontal: 16,
  },
  elevation: {
    borderRadius: 6,
  },
});

export default App;
