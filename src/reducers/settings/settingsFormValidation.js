/**
 * # settingsFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 *
 * As there are only two fields, the form is valid if they are
 */
export function formValidation (state) {
  let fields = state.get("form").get("fields");
    if (
        (fields.get("email")!=null && fields.get("emailHasError")!=null)
        &&
        (fields.get("firstNameHasError")!=null && fields.get("firstNameHasError")!=null)
        &&
        (fields.get("lastNameHasError")!=null && fields.get("lastNameHasError")!=null)
        &&
        (fields.get("genderHasError")!=null && fields.get("genderHasError")!=null)
        &&
        (fields.get("dobHasError")!=null && fields.get("dobHasError")!=null)
        &&
        (fields.get("isPrivate")!=null && fields.get("isPrivate")!=null)
        &&
        (fields.get("stateHasError")!=null && fields.get("stateHasError")!=null)
        &&
        (fields.get("districtHasError")!=null && fields.get("districtHasError")!=null)
        &&
        (fields.get("zipCodeHasError")!=null && fields.get("zipCodeHasError")!=null)
        &&
        (fields.get("cityHasError")!=null && fields.get("cityHasError")!=null)
        &&
        (fields.get("imgUrlHasError")!=null && fields.get("imgUrlHasError")!=null)
       ) {
      return state.setIn(['form','isValid'],true);
    } else {
      return state.setIn(['form','isValid'],false);
    }

  return state;

}
