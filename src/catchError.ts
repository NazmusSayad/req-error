import { CatchInput } from './types'

const wrapper = (fn: Function | any) => {
  if (!(typeof input === 'function' || fn instanceof Function)) return fn

  return (req: any, res: any, next: Function | any) => {
    try {
      const rv /* Return value */ = fn(req, res, next)
      if (rv instanceof Promise) rv.catch(next)
    } catch (err) {
      next(err)
    }
  }
}

const catchErrorCore = (input: CatchInput) => {
  if (typeof input === 'function' || input instanceof Function) {
    return wrapper(input)
  }

  if (input instanceof Array) {
    return input.map((fn) => wrapper(fn))
  }

  const output: any = {}
  for (let key in input) {
    output[key] = wrapper(input[key])
  }
  return output
}

export default <CatchType extends CatchInput[]>(
  ...args: CatchType
): CatchType extends [any] ? CatchType[0] : CatchType => {
  if (args.length === 0) {
    throw new Error('Catch needs at least 1 argument')
  }

  return args.length === 1
    ? catchErrorCore(args[0])
    : args.map((input) => catchErrorCore(input))
}
