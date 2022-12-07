export const errorMessages: {
  statusCode: number
  notFound: [string, number]
  exceptions: [string, number]
  JSONParse: [string, number]
  jwtExpire: [string, number]
  jwtInvalid: [string, number]
  mongoCast: [string, number]
  mongoObjParam: [string, number]
} = {
  statusCode: 400,
  notFound: ["Oops, looks like you're lost in space!", 404],
  exceptions: ['Something went very wrong!', 500],
  JSONParse: ['Invalid data recieved', 400],
  jwtExpire: ['Your token is no longer valid', 401],
  jwtInvalid: ['Login credentials are invalid', 401],
  mongoCast: ['Invalid input for `{$}`', 400],
  mongoObjParam: ['Invalid input for `{$}`', 400],
}

const getInfo = {
  duplicateError: (err: any) => {
    return `The given \`${Object.keys(err.keyValue)}\` already exists`
  },

  validationError: (err: any) => {
    // @ts-ignore
    const messages = Object.values(err.errors)?.map((er: any) => {
      if (er.name === 'CastError') {
        return errorMessages.mongoCast[0].replace('{$}', er.path)
      }

      return er.message
    })
    return messages.length > 1 ? messages : messages[0]
  },

  castError: (err: any) => {
    return errorMessages.mongoCast[0].replace('{$}', err.path)
  },

  objParamError: (err: any) => {
    const msg = err.message.match(/(?<=got ).*$/gm)[0]
    return errorMessages.mongoObjParam[0].replace('{$}', msg)
  },
}

export default (err: any): [string | string[], number | undefined] => {
  if (err.isOperational) return [err.message, err.statusCode]

  if (err.type === 'entity.parse.failed') {
    return errorMessages.JSONParse
  }

  if (err.code === 11000) {
    return [getInfo.duplicateError(err), 400]
  }

  switch (err.name) {
    case 'JsonWebTokenError':
      return errorMessages.jwtInvalid

    case 'TokenExpiredError':
      return errorMessages.jwtExpire

    case 'ObjectParameterError':
      return [getInfo.objParamError(err), 400]

    case 'CastError':
      return [getInfo.castError(err), 400]

    case 'MulterError':
      return [err.message, 400]

    case 'ValidationError':
      return [getInfo.validationError(err), 400]
  }

  return errorMessages.exceptions
}
