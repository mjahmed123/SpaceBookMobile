import React from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

import { acceptRequest, declineRequest } from '../services/User';

export default function Friend({
  user, isFriendRequest, onAccepted, onDeclined, onClick,
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
    <TouchableOpacity onPress={onClick} style={styles.friend}>
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
    </TouchableOpacity>
  );
}

Friend.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  isFriendRequest: PropTypes.bool,
  onAccepted: PropTypes.func,
  onDeclined: PropTypes.func,
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
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
});
