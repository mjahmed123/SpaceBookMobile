import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rootStore } from '../stores/RootStore';
import { getUserById } from '../services/User';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';
import { color } from '../utils/colorSchemes';

function Tab({ onPress, isSelected, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, isSelected && styles.selectedTab]}>
      <Text style={styles.tabColor}>{title}</Text>
    </TouchableOpacity>
  );
}

Tab.propTypes = {
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  title: PropTypes.string,
};

function Tabs() {
  // 0 is posts, 1 is friends.
  const [selectedTab, setTab] = useState(0);

  return (
    <View style={styles.tabs}>
      <Tab title="Posts" onPress={() => setTab(0)} isSelected={selectedTab === 0} />
      <Tab title="Friends" onPress={() => setTab(1)} isSelected={selectedTab === 1} />
    </View>
  );
}

function FriendIcon() {
  return <Ionicons name="person-add-sharp" size={18} color="white" />;
}

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const id = userId || rootStore.account.userId;
    const fetchedUser = await getUserById(id);
    setUser(fetchedUser);
  }, []);

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} userId={user?.user_id} size={80} />
      <Text style={styles.username}>
        {user?.first_name}
        {' '}
        {user?.last_name}
      </Text>
      <Text style={styles.friendCount}>
        {user?.friend_count}
        {' '}
        friends
      </Text>
      <CustomButton title="Add Friend" Icon={FriendIcon} />
      <Tabs />
    </View>
  );
}

Profile.propTypes = {
  userId: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  username: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendCount: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
  },
  tabs: {
    marginTop: 15,
    height: 40,
    flexDirection: 'row',
  },
  tab: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255, 0.1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabColor: {
    color: 'white',
  },
  selectedTab: {
    backgroundColor: color.PRIMARY,
  },
});
