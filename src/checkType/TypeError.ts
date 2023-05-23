export class CheckTypeError extends Error {
  key
  type
  constructor({ key, type }: { key: string; type: string }) {
    super()
    ;(Error as any).captureStackTrace(this, this.constructor)
    this.type = type
    this.key = key
  }
}

export class CheckTypeRequiredError extends Error {
  key
  constructor({ key }: { key: string }) {
    super(undefined)
    ;(Error as any).captureStackTrace(this, this.constructor)
    this.key = key
  }
}
