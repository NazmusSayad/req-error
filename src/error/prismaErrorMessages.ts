export const PrismaError:{
  [key: string]: string
} = {
  P2000: "The provided value for the column is too long for the column's type. Column: {column_name}",
  P2001: 'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist',
  P2002: 'Unique constraint failed on the {constraint}',
  P2003: 'Foreign key constraint failed on the field: {field_name}',
  P2004: 'A constraint failed on the database: {database_error}',
  P2005: 'The value stored in the database for the field is invalid for the field\'s type',
  P2006: 'The provided value for field is not valid',
  P2007: 'Data validation error',
  P2008: 'Failed to parse the query at',
  P2009: 'Failed to validate the query',
  P2010: 'Raw query failed',
  P2011: 'Null constraint violation on the {constraint}',
  P2012: 'Missing a required value at',
  P2013: 'Missing the required argument for field',
  P2014: 'The change you are trying to make would violate the required relation',
  P2015: 'A related record could not be found',
  P2016: 'Query interpretation error',
  P2017: 'The records for relation between the and models are not connected',
  P2018: 'The required connected records were not found',
  P2019: 'Input error {details}',
  P2020: 'Value out of range for the type',
  P2021: 'The table does not exist in the current database',
  P2022: 'The column does not exist in the current database',
  P2023: 'Inconsistent column data',
  P2024: 'Timed out fetching a new connection from the connection pool',
  P2025: 'An operation failed because it depends on one or more records that were required but not found',
  P2026: 'The current database provider doesn\'t support a feature that the query used',
  P2027: 'Multiple errors occurred on the database during query execution',
  P2028: 'Transaction API error',
  P2030: 'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
  P2031: "Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set",
  P2033: "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
  P2034: "Transaction failed due to a write conflict or a deadlock. Please retry your transaction"
}


const PrismaErrorMessages = () => {
  let errors: any = {}
  Object.keys(PrismaError).forEach((key) => {
    errors[key] = [PrismaError[key], 400]
  })
  return errors
}


export default PrismaErrorMessages()