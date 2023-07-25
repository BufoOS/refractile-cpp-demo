module.exports = () => {
  // Add go to global this...
  require('./wasm_exec');
  const path = require('path');

  const go = new Go();

  return new Promise((resolve, reject) => {
    const wasm = fs.readFileSync(path.resolve(__dirname, 'fibonacciGo.wasm'));
    WebAssembly.compile(wasm).then((mod) => {
      try {
        // Store the previous keys in the globalThis as a set (for constant time lookup)
        const previousGlobals = Object.keys(globalThis);
        WebAssembly.instantiate(mod, go.importObject).then((instance) => {
          const result = {};
          // Populate the globalThis with functions form Go
          go.run(instance);
          // Iterate through the updated keys
          Object.keys(globalThis).forEach((key) => {
            // If the key is missing from the previous (i.e. it is new since instantiating the go module)
            if (!previousGlobals.includes(key)) {
              // console.log(key);
              // add it to the instance's exports
              result[key] = globalThis[key];
              // console.log(instance.exports);
              // delete it from the global this
              delete globalThis[key];
            }
          });
          resolve(result);
        });
      } catch (e) {
        reject();
      }
    });
  });
};
