import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Text, ScrollView, Animated } from 'react-native';

const window = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class List extends Component {
  constructor() {
    super();

    this.state = {
      height: 0,
    }
  }

  setHeight() {
    this.refs.list.measure((x, y, width, height) => {
      this.setState({
        height: height
      });
    });
  }

  render() {
    const { children, select } = this.props;

    let position = this.props.position;

    if (position !== 'up' && select.y + select.height + this.state.height > window.height) {
      position = 'up';
    } else {
      position = 'down';
    }

    return (
      <View
        style={[
          styles.overlay,
          {
            top: -select.y,
            left: -select.x
          }
        ]}>
        <TouchableWithoutFeedback onPress={this.props.onOverlayPress}>
          <View style={{ flex: 1}}></View>
        </TouchableWithoutFeedback>
        <View
          onLayout={this.setHeight.bind(this)}
          ref="list"
          style={[
            styles.list,
            {
              width: select.width,
              maxHeight: this.props.height,
              left: select.x,
              top: select.y + (position === 'down' ? select.height : -this.state.height),
              opacity: this.state.height ? 1 : 0,
            },
            this.props.style
          ]}>
          <View>
            <AnimatedScrollView
              automaticallyAdjustContentInsets={false}
              bounces={false}>
                {
                  children.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => { this.props.onOptionPressed(item.props.value, item.props.children)}}
                        >
                        <View>
                          {item}
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })
                }
            </AnimatedScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
  },
  list: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    borderRadius: 2,
  },
});

module.exports = List;
