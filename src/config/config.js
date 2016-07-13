import {version, pavConfig} from '../../package.json'
const {
  development,
  google_analytics_id
} = pavConfig;
module.exports = {
  VERSION: version,
  ENVIRONMENT_IS_DEV: development,
  GOOGLE_ANALYTICS_ID: google_analytics_id,


  MOCK_TOKEN: false,  //set to true to actually mock the token with the ones below, false means we use the real retrieved token. If true, you must set the values below
  DEV_TOKEN: "",
  PROD_TOKEN: ""
}
