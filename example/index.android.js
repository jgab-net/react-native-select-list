/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Select, Option } from 'react-native-select-list';

export default class ReactNativeSelectList extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Select>
          <Option value={1}>List item 1</Option>
          <Option value={2}>List item 2</Option>
          <Option value={3}>List item 3</Option>
          <Option value={4}>List item 4</Option>
        </Select>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

AppRegistry.registerComponent('ReactNativeSelectList', () => ReactNativeSelectList);
