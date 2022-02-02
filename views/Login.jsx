import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import * as User from '../services/User';
import emailValidator from 'email-validator';

const EmailIcon = () => <Entypo name="email" size={18} color="rgba(255,255,255,0.6)" />;
const PasswordIcon = () => <AntDesign name="lock" size={18} color="rgba(255,255,255,0.6)" />;

function CustomInput ({placeholder, icon, secure, onChangeText}) {
  return (
    <View style={styles.inputContainer} >
      {icon()}
      <TextInput onChangeText={onChangeText} secureTextEntry={secure || false} style={styles.input} placeholder={placeholder} />
    </View>
  )
}
function CustomButton ({title, onPress}) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name="login" size={18} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}


function validateFields({email, password}) {
  if (!email.trim()) {
    return "Email is not provided!"
  }
  if (!password.trim()) {
    return "Password is not provided!"
  }
}

export default function Login() {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLoginClicked() {
    if (requestSent) return;
    setRequestSent(true);
    setErrorMessage("");

    const error = validateFields({email, password});
    if (error) {
      setRequestSent(false);
      setErrorMessage(error);
      return;
    }

    const responseData = {
      email,
      password
    }
    const result = await User.login(responseData)
      .catch(error => {
        const errorMessage = error.response.data;
        setErrorMessage(errorMessage);
      })
      .finally(() => setRequestSent(false))
    if (!result) return;

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Login to continue</Text>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <CustomInput onChangeText={setEmail} icon={EmailIcon} placeholder="Email" />
      <CustomInput onChangeText={setPassword} secure={true} icon={PasswordIcon} placeholder="Password" />

      <CustomButton onPress={onLoginClicked} title={requestSent ? 'Logging in...' : "Login"} />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    maxWidth: 200,
    alignItems: 'center'
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
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 10,

    marginTop: 8,
    backgroundColor: "rgba(255,255,255, 0.1)",
    borderRadius: 12,
  },
  input: {
    color: 'white',
    padding: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
    width: 120,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: '#2570e8'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
});