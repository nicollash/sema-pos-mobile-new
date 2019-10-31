import React from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  StyleSheet,
  UIManager
} from 'react-native';

const { State: TextInputState } = TextInput;

export default class KeyboardAwareView extends React.Component {
  state = {
    shift: new Animated.Value(0),
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = (event) => {
    const { shift } = this.state;
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    const { shift } = this.state;
    Animated.timing(
      shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  render() {
    const { shift } = this.state;
    const { children, ...otherProps } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: shift }],
            ...otherProps
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});
