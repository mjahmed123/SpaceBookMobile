import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { rootStore } from "../stores/RootStore";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from "./Feed";
import NavigationBar from "../components/NavigationBar";
const Tab = createBottomTabNavigator();



export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <NavigationBar {...props} />} >
        <Tab.Screen name="Feed" component={Feed} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})