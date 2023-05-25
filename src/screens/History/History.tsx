import {StyleSheet, View, StatusBar, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import {backgroundTheme, blackTheme} from '../../assets/colors';
import {useRecycleHistoryData} from '../../redux/hooks/recycleHistoryHook';
import {RecycleHistoryItem} from './components/RecycleHistoryItem';

const History = () => {
  const [recycleHistory, setRecycleHistory] = useState(
    useRecycleHistoryData().recycleHistory,
  );

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <Text style={styles.textHeader}>Details</Text>
      <FlatList
        style={styles.recycleHistoryContainer}
        contentContainerStyle={styles.recycleHistoryContainerAlignment}
        data={recycleHistory}
        renderItem={({item}) => {
          return <RecycleHistoryItem RecycleHistoryData={item} />;
        }}
        keyExtractor={item => item.RecyclingID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundTheme,
  },
  recycleHistoryContainer: {
    width: '100%',
    marginBottom: 65,
  },
  recycleHistoryContainerAlignment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    marginTop: '5%',
    width: '90%',
    color: blackTheme,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default History;
