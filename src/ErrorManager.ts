import {
  ErrorMessages,
  GetErrorInfoHandler,
  ErrorMessagesOptional,
} from './types'
import errorMessages from './error/errorMessages'
import getErrorInfoHandlers from './error/getErrorInfoHandlers'

type ErrorManagerOptions = {
  messages?: ErrorMessagesOptional
  handlers?: GetErrorInfoHandler[]
}

export default class ErrorManager {
  #messages = { ...errorMessages } as ErrorMessages
  #errorInfoHandlers = [...getErrorInfoHandlers]

  get messages() {
    return this.#messages
  }

  constructor(options: ErrorManagerOptions = {}) {
    options.messages && Object.assign(this.#messages, options.messages)
    options.handlers && this.#errorInfoHandlers.unshift(...options.handlers)
  }

  getErrorInfo(err: any): [string | string[], number] {
    let errorInfo
    for (let handler of this.#errorInfoHandlers) {
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
