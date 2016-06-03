

/* @flow weak */
import React from 'react';
import {ActivityIndicatorIOS, View} from 'react-native';
import {Colors} from '../../config/constants';

class PavSpinner extends React.Component {
  constructor(props) {
    super(props);
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let children = this.props.children || <View></View>;
    return (
      <View key="bill_render_body" style={[{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
      }, this.props.style]}>
        <ActivityIndicatorIOS
          animating={this.props.animating}
          size="large"
        />
      </View>);
}
PavSpinner.propTypes= {
  animating: React.PropTypes.bool.isRequired,
};
export default PavSpinner;
