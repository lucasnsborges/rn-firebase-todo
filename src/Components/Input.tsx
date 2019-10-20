import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Props = {
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
};

export default class Input extends PureComponent<Props> {
  render() {
    const { placeholder, value, onChangeText } = this.props;

    return (
      <TextInput
        placeholderTextColor="rgba(0, 0, 0, .32)"
        selectionColor="rgba(0, 0, 0, .32)"
        underlineColorAndroid="transparent"
        returnKeyType="done"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    )
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 16,
    marginVertical: 8,
  }
});
