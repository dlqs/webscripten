// Globals
const runButton = document.getElementById("runButton");
const textarea = document.getElementById("container");

runButton.addEventListener("click", function() {
  const module = setupModule()
  console.log("Run Wasm: run clicked")
  runWasm(module)
})

function setupModule() {
  let hex = localStorage.getItem("a.wasm")
  let wasm;
  if (hex === null) {
    console.log("Run Wasm: running default Hello World")
    wasm = HexToUint8Array(hello_world_wasm())
  } else {
    wasm = HexToUint8Array(hex)
  }
  console.log("Run Wasm: Validation: " + WebAssembly.validate(wasm))
  module = {
    wasmBinary: wasm,
    arguments: [],
    print: (function () {
      var element = document.getElementById("output");
      if (element) element.value = ""; // clear browser cache
      return function (text) {
        if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(" ");
        console.log(text);
        if (element) {
          element.value += text + "\n";
          element.scrollTop = element.scrollHeight; // focus on bottom
        }
      };
    })(),
    printErr: function (text) {
      if (arguments.length > 1)
        text = Array.prototype.slice.call(arguments).join(" ");
      console.error(text);
    },
  };
  return module
}

function hello_world_wasm() {
  return "0061736D01000000020F0103656E76066D656D6F72790200020608017F01418088040B0019046E616D65071201000F5F5F737461636B5F706F696E74657200260970726F647563657273010C70726F6365737365642D62790105636C616E670631312E302E31"
}