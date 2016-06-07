import keyMirror from 'key-mirror';

module.exports =  {
  Colors: {
    primaryColor : "#536EB2",
    secondaryColor: "#3D5B96",  //dark blue
    accentColor: "#A5CB75", //green
    negativeAccentColor: "#e64a33", //pinkred

    transparentColor: "rgba(0,0,0,0)",  //clear

    mainBorderColor: "rgba(0,0,0,0.2)", //very transparent black
    secondaryBorderColor: "rgba(0,0,0,0.12)", //very transparent black

    mainTextColor: "white",
    secondaryTextColor: "#B8B8BD",   //ultra light grey
    thirdTextColor: "black",
    fourthTextColor: "#707070",   //grey
    fifthTextColor: "#4A4A4A",     //brownish grey
    errorTextColor: "#a94442",    //red
    helpTextColor: "#999999",      //light grey

    titleBgColor: "#F6F5FF",   //greysh blue very light
    titleBgColorDark: "#E8E7EE", //grey very very light

  },


  Modals: keyMirror({
    WELCOME: null,
    FORGOT_PASSWORD: null
  }),

  ScheneKeys: keyMirror({
    SPLASH_SCREEN:null,
    ONBOARDING: null,
    LOGIN: null,
    REGISTER_STEP_1: null,
    REGISTER_STEP_2: null,
    REGISTER_STEP_3: null,
    REGISTER_STEP_4: null,
    TOPIC_PICK: null,
    MAIN: "_MAIN",
    TAB_NEWS: null,
    TAB_NOTIFS: null,
    TAB_PROFILE: null,
    ACCOUNT_SETTINGS: null,
    BILL: null,
    COMMENTS: null,
    VOTE: null,
    PROFILE:null

  }),
  BillPageTabs: {
    SUMMARY: 0,
    STATUS: 1,
    INFO: 2,
    COMMENTS: 3,
  },
  NewsFeedUpdateTypes: keyMirror({
    COMMENT_CARD_LIKE: null,
    COMMENT_CARD_DISLIKE: null,
  }),
  StorageKeys:{
    SESSION_TOKEN_STORAGE_KEY: "token",
    USER_INFO_STORAGE_KEY: "userInfo",
  },
  Other: {
    NEWS_FEED_FILTERS:{
      ALL_ACTIVITY_FILTER:'All activity ',
      FOLLOWING_ACTIVITY_FILTER:'Following ',
      BILL_ACTIVITY_FILTER:'Bill Activity ',
      DISCOVER_ACTIVITY_FILTER:'Discover ',
      STATISTICS_ACTIVITY_FILTER:'Statistics ',
    },
    TOPICS:{
      CRIME:'crime',
      HEALTHCARE: 'healthcare',
      TAXES: 'taxes',
      IMMIGRATION: 'immigration',
      EDUCATION: 'education',
      DRUGS: 'drugs',
      DEFENSE: 'defense',
      POLITICS: 'politics',
      GUN_RIGHTS: 'gun rights',
      TECHNOLOGY: 'technology',
      ECONOMICS: 'economics',
      SOCIAL_INTEREST: 'social interest',

      TRENDING: 'trending'
    },
    REACTIONS : {
      NONE:'none',
      HAPPY:'positive',
      NEUTRAL:'neutral',
      SAD:'negative',
    },
    SOCIAL_TYPES:{
      SIMPLE_URL: 'url',
      FACEBOOK: 'facebook',
      TWITTER: 'twitter',
    },
    SORT_FILTERS:{
      HIGHEST_RATE:'highest-score',
      NEWEST:'latest',
    },




    BILL_STATUSES: {
      "INTRODUCED":{title:"Bill Introduced", explanation:"The bill or resolution was introduced but not yet referred to committee.", icons:["introduced"]},
      "REFERRED":{title:"Bill Referred", explanation:"The bill or resolution has been referred to committee in the originating chamber and needs committee action to continue.", icons:["introduced"]},
      "REPORTED":{title:"Reported by Committee", explanation:"The bill or resolution was reported by committee in the originating chamber and can now continue with floor debate in the originating chamber.", icons:["introduced", "committee"]},

      "PROV_KILL:SUSPENSIONFAILED":{title:"Failed in the House Under Suspension", explanation:"The bill or resolution was brought under a fast track procedure called `under suspension of the rules` but failed that vote. Since it can be voted on again, we call it provisionally killed.", icons:["introduced", "committee", "bill-house-reject"]},
      "PROV_KILL:CLOTUREFAILED":{title:"Failed Cloture in the Senate", explanation:"The Senate must often vote to end debate before voting on a bill, called a cloture vote. The vote on cloture failed. This is often considered a filibuster. The bill is provisionally dead, in a sense, but the Senate may try again.", icons:["introduced", "committee", "bill-senate-reject"]},

      "FAIL:ORIGINATING:HOUSE":{title:"Failed in House", explanation:"The bill or resolution failed in the House. The bill is now dead.", icons:["introduced", "committee", "bill-house-reject"]},
      "FAIL:ORIGINATING:SENATE":{title:"Failed in Senate", explanation:"The bill or resolution failed in the Senate. The bill is now dead.", icons:["introduced", "committee", "bill-senate-reject"]},
      "FAIL:SECOND:HOUSE":{title:"Failed in the House", explanation:"The bill passed in the Senate but failed in the House. The bill is now dead.", icons:["introduced", "committee", "bill-house-reject"]},
      "FAIL:SECOND:SENATE":{title:"Failed in the Senate", explanation:"The bill or resolution passed in its originating chamber but failed in the other chamber. The bill is now dead.", icons:["introduced", "committee", "bill-senate-reject"]},

      "PASSED:SIMPLERES":{title:"Simple Resolution passed", explanation:"A simple resolution has been passed in the bills originating chamber. This is the end of the life for a simple resolution.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass"]},
      "PASSED:CONSTAMEND":{title:"Constitution amendment passed", explanation:" A joint resolution which is proposing an amendment to the Constitution has passed both chambers in identical form. This is the end of the life for the resolution in the legislative branch. It goes on subsequently to the states.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass"]},
      "PASSED:CONCURRENTRES":{title:"Passed Through Concurrent Resolution", explanation:"A concurrent resolution has been passed by both chambers in identical form. This is the end of the life for concurrent resolutions.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass"]},
      "PASSED:BILL":{title:"Bill Passed", explanation:" A bill (or a joint resolution not proposing an amendment to the constitution) has been passed by both chambers in identical form. This is normally displayed as `Enrolled Bill`. The bill will go on to the President next. This status typically is applied when the second chamber passes a bill", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass"]},

      "PASS_OVER:HOUSE":{title:"Passed Favorably (House)", explanation:"The bill was passed in a vote in the House. It goes to the Senate next. The vote was by Unanimous Consent so no record of individual votes exists.", icons:["introduced", "committee", "bill-house-pass"]},
      "PASS_OVER:SENATE":{title:"Passed Favorably (Senate)", explanation:"The bill was passed in a vote in the Senate. It goes to the House next. The vote was by Unanimous Consent so no record of individual votes exists.", icons:["introduced", "committee", "bill-senate-pass"]},

      "PASS_BACK:HOUSE":{title:"House Passes Bill Back to the Senate", explanation:"The House voted and made changes that the Senate now has to agree on, so they send the bill back to the Senate. Ping pong can go around and around.", icons:["introduced", "committee", "bill-house-pass"]},
      "PASS_BACK:SENATE":{title:"Senate Passes Bill Back to the House", explanation:"The Senate voted and made changes that the House now has to agree on, so they send the bill back to the House. Ping pong can go around and around.", icons:["introduced", "committee", "bill-senate-pass"]},

      "CONFERENCE:PASSED:HOUSE":{title:"Conference passed house", explanation:"After the Senate and the House failed to agree upon a bill, a conference committee was formed. That conference committee issued a report but only the House has aggreed on this report so far. When the Senate aggrees as well, the bill will pass.", icons:["introduced", "committee", "bill-house-pass"]},
      "CONFERENCE:PASSED:SENATE":{title:"Conference passed Senate", explanation:"After the Senate and the House failed to agree upon a bill, a conference committee was formed. That conference committee issued a report but only the Senated has aggreed on this report so far. When the House aggrees as well, the bill will pass.", icons:["introduced", "committee", "bill-senate-pass"]},

      "PROV_KILL:PINGPONGFAIL":{title:"Ping Pong Failure",explanation:"The House or Senate did not approve of changes to the bill made in the other chamber. They can try again.", icons:["introduced", "committee", "bill-reject"]},

      "PROV_KILL:VETO":{title:"Passed Bill Vetoed.", explanation:"A passed bill was vetoed by the president. A veto can be overridden by the Congress though.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass"]},

      "VETOED:POCKET":{title:"Bill Pocket-Vetoed", explanation:"When a bill gets pocket-vetoed, that means that the President did not sign the bill neither did he veto it for 10 days. The bill does not become law and Congress has no opportunity to override.", icons:["introduced", "committee", "bill-reject"]},

      "VETOED:OVERRIDE_FAIL_ORIGINATING:HOUSE":{title:"Veto Override Failed in House", explanation:"Veto override failed in the House, the bill's originating chamber.", icons:["introduced", "committee", "bill-senate-pass", "failed-house"]},
      "VETOED:OVERRIDE_FAIL_ORIGINATING:SENATE":{title:"Veto Override Failed in Senate", explanation:"Veto override failed in the Senate, the bill's originating chamber.", icons:["introduced", "committee", "bill-house-pass", "failed-senate"]},
      "VETOED:OVERRIDE_PASS_OVER:HOUSE":{title:"Override Pass over - House", explanation:" This status code indicate a veto override attempt was successful in the originating chamber, and that it is now up to the House to attempt the override. The chamber named in the status is the chamber that just had a successful override vote.", icons:["introduced", "committee", "bill-senate-pass"]},
      "VETOED:OVERRIDE_PASS_OVER:SENATE":{title:"Override Pass over - Senate", explanation:" This status code indicate a veto override attempt was successful in the originating chamber, and that it is now up to the House to attempt the override. The chamber named in the status is the chamber that just had a successful override vote.", icons:["introduced", "committee", "bill-house-pass"]},
      "VETOED:OVERRIDE_FAIL_SECOND:HOUSE":{title:"Override Failed second - House", explanation:"Veto override passed in the Senate but failed in the House.", icons:["introduced", "committee", "bill-senate-pass", "failed-house"]},
      "VETOED:OVERRIDE_FAIL_SECOND:SENATE":{title:"Override Failed second - Senate", explanation:"Veto override passed in the House but failed in the Senate.", icons:["introduced", "committee", "bill-house-pass", "failed-senate"]},

      "ENACTED:VETO_OVERRIDE":{title:"Bill Vetoed but Veto Overriden", explanation:"The bill was vetoed but the veto was overridden in both chambers.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass", "bill-passed"]},
      "ENACTED:TENDAYRULE":{title:"Ten day Rule", explanation:" The bill became law because ten Days passed (Sundays excepted) while the president neither singed nor vetoed the bill. This has happened only six times since the 93rd Congress, none recently.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass", "bill-passed"]},
      "ENACTED:SIGNED":{title:"Singed", explanation:"The President signed the bill and it became a law.", icons:["introduced", "committee", "bill-senate-pass", "bill-house-pass", "bill-passed"]},
    },


    US_STATES:{
      AL: "Alabama",
      AK: "Alaska",
      AS: "American Samoa",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      DC: "District Of Columbia",
      FM: "Federated States Of Micronesia",
      FL: "Florida",
      GA: "Georgia",
      GU: "Guam",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MH: "Marshall Islands",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      MP: "Northern Mariana Islands",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PW: "Palau",
      PA: "Pennsylvania",
      PR: "Puerto Rico",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VI: "Virgin Islands",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming"
    }

  },
  ActionNames:  keyMirror({

   /* global */
   SET_NAVBAR_DIMENSIONS: null,
   SET_STORE: null,

   /* device */
   SET_DEV: null,
   SET_PLATFORM: null,
   SET_VERSION: null,
   SET_ORIENTATION: null,
   SET_ORIENTATION_LOCK:null,


   /* Topic Pick */
   ON_TOPICS_FORM_FIELD_CHANGE: null,
   ON_AUTH_FORM_FIELD_CHANGE: null,


   /* Auth */
   SET_AUTH_METHOD: null,
   SET_SESSION_TOKEN: null,
   SET_USER_DATA: null,
   RESET_ERROR_STATE:null,


   TOKEN_VALIDATE_REQUEST: null,
   TOKEN_VALIDATE_SUCCESS: null,
   TOKEN_VALIDATE_FAILURE: null,

   SIGNUP_REQUEST: null,
   SIGNUP_SUCCESS: null,
   SIGNUP_FAILURE: null,

   SIGNUP_FACEBOOK_REQUEST: null,
   SIGNUP_FACEBOOK_SUCCESS: null,
   SIGNUP_FACEBOOK_FAILURE: null,

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


   /* Routing */
   SET_MODAL_VISIBILITY: null,


   /* Profile*/

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


   /* News Feed */
   SET_ACTIVITY_FILTER: null,

   GET_FEED_REQUEST: null,
   GET_FEED_SUCCESS: null,
   GET_FEED_FAILURE: null,


   UPDATE_ITEMS: null,

   GET_DISCOVERY_REQUEST: null,
   GET_DISCOVERY_SUCCESS: null,
   GET_DISCOVERY_FAILURE: null,


   REACT_TO_ISSUE_REQUEST: null,
   REACT_TO_ISSUE_SUCCESS: null,
   REACT_TO_ISSUE_FAILURE: null,

   DEL_REACTION_FROM_ISSUE_REQUEST: null,
   DEL_REACTION_FROM_ISSUE_SUCCESS: null,
   DEL_REACTION_FROM_ISSUE_FAILURE: null,

   LIKE_COMMENT_FEED_REQUEST: null,
   LIKE_COMMENT_FEED_SUCCESS: null,
   LIKE_COMMENT_FEED_FAILURE: null,

   DISLIKE_COMMENT_FEED_REQUEST: null,
   DISLIKE_COMMENT_FEED_SUCCESS: null,
   DISLIKE_COMMENT_FEED_FAILURE: null,

   /*  Bill */

   CLEAR_PAST_BILL_DATA: null,

   GET_BILL_REQUEST: null,
   GET_BILL_SUCCESS: null,
   GET_BILL_FAILURE: null,

   GET_BILL_COMMENTS_REQUEST: null,
   GET_BILL_COMMENTS_SUCCESS: null,
   GET_BILL_COMMENTS_FAILURE: null,

   GET_BILL_TOP_COMMENTS_REQUEST: null,
   GET_BILL_TOP_COMMENTS_SUCCESS: null,
   GET_BILL_TOP_COMMENTS_FAILURE: null,

   POST_COMMENT_ON_BILL_REQUEST: null,
   POST_COMMENT_ON_BILL_SUCCESS: null,
   POST_COMMENT_ON_BILL_FAILURE: null,

   POST_COMMENT_ON_COMMENT_REQUEST: null,
   POST_COMMENT_ON_COMMENT_SUCCESS: null,
   POST_COMMENT_ON_COMMENT_FAILURE: null,

   LIKE_COMMENT_BILL_REQUEST: null,
   LIKE_COMMENT_BILL_SUCCESS: null,
   LIKE_COMMENT_BILL_FAILURE: null,

   DISLIKE_COMMENT_BILL_REQUEST: null,
   DISLIKE_COMMENT_BILL_SUCCESS: null,
   DISLIKE_COMMENT_BILL_FAILURE: null,


    /* Not yet implemented */
   //  DELETE_TOKEN_REQUEST: null,
   //  DELETE_TOKEN_SUCCESS: null,
   //  LOGOUT: null,
   //  LOGOUT_REQUEST: null,
   //  LOGOUT_SUCCESS: null,
   //  LOGOUT_FAILURE: null,
   //  LOGGED_IN: null,
   //  LOGGED_OUT: null,
   //  RESET_PASSWORD_REQUEST: null,
   //  RESET_PASSWORD_SUCCESS: null,
   //  RESET_PASSWORD_FAILURE: null,
   //  ON_PROFILE_FORM_FIELD_CHANGE: null,
   //  PROFILE_UPDATE_REQUEST: null,
   //  PROFILE_UPDATE_SUCCESS: null,
   //  PROFILE_UPDATE_FAILURE: null,

    /* Not really needed */
   //  SET_STATE: null,
   //  GET_STATE: null,
   //  SESSION_TOKEN_REQUEST: null,
   //  SESSION_TOKEN_SUCCESS: null,
   //  SESSION_TOKEN_FAILURE: null,


 })

};
