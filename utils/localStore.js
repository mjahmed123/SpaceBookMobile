import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  if (!token) return;
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => AsyncStorage.getItem('token');

export const setUserId = async (id) => {
  if (!id) return;
  await AsyncStorage.setItem('userId', id);
};

export const getUserId = async () => AsyncStorage.getItem('userId');
