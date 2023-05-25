import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {blackTheme, greyTheme} from '../../../../assets/colors';
import ChangePasswordIcon from '../../../../assets/icons/ChangePasswordIcon';
import SupportIcon from '../../../../assets/icons/SupportIcon';
import LogoutIcon from '../../../../assets/icons/LogoutIcon';
import {SettingItem} from './components/SettingItem';
import {store} from '../../../../redux/store';
import {clearUserData} from '../../../../redux/reducers/authReducer';

export const SettingSection = ({navigation}: any) => {
  const changePassword = () => {
    console.log('changePassword');
  };

  const supportCenter = () => {
    console.log('supportCenter');
  };

  const logOut = () => {
    console.log('logOut');
    navigation.replace('Login');
    store.dispatch(clearUserData());
  };

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.innerSettingsContainer}>
        <SettingItem
          Icon={ChangePasswordIcon}
          supportText={'Change Password'}
          action={changePassword}
        />
        <View style={styles.divider} />
        <SettingItem
          Icon={SupportIcon}
          supportText={'Support Center'}
          action={supportCenter}
        />
        <View style={styles.divider} />
        <SettingItem
          Icon={LogoutIcon}
          supportText={'Log Out'}
          action={logOut}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: 'white',
    height: screenHeight * 0.45,
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: blackTheme,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  innerSettingsContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: greyTheme,
    width: '80%',
    height: 1,
  },
});
