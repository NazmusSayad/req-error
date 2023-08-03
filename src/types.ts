import errorMessages from './error/errorMessages'

// Utils
type TransformedType<T> = {
  [K in keyof T]: T[K] extends readonly [infer S, infer N]
    ? [string, number]
    : number
}

// Error Manager
export type ErrorManagerOptions = {
  messages?: ErrorMessagesOptional
  handlers?: GetErrorInfoHandler[]
}

// Error Messages
export type ErrorMessages = TransformedType<typeof errorMessages>
export type ErrorMessagesOptional = Partial<ErrorMessages>
export interface GetErrorInfoHandler {
  (this: ErrorMessages, err: any): void | [string | string[], number?]
}

export type CatchInput =
  | Function
  | Function[]
  | {
      [index: string]: Function
    }

export type MessageInput = string | [string, number?]
