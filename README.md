# req-error

This package makes catch async & custom error concepts in any app easier.

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

new ReqError(['Message', 404], 500)
// { message: "Message", statusCode: 500 }

// Even more simple:
throw 'Error message'
throw ['Error message', 404]
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

### Some usages of `checkType`:

`controller.js`

```ts
import { checkType } from 'req-error'

const handleSuccess = (req, res) => {
  res.success({ user: { name: 'John Doe' } })
}

const handleSomething = (req, res) => {
  const stringBody = req.getBody('name', 'username', 'imageURL')
  const numberBody = req.getBody('age', 'rating', 'salary')
  const booleanBody = req.getBody('isMuslim', 'isLovely')
  const arrayBody = req.getBody('hobbies', 'children', 'friends')
  const arrayOfStringBody = req.getBody('hobbies', 'children', 'friends')
  const arrayOfNumberBody = req.getBody('ageList', 'salaryList')
  const arrayOfBooleanBody = req.getBody('binary', 'justTrueFalseArray')

  // Basic:
  checkType.string({ key: 'value', key2: 'value2' })

  // Advanced:
  checkType.string(stringBody)
  checkType.number(numberBody)
  checkType.boolean(booleanBody)
  checkType.array(arrayBody)
  checkType.arrayOfString(arrayOfStringBody)
  checkType.arrayOfNumber(arrayOfNumberBody)
  checkType.arrayOfBoolean(arrayOfBooleanBody)

  // This just skips type check if the value is undefined
  checkType.optional.string(stringBody)
  checkType.optional.number(numberBody)
  checkType.optional.boolean(booleanBody)
  checkType.optional.array(arrayBody)
  checkType.optional.arrayOfString(arrayOfStringBody)
  checkType.optional.arrayOfNumber(arrayOfNumberBody)
  checkType.optional.arrayOfBoolean(arrayOfBooleanBody)
}
```

<br />

---

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
