import errorMessages from './error/errorMessages'
import getErrorInfoHandlers from './error/getErrorInfoHandlers'
import { ErrorMessages, ErrorMessagesOptional } from './types'

export default class ErrorManager {
  #messages = { ...errorMessages } as ErrorMessages
  get messages() {
    return this.#messages
  }
  constructor(messages?: ErrorMessagesOptional) {
    messages && Object.assign(this.#messages, messages)
  }

  getErrorInfo(err: any): [string | string[], number] {
    let errorInfo
    for (let handler of getErrorInfoHandlers) {
      const result = handler.call(this.#messages, err)
      if (!result) continue
      errorInfo = result
      break
    }

    const [message, statusCode = this.#messages.statusCode] =
      errorInfo || this.#messages.exceptions
    return [message, statusCode]
  }
}
