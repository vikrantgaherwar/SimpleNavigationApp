// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = ({ title, gradientColor,...props }) => {
  return (
    <LinearGradient
      colors={gradientColor} // gradient colors
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});
