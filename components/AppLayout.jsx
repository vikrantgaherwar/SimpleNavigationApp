// components/AppLayout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomBar from './BottomBar';
import LinearGradient from 'react-native-linear-gradient';

const AppLayout = ({
  children,
  colors = ['#4c669f', '#3b5998', '#192f6a'],
}) => {
  return (
    <LinearGradient
      colors={colors} // gradient colors
      style={styles.gradient}
    >
      <View style={styles.content}>{children}</View>
      {/* <BottomBar /> */}
    </LinearGradient>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  content: { flex: 1 }, // fills remaining space above bottom bar
});
