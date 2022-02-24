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

// format: {userId, text}[]
export const getDrafts = async () => {
  const stringifiedDrafts = await AsyncStorage.getItem('drafts');
  return JSON.parse(stringifiedDrafts || '[]');
};

export const addDraft = async (userId, text, firstName) => {
  const drafts = await getDrafts();
  drafts.push({
    userId, text, firstName, timestamp: Date.now(),
  });
  await AsyncStorage.setItem('drafts', JSON.stringify(drafts));
};
export const removeDraft = async (index) => {
  const drafts = await getDrafts();
  const newDrafts = drafts.filter((_, i) => i !== index);
  await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
};
