import React, { useState, useEffect } from 'react';
import {
  ScrollView, Text, View, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { rootStore } from '../stores/RootStore';
import { getUserById } from '../services/User';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';

function SaveIcon() {
  return <Ionicons name="save" size={18} color="white" />;
}
function LogoutIcon() {
  return <MaterialIcons name="logout" size={18} color="white" />;
}

function UserSummary({ user }) {
  return (
    <View style={styles.summaryContainer}>
      <Avatar userId={user.user_id} size={60} />
      <View style={styles.summaryDetails}>
        <Text style={styles.summaryText}>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={styles.summarySecondText}>{`${user.email}`}</Text>
      </View>
      <CustomButton style={{ marginLeft: 'auto', marginTop: 0 }} Icon={LogoutIcon} color="red" />
    </View>
  );
}

UserSummary.propTypes = {
  user: PropTypes.shape({
    user_id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
};
function CustomInput({
  title, initialValue, onInput, secure,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>
        {title}
        :
      </Text>
      <TextInput
        secureTextEntry={secure}
        style={styles.input}
        onChangeText={onInput}
        defaultValue={initialValue}
      />
    </View>
  );
}

CustomInput.propTypes = {
  secure: PropTypes.bool,
  title: PropTypes.string,
  initialValue: PropTypes.string,
  onInput: PropTypes.func,
};

export default function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { userId } = rootStore.account;
    getUserById(userId).then(setUser);
  }, []);

  if (!user) {
    return <View />;
  }
  return (
    <ScrollView>
      <UserSummary user={user} />
      <CustomInput title="Email" initialValue={user.email} />
      <CustomInput title="First Name" initialValue={user.first_name} />
      <CustomInput title="Last Name" initialValue={user.last_name} />
      <CustomInput secure title="Password" initialValue="" />
      <CustomButton title="Save Changes" Icon={SaveIcon} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 10,
    marginTop: 0,
    borderRadius: 8,
  },
  summaryText: {
    color: 'white',
  },
  summarySecondText: {
    color: 'white',
    opacity: 0.6,
  },
  summaryDetails: {
    marginLeft: 5,
  },
  inputTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 3,
    fontSize: 16,
  },
  input: {
    color: 'white',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
});
