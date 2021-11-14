import React from 'react';
import { View, Text } from 'react-native';

export default props => {
  return (
    <View>
      <Text> {props.desc} </Text>
      <Text> {props.estimatedAt + ''} </Text>
      <Text> {props.doneAt + ''} </Text>
    </View>
  );
};