const runLLC = require("./run_llc.js");
const runLLD = require("./run_lld.js");
const runWasm = require("./run_wasm.js");

const compile = runLLC;
const link = runLLD;
const run = runWasm;

function compileLinkRun(code) {
  return compile(code)
    .then((obj) => link(obj))
    .then((wasm) => run(wasm));
}

export { compile, link, run, compileLinkRun };
