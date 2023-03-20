import React from 'react';
import {StyleSheet, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRContainer = () => {
  return (
    <View style={styles.container}>
      <QRCode
        value={'19ca4796-7303-41ab-8252-37a103707cbb'}
        color={'#2C2C2C'}
        size={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: 260,
    width: 260,
    borderRadius: 20,
    shadowColor: '#959da5',
    shadowOpacity: 0.2,
    elevation: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRContainer;
