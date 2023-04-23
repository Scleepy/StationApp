import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {backgroundTheme, greenTheme, redTheme} from './../../assets/colors';
import Email from './../../assets/icons/Email';
import Lock from './../../assets/icons/Lock';
import TextFieldArea from './Components/TextFieldArea';
import axios from 'axios';
import {
  clearUserToken,
  setUserToken,
  setUserData,
} from '../../redux/reducers/authReducer';
import {RootState, store} from '../../redux/store';
import {useSelector} from 'react-redux';

const Login = ({navigation}: any) => {
  //store.dispatch(clearUserToken()); //this is just here for ease of debugging, delete this later in production
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigation.replace('Dashboard');
    }
  }, [token, navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningText, setWarningText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleEmailTextChange = (emailInput: string) => {
    setEmail(emailInput);
  };

  const handlePasswordTextChange = (passwordInput: string) => {
    setPassword(passwordInput);
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${process.env.BASE_URL}/api/v1/admin/login`, {
        email,
        password,
      })
      .then(res => {
        store.dispatch(setUserToken(res.data.data.token));

        const stationID = res.data.data.stationid;
        const adminName = res.data.data.name;
        const adminEmail = res.data.data.email;

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
      })
      .catch(err => {
        setWarningText(err.response.data.error);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <View style={styles.loginContainerOuter}>
        <View style={styles.loginContainerInner}>
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
            style={isLoading ? styles.loginButtonDisabled : styles.loginButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: backgroundTheme,
  },
  logo: {
    height: '15%',
    width: undefined,
    aspectRatio: 1,
    borderRadius: 1000,
  },
  loginContainerOuter: {
    backgroundColor: 'white',
    width: '85%',
    height: '55%',
    borderRadius: 12,
    shadowColor: '#959da5',
    shadowOpacity: 0.2,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainerInner: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 24,
  },
  loginButtonDisabled: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 45,
    borderRadius: 8,
    marginTop: 10,
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
