import ReqError from './ReqError'

try {
  globalThis.ReqError = ReqError
} catch {
  global.ReqError = ReqError
}

export default ReqError
