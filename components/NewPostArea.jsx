import React, { useState } from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { createPost } from '../services/Post';
import CustomButton from './CustomButton';
import ErrorModal from './ErrorModal';
import { addDraft, removeDraft } from '../utils/localStore';
import { getUserById } from '../services/User';

function AddPostIcon() {
  return <MaterialIcons name="post-add" size={18} color="white" />;
}

function DraftsIcon() {
  return <FontAwesome name="bookmark" size={18} color="white" />;
}

export default function NewPostArea({ userId, onPosted, route }) {
  const [text, setText] = useState(route.params?.text || '');
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const onDraftClicked = async () => {
    const user = await getUserById(userId);
    await addDraft(userId, text, user.first_name);
  };

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
    if (route.params?.draftIndex !== undefined) {
      await removeDraft(route.params?.draftIndex);
      route.params.draftIndex = undefined;
    }
    onPosted();
  };
  return (
    <View style={styles.container}>
      {!!errorMessage && <ErrorModal message={errorMessage} onOkayClicked={() => setErrorMessage('')} />}
      <Text style={styles.title}>New Post</Text>
      <TextInput onChangeText={setText} value={text} multiline placeholder="Type Your Message..." style={styles.input} />
      <View style={styles.buttons}>
        {(!!text.trim() && route.params?.draftIndex === undefined) && (
          <CustomButton onPress={onDraftClicked} color="rgba(255,255,255,0.2)" title="Draft" style={styles.button} Icon={DraftsIcon} />
        )}
        <Text style={styles.counter}>{!!text.length && 300 - text.length}</Text>
        <CustomButton onPress={onCreateClicked} title={requestSent ? 'Posting...' : 'Create Post'} style={styles.button} Icon={AddPostIcon} />
      </View>
    </View>
  );
}
NewPostArea.propTypes = {
  userId: PropTypes.number,
  onPosted: PropTypes.func,
  route: PropTypes.shape({
    params: PropTypes.shape({
      text: PropTypes.string,
      draftIndex: PropTypes.number,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
  },

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
  counter: {
    color: 'white',
    marginLeft: 'auto',
    alignSelf: 'center',
    marginRight: 10,
  },
  button: {
    alignSelf: 'end',
    padding: 5,
  },
});
