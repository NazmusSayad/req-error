export interface ErrorMessages {
  statusCode: number
  notFound: [string, number]
  exceptions: [string, number]
  JSONParse: [string, number]
  jwtExpire: [string, number]
  jwtInvalid: [string, number]
  mongoCast: [string, number]
  mongoObjParam: [string, number]
}

export type ErrorMessagesOptional = Partial<ErrorMessages>

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

export type CatchInput =
  | Function
  | Function[]
  | {
      [index: string]: Function
    }

export type MessageInput = string | [string, number?]
