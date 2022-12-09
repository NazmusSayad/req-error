import ReqError, { MessageInput } from './ReqError.js'

declare global {
  var ReqError: {
    new (message: MessageInput, statusCode?: number): ReqError
  }
}

global.ReqError = ReqError
