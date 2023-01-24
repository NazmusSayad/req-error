import ReqError, { MessageInput } from './ReqError'
import catchError, { CatchInput } from './catchError'
import handleError, {
  ErrorMessageOptional as ErrorMessages,
  FormatJSON,
} from './handleError.js'
import getErrorInfo from './scripts/getErrorInfo'

export default ReqError
export {
  catchError,
  handleError,
  getErrorInfo,
  // Types
  FormatJSON,
  CatchInput,
  MessageInput,
  ErrorMessages,
}
