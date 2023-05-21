import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {
  backgroundTheme,
  greenTheme,
  redTheme,
  navigationTheme,
} from './../../assets/colors';
import Email from './../../assets/icons/Email';
import Lock from './../../assets/icons/Lock';
import TextFieldArea from './Components/TextFieldArea';
import axios, {AxiosResponse} from 'axios';
import {
  clearUserToken,
  setUserToken,
  setUserData,
} from '../../redux/reducers/authReducer';
import {RootState, store} from '../../redux/store';
import {useSelector} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const Login = ({navigation}: any) => {
  //store.dispatch(clearUserToken()); //this is just here for ease of debugging, delete this later in production
  const token = useSelector((state: RootState) => state.auth.Token);
  useEffect(() => {
    if (token) {
      changeNavigationBarColor(navigationTheme, true);
      navigation.replace('MainScreen');
    }
  }, [token, navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningText, setWarningText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const handleEmailTextChange = (emailInput: string) => {
    setEmail(emailInput);
  };

  const handlePasswordTextChange = (passwordInput: string) => {
    setPassword(passwordInput);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardActive(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardActive(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const checkEmptyField = () => {
    if (email === '' || password === '') {
      setWarningText('Field must not be empty');
      setError(true);
      return true;
    }
  };

  const checkEmail = () => {
    if (!email.endsWith('@binus.ac.id')) {
      setWarningText('Email must end with @binus.ac.id');
      setError(true);
      return true;
    }
  };

  const handleSetUserData = (res: AxiosResponse<any, any>) => {
    const stationID = res.data.data.StationID;
    const adminName = res.data.data.AdminName;
    const adminEmail = res.data.data.AdminEmail;

    axios
      .get(`${process.env.BASE_URL}/api/v1/station/${stationID}`)
      .then(stationRes => {
        const stationName = stationRes.data.data[0].BuildingName;
        store.dispatch(
          setUserData({
            name: adminName,
            email: adminEmail,
            station: stationName,
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
    setError(false);
    setLoading(false);
  };

  const handleResponseError = (err: any) => {
    if (err.code !== 'ECONNABORTED') {
      setWarningText(err.response.data.error);
    } else {
      setWarningText('Server error, please try again later');
    }
    setError(true);
    setLoading(false);
  };

  const handleLogin = () => {
    if (checkEmptyField() || checkEmail()) {
      return;
    }
    setLoading(true);
    axios
      .post(
        `${process.env.BASE_URL}/api/v1/admin/login`,
        {
          email,
          password,
        },
        {
          timeout: 2000,
        },
      )
      .then(res => {
        store.dispatch(setUserToken(res.data.data.Token));
        handleSetUserData(res);
      })
      .catch(err => {
        handleResponseError(err);
      });
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <View
        style={[
          styles.loginContainer,
          isKeyboardActive && styles.keyboardOnFocus,
        ]}>
        <Text style={styles.textHeader}>Login</Text>
        {isError && <Text style={styles.warningText}>{warningText}</Text>}
        <TextFieldArea
          fieldHeader={'Email'}
          placeholderText={'User@binus.ac.id'}
          FieldIcon={Email}
          isPassword={false}
          onHandleInput={handleEmailTextChange}
        />
        <TextFieldArea
          fieldHeader={'Password'}
          placeholderText={'Password'}
          FieldIcon={Lock}
          isPassword={true}
          onHandleInput={handlePasswordTextChange}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundTheme,
  },
  logo: {
    height: '20%',
    width: undefined,
    aspectRatio: 1,
    borderRadius: 1000,
  },
  keyboardOnFocus: {
    height: '65%',
    marginTop: 0,
  },
  loginContainer: {
    marginTop: 20,
    width: '95%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 24,
  },
  loginButton: {
    backgroundColor: greenTheme,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 45,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 14,
  },
  warningText: {
    fontFamily: 'Poppins-SemiBold',
    color: redTheme,
    fontSize: 12,
  },
});

export default Login;
