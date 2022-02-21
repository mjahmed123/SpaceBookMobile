import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colorSchemes from '../utils/colorSchemes';

export default function CustomButton({
  title, onPress, Icon, style, color, textSize,
}) {
  const backgroundColor = color || colorSchemes.PRIMARY;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor }, style]}>
      {Icon && Icon()}
      {title && <Text style={[styles.buttonText, { fontSize: textSize || 14 }]}>{title}</Text>}
    </TouchableOpacity>
  );
}
CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  Icon: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  color: PropTypes.string,
  textSize: PropTypes.number,
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 5,
  },
});
