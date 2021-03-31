const run = require("./llc.js").run;
const util = require("./util.js");

function runLLC(code) {
  return new Promise((resolve, reject) => {
    function preRun() {
      console.log("LLC: pre run");
      if (localStorage.getItem("a.o") !== null) {
        console.log("LLC: pre run: found existing a.o, removing it first.");
        localStorage.removeItem("a.o");
      }
      this.FS.writeFile("./a.ll", code);
    }
    function postRun() {
      const exists = this.FS.analyzePath("./a.o").exists;
      if (exists) {
        const uint8 = this.FS.readFile("./a.o", { encoding: "binary" });
        const hex = util.Uint8ArrayToHex(uint8);
        console.log("LLC: post run: writing output to localStorage as a.o");
        localStorage.setItem("a.o", hex);
        resolve(hex);
      } else {
        reject("llc: no postRun output!");
      }
    }
    module = {
      arguments: ["-march=wasm32", "a.ll", "-filetype=obj", "-o", "./a.o"],
      print: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(" ");
        }
        console.log(text);
        if (element) {
          element.value += text + "\n";
          element.scrollTop = element.scrollHeight; // focus on bottom
        }
      },
      printErr: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(" ");
        }
        // Swallow these annoying warnings
        const regex = new RegExp(
          "(is not a recognized feature|processor for this target)"
        );
        if (regex.test(text)) return;
        console.error(text);
      },
    };
    module.preRun = preRun.bind(module);
    module.postRun = postRun.bind(module);
    run(module);
  });
}
exports.runLLC = runLLC;
