import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

export default function CustomInput({
  placeholder, icon, secure, onChangeText,
}) {
  return (
    <View style={styles.inputContainer}>
      {icon()}
      <TextInput
        onChangeText={onChangeText}
        secureTextEntry={secure || false}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
}
CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  secure: PropTypes.bool,
  onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 12,
  },
  input: {
    color: 'white',
    padding: 8,
  },
});
