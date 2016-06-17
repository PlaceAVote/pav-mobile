

/* @flow weak */
import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../config/constants';
import ProgressBar from 'ProgressBarAndroid';

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
        <ProgressBar
          animating={this.props.animating}
          styleAttr={this.props.size}
          colors={[Colors.primaryColor, Colors.accentColor, Colors.secondaryColor]}
          color={Colors.primaryColor}
        />
      </View>);
  }
}
PavSpinner.defaultProps = {
size:"Normal"
}
PavSpinner.propTypes= {
  size: React.PropTypes.string,
  animating: React.PropTypes.bool,
};
export default PavSpinner;
