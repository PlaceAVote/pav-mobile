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
import {ScheneKeys, Modals, TOPICS} from '../../config/constants';
import {Record, Map, List} from 'immutable';
import moment from 'moment';

const {
  REGISTER_STEP_1,
  REGISTER_STEP_1_FB,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
} = ScheneKeys;

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
    [REGISTER_STEP_1_FB, false],
    [REGISTER_STEP_2, false],
    [LOGIN, false],
    [FORGOT_PASSWORD, false],
  ]),
  isFetching: false,
  authMethod: '',   //either email, or facebook
  fields: new (Record({
    name: null,
    nameHasError:false,
    surname: null,
    surnameHasError:false,
    email: null,
    emailHasError: false,
    password: null,
    passwordHasError: false,
    passwordAgain: null,
    passwordAgainHasError: false,
    dateOfBirth: null,
    dateOfBirthIsCurBeingPicked: false,
    dateOfBirthHasError: false,
    zipCode: null,
    zipCodeHasError: false,
    forgotPasswordEmail: null,
    forgotPasswordEmailHasError: false,
    fbAuthUID: '',
    fbAuthToken: '',
    fbAuthImgUrl: '',
    gender: 'male',
    showPassword: false,
    // fbAuthPermissionError: false,
    // userDataRemainsToBeCollected: new Map([
    //   ['nameOrSurname', false],
    //   ['email', false],
    //   //birthday and zipcode I will have to ask for anyway
    // ]),
    topicsList: new Map([
      [TOPICS.CRIME.key, new (Record({ title: 'Crime', icon: 'crime', isSelected: true}))],
      [TOPICS.HEALTHCARE.key, new (Record({ title: 'Healthcare', icon: 'healthcare', isSelected: true}))],
      [TOPICS.TAXES.key, new (Record({ title: 'Taxes', icon: 'taxes', isSelected: true}))],
      [TOPICS.IMMIGRATION .key, new (Record({ title: 'Immigration', icon:  'immigration', isSelected: true}))],
      [TOPICS.EDUCATION .key, new (Record({ title: 'Education', icon:  'education', isSelected: true}))],
      [TOPICS.DRUGS .key, new (Record({ title: 'Drugs', icon:  'smoking-area', isSelected: true}))],
      [TOPICS.DEFENSE .key, new (Record({ title: 'Defense', icon: 'tank', isSelected: true}))],
      [TOPICS.POLITICS .key, new (Record({ title: 'Politics', icon:  'building', isSelected: true}))],
      [TOPICS.GUN_RIGHTS .key, new (Record({ title: 'Gun Rights', icon: 'gun', isSelected: true}))],
      [TOPICS.TECHNOLOGY .key, new (Record({ title: 'Technology', icon:  'ipad', isSelected: true}))],
      [TOPICS.ECONOMICS .key, new (Record({ title: 'Economics', icon:  'money', isSelected: true}))],
      [TOPICS.SOCIAL_INTEREST .key, new (Record({ title: 'Social Interest', icon:  'police', isSelected: true}))]
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
