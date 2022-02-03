import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { rootStore } from "../stores/RootStore";

export default function Home({ navigation }) {
  return (
    <View>
      <Text style={{color: "white"}}>Home Page</Text>
      <Text style={{color: "white"}}>Token: {rootStore.account.token}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})