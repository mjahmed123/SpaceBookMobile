import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Modal, StyleSheet, TextInput,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { extractTimestamp, validateFields } from '../utils/parseDate';
import CustomButton from './CustomButton';

function CheckMarkIcon() {
  return <Entypo name="check" size={18} color="white" />;
}
function CrossIcon() {
  return <Entypo name="cross" size={18} color="white" />;
}

function Input({
  title, value, onChangeText, width,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{`${title}:`}</Text>
      <TextInput style={[{ width }, styles.textInput]} value={value} onChangeText={onChangeText} />
    </View>
  );
}
Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.number,
  onChangeText: PropTypes.func,
};

export default function DatePickerModal({ onCancelClicked, onSchedule }) {
  const [error, setError] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    const extractedTimestamp = extractTimestamp(Date.now());
    setDay(extractedTimestamp.day);
    setMonth(extractedTimestamp.month);
    setYear(extractedTimestamp.year);
    setHours(extractedTimestamp.hour);
    setMinutes(extractedTimestamp.minute);
  }, []);
  const onScheduleClicked = () => {
    setError(null);
    const [date, validateError] = validateFields(day, month, year, hours, minutes);
    if (validateError) {
      setError(validateError);
      return;
    }
    onSchedule(date);
  };
  return (

    <Modal visible transparent>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.text}>Pick a date and time to schedule:</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.datePicker}>
            <Input title="Day" value={day} onChangeText={setDay} width={50} />
            <Input title="Month" value={month} onChangeText={setMonth} width={50} />
            <Input title="Year" value={year} onChangeText={setYear} width={50} />
          </View>
          <View style={styles.datePicker}>
            <Input title="Hours" value={hours} onChangeText={setHours} width={50} />
            <Input title="Minutes" value={minutes} onChangeText={setMinutes} width={50} />
          </View>
          <View style={styles.buttons}>
            <CustomButton title="Schedule" onPress={onScheduleClicked} Icon={CheckMarkIcon} style={{ borderRadius: 15, marginRight: 5 }} />
            <CustomButton title="Cancel" onPress={onCancelClicked} color="red" Icon={CrossIcon} style={{ borderRadius: 15, marginRight: 5 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
DatePickerModal.propTypes = {
  onCancelClicked: PropTypes.func,
  onSchedule: PropTypes.func,
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
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
  },
  inputTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    opacity: 0.8,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    borderRadius: 4,
    textAlign: 'center',
    color: 'white',
  },
});
