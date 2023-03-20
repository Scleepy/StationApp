import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  id: number;
  isActive: boolean;
  onPress: () => void;
}

const QuestButton = ({text, isActive, onPress}: Props) => {
  const buttonStyle = isActive
    ? [styles.container, styles.containerActive]
    : styles.container;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={[styles.text, isActive && styles.textActive]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
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
    color: '#2C2C2C',
  },
  containerActive: {
    backgroundColor: '#8545FF',
  },
  textActive: {
    color: '#FFFFFF',
  },
});

export default QuestButton;
