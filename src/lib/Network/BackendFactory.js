/**
 * # BackendFactory.js
 * 
 * This class interfaces with PAVBackend using the rest api
 *
 */
'use strict';

import CONFIG from '../../config/config';
import PAVBackend from './PAVBackend';
// import Hapi from './Hapi';

export default function BackendFactory(token = null) {
  if (CONFIG.backend.pav) {
    return new PAVBackend(token);
  }
  //  else if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
  //   return new Hapi(token);
  // }
}
