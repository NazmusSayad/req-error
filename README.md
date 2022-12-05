# req-error

This package makes catch async & custom error concepts in express easier.

## Features

- Custom Error with message and statusCode
- Error catcher function with a gear durablity

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

<br/>

---

<br/>

# Express

Configure your application with whatever configuration you want.

## Basic Usage:

```js
/* app.js */

const express = require('express')
const app = express()
// Use your app
app.use((req, res, next, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  res.status(500).json({ message: 'Internal server error' })
})
```

```js
/* controller.js */

const { default: ReqError, catchError } = require('req-error')

catchError((req, res) => {
  // Do your stuff...
  throw new ReqError('This is just a demo', 400)
})

catchError(async (req, res) => {
  // Do your stuff...
  throw new ReqError('This is just a demo', 400)
})
```

<br/>

---

<br/>

## Advanced Usage:

```js
const { catchError } = require('req-error')
const controllers = catchError(require('./controller.js'))
// Now just simply use your controllers...
```

### Some possible usages of `catchError`:

```js
// catchError(arg,...)

catchError(Function)
// Function

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

**Every input must be an object{} or array[] or function.**

- If input is an **array** then all the elements must be **function**
- if input is an **object** then all values must be **function**.

<br />
 
 
### Wrong usages of `catchError`:

```js
catchError()

catchError('string')

catchError('string', 0)

catchError([0])

catchError([0], 'string')

catchError([0], 'string', { login: 9 })

catchError([0], 'string', { login: true })

catchError([0], 'string', { login: true }, { signup: 'string' })
```

<br/>

---

<br/>

## **Note:**

- This is perfectly compitable with `commonjs` module system but also works with esm without any problem.

<br/>

---

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
