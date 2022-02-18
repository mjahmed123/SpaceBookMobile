import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import validateFields from '../utils/validateFields';
import * as User from '../services/User';
import { login } from '../services/User';
import { rootStore } from '../stores/RootStore';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

function RegisterIcon() {
  return <AntDesign name="adduser" size={18} color="white" />;
}
function NameIcon() {
  return <AntDesign name="user" size={18} color="rgba(255,255,255,0.6)" />;
}
function EmailIcon() {
  return <Entypo name="email" size={18} color="rgba(255,255,255,0.6)" />;
}
function PasswordIcon() {
  return <AntDesign name="lock" size={18} color="rgba(255,255,255,0.6)" />;
}
function BackIcon() {
  return <AntDesign name="back" size={18} color="white" />;
}

export default function Register({ navigation }) {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onBackButtonClicked = () => navigation.navigate('StartPage');

  const onRegisterClicked = async () => {
    if (requestSent) return;
    setRequestSent(true);
    setErrorMessage('');

    const localError = validateFields({
      email, password, firstName, lastName,
    });
    if (localError) {
      setRequestSent(false);
      setErrorMessage(localError);
      return;
    }

    const responseData = {
      email,
      firstName,
      lastName,
      password,
    };
    const result = await User.addAccount(responseData)
      .catch((error) => {
        const registerErrorMessage = error.response.data;
        setErrorMessage(registerErrorMessage);
        setRequestSent(false);
      });
    if (!result) return;

    const loginResult = await login({ email, password });
    rootStore.account.setLoggedInDetails(loginResult.token, loginResult.id);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <CustomButton onPress={onBackButtonClicked} title="Back" Icon={BackIcon} style={styles.backButton} />

      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Register to continue</Text>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <CustomInput onChangeText={setFirstName} icon={NameIcon} placeholder="First Name" />
      <CustomInput onChangeText={setLastName} icon={NameIcon} placeholder="Last Name" />
      <CustomInput onChangeText={setEmail} icon={EmailIcon} placeholder="Email" />
      <CustomInput onChangeText={setPassword} secure icon={PasswordIcon} placeholder="Password" />

      <CustomButton onPress={onRegisterClicked} title={requestSent ? 'Registering...' : 'Register'} Icon={RegisterIcon} />

    </View>
  );
}
Register.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    maxWidth: 200,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  text: {
    opacity: 0.6,
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

});
