import React from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {backgroundTheme} from './../../assets/colors';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';

const Dashboard = ({navigation}: any) => {

  //for debugging purposes, delete later
  const token = useSelector((state: RootState) => state.auth.token);
  const name = useSelector((state: RootState) => state.auth.name);
  const email = useSelector((state: RootState) => state.auth.email);
  const station = useSelector((state: RootState) => state.auth.station);

  console.log(token, name, email, station);

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <Text>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: backgroundTheme,
  },
});

export default Dashboard;
