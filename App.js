import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { rootStore } from './stores/RootStore';
import { getToken, getUserId } from './utils/localStore';
import color from './utils/colorSchemes';

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
    background: color.BACKGROUND,
  },
};

async function getAsyncStorageToken() {
  const token = await getToken();
  const userId = await getUserId();
  rootStore.account.setLoggedInDetails(token || undefined, userId || undefined, false);
}
getAsyncStorageToken();

export default observer(() => {
  const { account } = rootStore;

  if (account.token === null) {
    return <NavigationContainer theme={navTheme} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={account.token ? 'Home' : 'StartPage'}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
