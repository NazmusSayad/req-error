import { MessageInput } from './types'

class ReqError extends Error {
  name: string = 'RequestError'
  statusCode?: number

  constructor(message: MessageInput, statusCode?: number) {
    let finalMessage = message
    let finalStatusCode = statusCode
    if (Array.isArray(message)) {
      finalMessage = message[0]
      finalStatusCode ??= message[1]
    }

    if (finalMessage instanceof String) {
      finalMessage = finalMessage.toString()
    }
    if ((finalStatusCode as any) instanceof Number) {
      finalStatusCode = Number(finalStatusCode)
    }

    if (typeof finalMessage !== 'string') {
      throw new Error('RequestError constructor gets invalid message')
    }
    if (finalStatusCode != undefined && typeof finalStatusCode !== 'number') {
      throw new Error('RequestError constructor gets invalid statusCode')
    }

    super(finalMessage)
    this.statusCode = finalStatusCode
    ;(Error as any).captureStackTrace(this, this.constructor)
  }
}

export default ReqError
