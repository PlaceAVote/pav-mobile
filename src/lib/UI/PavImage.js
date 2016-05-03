/* @flow weak */
import LImage from 'react-native-image-progress';
/**
 * The necessary React components
 */
import React,
{
  Component,
  Image,
}
from 'react-native';




class PavImage extends Component {
  constructor(props) {
    super(props);
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    if(this.props.device.platform=="ios"){
        return (
          <LImage {...this.props}>
          {this.props.children}
          </LImage>
        );
    }else{
      return (
        <Image {...this.props}>
        {this.props.children}
        </Image>
      );
    }
  }
}



//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}

PavImage.propTypes= {
  device: React.PropTypes.object.isRequired,
  children: React.PropTypes.element,
};
// PavImage.defaultProps = { device: {platform: 'ios'} };


export default PavImage;
