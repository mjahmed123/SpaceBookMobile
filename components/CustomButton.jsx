import {StyleSheet, TouchableOpacity, Text } from "react-native"
import { color as colorSchemes } from "../utils/colorSchemes";

export default function CustomButton ({title, onPress, Icon, style, color}) {
  const backgroundColor =  color || colorSchemes.PRIMARY;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor}, style]}>
      {Icon && Icon()}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
    width: 120,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})