import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getFriends } from '../services/User';
import Friend from './Friend';

export default function ProfileFriendsTab({ friendUserId, navigation }) {
  const [friends, setFriends] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchFriends = () => {
    getFriends(friendUserId).then(setFriends).catch((error) => {
      if (error.response.status === 403) {
        setErrorMessage('You cannot view this users friends as you are not friends with them!');
        return;
      }
      setErrorMessage('Something went wrong. Try again later!');
    });
  };
  useEffect(() => {
    fetchFriends();
  }, [friendUserId]);
  return (
    <View style={styles.container}>
      { errorMessage && (<Text style={styles.message}>{errorMessage}</Text>)}
      {
        friends?.map((user) => (
          <Friend
            onClick={() => navigation.navigate('Profile', { userId: user.user_id })}
            key={user.user_id}
            user={user}
          />
        ))
      }
    </View>
  );
}

ProfileFriendsTab.propTypes = {
  friendUserId: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    borderRadius: 8,
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
});
