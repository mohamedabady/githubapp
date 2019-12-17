import React, { Component } from 'react';
import { View, Text } from 'react-native';

//App Main Navigator Import
import AppNavigator from './App/AppNavigators';

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
