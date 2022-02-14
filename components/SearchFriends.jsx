import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View,
} from 'react-native';
import { searchUsers } from '../services/User';
import SearchFriendsTab from './SearchFriendsTab';
import SearchFriendsBar from './SearchFriendsBar';
import Friend from './Friend';

export default function SearchFriends({ setSearchFocused, isSearchFocused }) {
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [users, setUsers] = useState([]);

  const onRequestSearch = async (val) => {
    setCurrentOffset(0);
    const fetchedUsers = await searchUsers({
      query: val,
      limit: 20,
      offset: currentOffset,
      searchIn: selectedTab === 0 ? 'all' : 'friends',
    });
    setUsers(fetchedUsers);
    console.log(fetchedUsers);
  };
  const onTabClicked = (tab) => {
    setSelectedTab(tab);
    onRequestSearch();
  };

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
          <SearchFriendsTab onTabClicked={onTabClicked} selectedTab={selectedTab} />
          <View style={styles.items}>
            {users.map((user) => <Friend key={user.user_id} user={user} />)}
          </View>
        </>
      )}

    </View>
  );
}

SearchFriends.propTypes = {
  setSearchFocused: PropTypes.func,
  isSearchFocused: PropTypes.bool,
};

const styles = StyleSheet.create({
  items: {

  },
});
