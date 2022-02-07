import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { color } from "../utils/colorSchemes";
import CustomButton from "../components/CustomButton";



const LoginIcon = () => <AntDesign name="login" size={18} color="white" />
const RegisterIcon = () => <AntDesign name="adduser" size={18} color="white" />



export default function StartPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>SpaceBook</Text>
      <CustomButton Icon={RegisterIcon} title="Register" onPress={() => navigation.navigate('Register')} />
      <CustomButton Icon={LoginIcon} title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30
  },
})