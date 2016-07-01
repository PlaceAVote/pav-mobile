


/*
  Crash library imports (Current: Sentry)
*/
import Raven from 'raven-js';
import RNRaveInit from 'raven-js/plugins/react-native';







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



    /*
      Crash library init (Current: Sentry)
    */

    RNRaveInit(Raven);
    Raven
    .config('https://aa9e354d3f8347febf7038031c4bf602@app.getsentry.com/85125', { release: props.version })
    .install();
    return instance;
  }





};
