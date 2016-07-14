import { Platform, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
const {height:screenHeight, width:screenWidth} = Dimensions.get('window'); // Screen dimensions in current orientation
var shown = false;

    export function getFontFactor(){
      if(Platform.OS === 'ios'){
          let devRatio = PixelRatio.get();
          this.fontFactor = (((screenWidth*devRatio)/320)*0.55+((screenHeight*devRatio)/640)*0.45)
      }else{
          this.fontFactor = (((screenWidth)/320)*0.65+((screenHeight)/640)*0.35)
      }
      return this.fontFactor.toFixed(2)+"";
    }

    export function getCorrectFontSizeForScreen(currentFontSize){

      const maxFontDifferFactor = 6; //the maximum pixels of font size we can go up or

      if(Platform.OS === 'ios'){
        let devRatio = PixelRatio.get();
        this.fontFactor = (((screenWidth*devRatio)/320)*0.55+((screenHeight*devRatio)/640)*0.45)
        // console.log("The width is: "+screenWidth+" and the height is "+screenHeight+" with a ratio : "+devRatio+ " and this.fontFactor: "+this.fontFactor);
        if(this.fontFactor<=1){
          return currentFontSize-float2int(maxFontDifferFactor*0.3);
        }else if((this.fontFactor>=1) && (this.fontFactor<=1.6)){
          return currentFontSize-float2int(maxFontDifferFactor*0.1);
        }else if((this.fontFactor>=1.6) && (this.fontFactor<=2)){
          return currentFontSize;
        }else if((this.fontFactor>=2) && (this.fontFactor<=3)){
          return currentFontSize+float2int(maxFontDifferFactor*0.85);
        }else if (this.fontFactor>=3){
          return currentFontSize+float2int(maxFontDifferFactor);
        }
      }else{
        // console.log("screenWidth is: "+screenWidth+"/375")
        // let fontScale = PixelRatio.getFontScale();
        let scale = screenWidth/375;
        // // console.log("Current font size: "+currentFontSize+" but because scale is: "+scale+" we make it: "+currentFontSize*scale);
        // console.log("Current font size: "+currentFontSize+" but because this.fontFactor is: "+this.fontFactor+" we make it: "+maxFontDifferFactor+"*0.5="+float2int(maxFontDifferFactor*0.5));
        // // // return Math.round((currentFontSize)*scale)//+float2int(maxFontDifferFactor*0.5)
        // // this.fontFactor = (((screenWidth)/320)*0.65+((screenHeight)/640)*0.35)
        //
        // if(shown===false){
        //   alert( "@#######@"+"-- "+screenWidth+"x"+screenHeight+ "@@ scale: "+scale);
        //   shown=true;
        // }

        if(scale<=1){
            return currentFontSize+4;
        }else{
          return currentFontSize+6;
        }
        // return float2int(currentFontSize);


        //  // 0.94166 φορ 480x800 Nexus S
        // if(scale<=1){   //for 0.8 until 1.0 use 8 (800x600 phone this.fontFactor == 0.961)
        //   return float2int(scale * (currentFontSize+6));
        // }else if((scale>1) && (scale<=1.6)){ //for 1.0 until 1.9 use 4 (NEXUS 5 this.fontFactor == 1.055)
        //   return float2int(scale * (currentFontSize+4));
        // }
        // // else if((scale>1.6) && (scale<=2)){
        // //   return float2int(scale * (currentFontSize+isTablet()?6:4));
        // // }
        // //
        // // else if(scale>4){
        // //   return float2int(scale * (currentFontSize+2));
        // // }
        // else{
        //   return float2int(scale * currentFontSize);
        // }

      }


    }





    function isTablet(){
      return (screenWidth>1000);
    }

    function float2int (value) {
      return value | 0;
    }



    export function updateScreenSizesByOrientation(sizes, isPortrait){

      let screenSizes = {};
      if(isPortrait===true){  //portrait
        if(sizes.h>sizes.w){
          screenSizes.h = sizes.h;
          screenSizes.w = sizes.w;
        }else{
          screenSizes.h = sizes.w;
          screenSizes.w = sizes.h;
        }
      }
      else{ //landscape
        if(sizes.h>sizes.w){
          screenSizes.w = sizes.h;
          screenSizes.h = sizes.w;
        }else{
          screenSizes.h = sizes.h;
          screenSizes.w = sizes.w;
        }
      }
      return screenSizes;
    }
