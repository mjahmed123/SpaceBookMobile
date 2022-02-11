import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rootStore } from '../stores/RootStore';
import { getUserById, isFriendsWithUser } from '../services/User';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';
import color from '../utils/colorSchemes';
import ProfileFriendsTab from '../components/ProfileFriendsTab';

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

function Tabs({ friendUserId, navigation }) {
  // 0 is posts, 1 is friends.
  const [selectedTab, setTab] = useState(0);

  return (
    <View>
      <View style={styles.tabs}>
        <Tab title="Posts" onPress={() => setTab(0)} isSelected={selectedTab === 0} />
        <Tab title="Friends" onPress={() => setTab(1)} isSelected={selectedTab === 1} />
      </View>
      {selectedTab === 1 && (
        <ProfileFriendsTab
          friendUserId={friendUserId}
          navigation={navigation}
        />
      )}
    </View>
  );
}
Tabs.propTypes = {
  friendUserId: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function FriendIcon() {
  return <Ionicons name="person-add-sharp" size={18} color="white" />;
}

function AddFriendButton({ isAdded }) {
  if (!isAdded) return <View />;
  if (isAdded) return <CustomButton title="Add Friend" Icon={FriendIcon} />;
}
AddFriendButton.propTypes = {
  isAdded: PropTypes.bool,
};
export default function Profile({ route, navigation }) {
  const loggedInUserId = rootStore.account.userId;
  const userId = route.params?.userId || loggedInUserId;
  const [user, setUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  useEffect(async () => {
    const fetchedUser = await getUserById(userId);
    setUser(fetchedUser);

    const fetchIsAdded = await isFriendsWithUser();
    setIsAdded(fetchIsAdded);
  }, [userId]);

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} userId={user?.user_id} size={80} />
      <Text style={styles.username}>
        {`${user?.first_name} ${user?.last_name}`}
      </Text>
      <Text style={styles.friendCount}>
        {`${user?.friend_count} friends`}
      </Text>
      {loggedInUserId !== userId && <AddFriendButton isAdded={isAdded} />}
      <Tabs key={user?.user_id} friendUserId={user?.user_id} navigation={navigation} />
    </View>
  );
}

Profile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.number,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
