import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { rootStore } from "../stores/RootStore";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from "./Profile";
import Friends from "./Friends";
import NavigationBar from "../components/NavigationBar";
const Tab = createBottomTabNavigator();



export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <NavigationBar {...props} />} >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Friends" component={Friends} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})