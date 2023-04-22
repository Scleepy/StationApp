import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {backgroundTheme, greenTheme} from './../../assets/colors';
import Email from './../../assets/icons/Email';
import Lock from './../../assets/icons/Lock';
import TextFieldArea from './Components/TextFieldArea';

const Login = () => {
  const handleLogin = () => {
    console.log('Attemping Login');
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor={backgroundTheme} barStyle="dark-content" />
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <View style={styles.loginContainerOuter}>
        <View style={styles.loginContainerInner}>
          <Text style={styles.textHeader}>Login</Text>
          <TextFieldArea
            fieldHeader={'Email'}
            placeholderText={'User@binus.ac.id'}
            FieldIcon={Email}
            isPassword={false}
          />
          <TextFieldArea
            fieldHeader={'Password'}
            placeholderText={'Password'}
            FieldIcon={Lock}
            isPassword={true}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
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
    backgroundColor: '#FFF9F4',
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
});

export default Login;
