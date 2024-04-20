export const Endpoints = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    EMAILCONFIRMATION: '/auth/email-confirm',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  USER: {
    ALL: '/users',
    CURRENTUSER: '/users/current-user',
    UPDATE: '/users/update'
  },
  NEWS: {
    GET: '/news',
    SEARCH: '/news/search',
    CREATE: '/news/create',
    DELETE: '/news/delete'
  }
}
