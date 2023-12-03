import React from 'react';
import {Dimensions, StyleSheet, View, Linking} from 'react-native';
import {blackTheme, greyTheme} from '../../../../assets/colors';
import ChangePasswordIcon from '../../../../assets/icons/ChangePasswordIcon';
import SupportIcon from '../../../../assets/icons/SupportIcon';
import LogoutIcon from '../../../../assets/icons/LogoutIcon';
import EditIPIcon from '../../../../assets/icons/EditIPIcon';
import {SettingItem} from './components/SettingItem';
import {RootState, store} from '../../../../redux/store';
import {clearUserData} from '../../../../redux/reducers/authReducer';
import {useSelector} from 'react-redux';

interface SettingSectionModalProps {
  onHandleModalChangePasswordVisible: (inputBoolean: boolean) => void;
  onHandleModalChangeIPVisible: (inputBoolean: boolean) => void;
  navigation: any;
}

export const SettingSection = ({
  onHandleModalChangePasswordVisible,
  onHandleModalChangeIPVisible,
  navigation,
}: SettingSectionModalProps) => {
  const changePassword = () => {
    console.log('changePassword');
    onHandleModalChangePasswordVisible(true);
  };

  const editIP = () => {
    console.log('changePassword');
    onHandleModalChangeIPVisible(true);
  };

  const supportCenter = () => {
    console.log('supportCenter');
    const emailAddress = 'mailto:daniel.yohanes@binus.ac.id';

    Linking.canOpenURL(emailAddress).then(valid => {
      console.log(valid);
      if (valid) {
        return Linking.openURL(emailAddress);
      } else {
        console.log("Can't handle url:" + emailAddress);
      }
    });
  };

  const logOut = () => {
    console.log('logOut');
    navigation.replace('Login');
    store.dispatch(clearUserData());
  };

  const isSuperUser = useSelector((state: RootState) => state.auth.IsSuperUser);
  console.log(isSuperUser);

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
        {isSuperUser && (
          <>
            <View style={styles.divider} />
            <SettingItem
              Icon={EditIPIcon}
              supportText={'Admin Operations'}
              action={editIP}
            />
          </>
        )}
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
