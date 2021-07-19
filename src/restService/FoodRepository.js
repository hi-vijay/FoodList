import React from 'react';
import axios from 'axios';

const data = () =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      baseURL: 'https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0',
      responseType: 'json',
    })
      .then(foodItems => {
        resolve(foodItems.data);
      })
      .catch(error => {
        console.log('error occured');
        reject(error);
      });
  });

export default data;
