import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {darkGreyTheme} from './../../../assets/colors';

interface TextFieldAreaProps {
  fieldHeader: string;
  placeholderText: string;
  FieldIcon: React.ElementType<SvgProps>;
  isPassword: boolean;
  onHandleInput: (input: string) => void;
}

const TextFieldArea = ({
  fieldHeader,
  placeholderText,
  FieldIcon,
  isPassword,
  onHandleInput,
}: TextFieldAreaProps) => {
  const onChangeHandler = (input: string) => {
    onHandleInput(input);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldHeader}>{fieldHeader}</Text>
      <View style={styles.fieldContainerInner}>
        <FieldIcon style={styles.icon} />
        <TextInput
          style={styles.fieldTextArea}
          placeholder={placeholderText}
          underlineColorAndroid="transparent"
          placeholderTextColor={darkGreyTheme}
          secureTextEntry={isPassword}
          onChangeText={onChangeHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldHeader: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 14,
  },
  fieldContainer: {
    width: '80%',
    height: 70,
  },
  fieldContainerInner: {
    height: 45,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    marginRight: 8,
  },
  fieldTextArea: {
    color: 'black',
    width: '80%',
  },
});

export default TextFieldArea;
