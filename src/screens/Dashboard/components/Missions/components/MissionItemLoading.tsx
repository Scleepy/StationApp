import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  blackTheme,
  greenTheme,
  shadowColorTheme,
} from '../../../../../assets/colors';

export const MissionItemLoading = () => {
  return (
    <View style={styles.missionItem}>
      <Text style={styles.missionText}>Fetching Data...</Text>
      <View style={styles.missionItemSide} />
    </View>
  );
};

const styles = StyleSheet.create({
  missionItem: {
    height: '30%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: shadowColorTheme,
  },
  missionItemSide: {
    height: '100%',
    width: '5%',
    backgroundColor: greenTheme,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    position: 'absolute',
  },
  missionText: {
    textAlign: 'center',
    width: '100%',
    color: blackTheme,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
