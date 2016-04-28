import keyMirror from 'key-mirror';

module.exports =  {
  Colors: {
    primaryColor : "#536EB2",
    secondaryColor: "#3D5B96",  //dark blue
    accentColor: "#A5CB75", //green
    negativeAccentColor: "#e64a33",

    transparentColor: "rgba(0,0,0,0)",  //clear

    mainBorderColor: "rgba(0,0,0,0.2)", //very transparent black

    mainTextColor: "white",
    secondaryTextColor: "#B8B8BD",   //light grey
    thirdTextColor: "black",
    fourthTextColor: "#707070",

    errorTextColor: "#a94442",
    helpTextColor: "#999999"

  },

  ScheneKeys: keyMirror({
    ONBOARDING: null,
    FORGOT_PASSWORD: null,
    LOGIN: null,
    REGISTER_STEP_1: null,
    REGISTER_STEP_2: null,
    REGISTER_STEP_3: null,
    REGISTER_STEP_4: null,
    TOPIC_PICK: null,
    MAIN: null,
    TAB_NEWS: null,
    TAB_NOTIFS: null,
    TAB_PROFILE: null,

  }),
  Other: {
    SESSION_TOKEN_STORAGE_KEY: "token"
  },
  ActionNames:  keyMirror({

   SET_NAVBAR_DIMENSIONS: null,

   SET_PLATFORM: null,
   SET_VERSION: null,
   SET_ORIENTATION: null,
   SET_ORIENTATION_LOCK:null,

   SESSION_TOKEN_REQUEST: null,
   SESSION_TOKEN_SUCCESS: null,
   SESSION_TOKEN_FAILURE: null,

   DELETE_TOKEN_REQUEST: null,
   DELETE_TOKEN_SUCCESS: null,

   ON_LOGIN_STATE_CHANGE: null,
   LOGOUT: null,

   ON_TOPICS_FORM_FIELD_CHANGE: null,
   ON_AUTH_FORM_FIELD_CHANGE: null,

   SIGNUP_REQUEST: null,
   SIGNUP_SUCCESS: null,
   SIGNUP_FAILURE: null,

   SIGNUP_FACEBOOK_REQUEST: null,
   SIGNUP_FACEBOOK_SUCCESS: null,
   SIGNUP_FACEBOOK_FAILURE: null,

   SET_AUTH_METHOD: null,


   VALIDATE_REQUEST: null,
   VALIDATE_SUCCESS: null,
   VALIDATE_FAILURE: null,

   LOGIN_REQUEST: null,
   LOGIN_SUCCESS: null,
   LOGIN_FAILURE: null,

   LOGIN_FACEBOOK_REQUEST:null,
   LOGIN_FACEBOOK_SUCCESS:null,
   LOGIN_FACEBOOK_FAILURE:null,


   FORGOT_PASSWORD_REQUEST: null,
   FORGOT_PASSWORD_SUCCESS: null,
   FORGOT_PASSWORD_FAILURE: null,

   FACEBOOK_DATA_ACQ_REQUEST: null,
   FACEBOOK_DATA_ACQ_SUCCESS: null,
   FACEBOOK_DATA_ACQ_FAILURE: null,


   LOGOUT_REQUEST: null,
   LOGOUT_SUCCESS: null,
   LOGOUT_FAILURE: null,

   LOGGED_IN: null,
   LOGGED_OUT: null,

   SET_SESSION_TOKEN: null,

   SET_USER_DATA: null,

   RESET_PASSWORD_REQUEST: null,
   RESET_PASSWORD_SUCCESS: null,
   RESET_PASSWORD_FAILURE: null,
   RESET_ERROR_STATE:null,

   GET_PROFILE_REQUEST: null,
   GET_PROFILE_SUCCESS: null,
   GET_PROFILE_FAILURE: null,

   GET_TIMELINE_REQUEST: null,
   GET_TIMELINE_SUCCESS: null,
   GET_TIMELINE_FAILURE: null,

   FOLLOW_USER_REQUEST: null,
   FOLLOW_USER_SUCCESS: null,
   FOLLOW_USER_FAILURE: null,

   UNFOLLOW_USER_REQUEST: null,
   UNFOLLOW_USER_SUCCESS: null,
   UNFOLLOW_USER_FAILURE: null,

   ON_PROFILE_FORM_FIELD_CHANGE: null,

   PROFILE_UPDATE_REQUEST: null,
   PROFILE_UPDATE_SUCCESS: null,
   PROFILE_UPDATE_FAILURE: null,

   SET_STATE: null,
   GET_STATE: null,
   SET_STORE: null,

   NAVIGATE_TO: null,
   NAVIGATE_PREVIOUS: null,
   SET_MODAL_VISIBILITY: null

 })

};
