import * as utils from '../utils'
import { TypeCheckOptions } from '../types'
import { CheckTypeError, CheckTypeRequiredError } from '../ExtraError'
interface AnyObject {
  [index: string]: unknown
}

export default (object: AnyObject, conf: TypeCheckOptions) => {
  for (let key in object) {
    checkSingleItem(key, object[key], conf)
  }
}

const checkSingleItem = (
  key: string,
  value: unknown,
  conf: TypeCheckOptions
) => {
  if (conf.required === false && value === undefined) return
  if (conf.required === true && utils.isNotExists(value)) {
    throw new CheckTypeRequiredError({ key })
  }

  // Check value type
  const throwTypeError = (type: string) => {
    throw new CheckTypeError({ key, type })
  }

  /* If type is not an array */
  if (!utils.isArray(conf.type)) {
    return checkValueType(conf.type, value, throwTypeError)
  }

  /* Just check if the value is an array */
  checkValueType(Array, value, throwTypeError)

  /* Check every element of the value */
  const childType = (conf.type as unknown[])[0]
  ;(value as unknown[]).forEach((value) => {
    checkValueType(childType, value, throwTypeError, true)
  })
}

const checkValueType = (
  type: unknown,
  value: unknown,
  typeError: Function,
  isChild = false
) => {
  switch (type) {
    case Array:
      if (utils.isArray(value)) return
      /* array isn't availabe in child mode */
      typeError('array')

    case String:
      if (utils.isString(value)) return
      typeError(isChild ? 'array of string' : 'string')

    case Number:
      if (utils.isNumber(value)) return
      typeError(isChild ? 'array of number' : 'number')

    case Boolean:
      if (utils.isBoolean(value)) return
      typeError(isChild ? 'array of boolean' : 'boolean')
  }
}
