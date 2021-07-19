import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBox from '../common/components/SearchBox';
import FoodCategory from '../common/components/FoodCategory';
import LoadingScreen from '../common/components/LoadingScreen';
import COLORS from '../styles/Colors';
import RestService from '../restService/FoodRepository';

const App = () => {
  const [foodItemList, setFoodItemList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalVisible, setModalVisibility] = useState(false);

  const toggleView = index => {
    setCurrentIndex(index === currentIndex ? null : index);
  };

  const saveData = async data => {
    try {
      if (data === null || data === undefined) {
        console.log('save data, null');
        return;
      }
      const jsonValue = JSON.stringify(data);
      if (jsonValue === null) {
        console.log('NULL json');
        return;
      }
      await AsyncStorage.setItem('KEY_FOOD_ITEMS', jsonValue);
    } catch (e) {
      console.log('unable to save data ', e);
    }
  };

  const isDataAvailable = async () => {
    try {
      const value = await AsyncStorage.getItem('KEY_FOOD_ITEMS');
      return value !== null;
    } catch (e) {
      console.log('isDataAvailble error', e);
    }
  };

  const updateData = async () => {
    try {
      const data = await AsyncStorage.getItem('KEY_FOOD_ITEMS');
      const jsonValue = data != null ? JSON.parse(data) : null;
      if (jsonValue === null) {
        console.log('unable to parse data');
        return;
      } else {
        setLoading(false);
        setFoodItemList(jsonValue.categories);
      }
    } catch (e) {
      // error reading value
      console.log('updateData: ', e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('KEY_FOOD_ITEMS');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  useEffect(() => {
    isDataAvailable()
      .then(isAvailble => {
        if (!isAvailble) {
          console.log('Fetch from the API');
          RestService().then(data => {
            saveData(data);
            setFoodItemList(data.categories);
            setLoading(false);
          });
        } else {
          updateData(); //fetch from local storage
        }
      })
      .catch(() => {
        console.log('catch');
      });
  }, []);

  const searchText = value => {
    console.log(value);
  };

  return (
    <SafeAreaView style={styles.parentContainerStyle}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Modal animationType="slide" visible={modalVisible} transparent={false}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.backgroundStyle}>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setModalVisibility(!modalVisible)}>
                <Image
                  style={styles.closeImageStyle}
                  source={require('../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
              <SearchBox searchText={val => searchText(val)} />
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
        </Modal>
      )}
      <TouchableOpacity onPress={() => setModalVisibility(!modalVisible)}>
        <Text>Open the sheet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_THEME_COLOR,
  },
  backgroundStyle: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.BACKGROUND_THEME_COLOR,
  },
  closeImageStyle: {
    width: 60,
    height: 60,
    marginVertical: 12,
  },
});

export default App;
