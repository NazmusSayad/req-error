interface ObjectFunction {
  [index: string]: Function
}

class ReqError extends Error {
  static catch<CatchType extends Function[] | Function[][] | ObjectFunction[]>(
    ...args: CatchType
  ): CatchType extends [any] ? CatchType[0] : CatchType {
    if (args.length === 0) {
      throw new Error('Catch needs at least 1 argument')
    }

    return args.length === 1
      ? this.#catch(args[0])
      : args.map((input) => this.#catch(input))
  }

  static #catch(input: Function[] | ObjectFunction | Function) {
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
    if (!(fn instanceof Function)) {
      throw new Error('Catch can only use functions')
    }

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
