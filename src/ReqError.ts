class ReqError extends Error {
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
