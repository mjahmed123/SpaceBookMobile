import React, { useState, useEffect } from 'react';
import {
  ScrollView, Text, View, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import validateFields from '../utils/validateFields';
import { rootStore } from '../stores/RootStore';
import {
  getUserById, logout, updateUser, uploadAvatar,
} from '../services/User';
import ErrorModal from '../components/ErrorModal';
import Avatar from '../components/Avatar';
import CustomButton from '../components/CustomButton';

function SaveIcon() {
  return <Ionicons name="save" size={18} color="white" />;
}
function LogoutIcon() {
  return <MaterialIcons name="logout" size={18} color="white" />;
}
function EditAvatarIcon() {
  return <MaterialIcons name="edit" size={18} color="white" />;
}

function UserSummary({ user }) {
  const [avatarVersion, setAvatarVersion] = useState(0);
  const [error, setError] = useState(null);
  const onLogoutClicked = async () => {
    await logout();
    await AsyncStorage.clear();
    rootStore.account.setLoggedInDetails('reload', null, false);
  };

  const onEditAvatarClicked = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled) return;
    setError(null);
    await uploadAvatar(result.uri).catch((err) => {
      setError(err?.response?.data || err.message);
    });
    setAvatarVersion(avatarVersion + 1);
  };
  return (
    <View style={styles.summaryContainer}>
      {!!error && <ErrorModal message={error} onOkayClicked={() => setError(null)} />}
      <Avatar key={avatarVersion} userId={user.user_id} size={60} />
      <CustomButton
        style={{
          position: 'absolute', left: 43, bottom: 5, padding: 5,
        }}
        onPress={onEditAvatarClicked}
        Icon={EditAvatarIcon}
      />
      <View style={styles.summaryDetails}>
        <Text style={styles.summaryText}>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={styles.summarySecondText}>{`${user.email}`}</Text>
      </View>
      <CustomButton onPress={onLogoutClicked} style={{ marginLeft: 'auto', marginTop: 0 }} Icon={LogoutIcon} color="red" />
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
  title, value, onInput, secure,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>
        {`${title}:`}
      </Text>
      <TextInput
        secureTextEntry={secure}
        style={styles.input}
        onChangeText={onInput}
        value={value}
      />
    </View>
  );
}

CustomInput.propTypes = {
  secure: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func,
};

export default function Settings() {
  const [user, setUser] = useState(null);

  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  async function fetchUser() {
    const { userId } = rootStore.account;
    const fetchedUser = await getUserById(userId);
    setUser(fetchedUser);
    setEmail(fetchedUser.email);
    setFirstName(fetchedUser.first_name);
    setLastName(fetchedUser.last_name);
  }

  const onSavePressed = async () => {
    setErrorMessage(null);

    const fieldErrorMessage = validateFields({
      firstName, lastName, email, password,
    }, true);

    if (fieldErrorMessage) {
      setErrorMessage(fieldErrorMessage);
      return;
    }

    setRequestSent(true);
    await updateUser({
      // if the field is updated, add it to this request.
      ...(email !== user.email && { email }),
      ...(firstName !== user.first_name && { firstName }),
      ...(lastName !== user.last_name && { lastName }),
      ...(password && { password }),
    })
      .finally(() => setRequestSent(false));
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <View />;
  }
  return (
    <ScrollView>
      <UserSummary user={user} />
      <CustomInput title="Email" onInput={setEmail} value={email} />
      <CustomInput title="First Name" onInput={setFirstName} value={firstName} />
      <CustomInput title="Last Name" onInput={setLastName} value={lastName} />
      <CustomInput secure title="New Password" onInput={setPassword} value={password} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <CustomButton title={requestSent ? 'Saving...' : 'Save Changes'} onPress={onSavePressed} Icon={SaveIcon} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    alignSelf: 'center',
  },
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
