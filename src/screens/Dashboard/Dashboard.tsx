import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {backgroundTheme, blackTheme} from './../../assets/colors';
import {AddPoints} from './components/AddPoints/AddPoints';
import {Missions} from './components/Missions/Missions';
import {CustomModal} from './components/CustomModal/CustomModal';

interface RenderDashboardProps {
  onRecycleHistoryChange: () => void;
}

const Dashboard = ({onRecycleHistoryChange}: RenderDashboardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      onRecycleHistoryChange();
    }
  }, [isSuccess, onRecycleHistoryChange]);

  const onHandleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <View style={styles.outerContainer}>
      {isVisible ? (
        <StatusBar backgroundColor={blackTheme} barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onHandleRefresh} />
        }>
        <AddPoints
          onHandleLoading={setIsVisible}
          onHandleError={setIsError}
          onHandleSuccess={setIsSuccess}
        />
        <Missions refreshing={refreshing} />
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
