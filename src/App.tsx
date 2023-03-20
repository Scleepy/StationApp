import React from 'react';
import {StatusBar, View} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ViewCodes from './screens/viewCodes';

function App() {
  changeNavigationBarColor('#F5F4F9', true);
  return (
    <View>
      <StatusBar backgroundColor={'#F5F4F9'} barStyle="dark-content" />
      <ViewCodes />
    </View>
  );
}

export default App;
