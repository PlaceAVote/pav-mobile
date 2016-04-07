module.exports = {
  PAV_BACKEND: {
    API_BASE_URL: 'placeavote.com',
    PRE_BASE_URL:{
      USER_API:'https://userapi.'
    },
    ENDPOINTS: {
      USER:{
        AUTHENTICATE_EMAIL: '/user/authenticate'
      }
    },
    SESSION_TOKEN_STORAGE_KEY:"token"
  },
  backend: {
    pav: true,
    parse: false,
    hapiRemote: false,
    hapiLocal: false
  }
}
