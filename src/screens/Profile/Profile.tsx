import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {backgroundTheme, blackTheme} from '../../assets/colors';
import {UserInfoSection} from './components/UserInfoSection/UserInfoSection';
import {SettingSection} from './components/SupportSection/SettingSection';
import {ChangePasswordModal} from './components/ChangePasswordModal/ChangePasswordModal';

const Profile = ({navigation}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.outerContainer}>
      {isVisible ? (
        <StatusBar backgroundColor={blackTheme} barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      )}
      <ScrollView>
        <UserInfoSection />
        <SettingSection
          navigation={navigation}
          onHandleModalVisible={setIsVisible}
        />
      </ScrollView>

      <ChangePasswordModal
        isVisible={isVisible}
        onHandleModalVisible={setIsVisible}
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
  },
});
