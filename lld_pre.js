// Globals
var Module; // this must be globally declared!!!
const linkButton = document.getElementById("lldLink");

function setupEditor() {
  // Setup editor
  require.config({ paths: { vs: "../../node_modules/monaco-editor/min/vs" } });
  require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("container"), {
      value: "",
      language: "scheme", // stand-in for LLVM IR
    });

    window.onresize = function () {
      window.editor.layout();
    };
  });
}

function setupLLD() {
  const preRun = () => {
    console.log("LLD: pre run");
    if (localStorage.getItem("a.wasm") !== null) {
      console.log("LLD: pre run: found existing a.wasm, removing it first.");
      localStorage.removeItem("a.wasm");
    }

    if (window.editor) {
      const hex = window.editor.getValue()
      const uint8 = HexToUint8Array(hex)
      FS.writeFile("./a.o", uint8)
    } else {
      console.log(
        "LLC: pre run: Could not find window.editor. Is setupLLC running before setupEditor?"
      );
    }
  };
  const postRun = () => {
    const exists = FS.analyzePath("./a.wasm").exists;
    if (exists) {
      const uint8 = FS.readFile("./a.wasm", { encoding: "binary" });
      const hex = Uint8ArrayToHex(uint8)
      console.log("LLD: post run: writing output to localStorage as a.wasm");
      localStorage.setItem("a.wasm", hex);
    } else {
      console.log("LLD: post run: no output");
    }
  };
  const onRuntimeInitialized = () => {
    linkButton.addEventListener("click", function () {
      console.log("LLD: link button clicked");
      const a = localStorage.getItem("a.o")
      if (a === null) {
        console.log("LLD: Must run Compile first")
        return
      }
      window.editor.setValue(a)
      // Reset run(); don't ask why
      calledRun = false;
      shouldRunNow = true;
      Module["preRun"] = preRun;
      Module["postRun"] = postRun;
      Module["run"]();
    });
  };

  Module = {
    preRun: preRun,
    postRun: postRun,
    noInitialRun: true,
    onRuntimeInitialized: onRuntimeInitialized,
    arguments: [
      "-flavor",
      "wasm",
      "--import-memory",
      "--no-entry",
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
}

// Entry point
function pre() {
  setupEditor();
  setupLLD();
}
pre();