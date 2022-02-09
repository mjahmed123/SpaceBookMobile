import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getFriendRequests } from '../services/User';
import Avatar from '../components/Avatar';

function FriendRequest({ user }) {
  return (
    <View style={styles.friendRequest}>
      <Avatar userId={user.user_id} size={40} style={styles.avatar} />
      <Text style={styles.friendRequestName}>
        {user.first_name}
        {' '}
        {user.last_name}
      </Text>
    </View>
  );
}
FriendRequest.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
};
export default function Friends() {
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    getFriendRequests().then((results) => {
      setRequests(results);
    });
  }, []);

  return (
    <View>
      <Text style={styles.title}>Friend Requests</Text>
      { !requests?.length
        && (
        <Text style={styles.message}>
          Looks like you don&apos;t have any friend requests yet!
        </Text>
        )}
      {
        requests?.map((user) => <FriendRequest key={user.user_id} user={user} />)
      }
      <Text style={styles.title}>Friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
  },
  friendRequest: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  friendRequestName: {
    color: 'white',
    fontSize: 16,
  },
  message: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
});
