# Webscripten
Webscripten is a compiler for LLVM IR to WebAssembly, written in WebAssembly, using tools from the LLVM Project.
This project allows for compilation and running of LLVM IR from entirely within the browser.
Webscripten uses the LLVM IR compiler (llc) and LLVM Linker (lld) which have been compiled to WebAssembly.

## Usage
Webscripen can be installed via npm/yarn and can be deployed using a Javascript bundler.
An example is provided in the [demo folder](https://github.com/dlqs/webscripten/tree/master/demo). Visit the final deployed website [here](https://dlqs.github.io/webscripten/demo/dist/index.html).

**Warning: the combined binaries are large (60MBs) and can cause significant lag (5-10 seconds) in the browser.**  
The WebAssembly binaries are lazily downloaded, when required.
Please ensure a minimum of 1GB of available RAM and patience when running this module.


### API
#### webscripten.compile(code: string): Promise\<string>
Returns a promise with the compiled LLVM IR (the object file) as a hex string.
This is so that it can be easily passed around or stored in LocalStorage etc.
Object files are *not* executable until they are linked.  

#### webscripten.link(obj: string): Promise\<string>
Returns a promise with the linked object file (the runnable WebAssembly module) as a hex string.

#### webscripten.run(wasm: string): Promise\<string>
Returns a promise with the stdout from running the WebAssembly module.

#### webscripten.compileLinkRun(code: string): Promise\<string>
Returns a promise with the stdout from compiling, linking and running the LLVM IR.
This is a composition of the `compile`, `link` and `run` APIs described above.

Example:
```
const webscripten = require('webscripten')

const ir = `; ModuleID = 'hello_world.c'
source_filename = "hello_world.c"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-linux-gnu"

@.str = private unnamed_addr constant [14 x i8] c"Hello, World!\\00", align 1
...
< cut for brevity >
`

const obj = await webscripten.compile(ir)
const wasm = await webscripten.link(obj)
const out = await webscripten.run(wasm)

const out2 = await webscripten.compileLinkRun(ir)
// out and out2 are the same
```

## Building

The build process is rather long and involves compiling the LLVM tools and generating the Javascript glue code.

npx webpack --config webpack.config.js

## API
in src/main.js

prereq: clang, cmake

```
mkdir build

cd ~/build

cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD=WebAssembly -DLLVM_ENABLE_PROJECTS="clang;libcxx;libcxxabi;lld" -DCMAKE_INSTALL_PREFIX=~/build ~/llvm-project/llvm 

cmake --build .

cd ..

mkdir webscripten_build

cd ~/webscripten_build

emcmake cmake -G "Ninja" -DLLVM_ENABLE_DUMP=OFF -DLLVM_ENABLE_ASSERTIONS=OFF -DLLVM_ENABLE_EXPENSIVE_CHECKS=OFF -DLLVM_ENABLE_BACKTRACES=OFF -DLLVM_ENABLE_THREADS=OFF -DLLVM_BUILD_LLVM_DYLIB=OFF -DLLVM_INCLUDE_TESTS=OFF -DLLVM_INCLUDE_EXAMPLES=OFF -DCMAKE_CXX_FLAGS="-s EXPORT_ALL=1" -DCMAKE_INSTALL_PREFIX=$HOME/webscripten_build -DCMAKE_BUILD_TYPE=Release  -DLLVM_DEFAULT_TARGET_TRIPLE=wasm32-unknown-unknown -DLLVM_TARGETS_TO_BUILD="WebAssembly" -DCMAKE_CROSSCOMPILING=True -DLLVM_ENABLE_PROJECTS=lld -DLLVM_TABLEGEN=$HOME/build/bin/llvm-tblgen -DCLANG_TABLEGEN=$HOME/build/bin/clang-tblgen $HOME/llvm-project/llvm

cmake --build .
```
