import {
  NotFoundError,
  CheckTypeError,
  CheckTypeRequiredError,
} from '../ExtraError'
import ReqError from '../ReqError'
import { as, replacer } from '../utils'
import { GetErrorInfoHandler } from '../types'
import {PrismaError} from './prismaErrorMessages'
/**
  Add a function to the array, and make your logic
  Do not forget to return [string, number] or void
  here you will get the error as first param and errorMessages(./errorMessages.ts) as this arg 
*/

export default as<GetErrorInfoHandler[]>([
  function (err) {
    if (typeof err === 'string' || err instanceof String) {
      return [err.toString()]
    } else if (Array.isArray(err) && err.length > 0) {
      return [err[0].toString(), err[1] && +err[1]]
    }

    if (err instanceof ReqError) {
      return [err.message, err.statusCode]
    }

    if (err instanceof NotFoundError) {
      return [...this.notFound]
    }

    if (err.type === 'entity.parse.failed') {
      return [...this.JSONParse]
    }

    switch (err.name) {
      case 'JsonWebTokenError':
        return [...this.jwtInvalid]

      case 'TokenExpiredError':
        return [...this.jwtExpire]

      case 'MulterError':
        return [err.message, 400]
    }
  },

  // MongoDuplicateError
  function (err) {
    if (err.code === 11000) {
      return replacer(
        this.duplicate,
        '{$key}',
        err.keyValue ? Object.keys(err.keyValue).join(', ') : 'undefined'
      )
    }
  },

  // Mongo adv error
  function (err) {
    switch (err.name) {
      case 'ObjectParameterError':
        const msg = err.message?.match(/(?<=got ).*$/gm)[0]
        return replacer(this.mongoObjParam, '{$}', msg)

      case 'CastError':
        return replacer(this.mongoCast, '{$}', err.path)

      // Mongoose normal validation error, also includes cast error
      case 'ValidationError':
        const messages =
          err.errors &&
          Object.values(err.errors)?.map((er: any) => {
            if (er.name === 'CastError') {
              return replacer(this.mongoCast, '{$}', err.path)[0]
            }
            return er.message
          })

        return [messages, this.mongoCast[1]]
    }
  },

  //Prisma Error 
  function (err) {
     if(PrismaError[err.code]){
       return [PrismaError[err.code], this.[err.code][1]]
     }
  },

  // ReqError CheckType
  function (err) {
    if (err instanceof CheckTypeError) {
      return [
        this.checkType[0]
          .replace(/{\$key}/gim, err.key)
          .replace(/{\$type}/gim, err.type),

        this.checkType[1],
      ]
    }

    if (err instanceof CheckTypeRequiredError) {
      return [
        this.checkRequired[0].replace(/{\$key}/gim, err.key),
        this.checkType[1],
      ]
    }
  },
])
