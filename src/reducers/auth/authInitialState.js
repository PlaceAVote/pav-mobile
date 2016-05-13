 /**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
import {ScheneKeys, Other, Modals} from '../../config/constants';
import {Record, Map, List} from 'immutable';

const {
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
} = ScheneKeys;
const {
  TOPICS
} = Other;
const {
  FORGOT_PASSWORD
} = Modals;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({

  disabled: false,
  error: null,
  isValid: new Map([
    [REGISTER_STEP_1, false],
    [REGISTER_STEP_2, false],
    [REGISTER_STEP_3, false],
    [REGISTER_STEP_4, false],
    [LOGIN, false],
    [FORGOT_PASSWORD, false],
  ]),
  isFetching: false,
  authMethod: '',   //either email, or facebook
  fields: new (Record({
    name: '',
    nameHasError:false,
    surname: '',
    surnameHasError:false,
    email: '',
    emailHasError: false,
    password: '',
    passwordHasError: false,
    passwordAgain: '',
    passwordAgainHasError: false,
    dateOfBirth: new Date(),
    dateOfBirthIsCurBeingPicked: false,
    zipCode: '',
    zipCodeHasError: false,
    forgotPasswordEmail: '',
    forgotPasswordEmailHasError: false,
    fbAuthUID: '',
    fbAuthToken: '',
    fbAuthImgUrl: '',
    gender: 'they',
    showPassword: false,
    // fbAuthPermissionError: false,
    // userDataRemainsToBeCollected: new Map([
    //   ['nameOrSurname', false],
    //   ['email', false],
    //   //birthday and zipcode I will have to ask for anyway
    // ]),
    topicsList: new Map([
      [TOPICS.CRIME, new (Record({ title: 'Crime', icon: 'crime', isSelected: false}))],
      [TOPICS.HEALTHCARE, new (Record({ title: 'Healthcare', icon: 'healthcare', isSelected: false}))],
      [TOPICS.TAXES, new (Record({ title: 'Taxes', icon: 'taxes', isSelected: false}))],
      [TOPICS.IMMIGRATION , new (Record({ title: 'Immigration', icon:  'immigration', isSelected: false}))],
      [TOPICS.EDUCATION , new (Record({ title: 'Education', icon:  'education', isSelected: false}))],
      [TOPICS.DRUGS , new (Record({ title: 'Drugs', icon:  'smoking-area', isSelected: false}))],
      [TOPICS.DEFENSE , new (Record({ title: 'Defense', icon: 'tank', isSelected: false}))],
      [TOPICS.POLITICS , new (Record({ title: 'Politics', icon:  'building', isSelected: false}))],
      [TOPICS.GUN_RIGHTS , new (Record({ title: 'Rights', icon: 'gun', isSelected: false}))],
      [TOPICS.TECHNOLOGY , new (Record({ title: 'Technology', icon:  'ipad', isSelected: false}))],
      [TOPICS.ECONOMICS , new (Record({ title: 'Economics', icon:  'money', isSelected: false}))],
      [TOPICS.SOCIAL_INTEREST , new (Record({ title: 'Social Interest', icon:  'police', isSelected: false}))]
    ])
  }))
});

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  form: new Form,
  user: new (Record({
    isLoggedIn: false,
    id: null,
    email: null,
    address: null,
    city: null,
    confirmationToken:null,
    countryCode:null,
    createdAt:null,
    district:null,
    birthday: null,
    firstName:'voter',
    lastName: null,
    gender:null,
    zipCode:null,
    stateProvince:null,
    latitude: null,
    longitude:null,
    publicProfile: null,
    registered:null,
    topics:null,
    photoUrl:null
  })),
});
export default InitialState;
