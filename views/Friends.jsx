import React, { useEffect, useState } from 'react';
import {
  ScrollView, Text, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getFriends, getFriendRequests,
} from '../services/User';
import Friend from '../components/Friend';
import SearchFriends from '../components/SearchFriends';

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
    <ScrollView style={styles.scrollContainer}>
      <SearchFriends />
      <View style={styles.container}>
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
      </View>
      <View style={styles.container}>
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

      </View>
    </ScrollView>
  );
}

Friends.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    borderRadius: 8,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
});
