import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import * as User from '../services/User';

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




export default function Register() {
  const [requestSent, setRequestSent] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onRegisterClicked() {
    if (requestSent) return;
    setRequestSent(true);
    User.addAccount({}).catch(err => {
      console.log(err);
    })



  }
  return (
    <View>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Register to continue</Text>

      
      <CustomInput onChangeText={setFirstName} icon={NameIcon} placeholder="First Name" />
      <CustomInput onChangeText={setLastName} icon={NameIcon} placeholder="Last Name" />
      <CustomInput onChangeText={setEmail} icon={EmailIcon} placeholder="Email" />
      <CustomInput onChangeText={setPassword} secure={true} icon={PasswordIcon} placeholder="Password" />

      <CustomButton onPress={onRegisterClicked} title={requestSent ? 'Registering...' : "Register"} />

    </View>
  );
}



const styles = StyleSheet.create({
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