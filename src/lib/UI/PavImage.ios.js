/* @flow weak */
import LImage from 'react-native-image-progress';
import React from 'react';
import {Image, View, ActivityIndicatorIOS} from 'react-native';

import * as Progress from 'react-native-progress';
import {Colors} from '../../config/constants';

class PavImage extends React.Component {
  constructor(props) {
    super(props);
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let children = this.props.children || <View></View>;

    if((!!this.props.source && this.props.source.uri!=null) || !!this.props.defaultSource){
      if(this.props.loadingSpinnerEnabled!==false){
        // let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor};
        // let indicator = this.props.indicator || ActivityIndicatorIOS;

        let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor, colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]};
        let indicator = this.props.indicator || Progress.CircleSnail;
        return (
          <LImage {...this.props}
          indicator={indicator}
          indicatorProps={indicatorProps}
          >
          {children}
          </LImage>
        );
      }else{
        return (
          <Image {...this.props}>
          {children}
          </Image>
        );
      }

    }else{
      return <View></View>;
    }
  }
}
PavImage.propTypes= {
  children: React.PropTypes.element,
  loadingSpinnerEnabled:React.PropTypes.bool
};
export default PavImage;
