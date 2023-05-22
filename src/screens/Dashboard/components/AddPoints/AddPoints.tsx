import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  blackTheme,
  disabledGreenTheme,
  greenTheme,
  shadowColorTheme,
} from '../../../../assets/colors';
import {SearchBar} from './components/SearchBar';
import {NameField} from './components/NameField';
import {CategoryPicker} from './components/CategoryPicker';
import {WeightField} from './components/WeightField';

export const AddPoints = () => {
  const [isLoading, setLoading] = useState(false);
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [categoryID, setCategoryID] = useState<string | null>(null);
  const [weight, setWeight] = useState(0);
  const [shouldClear, setShouldClear] = useState(false);

  const isFieldEmpty =
    studentID === '' ||
    studentName === '' ||
    categoryID === null ||
    weight === 0;

  const onHandleStudentIDInput = (inputID: string, inputName: string) => {
    setStudentID(inputID);
    setStudentName(inputName);
  };

  const onHandleWeightInput = (inputWeight: number) => {
    setWeight(inputWeight);
  };

  const onHandleCategoryIDInput = (inputCategoryID: string | null) => {
    setCategoryID(inputCategoryID);
  };

  const onClearFields = () => {
    setShouldClear(false);
  };

  const sendRequest = () => {
    setShouldClear(true);
    setStudentName('');

    //call axios here
    //setLoading(true);
  };

  return (
    <View style={styles.outerContainerSectionPoints}>
      <Text style={styles.textHeader}>Add Points</Text>
      <View style={styles.addPointsBackground}>
        <View style={styles.addPointsInnerContainer}>
          <SearchBar
            onHandleStudentIDInput={onHandleStudentIDInput}
            shouldClear={shouldClear}
            onClearFields={onClearFields}
          />
          <NameField studentName={studentName} />
          <View style={styles.recycleDetail}>
            <CategoryPicker
              onHandleCategoryIDInput={onHandleCategoryIDInput}
              shouldClear={shouldClear}
            />
            <WeightField
              onHandleWeightInput={onHandleWeightInput}
              shouldClear={shouldClear}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendRequestButton,
              isFieldEmpty && styles.disabledButton,
            ]}
            onPress={sendRequest}
            disabled={isLoading || isFieldEmpty}>
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
    shadowColor: shadowColorTheme,
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
  disabledButton: {
    backgroundColor: disabledGreenTheme,
  },
});
