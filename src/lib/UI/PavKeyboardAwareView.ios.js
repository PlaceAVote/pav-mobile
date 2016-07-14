'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
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
      Keyboard.addListener('keyboardWillShow', this.onKeyboardShown.bind(this)),
      Keyboard.addListener('keyboardWillHide', this.onKeyboardHidden.bind(this)),
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return(
      <KeyboardAvoidingView
      behavior='position'
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
