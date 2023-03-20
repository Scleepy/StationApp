import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface Props {
  text: string;
}

const QuestLabel = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8545FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    height: 45,
    borderRadius: 12,
    shadowColor: '#959da5',
    shadowOpacity: 0.2,
    elevation: 10,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default QuestLabel;
