import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {backgroundTheme} from './assets/colors';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  changeNavigationBarColor(backgroundTheme, true);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
