# req-error

This package makes catch async & custom error concepts in express easier.

## Features

- TypeScript full support
- Custom Error with message and statusCode
- Error catcher function with a geart durablity
- Error handler with common situations

<a href="https://npmjs.com/package/req-error">
  <img src="https://img.shields.io/npm/v/req-error" alt="npm package"> 
</a>

---

## Installation

- with npm

```shell
npm i req-error
```

- with yarn

```shell
yarn add req-error
```

- with pnpm

```shell
pnpm add req-error
```

<br/> <br/>

# Express

Configure your application with whatever configuration you want.

## Basic Usage:

`/* app.js */`

```js
const express = require('express')
const { handleError } = require('req-error')
const app = express()

// Use your app...

handleError(app)
```

<br />

`/* controller.js */`

```js
// Make ReqError global (Recommended)
require('req-error/global')
const { catchError } = require('req-error')

// Not Global (Not Recommended)
const { default: ReqError, catchError } = require('req-error')
```

```js
const login = catchError((req, res) => {
  // Do your stuff...
  throw new ReqError('This is just a demo', 400)
})

const signup = catchError(async (req, res) => {
  // Do your stuff...
  throw new ReqError('This is just another demo', 401)
})
```

<br/>

---

<br/>

### Some possible usages of `ReqError`:

```js
new ReqError('Message', 404)
// { message: "Message", statusCode: 404 }

new ReqError(['Message', 404])
// { message: "Message", statusCode: 404 }

new ReqError({ message: 'Message', statusCode: 404 })
// { message: "Message", statusCode: 404 }

new ReqError(['Message', 404], 500)
// { message: "Message", statusCode: 500 }

new ReqError({ message: 'Message', statusCode: 404 }, 500)
// { message: "Message", statusCode: 500 }
```

<br />

### Some possible usages of `catchError`:

```js
// catchError(arg,...)

catchError(Function)
// Function

catchError(Function, String)
// [Function, String]

catchError(Function, Function, Function)
// [Function, Function, Function]

catchError([Function])
// [Function]

catchError([Function, Function], Function)
// [[Function, Function], Function]

catchError({ login: Function })
// { login: Function }

catchError(require('./login.js'))
// { login: Function }

catchError(require('./login.js'), require('./signup.js'))
// [{ login: Function }, { signup: Function }]

catchError(Function, [Function, Function], { login: Function })
// [Function, [Function, Function], { login: Function }]
```

<br />

### Some possible usages of `handleError`:

```js
const errorMessages = {}

const formatJSON = (error, statusCode) => {
  // If NODE_ENV === 'development'
  // error = {
  //   message: 'Invalid auth token',
  //   error: Error,
  //   stack: Error.stack,
  // }
  //
  // Else:
  // error = {
  //   message: 'Invalid auth token',
  // }

  return {
    status: statusCode < 500 ? 'fail' : 'error',
    ...error,
  }
}

handleError(app, errorMessages, formatJSON)
```

<br />

---

<br/>

## Exports

```js
// Path: .

export default ReqError
export {
  catchError,
  handleError,

  // Types
  FormatJSON,
  CatchInput,
  MessageInput,
  ErrorMessages,
}

// Path: ./global
global.ReqError = ReqError
```

## <br/>

<br/>

## **Note:**

- This is perfectly compitable with `commonjs` module system but also works with esm without any problem also written in esm.

<br/>

---

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
