/* @flow weak */
import LImage from 'react-native-image-progress';
import React from 'react';
import {Image, View} from 'react-native';

import * as Progress from 'react-native-progress';
import {Colors} from '../../config/constants';
import {isOfObjectType, OBJECT_TYPES} from '../../lib/Utils/genericUtils';
import _ from 'underscore'

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

    //if the source is an object (imgs are usually numbers not objects), BUT the uri is null, use the defaultSource
   let uriProvidedButIsEmpty = (isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && (this.props.source.uri==null || this.props.source.uri==""));
   let imgProps = _.clone(this.props);
   if(uriProvidedButIsEmpty===true){
     imgProps.source.uri = undefined;
     imgProps.source = undefined;
    //  imgProps.source = imgProps.defaultSource;
   }

    if(!!this.props.source || !!this.props.defaultSource){
      if(this.props.loadingSpinnerEnabled!==true || uriProvidedButIsEmpty===true){
        // console.log("CHECK TYPE IMAGE : "+(isOfObjectType( this.props.source, OBJECT_TYPES.OBJECT ) && this.props.source.uri==null));

        return (
          <Image {...imgProps}>
          {children}
          </Image>
        );
      }else{
        // let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor};
        // let indicator = this.props.indicator || ActivityIndicator;
        let indicatorProps = this.props.indicatorProps || {color:Colors.primaryColor, size:this.state.indicatorSize};
        let indicator = this.props.indicator || Progress.CircleSnail;
        return (
          <LImage {...imgProps}
          indicator={indicator}
          indicatorProps={indicatorProps}
          onLayout={(e)=>{

            let indicSize = ((e.nativeEvent.layout.height+e.nativeEvent.layout.width)*0.5)*0.8;
            if(indicSize>70){
              indicSize = 70;
            }
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
