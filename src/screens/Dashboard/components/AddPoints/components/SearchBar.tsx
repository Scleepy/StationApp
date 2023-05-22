import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {blackTheme, redTheme} from '../../../../../assets/colors';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';
import axios from 'axios';

interface SearchBarProps {
  onHandleStudentIDInput: (inputID: string, inputName: string) => void;
  shouldClear: boolean;
  onClearFields: () => void;
}

export const SearchBar = ({
  onHandleStudentIDInput,
  shouldClear,
  onClearFields,
}: SearchBarProps) => {
  const [studentID, setStudentID] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (shouldClear) {
      setStudentID('');
      onClearFields();
    }
  }, [onClearFields, shouldClear]);

  const onStudentIDChangeHandler = (input: string) => {
    setStudentID(input);
  };

  const submitSearch = () => {
    axios
      .post(`${process.env.BASE_URL}/api/v1/student/specific`, {studentID})
      .then(res => {
        onHandleStudentIDInput(studentID, res.data.data.StudentName);
        setIsError(false);
      })
      .catch(() => {
        onHandleStudentIDInput('', '');
        setIsError(true);
      });
  };

  const clearSearch = () => {
    onStudentIDChangeHandler('');
    onHandleStudentIDInput('', '');
  };

  return (
    <View style={[styles.searchBarContainer, isError && styles.onError]}>
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
        keyboardType="numeric"
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
  onError: {
    borderColor: redTheme,
  },
});