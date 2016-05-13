/* @flow weak */
import LImage from 'react-native-image-progress';
/**
 * The necessary React components
 */
import React,
{
  Component,
  Image,
  View
}
from 'react-native';

import Progress from 'react-native-progress';
import {Colors} from '../../config/constants';

class PavImage extends Component {
  constructor(props) {
    super(props);
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let children = this.props.children || <View></View>;
    if(this.props.platform=="ios" && (!!this.props.source && this.props.source.uri!=null)){
        return (
          <LImage {...this.props}
          indicator={Progress.CircleSnail}
          indicatorProps={{
            color:Colors.primaryColor
          }}
          >

          </LImage>
        );
    }else{
      return (
        <Image {...this.props}>

        </Image>
      );
    }
  }
}



//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}

PavImage.propTypes= {
  platform: React.PropTypes.string.isRequired,
  children: React.PropTypes.element,
};
// PavImage.defaultProps = { device: {platform: 'ios'} };


export default PavImage;
