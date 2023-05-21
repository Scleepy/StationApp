import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {blackTheme, disabledTheme} from '../../../../../assets/colors';

export const NameField = () => {
  const [studentName, setStudentName] = useState('');

  return (
    <View style={styles.searchNameContainer}>
      <TextInput
        style={styles.nameInput}
        placeholder="Name"
        placeholderTextColor="#000"
        value={studentName}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchNameContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    backgroundColor: disabledTheme,
    borderRadius: 8,
    justifyContent: 'space-evenly',
  },
  nameInput: {
    width: '95%',
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
  },
});
