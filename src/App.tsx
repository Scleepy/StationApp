import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login/Login';
import {backgroundTheme} from './assets/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  changeNavigationBarColor(backgroundTheme, true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
