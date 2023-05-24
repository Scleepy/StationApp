import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {backgroundTheme, blackTheme} from './../../assets/colors';
import {AddPoints} from './components/AddPoints/AddPoints';
import {Missions} from './components/Missions/Missions';
import {CustomModal} from './components/CustomModal/CustomModal';

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <View style={styles.outerContainer}>
      {isVisible ? (
        <StatusBar backgroundColor={blackTheme} barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      )}
      <ScrollView>
        <AddPoints
          onHandleLoading={setIsVisible}
          onHandleError={setIsError}
          onHandleSuccess={setIsSuccess}
        />
        <Missions />
      </ScrollView>
      <CustomModal
        isVisible={isVisible}
        isSuccess={isSuccess}
        isError={isError}
        setIsVisible={setIsVisible}
        setIsSuccess={setIsSuccess}
        setIsError={setIsError}
      />
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
