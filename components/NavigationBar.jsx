import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome  } from '@expo/vector-icons'; 

import { color } from "../utils/colorSchemes";

const PostsIcon = () => <Ionicons name="home" size={18} color="white" />;
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


export default function NavigationBar() {
  return (
    <View style={styles.container}>
      <Tab title="Posts" selected Icon={PostsIcon}/>
      <Tab title="Friends" Icon={FriendsIcon}/>
      <Tab title="Search" Icon={SearchIcon}/>
      <Tab title="Profile" Icon={ProfileIcon}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5
  },
  tab: {
    alignItems: 'center',
    borderRadius: 8,
    width: 63,  
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 3,
    marginRight: 3
    
  },
  tabSelected: {
    backgroundColor: color.PRIMARY,
  },
  tabText: {
    fontSize: 12,
    color: 'white'
  }
})