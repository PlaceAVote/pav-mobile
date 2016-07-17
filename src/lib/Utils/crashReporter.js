/*
  Crash library imports (Current: Bugsnag)
*/
import RNBugsnag from 'react-native-bugsnag';





export default (props)=>{
  return new CrashReporter(props);
}

/*
  * The instance of our singleton
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;
class CrashReporter {
  /**
   * ## Constructor
   */
  constructor( props ) {

    //Singleton pattern, see here(http://amanvirk.me/singleton-classes-in-es6/)
    if(!instance){
      instance = this;
      RNBugsnag(props);
    }


    return instance;
  }

  setIdentifier(id, email, fullName){
    RNBugsnag().setIdentifier(id, email, fullName);
  }

};
