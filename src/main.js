const runLLC = require('./run_llc.js')
const runLLD = require('./run_lld.js')
const runWasm = require('./run_wasm.js')

/**
 * Compiles LLVM IR to an object file with llvm/llc.
 *
 * @param {string} ir - LLVM IR
 * @return {Promise<string>} obj - Compiled object file in hex
 */
const compile = runLLC.runLLC

/**
 * Links an object file against libc, libc++ etc. with llvm/lld.
 *
 * @param {string} obj - Object file in hex
 * @return {Promise<string>} wasm - Runnable WASM binary in hex
 */
const link = runLLD.runLLD

/**
 * Runs a WASM binary.
 *
 * @param {string} wasm - Runnable WASM binary in hex
 * @return {Promise<string>} stdout - output
 */
const run = runWasm.runWasm

/**
 * Compiles, links and runs LLVM IR.
 *
 * @param {string} ir - LLVM IR
 * @return {Promise<string>} stdout - output
 */
const compileLinkRun = (code) =>
  compile(code)
    .then((obj) => link(obj))
    .then((wasm) => run(wasm))

exports.compile = compile
exports.link = link
exports.run = run
exports.compileLinkRun = compileLinkRun
