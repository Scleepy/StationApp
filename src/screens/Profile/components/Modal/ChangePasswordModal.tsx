import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  blackTheme,
  disabledRedTheme,
  errorRedTheme,
  redTheme,
  whiteTheme,
} from '../../../../assets/colors';
import {TextField} from './components/TextField';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import axios from 'axios';
import {BASE_URL} from '@env';

interface ChangePasswordModalProps {
  isVisible: boolean;
  onHandleModalVisible: (inputBoolean: boolean) => void;
}

export const ChangePasswordModal = ({
  isVisible,
  onHandleModalVisible,
}: ChangePasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const adminEmail = useSelector((state: RootState) => state.auth.AdminEmail);

  const isFieldEmpty =
    oldPassword === '' || newPassword === '' || confirmNewPassword === '';
  console.log(isFieldEmpty);

  const handleModalClose = () => {
    if (!isLoading) {
      onHandleModalVisible(false);
      setError(false);
      setErrorText('');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  const handleResponseError = (err: any) => {
    if (err.code !== 'ECONNABORTED') {
      setErrorText(err.response.data.error);
    } else {
      setErrorText('Server error, please try again later');
    }
    setError(true);
    setIsLoading(false);
  };

  const handleResponseSuccess = () => {
    setErrorText('Password changed successfully');
    setError(true);
    setIsLoading(false);
  };
  const isSuperUser = useSelector((state: RootState) => state.auth.IsSuperUser);
  const superUserBaseUrl = useSelector(
    (state: RootState) => state.baseUrl.BaseUrl,
  );

  const baseUrl = isSuperUser ? superUserBaseUrl : BASE_URL;

  const changePassword = () => {
    console.log(`${BASE_URL}/api/v1/admin/update-password`);
    setIsLoading(true);
    axios
      .post(
        `${baseUrl}/api/v1/admin/update-password`,
        {
          adminEmail,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          timeout: 10000,
        },
      )
      .then(res => {
        console.log(res);
        handleResponseSuccess();
      })
      .catch(err => {
        console.log(err);
        handleResponseError(err);
      });
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableOpacity
        style={styles.backgroundDim}
        activeOpacity={1}
        onPress={handleModalClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.innerModalContainer}>
              <View style={styles.changePasswordModalHeader}>
                <Text style={styles.modalText}>Change Password</Text>
              </View>
              <View style={styles.fieldContainer}>
                <View style={styles.textField}>
                  <Text style={styles.textFieldHeader}>Old Password</Text>
                  <TextField
                    onHandleTextInput={setOldPassword}
                    placeholder={'Old Password'}
                    isSecureTextEntry={true}
                    editPlaceholder={false}
                  />
                </View>
                <View style={styles.textField}>
                  <Text style={styles.textFieldHeader}>New Password</Text>
                  <TextField
                    onHandleTextInput={setNewPassword}
                    placeholder={'New Password'}
                    isSecureTextEntry={true}
                    editPlaceholder={false}
                  />
                </View>
                <View style={styles.textField}>
                  <Text style={styles.textFieldHeader}>
                    Confirm New Password
                  </Text>
                  <TextField
                    onHandleTextInput={setConfirmNewPassword}
                    placeholder={'Confirm New Password'}
                    isSecureTextEntry={true}
                    editPlaceholder={false}
                  />
                </View>
              </View>
              {isError && (
                <View style={styles.warningField}>
                  <Text style={styles.warningFieldText}>{errorText}</Text>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.changePasswordButton,
                  isFieldEmpty && styles.disabledButton,
                ]}
                onPress={changePassword}
                disabled={isLoading || isFieldEmpty}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.changePasswordText}>Change Password</Text>
                )}
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
    height: screenHeight * 0.6,
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
  onLoading: {
    borderRadius: 20,
  },
  innerModalContainer: {
    height: '85%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  changePasswordModalHeader: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    height: '12%',
  },
  fieldContainer: {
    height: '62%',
    justifyContent: 'space-between',
  },
  changePasswordButton: {
    backgroundColor: redTheme,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '13%',
    borderRadius: 8,
    zIndex: -1,
  },
  changePasswordText: {
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
  disabledButton: {
    backgroundColor: disabledRedTheme,
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
