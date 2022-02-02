import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';



function CustomButton ({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name="adduser" size={18} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function StartPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>SpaceBook</Text>
      <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
      <CustomButton title="Login" onPress={() => navigation.navigate('Login')} />
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
})