import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {blackTheme, disabledTheme} from '../../../../../assets/colors';

interface WeightFieldProps {
  onHandleWeightInput: (inputWeight: number) => void;
  shouldClear: boolean;
}

export const WeightField = ({
  onHandleWeightInput,
  shouldClear,
}: WeightFieldProps) => {
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (shouldClear && textInputRef.current) {
      textInputRef.current.clear();
    }
  }, [shouldClear]);

  const onWeightChangeHandler = (input: string) => {
    onHandleWeightInput(parseFloat(input));
  };

  return (
    <View style={styles.weightContainer}>
      <TextInput
        ref={textInputRef}
        style={styles.weightInput}
        placeholder="0.00"
        placeholderTextColor={blackTheme}
        underlineColorAndroid="transparent"
        keyboardType="numeric"
        onChangeText={onWeightChangeHandler}
      />
      <View style={styles.weightSide}>
        <Text style={styles.weightText}>KG</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weightContainer: {
    width: '45%',
    height: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: blackTheme,
  },
  weightInput: {
    marginLeft: 5,
    width: '50%',
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
  },
  weightSide: {
    height: '98%',
    width: '46%',
    backgroundColor: disabledTheme,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightText: {
    color: blackTheme,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
