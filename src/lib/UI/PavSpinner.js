

/* @flow weak */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
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
      <View style={[{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
      }, this.props.style]}>
        <ActivityIndicator
          animating={this.props.animating}
          size={this.props.size}
        />
      </View>);
  }
}
PavSpinner.defaultProps = {
  size:"large"
}
PavSpinner.propTypes= {
  animating: React.PropTypes.bool,
  size: React.PropTypes.string,
};
export default PavSpinner;
