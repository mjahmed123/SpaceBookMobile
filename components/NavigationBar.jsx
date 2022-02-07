import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Ionicons, FontAwesome5, FontAwesome  } from '@expo/vector-icons'; 

import { color } from "../utils/colorSchemes";

const SettingsIcon = () => <Ionicons name="settings" size={18} color="white" />;
const FriendsIcon = () => <FontAwesome5 name="user-friends" size={18} color="white" />;
const SearchIcon = () => <Ionicons name="search" size={18} color="white" />;
const ProfileIcon = () => <FontAwesome name="user" size={18} color="white" />;

function Tab ({title, Icon, onPress, selected}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, selected && styles.tabSelected]} >
      {Icon()}
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );

}


export default function NavigationBar({state, navigation}) {
  const index = state.index;
  return (
    <View style={styles.container}>
      <Tab title="Profile" Icon={ProfileIcon} selected={index === 0}  onPress={() => navigation.navigate("Profile")}/>
      <Tab title="Friends" Icon={FriendsIcon} selected={index === 1}  onPress={() => navigation.navigate("Friends")}/>
      <Tab title="Search" Icon={SearchIcon}   selected={index === 2}  onPress={() => navigation.navigate("Search")}/>
      <Tab title="Settings" Icon={SettingsIcon} selected={index === 3}  onPress={() => navigation.navigate("Settings")}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  tab: {
    alignItems: 'center',
    borderRadius: 4,
    width: 63,  
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 2,
    marginRight: 2
    
  },
  tabSelected: {
    backgroundColor: color.PRIMARY,
  },
  tabText: {
    fontSize: 12,
    color: 'white'
  }
})