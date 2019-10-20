import React, { PureComponent } from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

type Props = {
  onChangeText: (value: string) => void;
  onFocus?: NativeSyntheticEvent<TextInputFocusEventData>;
  onBlur?: NativeSyntheticEvent<TextInputFocusEventData>;
  placeholder?: string;
  value: string;
}

export default class Input extends PureComponent<Props> {
  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.handleFocus);
    Keyboard.addListener('keyboardDidHide', this.handleBlur);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.handleFocus);
    Keyboard.removeListener('keyboardDidHide', this.handleBlur);
  }

  handleFocus = () => {

  }

  handleBlur = () => {

  }

  render() {
    const {
      placeholder,
      value,
      onChangeText,
      onFocus,
      onBlur
    } = this.props;
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="rgba(0, 0, 0, .32)"
          selectionColor="rgba(0, 0, 0, .32)"
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType="done"
        />
      </View>
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
})
