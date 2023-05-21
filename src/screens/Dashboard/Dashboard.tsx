import React from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {backgroundTheme} from './../../assets/colors';
import {AddPoints} from './components/AddPoints/AddPoints';
import {Missions} from './components/Missions/Missions';

const Dashboard = () => {
  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <ScrollView>
        <AddPoints />
        <Missions />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundTheme,
  },
});

export default Dashboard;
