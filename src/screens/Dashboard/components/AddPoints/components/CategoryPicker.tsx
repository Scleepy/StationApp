import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {blackTheme} from '../../../../../assets/colors';
import DropDownPicker from 'react-native-dropdown-picker';

interface CategoryPickerProps {
  onHandleCategoryIDInput: (inputCategoryID: string | null) => void;
  shouldClear: boolean;
}

export const CategoryPicker = ({
  onHandleCategoryIDInput,
  shouldClear,
}: CategoryPickerProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Cardboard', value: 'CT001'},
    {label: 'Glass', value: 'CT002'},
    {label: 'Metal', value: 'CT003'},
    {label: 'Paper', value: 'CT004'},
    {label: 'Plastic', value: 'CT005'},
  ]);
  const [value, setValue] = useState<string | null>(null);

  const onCategoryIDChangeHandler = (selectedValue: string | null) => {
    onHandleCategoryIDInput(selectedValue);
  };

  useEffect(() => {
    if (shouldClear) {
      setValue(null);
    }
  }, [shouldClear]);

  return (
    <View style={styles.categoryPickerOuterContainer}>
      <DropDownPicker
        style={styles.categoryPickerInnerContainer}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode="SCROLLVIEW"
        placeholder="Category"
        textStyle={styles.categoryPickerText}
        onChangeValue={onCategoryIDChangeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryPickerOuterContainer: {
    width: '50%',
  },
  categoryPickerInnerContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: blackTheme,
  },
  categoryPickerText: {
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 5,
  },
});
