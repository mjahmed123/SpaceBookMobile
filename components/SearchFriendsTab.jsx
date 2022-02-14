import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import color from '../utils/colorSchemes';

export default function Tabs({ selectedTab, onTabClicked }) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        onPress={() => onTabClicked(0)}
        style={[styles.tab, selectedTab === 0 && styles.selectedTab]}
      >
        <Text style={styles.tabText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabClicked(1)}
        style={[styles.tab, selectedTab === 1 && styles.selectedTab]}
      >
        <Text style={styles.tabText}>Friends</Text>
      </TouchableOpacity>
    </View>
  );
}
Tabs.propTypes = {
  selectedTab: PropTypes.number,
  onTabClicked: PropTypes.func,
};
const styles = StyleSheet.create({
  tabText: {
    color: 'white',
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
