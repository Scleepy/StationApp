import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {blackTheme, greenTheme, shadowColorTheme} from '../../../assets/colors';

interface RecycleHistoryData {
  RecyclingID: string;
  StudentName: string;
  StudentID: string;
  RecyclingDate: Date;
  CategoryName: string;
  ItemWeight: number;
  PointsObtained: number;
}

interface RecycleHistoryItemProps {
  RecycleHistoryData: RecycleHistoryData;
}

export const RecycleHistoryItem = ({
  RecycleHistoryData,
}: RecycleHistoryItemProps) => {
  const studentName = RecycleHistoryData.StudentName.slice(0, 8) + '..';

  const options = {
    hour12: true,
    timeZone: 'UTC',
  };

  const recyclingDateTime = new Date(
    RecycleHistoryData.RecyclingDate,
  ).toLocaleString(undefined, options);

  return (
    <View style={styles.recycleHistoryItem}>
      <View style={styles.recycleHistoryItemSide} />
      <View style={styles.mainInfoContainer}>
        <View style={styles.recycleHistoryInfoContainer}>
          <Text style={styles.studentInfoText}>
            {studentName} ({RecycleHistoryData.StudentID})
          </Text>
          <Text style={styles.completionInfo}>Completed</Text>
          <Text style={styles.completedTime}>{recyclingDateTime}</Text>
        </View>
        <View style={styles.recycleInfoContainer}>
          <Text style={styles.categoryName}>
            {RecycleHistoryData.CategoryName}
          </Text>
          <Text style={styles.categoryInfo}>
            {RecycleHistoryData.ItemWeight}Kg -{' '}
            {RecycleHistoryData.PointsObtained} Points
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recycleHistoryItem: {
    marginBottom: 15,
    height: 110,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: shadowColorTheme,
  },
  recycleHistoryItemSide: {
    height: '100%',
    width: '4%',
    backgroundColor: greenTheme,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    width: '96%',
    justifyContent: 'space-evenly',
  },
  studentInfoText: {
    color: blackTheme,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  completionInfo: {
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  completedTime: {
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
  recycleHistoryInfoContainer: {
    width: '55%',
  },
  recycleInfoContainer: {
    width: '35%',
    backgroundColor: greenTheme,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  categoryInfo: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
});
