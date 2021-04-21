# Webscripten
Webscripten is a compiler for LLVM IR to WebAssembly, written in WebAssembly, with tools from the LLVM Project.
This project allows for compilation and running of LLVM IR from entirely within the browser.

[**Try it in the browser here.**](https://dlqs.github.io/webscripten/demo/dist/index.html)

## Usage
The Javascript parts of Webscripen can be installed via `npm` and must be deployed using a Javascript bundler. The non-Javascript parts, i.e. the static files, must be served separately.

The folllowing `npm` commands can also be replaced with their `yarn` equivalents.
### Installation
1. Install the package.
    ```
    npm install webscripten
    ```
2. Copy the static files into a static assets folder, where they will be accessible alongside the main site. The static files will be downloaded at run time.   
For an example of how this can be done with webpack, check the demo.
    ```
    // from the root of the project, copy the files out
    cp -r ./node_modules/webscripten/dist/static <static folder>
    ```
3. Import via `require` (or whatever import syntax your bundler supports)
    ```
    const webscripten = require('webscripten')

    ...

    webscripten.compile(code, 'static/')
    ```
Hint: if the static files do not load, use the browser's `console` > `networking` to check if the URL being accessed is correct.

**Warning:** the static files are large (~60MB) and can cause significant lag in the browser. They are only downloaded when required: this slows the compilation process down significantly.
Please ensure a minimum of 1GB of available RAM. Several runs in a row may cause your browser tab to freeze or crash.

An example is provided in the [demo folder](https://github.com/dlqs/webscripten/tree/master/demo).

### API
#### compile(code: string, staticPath: string): Promise\<string>
Returns a promise with the compiled LLVM IR (the object file) as a hex string.
This is so that it can be easily passed around or stored in LocalStorage etc.
Object files are *not* executable until they are linked.  

#### link(obj: string, staticPath: string): Promise\<string>
Returns a promise with the linked object file (the runnable WebAssembly module) as a hex string.

#### run(wasm: string, staticPath: string): Promise\<string>
Returns a promise with the stdout from running the WebAssembly module.

#### compileLinkRun(code: string, staticPath: string): Promise\<string>
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

## Development
### Layout
```
.
├── demo                // example of using the webscripten npm package
├── dist                // distribution for npm (gitignored)
├── node_modules
├── package.json
├── prettier.config.js
├── README.md
├── src                 // source code folder
│   ├── lib/            // Javascript library code for the final WebAssembly executable
│   ├── static/         // llvm tools compiled to WebAssembly
│   ├── llc.js          // loading code
│   ├── lld.js          // loading code
│   ├── main.js         // main entrypoint for webscripten
│   ├── run_llc.js
│   ├── run_lld.js
│   ├── run_wasm.js
│   ├── util.js
│   ├── browserBindings.js
│   ├── wasi.index.esm.js
│   └── wasmfs.index.esm.js
└── webpack.config.js   // creates distribution
```

### Building
The build process is rather long and involves compiling the LLVM tools and generating the Javascript glue code.

#### Requirements
- GNU/Linux. Ubuntu preferred. You can use an Ubuntu >18 EC2 instance.
- Minimum 8GB RAM and 20GB disk space
- The entire process takes 1-2 hours, probably more for troubleshooting.
#### Steps
1. Visit the [Getting Started section of the LLVM docs](https://llvm.org/docs/GettingStarted.html)
and ensure your computer (the host) meets all the requirements in the Requirements section.
Your computer must meet all hardware, software and host C++ toolchain requirements. 
2. Install [emscripten](https://emscripten.org/docs/getting_started/downloads.html)
3. Run the following:
```
// from home directory
git clone https://github.com/llvm/llvm-project

// this is our llvm build folder (outside of the llvm-project tree)
mkdir build && cd build

// generate the build files
cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD=WebAssembly -DLLVM_ENABLE_PROJECTS="clang;libcxx;libcxxabi;lld" -DCMAKE_INSTALL_PREFIX=~/build ~/llvm-project/llvm 

// kick off the llvm build (~30 minutes)
cmake --build .

// new build folder for webscripten
mkdir ../webscripten_build && cd ../webscripten_build

// generate the build files (ensure your emsdk environment variables are set)
emcmake cmake -G "Ninja" -DLLVM_ENABLE_DUMP=OFF -DLLVM_ENABLE_ASSERTIONS=OFF -DLLVM_ENABLE_EXPENSIVE_CHECKS=OFF -DLLVM_ENABLE_BACKTRACES=OFF -DLLVM_ENABLE_THREADS=OFF -DLLVM_BUILD_LLVM_DYLIB=OFF -DLLVM_INCLUDE_TESTS=OFF -DLLVM_INCLUDE_EXAMPLES=OFF -DCMAKE_CXX_FLAGS="-s EXPORT_ALL=1" -DCMAKE_INSTALL_PREFIX=$HOME/webscripten_build -DCMAKE_BUILD_TYPE=Release  -DLLVM_DEFAULT_TARGET_TRIPLE=wasm32-unknown-unknown -DLLVM_TARGETS_TO_BUILD="WebAssembly" -DCMAKE_CROSSCOMPILING=True -DLLVM_ENABLE_PROJECTS=lld -DLLVM_TABLEGEN=$HOME/build/bin/llvm-tblgen -DCLANG_TABLEGEN=$HOME/build/bin/clang-tblgen $HOME/llvm-project/llvm

// kick off the webscripten build (~30 minutes)
cmake --build .
```

## Future work
### Linking other libraries
### Integration with llvm-sauce
There is a dependency on llvm-sauce being able to run standalone in the browser.