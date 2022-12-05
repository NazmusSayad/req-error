interface ObjectFunction {
  [index: string]: Function
}

class ReqError extends Error {
  static #catchArgumentError = new Error('Catch needs at least 1 argument')
  static #wrapperInputError = new Error('Catch can only use functions')

  static catch(
    ...args: [Function] | Function[] | Function[][] | ObjectFunction[]
  ) {
    if (args.length === 0) throw this.#catchArgumentError
    return args.length === 1
      ? this.#catch(args[0])
      : [...args].map((input) => this.#catch(input))
  }

  static #catch(input: Function | Function[] | ObjectFunction) {
    if (input instanceof Array) return input.map((fn) => this.#wrapper(fn))

    if (input.toString() === '[object Object]') {
      const newObj: any = {}
      for (let key in input) {
        // @ts-ignore
        newObj[key] = this.#wrapper(input[key])
      }
      return newObj
    }

    return this.#wrapper(input)
  }

  static #wrapper = (fn: Function | any) => {
    if (!(fn instanceof Function)) throw this.#wrapperInputError

    return (req: any, res: any, next: Function | any) => {
      try {
        const returnValue = fn(req, res, next)
        if (returnValue instanceof Promise) returnValue.catch(next)
      } catch (err) {
        next(err)
      }
    }
  }

  name: string = 'RequestError'
  statusCode?: number
  isOperational: boolean = true

  constructor(
    messageOrArray:
      | string
      | [string]
      | [string, number]
      | { message: string; statusCode?: number },
    statusCodeOrUndefined?: number
  ) {
    let message = messageOrArray
    let statusCode = statusCodeOrUndefined

    if (messageOrArray instanceof Array) {
      message = messageOrArray[0]
      statusCode ??= messageOrArray[1]
    } else if (messageOrArray.toString() === '[object Object]') {
      // @ts-ignore
      message = messageOrArray.message
      // @ts-ignore
      statusCode ??= messageOrArray.statusCode
    }

    if (typeof message !== 'string') {
      throw new Error('RequestError constructor gets invalid message')
    }
    if (statusCode != undefined && typeof statusCode !== 'number') {
      throw new Error('RequestError constructor gets invalid statusCode')
    }

    super(message)
    this.statusCode = statusCode

    // @ts-ignore
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ReqError
