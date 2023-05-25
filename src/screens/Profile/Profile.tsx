import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import {backgroundTheme} from '../../assets/colors';
import {UserInfoSection} from './components/UserInfoSection/UserInfoSection';
import {SettingSection} from './components/SupportSection/SettingSection';

const Profile = ({navigation}: any) => {
  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <ScrollView>
        <UserInfoSection />
        <SettingSection navigation={navigation} />
      </ScrollView>
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
