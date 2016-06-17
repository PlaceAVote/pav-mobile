/* @flow weak */
import LImage from 'react-native-image-progress';
import React from 'react';
import {Image, View} from 'react-native';

import ProgressBar from 'ProgressBarAndroid';
import {Colors} from '../../config/constants';
import {isOfObjectType, OBJECT_TYPES} from '../../lib/Utils/genericUtils';
import _ from 'underscore'

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
    if(!!this.props.source || !!this.props.defaultSource){

      if(this.props.loadingSpinnerEnabled!==true || (isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && this.props.source.uri==null)){

        let imgProps = _.clone(this.props);
        if(isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && this.props.source.uri==null){
          imgProps.source.uri = undefined;
          imgProps.source = imgProps.defaultSource;
        }
        // alert(imgProps.);
        return (
          <Image {...imgProps}>
          {children}
          </Image>
        );

      }else{
        let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor};
        let indicator = this.props.indicator || ProgressBar;
        return (
          <LImage {...this.props}
          indicator={indicator}
          indicatorProps={indicatorProps}
          >
          {children}
          </LImage>
        );
      }

    }else{
      return <View></View>;
    }
  }
}
PavImage.defaultProps = { loadingSpinnerEnabled: true };
PavImage.propTypes= {
  children: React.PropTypes.element,
  loadingSpinnerEnabled:React.PropTypes.bool
};
export default PavImage;
