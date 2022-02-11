import React, { useEffect, useState } from 'react';
import {
  ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getFriends, getFriendRequests,
} from '../services/User';
import Friend from '../components/Friend';

export default function Friends({ navigation }) {
  const [requests, setRequests] = useState(null);
  const [friends, setFriends] = useState(null);

  const fetchRequests = () => {
    getFriendRequests().then(setRequests);
  };
  const fetchFriends = () => {
    getFriends().then(setFriends);
  };
  useEffect(() => {
    fetchRequests();
    fetchFriends();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.title}>Friend Requests</Text>
      { !requests?.length
        && (
        <Text style={styles.message}>
          Looks like you don&apos;t have any friend requests yet!
        </Text>
        )}
      {
        requests?.map((user) => (
          <Friend
            onClick={() => navigation.navigate('Profile', { userId: user.user_id })}
            onAccepted={fetchRequests}
            isFriendRequest
            onDeclined={fetchRequests}
            key={user.user_id}
            user={user}
          />
        ))
      }
      <Text style={styles.title}>Friends</Text>
      { !friends?.length
        && (
        <Text style={styles.message}>
          Looks like you don&apos;t have any friends yet!
        </Text>
        )}
      {
        friends?.map((user) => (
          <Friend
            onClick={() => navigation.navigate('Profile', { userId: user.user_id })}
            onAccepted={fetchRequests}
            onDeclined={fetchRequests}
            key={user.user_id}
            user={user}
          />
        ))
      }
    </ScrollView>
  );
}

Friends.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
  },
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  actions: {
    marginLeft: 'auto',
    marginRight: 5,
    flexDirection: 'row',
  },
});
