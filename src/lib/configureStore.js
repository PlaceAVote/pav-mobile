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
// const createStoreWithMiddleware = compose(
//   applyMiddleware(thunk),
//   devTools()
//   // ({
//   //     name: 'PlaceAVote app', realtime: true,
//   //     hostname: 'localhost', port: 8000,
//   //     maxAge: 30, filters: { blacklist: ['EFFECT_RESOLVED'] }
//   // })
// )(createStore);
// return createStoreWithMiddleware(reducer, initialState, storeEnhancers);






/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile, router
 *
 */
export default function configureStore(initialState) {
  const enhancer = compose(
      applyMiddleware(thunk),
      devTools(
        // {
        //   name: 'PlaceAVote app', realtime: true,
        //   hostname: 'localhost', port: 8000,
        //   maxAge: 30, filters: { blacklist: ['EFFECT_RESOLVED'] }
        // }
      )
    );
    // Note: passing enhancer as last argument requires redux@>=3.1.0
  return createStore(reducer, initialState, enhancer);
};
