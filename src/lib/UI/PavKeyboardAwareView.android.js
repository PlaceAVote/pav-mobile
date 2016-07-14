'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';



class PavKeyboardAwareView extends React.Component {
  constructor(props) {
    super(props);
    this.subscriptions = null;
  }

  onKeyboardShown() {
    if(this.props.onKeyboardChange){
        this.props.onKeyboardChange(true)
    }
  }
  onKeyboardHidden(){
    if(this.props.onKeyboardChange){
        this.props.onKeyboardChange(false)
    }
  }

  componentWillMount() {
    this.subscriptions = [
      Keyboard.addListener('keyboardDidHide', this.onKeyboardHidden.bind(this)),
      Keyboard.addListener('keyboardDidShow', this.onKeyboardShown.bind(this)),
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
  }




// behavior='padding'
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return(
      <KeyboardAvoidingView
      style={this.props.style}

      >
      {this.props.children}
      </KeyboardAvoidingView>
    );
  }
}



PavKeyboardAwareView.propTypes= {
children: React.PropTypes.any,
onKeyboardChange: React.PropTypes.func
};
export default PavKeyboardAwareView;
