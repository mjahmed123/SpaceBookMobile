import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as User from '../services/User';
import { rootStore } from '../stores/RootStore';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

function EmailIcon() {
  return <Entypo name="email" size={18} color="rgba(255,255,255,0.6)" />;
}
function PasswordIcon() {
  return <AntDesign name="lock" size={18} color="rgba(255,255,255,0.6)" />;
}

function LoginIcon() {
  return <AntDesign name="login" size={18} color="white" />;
}
function BackIcon() {
  return <AntDesign name="back" size={18} color="white" />;
}

function validateFields({ email, password }) {
  if (!email.trim()) {
    return 'Email is not provided!';
  }
  if (!password.trim()) {
    return 'Password is not provided!';
  }
  return null;
}

export default function Login({ navigation }) {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onBackButtonClicked = () => navigation.navigate('StartPage');

  const onLoginClicked = async () => {
    if (requestSent) return;
    setRequestSent(true);
    setErrorMessage('');

    const error = validateFields({ email, password });
    if (error) {
      setRequestSent(false);
      setErrorMessage(error);
      return;
    }

    const responseData = {
      email,
      password,
    };
    const result = await User.login(responseData)
      .catch((loginError) => {
        const loginErrorMessage = loginError.response.data;
        setErrorMessage(loginErrorMessage);
        setRequestSent(false);
      });
    if (!result) return;
    rootStore.account.setLoggedInDetails(result.token, result.id);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <CustomButton onPress={onBackButtonClicked} title="Back" Icon={BackIcon} style={styles.backButton} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Login to continue</Text>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <CustomInput onChangeText={setEmail} icon={EmailIcon} placeholder="Email" />
      <CustomInput onChangeText={setPassword} secure icon={PasswordIcon} placeholder="Password" />

      <CustomButton onPress={onLoginClicked} title={requestSent ? 'Logging in...' : 'Login'} Icon={LoginIcon} />

    </View>
  );
}
Login.propTypes = {
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
