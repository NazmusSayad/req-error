import checkItem from './checkItem.js'
import { AllowedTypes, CheckFunction } from '../types.js'

class Check {
  #required: boolean

  constructor(required: boolean = true) {
    this.#required = required
  }

  #createTypeChecker(type: AllowedTypes): CheckFunction {
    return (object) => {
      checkItem(object, { type, required: this.#required })
    }
  }

  string = this.#createTypeChecker(String)
  number = this.#createTypeChecker(Number)
  boolean = this.#createTypeChecker(Boolean)
  array = this.#createTypeChecker(Array)
  arrayOfString = this.#createTypeChecker([String])
  arrayOfNumber = this.#createTypeChecker([Number])
  arrayOfBoolean = this.#createTypeChecker([Boolean])
}

class CheckType extends Check {
  optional = new Check(false)
}

export { CheckType }
export default new CheckType(true)
