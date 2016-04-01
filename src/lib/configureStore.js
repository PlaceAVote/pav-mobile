/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict';

/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers';

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  devTools()
)(createStore);

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore(initialState, storeEnhancers) {
  return createStoreWithMiddleware(reducer, initialState, storeEnhancers);
};
