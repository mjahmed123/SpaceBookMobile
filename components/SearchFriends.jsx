import React, { useState } from 'react';
import {
  Text, StyleSheet, View, TextInput, TouchableOpacity,
} from 'react-native';
import color from '../utils/colorSchemes';

export default function SearchFriends() {
  const [value, setValue] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  return (
    <View>
      <TextInput style={styles.searchBar} onChangeText={setValue} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} placeholder="Search Friends" />

      {(!!value || isInputFocused) && (
      <View style={styles.items}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.selectedTab]}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    margin: 10,
    marginBottom: 5,
    borderRadius: 8,
    color: 'white',
  },
  tabText: {
    color: 'white',
  },
  items: {

  },
  tabs: {
    height: 40,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255, 0.1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: color.PRIMARY,
  },
});
