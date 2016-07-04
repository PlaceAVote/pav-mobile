/*
  Crash library imports (Current: Bugsnag)
*/
import RNBugsnag from 'react-native-bugsnag';







/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;
export default class CrashReporter {
  /**
   * ## Constructor
   */
  constructor( props ) {

    //Singleton pattern, see here(http://amanvirk.me/singleton-classes-in-es6/)
    if(!instance){
      instance = this;
    }

    RNBugsnag();
    return instance;
  }

};
