import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {blackTheme} from '../../../../../assets/colors';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';

interface SearchBarProps {
  onHandleStudentIDInput: (input: string) => void;
}

export const SearchBar = ({onHandleStudentIDInput}: SearchBarProps) => {
  const [studentID, setStudentID] = useState('');

  const onStudentIDChangeHandler = (input: string) => {
    setStudentID(input);
  };

  const submitSearch = () => {
    onHandleStudentIDInput(studentID);
  };

  const clearSearch = () => {
    onStudentIDChangeHandler('');
  };

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity activeOpacity={1} onPress={submitSearch}>
        <SearchIcon />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search NIM"
        placeholderTextColor="#000"
        underlineColorAndroid="transparent"
        value={studentID}
        onChangeText={onStudentIDChangeHandler}
      />
      <TouchableOpacity activeOpacity={1} onPress={clearSearch}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: '70%',
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
  },
  searchBarContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: blackTheme,
  },
});
