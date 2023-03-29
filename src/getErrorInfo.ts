import errorMessages from './errorMessages'
import ReqError from './ReqError'

const getInfo = {
  duplicateError: (err: any) => {
    return `The given \`${Object.keys(err.keyValue)}\` already exists`
  },

  validationError: (err: any) => {
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

export default (err: any): [string | string[], number?] => {
  if (err instanceof ReqError) {
    return [err.message, err.statusCode]
  } else if (typeof err === 'string' || err instanceof String) {
    return [err.toString()]
  } else if (Array.isArray(err) && err.length > 0) {
    return [err[0].toString(), err[1] && +err[1]]
  }

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
