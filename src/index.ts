import ReqError, { MessageInput } from './ReqError'
import catchError, { CatchInput } from './catchError'
import handleError, {
  ErrorMessageOptional as ErrorMessages,
  FormatJSON,
} from './handleError.js'

export default ReqError
export {
  catchError,
  handleError,
  // Types
  FormatJSON,
  CatchInput,
  MessageInput,
  ErrorMessages,
}

declare global {
  var ReqError: {
    new (message: MessageInput, statusCode?: number): ReqError
  }
}
