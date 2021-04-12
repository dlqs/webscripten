const util = require('./util.js')
const WASI = require('./wasi.index.esm').WASI
const WasmFs = require('./wasmfs.index.esm').WasmFs
const browserBindings = require('./browserBindings.js').default

// Libraries
const math = require('./lib/math.js')
const curves = require('./lib/curves.js')().curves

function runWasm(code) {
  return new Promise(async (resolve, reject) => {
    wasm = util.HexToUint8Array(code)
    let module = await WebAssembly.compile(wasm)
    let wasmFs = new WasmFs()
    let wasi = new WASI({
      bindings: {
        ...browserBindings,
        fs: wasmFs.fs,
      },
    })

    console.log(curves)

    const importObject = {
      ...wasi.getImports(module),
      env: {
        ...math,
        ...curves,
      },
    }

    let instance = await WebAssembly.instantiate(module, importObject)

    wasi.start(instance)
    let stdout = await wasmFs.getStdOut()
    resolve(stdout)
  })
}

exports.runWasm = runWasm
