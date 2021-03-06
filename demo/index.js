const webscripten = require('webscripten')

// Sample LLVM IR
const codeBox = document.getElementById("code");
codeBox.value = `; ModuleID = 'hello_world.c'
source_filename = "hello_world.c"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-linux-gnu"

@.str = private unnamed_addr constant [14 x i8] c"Hello world!\\0A\\00", align 1
@.str.1 = private unnamed_addr constant [27 x i8] c"The sin of 0.75 is %.3lf!\\0A\\00", align 1

; Function Attrs: noinline nounwind optnone sspstrong uwtable
define dso_local i32 @main() #0 {
  %1 = alloca i32, align 4
  store i32 0, i32* %1, align 4
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @.str, i64 0, i64 0))
  %3 = call double @math_sin(double 7.500000e-01)
  %4 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([27 x i8], [27 x i8]* @.str.1, i64 0, i64 0), double %3)
  ret i32 0
}

declare i32 @printf(i8*, ...) #1

declare double @math_sin(double) #1

attributes #0 = { noinline nounwind optnone sspstrong uwtable "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "min-legal-vector-width"="0" "no-infs-fp-math"="false" "no-jump-tables"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }
attributes #1 = { "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "no-infs-fp-math"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }

!llvm.module.flags = !{!0, !1, !2}
!llvm.ident = !{!3}

!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!2 = !{i32 7, !"PIE Level", i32 2}
!3 = !{!"clang version 11.1.0"}
`;

// Example of adding compileLinkRun to a button
const compileButton = document.getElementById("compile");
const linkButton = document.getElementById("link");
const runButton = document.getElementById("run");
const downloadButton = document.getElementById("download");
const resultBox = document.getElementById("result");

let objectFile;
let executable;
compileButton.addEventListener("click", function () {
  webscripten.compile(codeBox.value, 'static/').then(
    (resolved) => {
      objectFile = resolved;
      resultBox.value = "compiled.";
      console.log("compiled.");
    },
    (rejected) => {
      resultBox = rejected;
      console.error(rejected);
    }
  );
});

linkButton.addEventListener("click", function () {
  webscripten.link(objectFile, 'static/').then(
    (resolved) => {
      executable = resolved;
      resultBox.value = "linked.";
      console.log("linked.");
    },
    (rejected) => {
      resultBox.value = rejected;
      console.error(rejected);
    }
  );
});

const timeBox = document.getElementById("time");

runButton.addEventListener("click", function () {
  let startTime = Date.now();
  webscripten.run(executable, 'static/').then(
    (resolved) => {
      let endTime = Date.now();
      timeBox.value = (endTime - startTime) + "ms"
      resultBox.value = resolved;
      console.log(resolved);
    },
    (rejected) => {
      resultBox.value = rejected;
      console.error(rejected);
    }
  );
});

function HexToUint8Array(str) {
  if (!str) {
    return new Uint8Array()
  }

  var a = []
  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16))
  }

  return new Uint8Array(a)
}

function saveBlob(blob, fileName) {
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  var url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
}


downloadButton.addEventListener("click", function () {
  saveBlob(new Blob(HexToUint8Array(executable)), "a.wasm");
});