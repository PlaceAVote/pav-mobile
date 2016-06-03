

/* @flow weak */
import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../config/constants';
// import ProgressBar from 'ProgressBarAndroid';
import * as Progress from 'react-native-progress';

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
        <Progress.CircleSnail
          animating={this.props.animating}
          size="large"
          colors={[Colors.primaryColor, Colors.accentColor, Colors.secondaryColor]}
        />
      </View>);
  }
}
PavSpinner.propTypes= {
  animating: React.PropTypes.bool,
};
export default PavSpinner;
