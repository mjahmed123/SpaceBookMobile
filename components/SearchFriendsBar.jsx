import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  setSearchFocused, isSearchFocused, onTextChanged, onRequestSearch,
}) {
  const [timeoutId, setTimeoutId] = useState(null);

  const [value, setValue] = useState('');
  const searchInputRef = useRef();

  const onClearPress = () => {
    searchInputRef.current.focus();
    setValue('');
    onRequestSearch('');
    onTextChanged('');
  };
  const onBackPress = () => {
    setValue('');
    onTextChanged('');
    onRequestSearch('');
    setSearchFocused(false);
  };

  const onTextChange = (val) => {
    onTextChanged(val);
    setValue(val);
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => {
      onRequestSearch(val);
    }, 1000));
  };
  const onInputFocus = () => setSearchFocused(true);

  return (
    <View style={styles.searchBarContainer}>
      {isSearchFocused && <Ionicons onPress={onBackPress} style={styles.icons} name="arrow-back-outline" size={22} color="white" />}
      <TextInput ref={searchInputRef} style={styles.searchBar} value={value} onChangeText={onTextChange} onFocus={onInputFocus} placeholder="Search..." />
      {!!value && <Ionicons onPress={onClearPress} style={styles.icons} name="close-sharp" size={22} color="white" />}
    </View>
  );
}
SearchBar.propTypes = {
  setSearchFocused: PropTypes.func,
  onTextChanged: PropTypes.func,
  onRequestSearch: PropTypes.func,
  isSearchFocused: PropTypes.bool,
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 10,
    marginBottom: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  icons: {
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    padding: 10,
    color: 'white',
    flex: 1,
  },

});
