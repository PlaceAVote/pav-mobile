import { Platform, PixelRatio } from 'react-native';



    export function getCorrectFontSizeForScreen(screenWidth, screenHeight, currentFontSize){

      let factor = 0;

      const maxFontDifferFactor = 6; //the maximum pixels of font size we can go up or

      if(Platform.OS === 'ios'){
        let devRatio = PixelRatio.get();
        factor = (((screenWidth*devRatio)/320)*0.55+((screenHeight*devRatio)/640)*0.45)
        // console.log("The width is: "+screenWidth+" and the height is "+screenHeight+" with a ratio : "+devRatio+ " and factor: "+factor);
        if(factor<=1){
          return currentFontSize-float2int(maxFontDifferFactor*0.3);
        }else if((factor>=1) && (factor<=1.6)){
          return currentFontSize-float2int(maxFontDifferFactor*0.1);
        }else if((factor>=1.6) && (factor<=2)){
          return currentFontSize;
        }else if((factor>=2) && (factor<=3)){
          return currentFontSize+float2int(maxFontDifferFactor*0.85);
        }else if (factor>=3){
          return currentFontSize+float2int(maxFontDifferFactor);
        }
      }else{
        // // console.log("screenWidth is: "+screenWidth+"/375")
        // // let scale = screenWidth/375;
        // // console.log("Current font size: "+currentFontSize+" but because scale is: "+scale+" we make it: "+currentFontSize*scale);
        // // console.log("Current font size: "+currentFontSize+" but because factor is: "+factor+" we make it: "+maxFontDifferFactor+"*0.5="+float2int(maxFontDifferFactor*0.5));
        // // return Math.round((currentFontSize)*scale)//+float2int(maxFontDifferFactor*0.5)
        // factor = (((screenWidth)/320)*0.65+((screenHeight)/640)*0.35)
        // // console.log("The width is: "+screenWidth+" and the height is "+screenHeight+" with a ratio : "+devRatio+ " and factor: "+factor);
        // if(factor<=1){
        //   return currentFontSize-float2int(maxFontDifferFactor*0.3);
        // }else if((factor>=1) && (factor<=1.6)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.35);
        // }else if((factor>=1.6) && (factor<=2)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.5);
        // }else if((factor>=2) && (factor<=3)){
        //   return currentFontSize+float2int(maxFontDifferFactor*0.65);
        // }else if (factor>=3){
        //   return currentFontSize+float2int(maxFontDifferFactor);
        // }
        let scale = screenWidth/375;
        return float2int(scale * (currentFontSize+4));
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
