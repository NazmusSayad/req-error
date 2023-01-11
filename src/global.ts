import ReqError, { MessageInput } from './ReqError'

declare global {
  var ReqError: {
    new (message: MessageInput, statusCode?: number): ReqError
  }
}

try {
  globalThis.ReqError = ReqError
} catch {
  global.ReqError = ReqError
}

export default ReqError
