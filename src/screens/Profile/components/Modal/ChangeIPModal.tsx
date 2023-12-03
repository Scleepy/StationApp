import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  blackTheme,
  errorRedTheme,
  redTheme,
  whiteTheme,
} from '../../../../assets/colors';
import {TextField} from './components/TextField';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../../../redux/store';
import {
  BaseUrlState,
  setBaseUrl,
} from '../../../../redux/reducers/baseUrlReducer';
import {BASE_URL} from '@env';

import axios from 'axios';

interface ChangePasswordModalProps {
  isVisible: boolean;
  onHandleModalVisible: (inputBoolean: boolean) => void;
}

export const ChangeIPModal = ({
  isVisible,
  onHandleModalVisible,
}: ChangePasswordModalProps) => {
  const originalAddress = useSelector(
    (state: RootState) => state.baseUrl.BaseUrl,
  ).replace(/^https?:\/\//, '');

  const [errorText, setErrorText] = useState('');
  const [isError, setError] = useState(false);
  const [ipAddress, setIpAddress] = useState(originalAddress);

  const handleModalClose = () => {
    onHandleModalVisible(false);
    setError(false);
    setIpAddress(originalAddress);
  };

  const checkIsValid = () => {
    const ipAddressRegex = /\b(?:\d{1,3}\.){3}\d{1,3}:3000\b/;
    if (!ipAddressRegex.test(ipAddress)) {
      setErrorText('Must be a valid IP address');
      setError(true);
    } else {
      setErrorText('IP changed successfully');
      setError(true);
      changeIPAddress();
    }
  };

  const isSuperUser = useSelector((state: RootState) => state.auth.IsSuperUser);
  const superUserBaseUrl = useSelector(
    (state: RootState) => state.baseUrl.BaseUrl,
  );

  const baseUrl = isSuperUser ? superUserBaseUrl : BASE_URL;

  const handleResponseError = (err: any) => {
    if (err.code !== 'ECONNABORTED') {
      setErrorText(err.response.data.error);
    } else {
      setErrorText('Server error, please try again later');
    }
    setError(true);
  };

  const handleResponseSuccess = () => {
    setErrorText('Daily reset successfully');
    setError(true);
  };

  const resetDaily = () => {
    console.log(`${baseUrl}/api/v1/daily-mission/reset-daily`);
    axios
      .get(`${baseUrl}/api/v1/daily-mission/reset-daily`, {
        timeout: 10000,
      })
      .then(res => {
        console.log(res);
        handleResponseSuccess();
      })
      .catch(err => {
        console.log(err);
        handleResponseError(err);
      });
  };

  const changeIPAddress = () => {
    const newIpAddress: BaseUrlState = {
      BaseUrl: ipAddress,
    };
    store.dispatch(setBaseUrl(newIpAddress));
  };

  console.log(originalAddress);

  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableOpacity
        style={styles.backgroundDim}
        activeOpacity={1}
        onPress={handleModalClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.innerModalContainer}>
              <View style={styles.changeIPModalHeader}>
                <Text style={styles.modalText}>Change IP Address</Text>
              </View>
              <View style={styles.fieldContainer}>
                <View style={styles.textField}>
                  <Text style={styles.textFieldHeader}>IP Address</Text>
                  <TextField
                    onHandleTextInput={setIpAddress}
                    placeholder={ipAddress}
                    isSecureTextEntry={false}
                    editPlaceholder={true}
                  />
                </View>
              </View>
              {isError && (
                <View style={styles.warningField}>
                  <Text style={styles.warningFieldText}>{errorText}</Text>
                </View>
              )}
              <TouchableOpacity
                style={[styles.changeIPButton]}
                onPress={checkIsValid}>
                <Text style={styles.changeIPText}>Edit IP Address</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.changeIPButton]}
                onPress={resetDaily}>
                <Text style={styles.changeIPText}>Reset Daily Mission</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundDim: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: whiteTheme,
    height: screenHeight * 0.45,
    width: screenWidth * 0.85,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: blackTheme,
  },
  innerModalContainer: {
    height: '85%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  changeIPModalHeader: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    height: '20%',
  },
  fieldContainer: {
    height: '20%',
    justifyContent: 'center',
  },
  changeIPButton: {
    backgroundColor: redTheme,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 8,
    zIndex: -1,
  },
  changeIPText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 14,
  },
  textField: {
    flexDirection: 'column',
  },
  textFieldHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: blackTheme,
  },
  warningField: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningFieldText: {
    textAlignVertical: 'center',
    color: errorRedTheme,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
});
