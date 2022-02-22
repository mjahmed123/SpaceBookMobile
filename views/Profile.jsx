import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rootStore } from '../stores/RootStore';
import { getUserById, isFriendsWithUser, sendRequest } from '../services/User';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';
import color from '../utils/colorSchemes';
import ProfileFriendsTab from '../components/ProfileFriendsTab';
import ProfilePostsTab from '../components/ProfilePostsTab';

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

function Tabs({ friendUserId, navigation, hideTabs }) {
  // 0 is posts, 1 is friends.
  const [selectedTab, setTab] = useState(0);

  return (
    <View>
      {!hideTabs && (
      <View style={styles.tabs}>
        <Tab title="Posts" onPress={() => setTab(0)} isSelected={selectedTab === 0} />
        <Tab title="Friends" onPress={() => setTab(1)} isSelected={selectedTab === 1} />
      </View>
      )}
      {selectedTab === 0 && (
        <ProfilePostsTab userId={friendUserId} />
      )}
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
  hideTabs: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function FriendIcon() {
  return <Ionicons name="person-add-sharp" size={18} color="white" />;
}

function AddFriendButton({ isAdded, onPress }) {
  if (isAdded) return <View />;
  if (!isAdded) {
    return (
      <CustomButton
        onPress={onPress}
        Icon={FriendIcon}
        style={styles.addButton}
      />
    );
  }
}
AddFriendButton.propTypes = {
  isAdded: PropTypes.bool,
  onPress: PropTypes.func,
};
export default function Profile({ route, navigation }) {
  const loggedInUserId = rootStore.account.userId;
  const userId = route.params?.userId || loggedInUserId;
  const [user, setUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const isSelf = loggedInUserId.toString() === userId.toString();
  const [message, setMessage] = useState();

  useEffect(async () => {
    setUser(null);
    setIsAdded(null);
    const fetchedUser = await getUserById(userId);
    setUser(fetchedUser);

    const fetchIsAdded = await isFriendsWithUser(userId);
    setIsAdded(fetchIsAdded || isSelf);
  }, [route]);

  const onAddClicked = async () => {
    await sendRequest(user.user_id)
      .then(() => setMessage('Friend Added!'))
      .catch(() => setMessage('Friend Already Added!'));
  };

  if (!user) return <View />;

  return (
    <ScrollView style={styles.container} key={user?.user_id}>
      <View style={[styles.topArea, isSelf && styles.topAreaRadius]}>
        <Avatar style={styles.avatar} userId={user?.user_id} size={70} />
        <View style={styles.topAreaDetails}>
          <Text style={styles.username}>
            {`${user?.first_name} ${user?.last_name}`}
          </Text>
          <Text style={styles.friendCount}>
            {`${user?.friend_count} friends`}
          </Text>
          {(!message && isAdded !== null) && (
            <AddFriendButton onPress={onAddClicked} isAdded={isAdded} />
          )}
          {message && (
          <Text style={{
            color: 'white', position: 'absolute', right: 10, bottom: 10,
          }}
          >
            {message}
          </Text>
          )}
        </View>
      </View>
      <Tabs friendUserId={user?.user_id} navigation={navigation} hideTabs={isSelf} />
    </ScrollView>
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
  addButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    height: 40,
    width: 40,
    alignSelf: 'start',
  },
  topArea: {
    position: 'relative',
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    borderRadius: 8,
    margin: 10,
    marginTop: 10,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topAreaRadius: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  topAreaDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  container: {
  },
  avatar: {
    alignSelf: 'center',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendCount: {
    color: 'white',
    fontSize: 14,
  },
  tabs: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 40,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
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
