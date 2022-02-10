import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
  getFriends, getFriendRequests, acceptRequest, declineRequest,
} from '../services/User';
import Avatar from '../components/Avatar';

function Friend({
  user, isFriendRequest, onAccepted, onDeclined,
}) {
  const onAcceptClicked = async () => {
    await acceptRequest(user.user_id);
    onAccepted?.();
  };
  const onDeclineClicked = async () => {
    await declineRequest(user.user_id);
    onDeclined?.();
  };
  return (
    <View style={styles.friend}>
      <Avatar userId={user.user_id} size={40} style={styles.avatar} />
      <Text style={styles.friendName}>
        {`${user.first_name || user.user_familyname} ${user.last_name || user.user_givenname}`}
      </Text>
      {isFriendRequest && (
      <View style={styles.actions}>
        <Ionicons onPress={onAcceptClicked} name="checkmark" size={24} color="white" />
        <Entypo onPress={onDeclineClicked} name="cross" size={24} color="white" />
      </View>
      )}
    </View>
  );
}

Friend.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  isFriendRequest: PropTypes.bool,
  onAccepted: PropTypes.func,
  onDeclined: PropTypes.func,
};
export default function Friends() {
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
    <View>
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
            onAccepted={fetchRequests}
            onDeclined={fetchRequests}
            key={user.user_id}
            user={user}
          />
        ))
      }
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
  friend: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  friendName: {
    color: 'white',
    fontSize: 16,
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
