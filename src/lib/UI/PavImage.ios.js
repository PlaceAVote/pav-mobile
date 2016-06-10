/* @flow weak */
import LImage from 'react-native-image-progress';
import React from 'react';
import {Image, View, ActivityIndicatorIOS} from 'react-native';

import * as Progress from 'react-native-progress';
import {Colors} from '../../config/constants';
import {isOfObjectType, OBJECT_TYPES} from '../../lib/Utils/genericUtils';

class PavImage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      indicatorSize: 40
    }



  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let children = this.props.children || <View></View>;


    if((!!this.props.source && this.props.source.uri!=null) || !!this.props.defaultSource){
      if(this.props.loadingSpinnerEnabled!==true || (isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && this.props.source.uri==null)){
        // console.log("CHECK TYPE IMAGE : "+(isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && this.props.source.uri==null));
        return (
          <Image {...this.props}>
          {children}
          </Image>
        );
      }else{
        // let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor};
        // let indicator = this.props.indicator || ActivityIndicatorIOS;

        let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor, colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor], size:this.state.indicatorSize};
        let indicator = this.props.indicator || Progress.CircleSnail;
        return (
          <LImage {...this.props}
          indicator={indicator}
          indicatorProps={indicatorProps}
          onLayout={(e)=>{

            let indicSize = ((e.nativeEvent.layout.height+e.nativeEvent.layout.width)*0.5)*0.8;
            // console.log("@@@@@@@@@ NATIVE event: "+indicSize)
            this.setState({
              indicatorSize:indicSize
            })
          }}
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
