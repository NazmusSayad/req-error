import ErrorManager from './ErrorManager'


const errorManager = new ErrorManager()
try {
  throw new Error('test')
} catch (err) {
  const [message, statusCode] = errorManager.getErrorInfo(err);
  console.error(`An error occurred (status code ${statusCode}): ${message}`);
}



  