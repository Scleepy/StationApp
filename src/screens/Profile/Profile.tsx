import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {backgroundTheme, blackTheme} from '../../assets/colors';
import {UserInfoSection} from './components/UserInfoSection/UserInfoSection';
import {SettingSection} from './components/SupportSection/SettingSection';
import {ChangePasswordModal} from './components/Modal/ChangePasswordModal';
import {ChangeIPModal} from './components/Modal/ChangeIPModal';

const Profile = ({navigation}: any) => {
  const [isModalPasswordVisible, setIsModalPasswordVisible] = useState(false);
  const [isModalChangeIPVisible, setIsModalChangeIPVisible] = useState(false);

  return (
    <View style={styles.outerContainer}>
      {isModalPasswordVisible || isModalChangeIPVisible ? (
        <StatusBar backgroundColor={blackTheme} barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      )}
      <ScrollView>
        <UserInfoSection />
        <SettingSection
          navigation={navigation}
          onHandleModalChangePasswordVisible={setIsModalPasswordVisible}
          onHandleModalChangeIPVisible={setIsModalChangeIPVisible}
        />
      </ScrollView>

      <ChangePasswordModal
        isVisible={isModalPasswordVisible}
        onHandleModalVisible={setIsModalPasswordVisible}
      />
      <ChangeIPModal
        isVisible={isModalChangeIPVisible}
        onHandleModalVisible={setIsModalChangeIPVisible}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundTheme,
    paddingBottom: 60,
  },
});
