import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import Avatar from './Avatar';
import parseDate from '../utils/parseDate';
import CustomButton from './CustomButton';

function likeIcon() {
  return <Entypo name="thumbs-up" size={16} color="white" />;
}
function dislikeIcon() {
  return <Entypo name="thumbs-down" size={16} color="white" />;
}
function deleteIcon() {
  return <Entypo name="trash" size={16} color="red" />;
}
function editIcon() {
  return <Entypo name="edit" size={16} color="white" />;
}

function Actions({ post }) {
  return (
    <View style={styles.actions}>
      <CustomButton title="Like" textSize={12} style={styles.actionButton} color="transparent" Icon={likeIcon} />
      <CustomButton title="Dislike" textSize={12} style={styles.actionButton} color="transparent" Icon={dislikeIcon} />
      <CustomButton title="Edit" textSize={12} style={styles.actionButton} color="transparent" Icon={editIcon} />
      <CustomButton title="Delete" textSize={12} style={styles.actionButton} color="transparent" Icon={deleteIcon} />
    </View>
  );
}

export default function ProfilePost({ post }) {
  const { author } = post;

  return (
    <View style={styles.container}>
      <Avatar userId={author.user_id} size={40} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{author.first_name}</Text>
          <Text style={styles.date}>{parseDate(post.timestamp)}</Text>
        </View>
        <Text style={styles.text}>{post.text}</Text>
        {!!post.numLikes && <Text style={styles.likes}>{`${post.numLikes} likes`}</Text>}
        <Actions post={post} />
      </View>
    </View>
  );
}

const propTypes = {
  post: PropTypes.shape({
    post_id: PropTypes.number,
    text: PropTypes.string,
    numLikes: PropTypes.number,
    timestamp: PropTypes.string,
    author: PropTypes.shape({
      user_id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};
ProfilePost.propTypes = propTypes;
Actions.propTypes = propTypes;

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    margin: 0,
    padding: 0,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  details: {
    flex: 1,
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
  },
  date: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
    marginLeft: 3,
    fontSize: 12,
    alignSelf: 'center',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    flexWrap: 'wrap',
  },
  likes: {
    borderTopColor: 'rgba(255,255,255,0.3)',
    borderTopWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 2,
    marginTop: 5,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
  },
});
