import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {
  backgroundTheme,
  blackTheme,
  redTheme,
  whiteTheme,
} from '../../../../assets/colors';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';

export const UserInfoSection = () => {
  const stationName = useSelector(
    (state: RootState) => state.auth.BuildingName,
  );
  const adminName = useSelector((state: RootState) => state.auth.AdminName);
  const adminEmail = useSelector((state: RootState) => state.auth.AdminEmail);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileInnerContainer}>
        <View style={styles.profilePicture}>
          <Image
            source={require('../../../../assets/images/userSprite.png')}
            style={styles.userImage}
          />
        </View>
        <View>
          <Text style={styles.nameText}>{adminName}</Text>
          <Text style={styles.emailText}>{adminEmail}</Text>
        </View>

        <View style={styles.stationContainer}>
          <Text style={styles.stationText}>BINUS {stationName} Station</Text>
        </View>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundTheme,
  },
  profileContainer: {
    height: screenHeight * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    backgroundColor: redTheme,
    height: screenWidth * 0.35,
    width: screenWidth * 0.35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: blackTheme,
    textAlign: 'center',
  },
  emailText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: blackTheme,
    marginTop: -5,
    textAlign: 'center',
  },
  stationContainer: {
    backgroundColor: redTheme,
    width: screenWidth * 0.5,
    height: screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  stationText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: whiteTheme,
    textAlign: 'center',
  },
  userImage: {
    height: '65%',
    width: '65%',
    resizeMode: 'contain',
  },
  profileInnerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '67%',
  },
});
