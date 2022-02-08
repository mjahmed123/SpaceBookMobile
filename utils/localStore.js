import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => AsyncStorage.getItem('token');

export const setUserId = async (id) => {
  await AsyncStorage.setItem('userId', id);
};

export const getUserId = async () => AsyncStorage.getItem('userId');
