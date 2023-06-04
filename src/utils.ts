export const isNotExists = (value: unknown) => {
  return value == null || value === '' || Number.isNaN(value)
}

export const isFunction = (value: unknown) => {
  return value instanceof Function || typeof value === 'function'
}

export const isArray = (value: unknown) => {
  return Array.isArray(value) || value instanceof Array
}

export const isString = (value: unknown) => {
  return typeof value === 'string' || value instanceof String
}

export const isNumber = (value: unknown) => {
  return (
    !Number.isNaN(value) &&
    (typeof value === 'number' || value instanceof Number)
  )
}

export const isBoolean = (value: unknown) => {
  return typeof value === 'boolean' || value instanceof Boolean
}

export function replacer<T extends readonly [string, number?]>(
  msg: T,
  search: string,
  value: string
): [T[0], T[1]] {
  return [msg[0].replace(search, value), msg[1]]
}

export const as = <T>(value: T) => value
