import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import * as User from '../services/User';
import emailValidator from 'email-validator';

const NameIcon = () => <AntDesign name="user" size={18} color="rgba(255,255,255,0.6)" />;
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
      <AntDesign name="adduser" size={18} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}


function validateFields({firstName, lastName, email, password}) {
  if (!firstName.trim()) {
    return "First name is not provided!"
  }
  if (!lastName.trim()) {
    return "Last name is not provided!"
  }
  if (!email.trim()) {
    return "Email is not provided!"
  }
  if (!password.trim()) {
    return "Password is not provided!"
  }
  if (!emailValidator.validate(email)) {
    return "Email provided is not valid!"
  }
  if (password.length <= 5) {
    return "Password must be longer than 5 characters!"
  }
}

export default function Register() {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onRegisterClicked() {
    if (requestSent) return;
    setRequestSent(true);
    setErrorMessage("");

    const error = validateFields({email, password, firstName, lastName});
    if (error) {
      setRequestSent(false);
      setErrorMessage(error);
      return;
    }





    const responseData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password
    }
    const result = await User.addAccount(responseData)
      .catch(error => {
        const errorMessage = error.response.data;
        setErrorMessage(errorMessage);
      })
      .finally(() => setRequestSent(false))
    if (!result) return;
    // TODO: use login request

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Register to continue</Text>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <CustomInput onChangeText={setFirstName} icon={NameIcon} placeholder="First Name" />
      <CustomInput onChangeText={setLastName} icon={NameIcon} placeholder="Last Name" />
      <CustomInput onChangeText={setEmail} icon={EmailIcon} placeholder="Email" />
      <CustomInput onChangeText={setPassword} secure={true} icon={PasswordIcon} placeholder="Password" />

      <CustomButton onPress={onRegisterClicked} title={requestSent ? 'Registering...' : "Register"} />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
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
    marginLeft: 10,
    marginRight: 10,
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