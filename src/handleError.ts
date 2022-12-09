import getErrorInfo, { errorMessages } from './scripts/getErrorInfo'
import ReqError from './ReqError'
import { Express, Request, Response, NextFunction } from 'express'

export type ErrorMessageOptional = Partial<typeof errorMessages>

export type FormatJSON = (
  error: {
    message: string | string[]
    error?: Error
    stack?: any
  },
  statusCode: number
) => {
  [index: string]: any
}

export default (
  app: Express,
  errorMsgs?: ErrorMessageOptional,
  formatJson?: FormatJSON
) => {
  if (errorMsgs) Object.assign(errorMessages, errorMsgs)

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ReqError(errorMessages.notFound))
  })

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
        ? formatJson(resObj, statusCode)
        : {
            status: statusCode < 500 ? 'fail' : 'error',
            ...resObj,
          }
    )
  })
}
