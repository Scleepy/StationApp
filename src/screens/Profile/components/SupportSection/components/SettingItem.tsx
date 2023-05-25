import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {blackTheme, redTheme} from '../../../../../assets/colors';
import {SvgProps} from 'react-native-svg';

interface SupportIconProps {
  supportText: string;
  Icon: React.FC<SvgProps>;
  action: () => void;
}

export const SettingItem = ({Icon, supportText, action}: SupportIconProps) => {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.innerContainer} onPress={action}>
        <View style={styles.iconContainer}>
          <Icon />
        </View>
        <Text style={styles.textTitle}>{supportText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: {
    width: '80%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  innerContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: redTheme,
    height: screenWidth * 0.12,
    width: screenWidth * 0.12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: '5%',
    color: blackTheme,
  },
});
