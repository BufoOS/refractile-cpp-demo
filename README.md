# refractile example

This repo was developed to test and showcase the functionality of the [refractile npm package](https://github.com/oslabs-beta/refractile).

## Overview

The app itself benchmarks [Express](https://expressjs.com/) [middleware](https://expressjs.com/en/guide/using-middleware.html) written using C++ and Go with JavaScript using equivalent implementations of the same algorithm that calculates the nth value of the fibonacci sequence.

Beyond its functionality, it also showcases exactly how refract coordinates polyglossic resources directly within a single project's backend. The two example languages — C++ and Go —— also serve as descriptive examples of working with compilers that generate glue code and those that do not, requiring developers to come up their own.

To read more about WebAssembly concepts, like glue code, you can find a helpful description in this [post](https://www.wasm.builders/kirteeprajapati/webassembly-javascript-inter-operability-3mec).

For instance, the `wasm-src` folder, you can find:

- source code written in C++
- source code written in Go
- Gluecode for connecting the Go Wasm module to JS

In `refractile.config.js`, you'll see how to work with these files to create two modules — `fibonacci`, which is built with C++, and — `fibonacciGo`, which is built with Go.

## Dependencies

To run this project, make sure that you have the following dependencies installed:

- [Node.js](https://nodejs.org/en/)
- [make](https://www.gnu.org/software/make/)
- [emcc](https://emscripten.org/docs/tools_reference/emcc.html), a compiler front-end developed as part of the [emscripten project](https://emscripten.org/index.html)
- [go](https://go.dev/doc/install)
- [tinygo](https://tinygo.org/getting-started/install/)

## Running prjoect

After installing the above dependencies, install node packages by running `npm i`

Then run the command `npm start` to build the front-end, compile the WebAssembly modules, and start the server.
