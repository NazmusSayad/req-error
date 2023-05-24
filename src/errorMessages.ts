export default {
  statusCode: 400,
  notFound: ["Oops, looks like you're lost in space!", 404],
  exceptions: ['Something went very wrong!', 500],
  JSONParse: ['Invalid data recieved', 400],
  jwtExpire: ['Your token is no longer valid', 401],
  jwtInvalid: ['Login credentials are invalid', 401],
  mongoCast: ['Invalid input for `{$}`', 400],
  mongoObjParam: ['Invalid input for `{$}`', 400],
  checkType: [`Expected '{$key}' should be '{$type}'`, 400],
  checkRequired: [`Value for '{$key}' is required`, 400],
} as const
