module.exports = {
  preload_cmds: [
    'bash -c "mkdir -p wasm-modules"',
    'bash -c "cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./wasm-modules/"',
  ],
  modules: {
    fibonacci: {
      bin: './wasm-modules/',
      make: 'make',
      src: './wasm-src/fibonacci.cpp',
    },

    fibonacciGo: {
      bin: './wasm-modules/',
      make: 'tinygo build -o wasm-modules/fibonacciGo.wasm -target wasm wasm-src/fibonacci.go',
      src: './wasm-src/fibonacci.go',
      gluecode_src: './wasm-src/fibonacci-go-glue.js',
    },
  },
};
