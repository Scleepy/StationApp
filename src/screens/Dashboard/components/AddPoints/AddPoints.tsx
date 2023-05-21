import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {blackTheme, greenTheme, shadowColor} from '../../../../assets/colors';
import {SearchBar} from './components/SearchBar';
import {NameField} from './components/NameField';
import {CategoryPicker} from './components/CategoryPicker';
import {WeightField} from './components/WeightField';

export const AddPoints = () => {
  const [isLoading, setLoading] = useState(false);
  const [studentID, setStudentID] = useState('');
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [weight, setWeight] = useState('');

  console.log(studentID);
  console.log(name);
  console.log(categoryID);
  console.log(weight);

  const onHandleStudentIDInput = (inputText: string) => {
    setStudentID(inputText);
  };

  const sendRequest = () => {
    setLoading(true);
  };

  return (
    <View style={styles.outerContainerSectionPoints}>
      <Text style={styles.textHeader}>Add Points</Text>
      <View style={styles.addPointsBackground}>
        <View style={styles.addPointsInnerContainer}>
          <SearchBar onHandleStudentIDInput={onHandleStudentIDInput} />
          <NameField />
          <View style={styles.recycleDetail}>
            <CategoryPicker />
            <WeightField />
          </View>
          <TouchableOpacity
            style={styles.sendRequestButton}
            onPress={sendRequest}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.sendRequestText}>Send Request</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  outerContainerSectionPoints: {
    width: '100%',
    height: screenHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPointsBackground: {
    width: '90%',
    height: '80%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: shadowColor,
  },
  textHeader: {
    marginBottom: 5,
    width: '90%',
    color: blackTheme,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  addPointsInnerContainer: {
    width: '85%',
    height: '80%',
    justifyContent: 'space-between',
  },
  sendRequestButton: {
    backgroundColor: greenTheme,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '20%',
    borderRadius: 8,
    zIndex: -1,
  },
  sendRequestText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 14,
  },
  recycleDetail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '20%',
  },
});
