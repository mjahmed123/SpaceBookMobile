import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

function LoginIcon() {
  return <AntDesign name="login" size={18} color="white" />;
}
function RegisterIcon() {
  return <AntDesign name="adduser" size={18} color="white" />;
}

export default function StartPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>SpaceBook</Text>
      <CustomButton style={styles.button} Icon={RegisterIcon} title="Register" onPress={() => navigation.navigate('Register')} />
      <CustomButton style={styles.button} Icon={LoginIcon} title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
StartPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    width: 120,
  },
});
