/*
  Analytics library imports (Current: GoogleAnalytics)
*/
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import {GOOGLE_ANALYTICS_ID} from '../../config/config';



export default (props)=>{
  return new AnalyticsReporter(props);
}



/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;
class AnalyticsReporter {
  /**
   * ## Constructor
   */
  constructor( props ) {

    //Singleton pattern, see here(http://amanvirk.me/singleton-classes-in-es6/)
    if(!instance){
      instance = this;
    }
    // alert("Done")
    GoogleAnalytics.setTrackerId(GOOGLE_ANALYTICS_ID)
    // GoogleAnalytics.setUser(props.userId)
    GoogleAnalytics.setAppName("PlaceAVote")

    // let stopTracking = false;
    // GoogleAnalytics.setDryRun(stopTracking);
    GoogleAnalytics.setDispatchInterval(70);
    return instance;
  }


  /*
  screenName (required): String, name of current screen
  */
  trackScreenView(screenName){
    GoogleAnalytics.trackScreenView(screenName);
  }


  /*
  category (required): String, category of event
  action (required): String, name of action
  optionalValues: Object
  label: String
  value: Number
  */
  trackEvent(category, action, optionalValues){
    GoogleAnalytics.trackEvent(category, action, optionalValues);
  }


  /*
  category (required): String, category of the timed event
  value (required): Number, the timing measurement in milliseconds
  optionalValues: Object
  name: String, the name of the timed event
  label: String, the label of the timed event
  i.e: GoogleAnalytics.trackTiming('testcategory', 13000, {name: 'loadList', label: 'v1.0.3'});
  */
  trackTiming(category, value, optionalValues){
    GoogleAnalytics.trackTiming(category, value, optionalValues);
  }

  trackException(error, fatal){
    GoogleAnalytics.trackException(error, fatal);
  }


  /*
  network (required): String, name of social network (e.g. 'Facebook', 'Twitter', 'Google+')
  action (required): String, social action (e.g. 'Like', 'Share', '+1')
  targetUrl: String, url of content being shared
  */
  trackSocialInteraction(network, action, targetUrl){
      GoogleAnalytics.trackSocialInteraction(network, action, targetUrl)
  }

  /*
  screenName (required): String, name of current screen
  dimensionIndexValueDict (required): Dict of dimension index / values.
  */
  trackScreenViewWithCustomDimensionValues(screenName, dimensionIndexValueDict){
    GoogleAnalytics.trackScreenViewWithCustomDimensionValues(screenName, dimensionIndexValueDict);
  }


};
