import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Modal, StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CustomButton from './CustomButton';

function CheckMarkIcon() {
  return <Entypo name="check" size={18} color="white" />;
}

export default function DeleteModal({ message, onYesPress, onNoPress }) {
  return (
    <Modal visible transparent>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.buttons}>
            <CustomButton title="Yes" color="red" onPress={onYesPress} Icon={CheckMarkIcon} style={{ borderRadius: 15, marginRight: 5 }} />
            <CustomButton title="No" onPress={onNoPress} Icon={CheckMarkIcon} style={{ borderRadius: 15, marginRight: 5 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
DeleteModal.propTypes = {
  message: PropTypes.string,
  onYesPress: PropTypes.func,
  onNoPress: PropTypes.func,
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
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
