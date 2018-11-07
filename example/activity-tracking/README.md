# Template Base TypeScript
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/LIBE-NUTES/template-base-ts/blob/master/LICENSE) [![node](https://img.shields.io/badge/node-v11.1.0-red.svg)](https://nodejs.org/) [![npm](https://img.shields.io/badge/npm-v6.4.1-red.svg)](https://nodejs.org/) [![Swagger](https://img.shields.io/badge/swagger-v3.0-green.svg?longCache=true&style=flat)](https://swagger.io/) [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://www.typescriptlang.org/)
--
Basic model for implementation of micro-services in typewritten text following the principles of clean architecture (proposed by Robert C. Martin), decoupled and testable.

This project follows with an implementation example containing integration with Swagger for API design, MongoDB for data storage and RabbitMQ as a messaging channel for information exchange between micro-services.

Just clone the project and start coding it :)

See the [example](https://github.com/LIBE-NUTES/template-base-ts/tree/master/example) of a micro-service to accompany physical activity using this model and be happy. (0/

#### Top Libraries Used
- [**amqp-ts**](https://github.com/abreits/amqp-ts) - Simplifies communication with RabbitMQ. As for example: connection/reconnection, queue consumption, publication and more.
- [**Chai.js**](https://www.chaijs.com/) - Assertion library that has several interfaces that allow the developer to choose the style that makes it more comfortable (BDD/TDD). It can be easily combined with any test framework for javascript code.
- [**Express.js**](https://expressjs.com) - Framework for Node.js. Minimalist, flexible and contains a robust set of features to develop web applications.
- [**Greenlock Express.js**](https://github.com/Daplie/greenlock-express) - Automates the generation of HTTPS certificates issued by Let's Encrypt v2 via ACME.
- [**Gulp.js**](https://gulpjs.com/) - Toolkit to automate tasks. As for example, do the transpiler of the TypeScript code for ECMA.
- [**InversifyJS**](http://inversify.io/) - Control inversion library (IoC) for TypeScript and JavaScript applications. An IoC container uses a class constructor to identify and inject its dependencies. It has a friendly API and encourages the use of OOP and IoC best practices.
- [**inversify-express-utils**](https://github.com/inversify/inversify-express-utils) - Provides utilities for developing applications on express.js with InversifyJS. For example, by annotating a class as controller (defining routes). Likewise, decorate class methods to serve as HTTP request handlers (GET, POST...).
- [**Mocha**](https://mochajs.org/) - Resource-rich JavaScript test framework, making asynchronous testing simple and fun. Responsible for running the tests.
- [**Mongoose**](https://mongoosejs.com/) - Provides a straightforward, schema-based solution to model your application's data (MongoDB). It includes built-in type conversion, validation, query creation, business logic hooks and more.
- [**nyc**](https://github.com/istanbuljs/nyc) - Command Line Interface for [Istanbul](https://istanbul.js.org/) (Code Coverage), with support for: applications that generate subprocesses, ES6/ES2015 using babel-plugin-istanbul. collection of reporters, providing terminal output and HTML.
- [**query-strings-parser**](https://www.npmjs.com/package/query-strings-parser) - Middleware for query string handling. Performs the transformation of the query string into a format that is compatible with the MongoDB database.
- [**Sinon.JS**](https://sinonjs.org/) - Library for creating spies, stubs and independent test simulations for JavaScript. Works with any unit test framework.
- [**sinon-mongoose**](https://www.npmjs.com/package/sinon-mongoose) - Extends the Sinon stubs to Mongoose methods, so you can easily test chained methods.
- [**SuperTest**](https://github.com/visionmedia/supertest) - Provides high-level abstraction for HTTP tests, while still allowing you to descend to the lower-level API provided by the [SuperAgent](https://github.com/visionmedia/superagent) (HTTP Request Library).
- [**Swagger UI Express**](https://www.npmjs.com/package/swagger-ui-express) - Application middleware in express.js to route the Swagger user interface to your Swagger document (.yaml or .json). This acts as a documentation of your hosted API in your application.
- [**TSLint**](https://palantir.github.io/tslint/) - Extensible static analysis tool that checks the TypeScript code for readability, maintainability and functionality errors. It is widely supported by modern editors and building systems and can be customized with its own rules, settings and formatters.
- [**TSNode**](https://github.com/TypeStrong/ts-node) - Execution of TypeScript and REPL for node.js
- [**TypeDoc**](https://typedoc.org/) - Documentation generator for TypeScript projects.
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript superset developed by Microsoft that adds typing, OO features and many other language.
- [**winston**](https://github.com/winstonjs/winston) - Simple and universal log library with support for various transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, you might want error logs to be stored in a persistent remote location (such as a database), but all logs are sent to the console or to a local file.

## Installation and Development server
Requires [Node.js](https://nodejs.org/) v6+ and [MongoDB](https://www.mongodb.com) to run.
Install the dependencies, start the local MongoDB, and start the server.
```sh
$ npm install
$ mongod
$ npm run start:dev
```
Navigate to `http://127.0.0.1/api/v1`.

## Build
- Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run Server
- Run `npm start` to run the project in production mode.
- Run `npm run start:dev` to run the project in development mode.


## Running unit tests
- Run `npm run test:unit` to run unit tests by [Mocha](https://mochajs.org/).

## Running integration tests
- Run `mongod`
- Run `npm run test:integration` to run integration tests by [Mocha](https://mochajs.org/).

## Running test coverage
- Run `npm run test:cov` to run code coverage tests by [Instanbul](https://istanbul.js.org/).

## Running all tests
- Run `mongod`
- Run `npm run test` to run unit testing, integration and coverage by [Mocha](https://mochajs.org/) and [Instanbul](https://istanbul.js.org/).

## Generating code documentation
- Run `npm run build:doc` the html documentation will be generated in the /docs directory by [typedoc](https://typedoc.org/).