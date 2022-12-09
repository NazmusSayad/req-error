export type MessageInput =
  | string
  | [string]
  | [string, number]
  | { message: string; statusCode?: number }

class ReqError extends Error {
  name: string = 'RequestError'
  statusCode?: number
  isOperational: boolean = true

  constructor(message: MessageInput, statusCode?: number) {
    let finalMessage = message
    let finalStatusCode = statusCode

    if (message instanceof Array) {
      finalMessage = message[0]
      finalStatusCode ??= message[1]
    } else if (message?.toString() === '[object Object]') {
      // @ts-ignore
      finalMessage = message.message
      // @ts-ignore
      finalStatusCode ??= message.statusCode
    }

    if (typeof finalMessage !== 'string') {
      throw new Error('RequestError constructor gets invalid message')
    }
    if (finalStatusCode != undefined && typeof finalStatusCode !== 'number') {
      throw new Error('RequestError constructor gets invalid statusCode')
    }

    super(finalMessage)
    this.statusCode = finalStatusCode
    // @ts-ignore
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ReqError
