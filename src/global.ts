import ReqError, { MessageInput } from './ReqError'

declare global {
  var ReqError: {
    new (message: MessageInput, statusCode?: number): ReqError
  }
}

global.ReqError = ReqError
