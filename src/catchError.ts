type InputType =
  | Function
  | Function[]
  | {
      [index: string]: Function
    }

const wrapper = (fn: Function | any) => {
  if (!(fn instanceof Function)) {
    throw new Error('Catch can only use functions')
  }

  return (req: any, res: any, next: Function | any) => {
    try {
      const returnValue = fn(req, res, next)
      if (returnValue instanceof Promise) returnValue.catch(next)
    } catch (err) {
      next(err)
    }
  }
}

const catchErrorCore = (input: InputType) => {
  if (input instanceof Array) return input.map((fn) => wrapper(fn))

  if (input.toString() === '[object Object]') {
    const newObj: any = {}
    for (let key in input) {
      // @ts-ignore
      newObj[key] = wrapper(input[key])
    }
    return newObj
  }

  return wrapper(input)
}

const catchError = <CatchType extends InputType[]>(
  ...args: CatchType
): CatchType extends [any] ? CatchType[0] : CatchType => {
  if (args.length === 0) {
    throw new Error('Catch needs at least 1 argument')
  }

  return args.length === 1
    ? catchErrorCore(args[0])
    : args.map((input) => catchErrorCore(input))
}

export default catchError
