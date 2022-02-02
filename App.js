import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// views
import Register from './views/Register';
import Login from './views/Login';
import StartPage from './views/StartPage';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='StartPage'>
            <Stack.Screen name="StartPage" component={StartPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  innerContainer: {
    width: 300, 
    height: 500, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});