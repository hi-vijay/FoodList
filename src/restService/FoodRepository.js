import React from 'react';
import {View, Button, Text} from 'react-native';
import URL from './URLs';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

const data = axios({
  method: 'get',
  baseURL: 'https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0',
  responseType: 'json',
})
  .then(foodItems => {
    return foodItems.data;
  })
  .catch(error => {
    console.log('error occured');
    return error;
  });

export default data;
