import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import Avatar from './Avatar';
import parseDate from '../utils/parseDate';
import CustomButton from './CustomButton';
import { deletePost, likePost, unlikePost } from '../services/Post';
import ErrorModal from './ErrorModal';
import EditPostModal from './EditPostModal';

import { rootStore } from '../stores/RootStore';

function likeIcon() {
  return <Entypo name="thumbs-up" size={16} color="white" />;
}
function unlikeIcon() {
  return <Entypo name="thumbs-down" size={16} color="white" />;
}
function deleteIcon() {
  return <Entypo name="trash" size={16} color="red" />;
}
function editIcon() {
  return <Entypo name="edit" size={16} color="white" />;
}

function Actions({
  profileUserId, post, onDeleted, onLiked, onUnliked, onEdited,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditVisible, setEditVisible] = useState(false);
  const isMyPost = post.author.user_id.toString() === rootStore.account.userId.toString();
  const isMyProfile = profileUserId.toString() === rootStore.account.userId.toString();

  const onDeletePressed = async () => {
    const response = await deletePost(post.author.user_id, post.post_id)
      .catch(() => setErrorMessage('Unable to delete post. Try again later!'));
    if (!response) return;
    onDeleted();
  };

  const onLikePressed = async () => {
    const response = await likePost(post.author.user_id, post.post_id)
      .catch(() => setErrorMessage('Cannot like this post more than once!'));
    if (!response) return;
    onLiked();
  };

  const onUnlikePressed = async () => {
    const response = await unlikePost(post.author.user_id, post.post_id)
      .catch(() => setErrorMessage('You have not liked this post yet!'));
    if (!response) return;
    onUnliked();
  };

  return (
    <View style={styles.actions}>
      {isEditVisible && (
        <EditPostModal
          text={post.text}
          postId={post.post_id}
          userId={post.author.user_id}
          onEdited={(text) => { onEdited(text); setEditVisible(false); }}
          onClose={() => setEditVisible(false)}
        />
      )}
      {!!errorMessage && (
        <ErrorModal message={errorMessage} onOkayClicked={() => setErrorMessage(null)} />
      )}
      {(!isMyPost && !isMyProfile) && (
        <View style={{ flexDirection: 'row' }}>
          <CustomButton title="Like" onPress={onLikePressed} textSize={12} style={styles.actionButton} color="transparent" Icon={likeIcon} />
          <CustomButton title="Unlike" onPress={onUnlikePressed} textSize={12} style={styles.actionButton} color="transparent" Icon={unlikeIcon} />
        </View>
      )}
      {isMyPost && <CustomButton title="Edit" onPress={() => setEditVisible(true)} textSize={12} style={styles.actionButton} color="transparent" Icon={editIcon} />}
      {isMyPost && <CustomButton title="Delete" onPress={onDeletePressed} textSize={12} style={styles.actionButton} color="transparent" Icon={deleteIcon} />}
    </View>
  );
}

export default function ProfilePost({
  navigation, profileUserId, post, onDeleted,
}) {
  const { author } = post;
  const [likes, setLikes] = useState(post.numLikes);
  const [text, setText] = useState(post.text);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: author.user_id })}>
        <Avatar userId={author.user_id} size={40} />
      </TouchableOpacity>
      <View style={styles.details}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: author.user_id })}>
            <Text style={styles.name}>{author.first_name}</Text>
          </TouchableOpacity>
          <Text style={styles.date}>{parseDate(post.timestamp)}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
        {!!likes && <Text style={styles.likes}>{`${likes} likes`}</Text>}
        <Actions
          profileUserId={profileUserId}
          post={post}
          onDeleted={onDeleted}
          onUnliked={() => setLikes(likes - 1)}
          onLiked={() => setLikes(likes + 1)}
          onEdited={((editedText) => setText(editedText))}
        />
      </View>
    </View>
  );
}

const propTypes = {

  onDeleted: PropTypes.func,
  profileUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
ProfilePost.propTypes = {
  ...propTypes,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
Actions.propTypes = {
  ...propTypes, onLiked: PropTypes.func, onUnliked: PropTypes.func, onEdited: PropTypes.func,
};

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
    marginLeft: 5,
    fontSize: 12,
    alignSelf: 'center',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    flexWrap: 'wrap',
    marginLeft: 5,
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
    marginLeft: 5,
  },
});
