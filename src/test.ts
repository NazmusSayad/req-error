import ErrorManager from './ErrorManager'

const errorManager = new ErrorManager({})
const error: any = new Error('Boom!')

error.code = 'P1012'

const [message, statusCode] = errorManager.getErrorInfo(error)
console.error(`An error occurred (status code ${statusCode}): ${message}`)
