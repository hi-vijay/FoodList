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
import Tiles from '../common/components/Tiles';

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
              <Text style={styles.titleStyle}>Approved food List</Text>
              <SearchBox searchText={value => searchText(value)} />
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
      <View style={styles.tilesRootContainer}>
        <View style={styles.tileContainer}>
          <Tiles
            text={'View Approved food list'}
            onClick={() => setModalVisibility(!modalVisible)}
          />
        </View>
        <View style={styles.tileContainer}>
          <Tiles text={'Weight'} />
        </View>
        <View style={styles.tileContainer}>
          <Tiles text={'Water Intake'} />
        </View>
        <View style={styles.tileContainer}>
          <Tiles text={'Body measurements'} />
        </View>
        <View style={styles.tileContainer}>
          <Tiles text={'Inches Lost'} />
        </View>
        <View style={styles.tileContainer}>
          <Tiles text={'Day performance'} />
        </View>
      </View>
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
    marginTop: 16,
  },
  tilesRootContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  tileContainer: {
    width: '50%',
    aspectRatio: 1,
    padding: 8,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    marginTop: 18,
    marginBottom: 18,
  },
});

export default App;
