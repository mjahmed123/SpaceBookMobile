import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { searchUsers, getFriends } from '../services/User';
import SearchFriendsTab from './SearchFriendsTab';
import SearchFriendsBar from './SearchFriendsBar';
import Friend from './Friend';
import CustomButton from './CustomButton';
import { rootStore } from '../stores/RootStore';

function LoadMoreIcon() {
  return <FontAwesome name="refresh" size={24} color="white" />;
}

export default function SearchFriends({ setSearchFocused, isSearchFocused, navigation }) {
  const limit = 10;
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState(null);
  const [friendIds, setFriendIds] = useState([]);

  const [lastFetchedLength, setLastFetchedLength] = useState(0);

  const onLoadMorePressed = async () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    const fetchedUsers = await searchUsers({
      query: value,
      limit,
      offset: newOffset,
      searchIn: selectedTab === 0 ? 'all' : 'friends',
    });
    setUsers([...users, ...fetchedUsers]);
    setLastFetchedLength(fetchedUsers.length);
  };

  const onRequestSearch = async (val) => {
    if (!val.trim()) {
      setLastFetchedLength(0);
      setUsers(null);
      return;
    }
    setOffset(0);
    const fetchedUsers = await searchUsers({
      query: val,
      limit,
      offset,
      searchIn: selectedTab === 0 ? 'all' : 'friends',
    });
    setUsers(fetchedUsers);
    setLastFetchedLength(fetchedUsers.length);
  };

  useEffect(() => {
    onRequestSearch(value);
  }, [selectedTab]);

  // Display 'add friend' icon if user is not a friend.
  async function getFriendIds() {
    const friends = await getFriends();
    const mappedFriendIds = friends.map((friend) => friend.user_id.toString());
    // Ensures that the current logged in user cannot add themselves as a friend.
    setFriendIds([...mappedFriendIds, rootStore.account.userId.toString()]);
  }
  useEffect(() => {
    getFriendIds();
  }, []);

  return (
    <View>
      <SearchFriendsBar
        isSearchFocused={isSearchFocused}
        setSearchFocused={setSearchFocused}
        onTextChanged={setValue}
        onRequestSearch={onRequestSearch}
      />
      {(!!value || isSearchFocused) && (
        <>
          <SearchFriendsTab onTabClicked={setSelectedTab} selectedTab={selectedTab} />
          <View>
            {users?.map((user) => <Friend isSearching={!friendIds.includes(user.user_id.toString())} onClick={() => navigation.navigate('Profile', { userId: user.user_id })} key={user.user_id} user={user} />)}
            {lastFetchedLength === limit && <CustomButton style={styles.loadMoreButton} onPress={onLoadMorePressed} title="Load More" Icon={LoadMoreIcon} />}

            {users && !users.length && (
              <Text style={styles.message}>No results found!</Text>
            )}
            {users && users.length && lastFetchedLength !== limit && (
              <Text style={styles.message}>Reached the end of the results!</Text>
            )}
          </View>
        </>
      )}

    </View>
  );
}

SearchFriends.propTypes = {
  setSearchFocused: PropTypes.func,
  isSearchFocused: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  loadMoreButton: {
    marginBottom: 5,
  },
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 5,
  },
});
