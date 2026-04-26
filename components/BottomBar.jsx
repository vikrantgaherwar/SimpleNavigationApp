// components/BottomBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BottomBar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>I stay at the bottom!</Text>
  </View>
);

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: 'white', fontWeight: 'bold' },
});
