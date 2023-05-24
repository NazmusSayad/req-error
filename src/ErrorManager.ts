import ReqError from './ReqError'
import errorMessages from './errorMessages'
import { ErrorMessagesOptional } from './types'
import { CheckTypeError, CheckTypeRequiredError } from './checkType/TypeError'

export default class ErrorManager {
  #messages = { ...errorMessages }
  constructor(messages?: ErrorMessagesOptional) {
    messages && Object.assign(this.#messages, messages)
  }

  #getErrorInfo(err: any): [string | string[], number?] {
    if (typeof err === 'string' || err instanceof String) {
      return [err.toString()]
    } else if (Array.isArray(err) && err.length > 0) {
      return [err[0].toString(), err[1] && +err[1]]
    }

    if (err instanceof ReqError) {
      return [err.message, err.statusCode]
    }

    if (err instanceof CheckTypeError) {
      return [
        this.#messages.checkType[0]
          .replace(/{\$key}/gim, err.key)
          .replace(/{\$type}/gim, err.type),

        this.#messages.checkType[1],
      ]
    }

    if (err instanceof CheckTypeRequiredError) {
      return [
        this.#messages.checkRequired[0].replace(/{\$key}/gim, err.key),
        this.#messages.checkType[1],
      ]
    }

    // Random Error
    if (err.type === 'entity.parse.failed') {
      return [...this.#messages.JSONParse]
    }

    if (err.code === 11000) {
      return [this.error.duplicateError(err), 400]
    }

    switch (err.name) {
      case 'JsonWebTokenError':
        return [...this.#messages.jwtInvalid]

      case 'TokenExpiredError':
        return [...this.#messages.jwtExpire]

      case 'ObjectParameterError':
        return [this.error.objParamError(err), 400]

      case 'CastError':
        return [this.error.castError(err), 400]

      case 'MulterError':
        return [err.message, 400]

      case 'ValidationError':
        return [this.error.validationError(err), 400]
    }

    return [...this.#messages.exceptions]
  }

  getErrorInfo(err: any): [string | string[], number] {
    const [message, code = this.#messages.statusCode] = this.#getErrorInfo(err)
    return [message, code]
  }

  error = {
    duplicateError: (err: any) => {
      return `The given \`${Object.keys(err.keyValue)}\` already exists`
    },

    validationError: (err: any) => {
      const messages = Object.values(err.errors)?.map((er: any) => {
        if (er.name === 'CastError') {
          return this.#messages.mongoCast[0].replace('{$}', er.path)
        }

        return er.message
      })
      return messages.length > 1 ? messages : messages[0]
    },

    castError: (err: any) => {
      return this.#messages.mongoCast[0].replace('{$}', err.path)
    },

    objParamError: (err: any) => {
      const msg = err.message.match(/(?<=got ).*$/gm)[0]
      return this.#messages.mongoObjParam[0].replace('{$}', msg)
    },
  }
}
