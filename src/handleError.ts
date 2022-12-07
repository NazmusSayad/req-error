import getErrorInfo, { errorMessages } from './scripts/getErrorInfo'
import ReqError from './ReqError'

export default (
  app: any,
  errorMsgs?: typeof errorMessages,
  formatJson?: Function
) => {
  if (errorMsgs) Object.assign(errorMessages, errorMsgs)

  app.use((req: any, res: any, next: Function) => {
    next(new ReqError(errorMessages.notFound))
  })

  app.use((err: Error, req: any, res: any, next: Function) => {
    const [message, statusCode = errorMessages.statusCode] = getErrorInfo(err)

    const resObj: any = { message }
    if (process.env.NODE_ENV === 'development') {
      Object.assign(resObj, { error: err, stack: err.stack })
    }

    if (res.headersSent) {
      return console.warn('Headers already sent!')
    }

    res.status(statusCode).json(
      formatJson
        ? formatJson(resObj)
        : {
            status: statusCode < 500 ? 'fail' : 'error',
            ...resObj,
          }
    )
  })
}
