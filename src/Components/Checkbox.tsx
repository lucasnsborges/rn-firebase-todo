import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import TouchableItem from './TouchableItem';

type Props = {
  checked: boolean;
  onChangeToggle: (checked: boolean) => void;
}

export default class CheckBox extends PureComponent<Props> {
  static defaultProps = {
    checked: false
  }

  onChangeToggle = () => {
    const { checked } = this.props;

    this.setState({
      checked: !checked
    });

    this.props.onChangeToggle(!checked);
  }

  render() {
    const { checked } = this.props;

    return (
      <TouchableItem
        borderless={true}
        pressColor='rgba(255, 255, 255, .16)'
        style={styles.container}
        onPress={this.onChangeToggle}
      >
        {
          checked && (<FontAwesome5 name="check" color="#FFF" />)
        }
      </TouchableItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, .2)',
    width: 32,
    height: 32,
    borderRadius: 32,
    marginHorizontal: 4
  }
})
