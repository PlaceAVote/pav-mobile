import pavBtnRightImg from '../../../assets/pavBtnRight.png';
import React from 'react'
import {Image} from 'react-native';
// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

export class RightPavLogo extends React.Component {
  render(){
      return <Image source={pavBtnRightImg} resizeMode='cover' style={{
        flex:1,
        alignSelf:'flex-end',
        width: 30,
        height: null,
        // backgroundColor:'green'
        overflow: "hidden"
    }}></Image>
  }
}


// export class BackBtnImg extends React.Component {
//   render(){
//       return (<TouchableOpacity style={{
//         width: 100,
//         height: 37,
//         position: 'absolute',
//         bottom: 4,
//         left: 2,
//         padding: 8,
//         justifyContent:'center',
//     }} onPress={Actions.pop} >
//         <View style={{flexDirection:'row', alignItems:'center'}}>
//           <PavIcon name="arrow-left" size={25} style={{marginTop:2,paddingRight:6, color:'#ffffff'}}/>
//           <Text style={{color: '#FFFFFF21', fontFamily:'Whitney-Regular'}}>Back</Text>
//         </View>
//       </TouchableOpacity>);
//   }
// }
