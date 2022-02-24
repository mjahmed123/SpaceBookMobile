import React from 'react';
import {
  ScrollView, View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import parseDate from '../utils/parseDate';

function DeleteIcon() {
  return <Entypo name="trash" size={16} color="white" />;
}
function EditIcon() {
  return <Entypo name="edit" size={16} color="white" />;
}

export default function Draft({ draft, onDeleteClicked, onEditPressed }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.name}>{`To: ${draft.firstName}`}</Text>
        <Text style={styles.timestamp}>{parseDate(draft.timestamp)}</Text>
      </View>
      <Text style={styles.text}>{draft.text}</Text>
      <View style={styles.buttons}>
        <CustomButton onPress={onEditPressed} Icon={EditIcon} style={{ marginRight: 10 }} />
        <CustomButton onPress={onDeleteClicked} color="red" Icon={DeleteIcon} />
      </View>
    </ScrollView>
  );
}

Draft.propTypes = {
  onDeleteClicked: PropTypes.func,
  onEditPressed: PropTypes.func,
  draft: PropTypes.shape({
    timestamp: PropTypes.number,
    firstName: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    marginBottom: 3,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 'auto',
  },
  text: {
    flexWrap: 'wrap',
    color: 'rgba(255,255,255,0.8)',
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});
