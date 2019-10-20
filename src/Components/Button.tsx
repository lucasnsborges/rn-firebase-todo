import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  ActivityIndicator
} from 'react-native';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
  loading?: boolean;
}

export default class Button extends PureComponent<Props> {
  static defaultProps = {
    rounded: false
  }

  render() {
    const { rounded, loading } = this.props;

    return (
      <TouchableOpacity {...this.props}>
        <View style={[ styles.container, rounded && styles.rounded, this.props.style ]}>
          {
            loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (this.props.children)
          }
        </View>
      </TouchableOpacity>
    )
  }
};


const primaryColor = 'rgba(255, 255, 255, .15)';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    height: 40,
    minWidth: 40,
    borderRadius: 2,
    padding: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  rounded: {
    borderRadius: 100
  }
})
