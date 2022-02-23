import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, TextInput, Modal, StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CustomButton from './CustomButton';
import { editPost } from '../services/Post';
import ErrorModal from './ErrorModal';

function CheckMarkIcon() {
  return <Entypo name="check" size={18} color="white" />;
}

export default function EditPostModal({
  text,
  postId,
  userId,
  onEdited,
  onClose,
}) {
  const [editingText, setEditingText] = useState(text);
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onEditClicked = async () => {
    if (requestSent) return;

    if (!editingText.trim()) {
      setErrorMessage('You cannot send an empty post!');
      return;
    }
    if (editingText.trim().length > 300) {
      setErrorMessage('Post must be 300 character or less!');
      return;
    }

    setRequestSent(true);
    setErrorMessage(null);
    const status = await editPost(userId, postId, editingText.trim())
      .catch((err) => setErrorMessage(err.response.data));
    setRequestSent(false);
    if (status) onEdited(editingText);
  };

  return (
    <Modal visible transparent>
      {!!errorMessage && (
        <ErrorModal message={errorMessage} onOkayClicked={() => setErrorMessage(null)} />
      )}
      <View style={styles.modal}>
        <View style={styles.container}>
          <TextInput placeholder="Edit Message" multiline style={styles.input} value={editingText} onChangeText={setEditingText} />
          <View style={styles.buttons}>
            <CustomButton title="Edit" Icon={CheckMarkIcon} onPress={onEditClicked} style={{ borderRadius: 15, marginLeft: 10 }} />
            <CustomButton title="Cancel" color="red" onPress={onClose} Icon={CheckMarkIcon} style={{ borderRadius: 15, marginLeft: 10 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
EditPostModal.propTypes = {
  text: PropTypes.string,
  postId: PropTypes.number,
  userId: PropTypes.number,
  onEdited: PropTypes.func,
  onClose: PropTypes.func,
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
