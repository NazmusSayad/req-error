import ReqError, { MessageInput } from './ReqError.js'
import catchError, { CatchInput } from './catchError.js'
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
