import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Friends() {
  return (
    <View>
      <Text style={styles.title}>Friend Requests</Text>
      <Text style={styles.title}>Friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});
