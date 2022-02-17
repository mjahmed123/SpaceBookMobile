import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from './Profile';
import Friends from './Friends';
import Drafts from './Drafts';
import Settings from './Settings';
import NavigationBar from '../components/NavigationBar';

const Tab = createBottomTabNavigator();

const TabBar = (props) => NavigationBar(props);

export default function Home() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={TabBar}
        initialRouteName="Friends"
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Drafts" component={Drafts} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
