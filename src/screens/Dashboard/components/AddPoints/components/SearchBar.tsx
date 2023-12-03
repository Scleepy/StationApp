import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {blackTheme, redTheme} from '../../../../../assets/colors';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';
import axios from 'axios';
import {BASE_URL} from '@env';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/store';

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

  const isSuperUser = useSelector((state: RootState) => state.auth.IsSuperUser);
  const superUserBaseUrl = useSelector(
    (state: RootState) => state.baseUrl.BaseUrl,
  );

  const baseUrl = isSuperUser ? superUserBaseUrl : BASE_URL;

  const submitSearch = () => {
    console.log(`${baseUrl}/api/v1/student`);
    

    axios
      .get(`${baseUrl}/api/v1/student/${studentID}`)
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
    setStudentID('');
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
        placeholderTextColor={blackTheme}
        underlineColorAndroid="transparent"
        value={studentID}
        onChangeText={setStudentID}
        keyboardType="numeric"
        onSubmitEditing={() => submitSearch()}
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
