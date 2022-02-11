import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getFriends } from '../services/User';
import Friend from './Friend';

export default function ProfileFriendsTab({ friendUserId, navigation }) {
  const [friends, setFriends] = useState(null);

  const fetchFriends = () => {
    getFriends(friendUserId).then(setFriends);
  };
  useEffect(() => {
    fetchFriends();
  }, [friendUserId]);
  return (
    <ScrollView>
      { !friends?.length
        && (
        <Text style={styles.message}>
          This user doesn&apos;t have any friends.
        </Text>
        )}
      {
        friends?.map((user) => (
          <Friend
            onClick={() => navigation.navigate('Profile', { userId: user.user_id })}
            key={user.user_id}
            user={user}
          />
        ))
      }
    </ScrollView>
  );
}

ProfileFriendsTab.propTypes = {
  friendUserId: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
});
