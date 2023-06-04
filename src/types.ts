import errorMessages from './error/errorMessages'

// Utils
type TransformedType<T> = {
  [K in keyof T]: T[K] extends readonly [infer S, infer N]
    ? [string, number]
    : number
}

// Error Messages
export type ErrorMessages = TransformedType<typeof errorMessages>
export type ErrorMessagesOptional = Partial<ErrorMessages>
export interface GetErrorInfoHandler {
  (this: ErrorMessages, err: any): void | [string | string[], number?]
}

// Root
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

// CheckType
export type CheckFunction = (object: { [index: string]: unknown }) => void
export interface TypeCheckOptions {
  type: AllowedTypes
  required: boolean
}
export type AllowedTypes =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | [StringConstructor]
  | [NumberConstructor]
  | [BooleanConstructor]
