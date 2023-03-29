import { Express, Request, Response, NextFunction } from 'express'
import { ErrorMessagesOptional, FormatJSON } from './types'
import errorMessages from './errorMessages'
import getErrorInfo from './getErrorInfo'
import ReqError from './ReqError'

export default (
  app: Express,
  messages?: ErrorMessagesOptional,
  formatFn?: FormatJSON
) => {
  if (messages) Object.assign(errorMessages, messages)

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ReqError(errorMessages.notFound))
  })

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      const [message, statusCode = errorMessages.statusCode] = getErrorInfo(err)

      const resObj: any = { message }
      if (process.env.NODE_ENV === 'development') {
        Object.assign(resObj, { error: err, stack: err.stack })
      }

      if (res.headersSent) {
        return console.warn('Headers already sent!')
      }

      res.status(statusCode).json(
        formatFn
          ? formatFn(resObj, statusCode)
          : {
              status: statusCode < 500 ? 'fail' : 'error',
              ...resObj,
            }
      )
    } catch (error) {
      res.status(500).json({
        status: "Error inside 'req-error', while handling another error",
        error,
        npm: 'https://www.npmjs.com/package/req-error',
        github: 'https://github.com/NazmusSayad/req-error',
      })
    }
  })
}
