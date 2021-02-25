// Globals
var Module; // this must be globally declared!!!
const compileButton = document.getElementById("llcCompile")

function setupEditor() {
  // Setup editor
  require.config({ paths: { vs: "../../node_modules/monaco-editor/min/vs" } });
  require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("container"), {
      value: hello_world_ll(),
      language: "scheme", // stand-in for LLVM IR
    });

    window.onresize = function () {
      window.editor.layout();
    };

  });
}

function setupLLC() {
  const preRun = () => {
      console.log("LLC: pre run")
      if (localStorage.getItem("a.o") !== null) {
        console.log("LLC: pre run: found existing a.o, removing it first.")
        localStorage.removeItem("a.o")
      }

      if (window.editor) {
        FS.writeFile("./a.ll", window.editor.getValue())
      } else {
        console.log("LLC: pre run: Could not find window.editor. Is setupLLC running before setupEditor?")
      }
  }
  const postRun = () => {
      const exists = FS.analyzePath("./a.o").exists
      if (exists) {
        const uint8 = FS.readFile("./a.o", { encoding: "binary" });
        const b64 = Uint8ArrayToBase64(uint8)
        console.log("LLC: post run: writing output to localStorage as a.o")
        localStorage.setItem("a.o", b64);
      } else {
        console.log("LLC: post run: no output")
      }
  }
  const onRuntimeInitialized = () => {
      compileButton.addEventListener("click", function() {
        console.log("LLC: compile button clicked")
        // Reset run(); don't ask why
        calledRun = false
        shouldRunNow = true
        Module["preRun"] = preRun
        Module["postRun"] = postRun
        Module["run"]()
      })
  }

  Module = {
    preRun: preRun,
    postRun: postRun,
    noInitialRun: true,
    onRuntimeInitialized: onRuntimeInitialized,
    arguments: ["-march=wasm32", "a.ll", "-filetype=obj", "-o", "./a.o"],
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

      // Swallow these annoying warnings
      const regex = new RegExp('(is not a recognized feature|processor for this target)');
      if (regex.test(text)) return

      console.error(text);
    },
  };
}

// Entry point
function pre() {
  setupEditor()
  setupLLC()
}
pre()

function hello_world_ll() {
  return `; ModuleID = 'hello_world.c'
source_filename = "hello_world.c"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-linux-gnu"

@.str = private unnamed_addr constant [14 x i8] c"Hello, World!\\00", align 1

; Function Attrs: noinline nounwind optnone sspstrong uwtable
define dso_local i32 @main() #0 {
  %1 = alloca i32, align 4
  store i32 0, i32* %1, align 4
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @.str, i64 0, i64 0))
  ret i32 0
}

declare i32 @printf(i8*, ...) #1

attributes #0 = { noinline nounwind optnone sspstrong uwtable "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "min-legal-vector-width"="0" "no-infs-fp-math"="false" "no-jump-tables"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }
attributes #1 = { "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "no-infs-fp-math"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }

!llvm.module.flags = !{!0, !1, !2}
!llvm.ident = !{!3}

!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!2 = !{i32 7, !"PIE Level", i32 2}
!3 = !{!"clang version 11.0.1"}
`;
}
