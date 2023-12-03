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
  lightGreenTheme,
  navigationTheme,
  errorRedTheme,
  blackTheme,
} from './../../assets/colors';
import Email from './../../assets/icons/EmailIcon';
import Lock from './../../assets/icons/LockIcon';
import TextFieldArea from './components/TextFieldArea';
import axios, {AxiosResponse} from 'axios';
import {setUserData} from '../../redux/reducers/authReducer';
import {RootState, store} from '../../redux/store';
import {useSelector} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {BASE_URL} from '@env';

const Login = ({navigation}: any) => {
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
    store.dispatch(setUserData(res.data.data));
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
    console.log(`${BASE_URL}/api/v1/admin/login`);

    setLoading(true);
    axios
      .post(
        `${BASE_URL}/api/v1/admin/login`,
        {
          adminEmail: email,
          adminPassword: password,
        },
        {
          timeout: 10000,
        },
      )
      .then(res => {
        handleSetUserData(res);
      })
      .catch(err => {
        handleResponseError(err);
      });
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      {/* <Image source={require('../../assets/Logo.png')} style={styles.logo} /> */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/bloombox-logo.png')}
          style={styles.logoNew}
          resizeMode="contain"
        />
      </View>
      <View
        style={[
          styles.loginContainer,
          isKeyboardActive && styles.keyboardOnFocus,
        ]}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>WELCOME</Text>
          <Text style={styles.subTextHeader}>Sign in to continue</Text>
        </View>
        {isError && <Text style={styles.warningText}>{warningText}</Text>}
        <TextFieldArea
          fieldHeader={'Email'}
          placeholderText={'user@binus.ac.id'}
          FieldIcon={Email}
          isPassword={false}
          onHandleInput={handleEmailTextChange}
        />
        <TextFieldArea
          fieldHeader={'Password'}
          placeholderText={'password'}
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
    backgroundColor: lightGreenTheme,
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
    color: errorRedTheme,
    fontSize: 12,
  },
  logoContainer: {
    height: '10%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoNew: {
    width: '100%',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%',
  },
  subTextHeader: {
    fontFamily: 'Poppins-Bold',
    color: blackTheme,
    fontSize: 15,
  },
});

export default Login;
