import { Platform, PixelRatio } from 'react-native';


    export function getCorrectFontSizeForScreen(screenWidth, screenHeight, currentFontSize){
      let devRatio = PixelRatio.get();
      let factor = (((screenWidth*devRatio)/320)+((screenHeight*devRatio)/640))/2.0;
      // console.log("The width is: "+screenWidth+" and the height is "+screenHeight+" with a ratio : "+devRatio+ " and factor: "+factor);
      let maxFontDifferFactor = 5; //the maximum pixels of font size we can go up or

      if(Platform.OS === 'ios'){
        // console.log("The factor is: "+factor);
        if(factor<=1){
          return currentFontSize-float2int(maxFontDifferFactor*0.3);
        }else if((factor>=1) && (factor<=1.6)){
          return currentFontSize-float2int(maxFontDifferFactor*0.1);
        }else if((factor>=1.6) && (factor<=2)){
          return currentFontSize;
        }else if((factor>=2) && (factor<=3)){
          return currentFontSize+float2int(maxFontDifferFactor*0.65);
        }else if (factor>=3){
          return currentFontSize+float2int(maxFontDifferFactor);
        }
      }else{
        let scale = screenWidth/375;
        // console.log("Current font size: "+currentFontSize+" but because scale is: "+scale+" we make it: "+currentFontSize*scale);
        // console.log("Current font size: "+currentFontSize+" but because factor is: "+factor+" we make it: "+maxFontDifferFactor+"*0.5="+float2int(maxFontDifferFactor*0.5));
        return Math.round((currentFontSize+5)*scale)//+float2int(maxFontDifferFactor*0.5)
      }


    }

    function float2int (value) {
      return value | 0;
    }
