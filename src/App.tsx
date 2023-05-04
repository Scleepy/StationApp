import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {backgroundTheme, navigationTheme} from './assets/colors';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

const MainScreen = ({navigation}: any) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: navigationTheme,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

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
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
