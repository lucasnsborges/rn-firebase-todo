import './fixtimerbug';
import React from 'react';
import { initializeApp } from 'firebase';
import { StyleSheet, StatusBar, View } from 'react-native';

import Todo from './src';
import firebaseConfig from './config';

initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Todo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#027BCE',
    paddingTop: StatusBar.currentHeight
  },
});

