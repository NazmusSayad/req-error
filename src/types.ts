import errorMessages from './errorMessages'

export type ErrorMessages = typeof errorMessages
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
