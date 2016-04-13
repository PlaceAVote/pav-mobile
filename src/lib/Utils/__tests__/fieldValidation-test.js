/**
 * # LoginForm-test.js
 *
 * This class tests that the LoginForm renders correctly under
 * 4 states of the Login component, namely, logging in,
 * resetting the password and registration
 *
 * *Note:* if you want to understand the structures here, add a
 * ```console.log``` and then ```npm test```.
 *
 */

'use strict';

/**
 * ## Under test
 * class under test
 */
jest.unmock('../fieldValidation.js');
jest.unmock('immutable');


/**
 * ## Test name validation
 */
describe('Tests that the fieldValidation function validates the input correctly.', () => {


  let fieldValidation = require('../fieldValidation.js').default;
  // jest.unmock('immutable');
  // jest.unmock('validate.js');
  // jest.unmock("underscore");

  let Immutable = require('immutable');
  let {Record, Map} = Immutable;


  let Form = Record({
    state: 'whatever',
    disabled: false,
    error: null,
    isValid: Map([
      ["REGISTER_STEP_1", false],
      ["REGISTER_STEP_2", false],
      ["REGISTER_STEP_3", false],
      ["REGISTER_STEP_4", false],
      ["LOGIN", false],
      ["FORGOT_PASSWORD", false],
    ]),
    isFetching: false,
    fields: new (Record({
      username: '',
      usernameHasError: false,
      email: '',
      emailHasError: false,
      password: '',
      passwordHasError: false,
      passwordAgain: '',
      name: '',
      nameHasError:'',
      surname: '',
      surnameHasError:'',
      passwordAgainHasError: false,
      showPassword: false
    }))
  });

  let InitialState = new Record({
    form: new Form
  });














  /**
   * ### it should return false because we provide it a valid name
   */
  it('should return false since we\'re feeding it a name that is between 3-12 a-zA-Z characters', () => {

    let action = {
      payload:{
        field: 'name',  //the name should be from
        value: 'ioannis'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.nameHasError).toEqual(false);
  });




 /**
   * ### it should return true because we provide it an invalid name
   */
  it('should return true since we\'re feeding it a name that has a length of 2 characters', () => {

    let action = {
      payload:{
        field: 'name',  //the name should be from
        value: 'a2'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.nameHasError).toEqual(true);
  });



 /**
   * ### it should return true because we provide it an invalid name
   */
  it('should return true since we\'re feeding it a name that is more than 12 characters', () => {

    let action = {
      payload:{
        field: 'name',  //the name should be from
        value: 'awfafawfawfawfawfawfawf'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.nameHasError).toEqual(true);
  });

  /**
   * ### it should return true because we provide it an invalid name
   */
  it('should return true since we\'re feeding it a blank name.', () => {

    let action = {
      payload:{
        field: 'name',  //the name should be from
        value: ''
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.nameHasError).toEqual(true);
  });

  /**
   * ### it should return true because we provide it an invalid name
   */
  it('should return true since we\'re feeding it a name that contains special characters.', () => {

    let action = {
      payload:{
        field: 'name',  //the name should be from
        value: '@%@'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.nameHasError).toEqual(true);
  });

























  /**
   * ### it should return false because we provide it a valid password
   */
  it('should return false since we\'re feeding it a password that has at least a number and a capital letter and is between 6-20 a-zA-Z or !@#$%^&* characters', () => {

    let action = {
      payload:{
        field: 'password',  //the password should be from
        value: 'Ioannis123'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.passwordHasError).toEqual(false);
  });




 /**
   * ### it should return true because we provide it an invalid password
   */
  it('should return true since we\'re feeding it a password that has a length of 2 characters', () => {

    let action = {
      payload:{
        field: 'password',  //the password should be from
        value: 'us'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.passwordHasError).toEqual(true);
  });



 /**
   * ### it should return true because we provide it an invalid password
   */
  it('should return true since we\'re feeding it a password that is more than 12 characters', () => {

    let action = {
      payload:{
        field: 'password',  //the password should be from
        value: 'awfafawfawfawfawfawfawf'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.passwordHasError).toEqual(true);
  });

  /**
   * ### it should return true because we provide it an invalid password
   */
  it('should return true since we\'re feeding it a blank password.', () => {

    let action = {
      payload:{
        field: 'password',  //the password should be from
        value: ''
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.passwordHasError).toEqual(true);
  });

  /**
   * ### it should return true because we provide it an invalid password
   */
  it('should return true since we\'re feeding it a password that contains special characters.', () => {

    let action = {
      payload:{
        field: 'password',  //the password should be from
        value: 'a\'Password'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.passwordHasError).toEqual(true);
  });



  it('should return false since we\'re feeding it a correct type of email.', () => {

    let action = {
      payload:{
        field: 'email',  //the password should be from
        value: 'aCorrect@email.com'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.emailHasError).toEqual(false);
  });




  it('should return true since we\'re feeding it a wrong type of email.', () => {

    let action = {
      payload:{
        field: 'email',  //the password should be from
        value: 'aWrongEmail'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.emailHasError).toEqual(true);
  });

 it('should return true since we\'re feeding it a wrong type of email.', () => {
    let action = {
      payload:{
        field: 'email',  //the password should be from
        value: 'aWrongEmail.com'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.emailHasError).toEqual(true);
  });


 it('should return true since we\'re feeding it a wrong type of email.', () => {
    let action = {
      payload:{
        field: 'email',  //the password should be from
        value: 'a@WrongEmail'
      }
    };
    let res = fieldValidation((new InitialState), action);
    expect(res.toObject().form.fields.emailHasError).toEqual(true);
  });


























});
