import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  blackTheme,
  disabledGreenTheme,
  errorRedTheme,
  greenTheme,
  shadowColorTheme,
} from '../../../../assets/colors';
import {SearchBar} from './components/SearchBar';
import {NameField} from './components/NameField';
import {CategoryPicker} from './components/CategoryPicker';
import {WeightField} from './components/WeightField';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import {BASE_URL} from '@env';

interface AddPointsProps {
  onHandleLoading: (inputBoolean: boolean) => void;
  onHandleError: (inputBoolean: boolean) => void;
  onHandleSuccess: (inputBoolean: boolean) => void;
}

export const AddPoints = ({
  onHandleLoading,
  onHandleError,
  onHandleSuccess,
}: AddPointsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [categoryID, setCategoryID] = useState<string | null>(null);
  const [itemWeight, setItemWeight] = useState(0);
  const [shouldClear, setShouldClear] = useState(false);

  const stationID = useSelector((state: RootState) => state.auth.StationID);
  const adminID = useSelector((state: RootState) => state.auth.AdminID);

  const isFieldEmpty =
    studentID === '' ||
    studentName === '' ||
    categoryID === null ||
    itemWeight === 0 ||
    Number.isNaN(itemWeight);

  const onHandleStudentIDInput = (inputID: string, inputName: string) => {
    setStudentID(inputID);
    setStudentName(inputName);
  };

  const onClearFields = () => {
    setShouldClear(false);
  };

  const sendRequest = () => {
    console.log(`${BASE_URL}/api/v1/recycle`);

    setShouldClear(true);
    setStudentName('');

    console.log(studentID, categoryID, stationID, itemWeight);

    onHandleLoading(true);

    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/v1/recycle`,
        {
          studentID,
          categoryID,
          adminID,
          stationID,
          itemWeight,
        },
        {
          timeout: 10000,
        },
      )
      .then(() => {
        setTimeout(() => {
          onHandleSuccess(true);
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          onHandleError(true);
        }, 500);
      });
    setIsLoading(false);
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
              onHandleCategoryIDInput={setCategoryID}
              shouldClear={shouldClear}
            />
            <WeightField
              onHandleWeightInput={setItemWeight}
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
            <Text style={styles.sendRequestText}>Send Request</Text>
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
  errorButton: {
    backgroundColor: errorRedTheme,
  },
});
