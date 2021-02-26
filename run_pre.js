// Globals
var Module; // this must be globally declared!!!
const runButton = document.getElementById("runButton");
const textarea = document.getElementById("container");

function setupRun() {
  const preRun = () => {
    console.log("Run: pre run");
  };
  const postRun = () => {
      console.log("Run: post run");
  };
  const onRuntimeInitialized = () => {
      console.log("Run: initialized");
  };

  Module = {
    preRun: preRun,
    postRun: postRun,
    noInitialRun: true,
    onRuntimeInitialized: onRuntimeInitialized,
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
}

// Entry point
function pre() {
  setupRun();
}
pre();