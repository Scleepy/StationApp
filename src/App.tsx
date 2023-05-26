import React, {useCallback, useState} from 'react';
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
import {blackTheme, greyTheme} from './assets/colors';
import HomeIcon from './assets/icons/HomeIcon';
import HistoryIcon from './assets/icons/HistoryIcon';
import History from './screens/History/History';
import ProfileIcon from './assets/icons/ProfileIcon';
import Profile from './screens/Profile/Profile';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const Tab = createBottomTabNavigator();

  const RenderHomeIcon = useCallback(({focused}: {focused: boolean}) => {
    return <HomeIcon color={focused ? blackTheme : greyTheme} />;
  }, []);

  const RenderHistoryIcon = useCallback(({focused}: {focused: boolean}) => {
    return <HistoryIcon color={focused ? blackTheme : greyTheme} />;
  }, []);

  const RenderProfileIcon = useCallback(({focused}: {focused: boolean}) => {
    return <ProfileIcon color={focused ? blackTheme : greyTheme} />;
  }, []);

  const [shouldRefresh, setShouldRefresh] = useState(false);

  const onRecycleHistoryChangeHandler = useCallback(() => {
    setShouldRefresh(true);
  }, []);

  const resetShouldRefresh = () => {
    setShouldRefresh(false);
  };

  const RenderDashboard = useCallback(
    () => <Dashboard onRecycleHistoryChange={onRecycleHistoryChangeHandler} />,
    [onRecycleHistoryChangeHandler],
  );

  const RenderHistory = useCallback(
    () => (
      <History
        shouldRefresh={shouldRefresh}
        resetShouldRefresh={resetShouldRefresh}
      />
    ),
    [shouldRefresh],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: navigationTheme,
          position: 'absolute',
        },
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Poppins-SemiBold',
          marginTop: 20,
        },
        headerStyle: {
          backgroundColor: backgroundTheme,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={RenderDashboard}
        options={{
          tabBarIcon: RenderHomeIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={RenderHistory}
        options={{
          tabBarIcon: RenderHistoryIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={Profile}
        options={{
          tabBarIcon: RenderProfileIcon,
          tabBarShowLabel: false,
        }}
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
