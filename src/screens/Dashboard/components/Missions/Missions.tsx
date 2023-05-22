import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {blackTheme} from '../../../../assets/colors';
import {MissionItem} from './components/MissionItem';
import {MissionItemLoading} from './components/MissionItemLoading';
import axios from 'axios';

interface MissionData {
  MissionID: string;
  ItemAmount: number;
  CategoryName: string;
}

export const Missions = () => {
  const [firstMission, setFirstMission] = useState<MissionData | null>(null);
  const [secondMission, setSecondMission] = useState<MissionData | null>(null);
  const [thirdMission, setThirdMission] = useState<MissionData | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/v1/daily-mission`,
          {
            timeout: 2000,
          },
        );
        setFirstMission(response.data.data[0]);
        setSecondMission(response.data.data[1]);
        setThirdMission(response.data.data[2]);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <View style={styles.outerContainerSectionMissions}>
      <Text style={styles.textHeader}>Planet-Saving Missions</Text>
      <View style={styles.missionBackground}>
        {isLoading ? (
          <>
            <MissionItemLoading />
            <MissionItemLoading />
            <MissionItemLoading />
          </>
        ) : (
          <>
            <MissionItem missionData={firstMission} />
            <MissionItem missionData={secondMission} />
            <MissionItem missionData={thirdMission} />
          </>
        )}
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  outerContainerSectionMissions: {
    width: '100%',
    height: screenHeight * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 65,
    zIndex: -1,
  },
  missionBackground: {
    width: '90%',
    height: '70%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeader: {
    marginBottom: 5,
    width: '90%',
    color: blackTheme,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});