import { Platform, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
const {height:screenHeight, width:screenWidth} = Dimensions.get('window'); // Screen dimensions in current orientation


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
        let scale = screenWidth/375;
        // // console.log("Current font size: "+currentFontSize+" but because scale is: "+scale+" we make it: "+currentFontSize*scale);
        // // console.log("Current font size: "+currentFontSize+" but because this.fontFactor is: "+this.fontFactor+" we make it: "+maxFontDifferFactor+"*0.5="+float2int(maxFontDifferFactor*0.5));
        // // return Math.round((currentFontSize)*scale)//+float2int(maxFontDifferFactor*0.5)
        this.fontFactor = (((screenWidth)/320)*0.65+((screenHeight)/640)*0.35)

        // // console.log("The width is: "+screenWidth+" and the height is "+screenHeight+" with a ratio : "+devRatio+ " and this.fontFactor: "+this.fontFactor);
        // if(this.fontFactor<=1){
        //   return currentFontSize-float2int(maxFontDifferFactor*0.3);
        // }else if((this.fontFactor>=1) && (this.fontFactor<=1.6)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.35);
        // }else if((this.fontFactor>=1.6) && (this.fontFactor<=2)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.5);
        // }else if((this.fontFactor>=2) && (this.fontFactor<=3)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.65);
        // }else if (this.fontFactor>=3){
        //   return currentFontSize+float2int(maxFontDifferFactor);
        // }

        return float2int(scale * (currentFontSize+8));
        // return Math.round(scale * currentFontSize);
      }


    }

    function float2int (value) {
      return value | 0;
    }



    export function updateScreenSizesByOrientation(sizes){

      let screenSizes = {};
      if(sizes.h>sizes.w){
        screenSizes.h = sizes.h;
        screenSizes.w = sizes.w;
      }else{
        screenSizes.h = sizes.w;
        screenSizes.w = sizes.h;
      }
      return screenSizes;
    }
