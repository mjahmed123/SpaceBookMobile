import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  Ionicons, FontAwesome5, FontAwesome,
} from '@expo/vector-icons';
import { setLastSelectedTab } from '../utils/localStore';
import color from '../utils/colorSchemes';

function SettingsIcon() {
  return <Ionicons name="settings" size={18} color="white" />;
}
function FriendsIcon() {
  return <FontAwesome5 name="user-friends" size={18} color="white" />;
}
function DraftsIcon() {
  return <FontAwesome name="bookmark" size={18} color="white" />;
}
function ProfileIcon() {
  return <FontAwesome name="user" size={18} color="white" />;
}

function Tab({
  title, Icon, onPress, selected,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, selected && styles.tabSelected]}>
      <View style={{ height: 20, width: 18, alignItems: 'center' }}>{Icon?.()}</View>
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
}

Tab.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  Icon: PropTypes.func,
  selected: PropTypes.bool,
};

export default function NavigationBar({ state, navigation }) {
  const { index } = state;

  const navigate = async (routeName) => {
    await setLastSelectedTab(routeName);
    navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  };

  return (
    <View style={styles.container}>
      <Tab title="Profile" Icon={ProfileIcon} selected={index === 0} onPress={() => navigate('Profile')} />
      <Tab title="Friends" Icon={FriendsIcon} selected={index === 1} onPress={() => navigate('Friends')} />
      <Tab title="Drafts" Icon={DraftsIcon} selected={index === 2} onPress={() => navigate('Drafts')} />
      <Tab title="Settings" Icon={SettingsIcon} selected={index === 3} onPress={() => navigate('Settings')} />
    </View>
  );
}

NavigationBar.propTypes = {
  state: PropTypes.number,
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 4,
    width: 63,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 2,
    marginRight: 2,

  },
  tabSelected: {
    backgroundColor: color.PRIMARY,
  },
  tabText: {
    fontSize: 12,
    color: 'white',
  },
});
