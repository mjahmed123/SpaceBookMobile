import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { createPost } from '../services/Post';
import CustomButton from './CustomButton';
import ErrorModal from './ErrorModal';

function AddPostIcon() {
  return <MaterialIcons name="post-add" size={20} color="white" />;
}

export default function NewPostArea({ userId, onPosted }) {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const onCreateClicked = async () => {
    if (requestSent) return;

    if (!text.trim()) {
      setErrorMessage('You cannot send an empty post!');
      return;
    }
    if (text.trim().length > 300) {
      setErrorMessage('Post must be 300 character or less!');
      return;
    }

    setRequestSent(true);
    setErrorMessage(null);
    await createPost(userId, text.trim()).catch((err) => setErrorMessage(err.response.data));
    setText('');
    setRequestSent(false);
    onPosted();
  };
  return (
    <View style={styles.container}>
      {!!errorMessage && <ErrorModal message={errorMessage} onOkayClicked={() => setErrorMessage('')} />}
      <Text style={styles.title}>New Post</Text>
      <TextInput onChangeText={setText} value={text} multiline placeholder="Type Your Message..." style={styles.input} />
      <CustomButton onPress={onCreateClicked} title={requestSent ? 'Posting...' : 'Create Post'} style={styles.button} Icon={AddPostIcon} />
    </View>
  );
}
NewPostArea.propTypes = {
  userId: PropTypes.number,
  onPosted: PropTypes.func,
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
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    marginTop: 5,
    color: 'white',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 4,
  },
  button: {
    alignSelf: 'end',
    padding: 5,
  },
});
