import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { rootStore } from './stores/RootStore';
import { getToken } from './utils/token';
import { observer } from 'mobx-react-lite';


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// views
import Register from './views/Register';
import Login from './views/Login';
import StartPage from './views/StartPage';
import Home from './views/Home';


const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

async function getAsyncStorageToken() {
  const token = await getToken();
  rootStore.account.setToken(token || undefined, false);
}
getAsyncStorageToken();

export default observer(() => {
  const {account} = rootStore;

  if (account.token === null) {
    return <NavigationContainer theme={navTheme}></NavigationContainer>
  }


  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={account.token ? 'Home' : "StartPage"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}) 
