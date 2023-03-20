import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRContainer from './components/qrContainer';
import QuestButton from './components/questButton';
import QuestLabel from './components/questLabel';

const ViewCodes = () => {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Quest QR Code</Text>
      <View style={styles.itemContainer}>
        <QRContainer />
        <QuestLabel text={'Recycle 10 Plastic item(s)'} />
        <View style={styles.buttonGroup}>
          <QuestButton
            text={'Quest 1'}
            id={2}
            isActive={activeButton === 1}
            onPress={() => handleButtonClick(1)}
          />
          <QuestButton
            text={'Quest 2'}
            id={2}
            isActive={activeButton === 2}
            onPress={() => handleButtonClick(2)}
          />
          <QuestButton
            text={'Quest 3'}
            id={2}
            isActive={activeButton === 3}
            onPress={() => handleButtonClick(3)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F5F4F9',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Poppins-Bold',
    height: '5%',
    fontSize: 24,
    color: '#2C2C2C',
    textAlign: 'center',
  },
  itemContainer: {
    height: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
});

export default ViewCodes;
