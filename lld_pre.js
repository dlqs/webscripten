// Globals
const linkButton = document.getElementById("lldLink");

function setup() {
  // Setup editor
  require.config({ paths: { vs: "../../node_modules/monaco-editor/min/vs" } });
  require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("container"), {
      value: hello_world_hex(),
      language: "scheme", // stand-in for LLVM IR
    });

    window.onresize = function () {
      window.editor.layout();
    };

    function setupModule() {
      function preRun() {
        console.log("LLD: pre run");
        if (localStorage.getItem("a.wasm") !== null) {
          console.log("LLD: pre run: found existing a.wasm, removing it first.");
          localStorage.removeItem("a.wasm");
        }

        const hex = window.editor.getValue()
        const uint8 = HexToUint8Array(hex)
        this.FS.writeFile("./a.o", uint8)
      };
      function postRun() {
        const exists = this.FS.analyzePath("./a.wasm").exists;
        if (exists) {
          const uint8 = this.FS.readFile("./a.wasm", { encoding: "binary" });
          const hex = Uint8ArrayToHex(uint8)
          console.log("LLD: post run: writing output to localStorage as a.wasm");
          localStorage.setItem("a.wasm", hex);
        } else {
          console.log("LLD: post run: no output");
        }
      };
      module = {
        arguments: [
          "-flavor",
          "wasm",
          //"--import-memory",
          //"--no-entry",
          "./a.o",
          "-o",
          "./a.wasm",
        ],
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
      module.preRun = preRun.bind(module)
      module.postRun = postRun.bind(module)
      return module
    }

    linkButton.addEventListener("click", function () {
      console.log("LLD: link button clicked");
      const a = localStorage.getItem("a.o")
      if (a !== null) {
        window.editor.setValue(a)
      }
      runLLD(setupModule())
    });
  });
}

setup()

function hello_world_hex() {
  return "0061736D01000000018B80808000026000017F60027F7F017F02BC808080000303656E760F5F5F6C696E6561725F6D656D6F727902000103656E760F5F5F737461636B5F706F696E746572037F0103656E76067072696E746600010383808080000200010C8180808000010AC380808000023801017F23808080800041106B22002480808080002000410036020C41808080800041001080808080001A200041106A24808080800041000B08001081808080000B0B9480808000010041000B0E48656C6C6F2C20576F726C64210000D580808000076C696E6B696E670208AE80808000050000010F5F5F6F726967696E616C5F6D61696E0210000102062E4C2E73747200000E001000000002046D61696E059280808000010E2E726F646174612E2E4C2E737472000000A0808080000A72656C6F632E434F44450406070601071101041E0200002603073201003D0000A6808080000970726F647563657273010C70726F6365737365642D62790105636C616E670631312E302E31"
}