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
#### Static Linking Using LLD
As of now, static linking is done by fetching the library folder `sysroot.tar` located in the static folder, and copying its contents into LLD's filesystem. Extra flags would also have to be added to LLD's arguments to let LLD know the location of the libraries. The un-taring code is taken from [wasm-clang](https://github.com/binji/wasm-clang/blob/8e78cdb9caa80f75ed86d6632cb4e9310b22748c/shared.js#L580-L652).  
To add extra libraries, modify the code in `run_lld.js` to do the same for other `.tar` library files. 
#### Importing Javascript functions using Webassembly imports
Inside the file `run_wasm.js` , import the javascript module via `require` and add the module to the environment of `importObject` before running the WebAssembly instance. 

Example (math library):

```
const math = require('./lib/math.js')
... < other code >

    const importObject = {
      ...wasi.getImports(module),
      env: {
        ...math,
      },
    }

    let instance = await WebAssembly.instantiate(module, importObject)
```

### Integration with llvm-sauce
There is a dependency on [llvm-sauce](https://github.com/jiachen247/llvm-sauce) being able to run standalone in the browser. 

### Higher Order Programming
Passing higher order functions between javascript and WebAssembly is a difficult task. A very simple example would be the `map` function. In LLVM IR the function signature would take in an pointer(array) and a function pointer as its arguments. 

A function pointer is compiled to an integer in WebAssembly, which is the index of the function in the program's function table. For more information on WebAssembly function tables, [click here](https://hacks.mozilla.org/2017/07/webassembly-table-imports-what-are-they/). 

If we provide the definition of `map` inside the IR itself, then there would be no problem at all. However, if we wish to use javascript's implementation of `map`, there would be problems as the function would read its parameters as two numbers which is not what we want.

#### Potential Solutions
The following are some possible solutions to the problems posed by higher order programming.
##### Passing Arrays Between WebAssembly and Javascript
[This article](https://rob-blackbourn.github.io/blog/webassembly/wasm/array/arrays/javascript/c/2020/06/07/wasm-arrays.html) contains a section which has  an implementation of passing arrays between javascript and WebAssembly by managing the memory of the WebAssembly instance using javascript.
##### Passing and Adding Functions
* We can make use of the table index that was passed to obtain the Exported WebAssembly Function from the function table. This however, requires table to be imported into the WebAssembly module first, [click here for more information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table). 
* It is also possible to convert a javascript function into an Exported WebAssembly Function and add it into the table, [click here for more information](https://stackoverflow.com/questions/57541117/webassembly-call-javascript-functions-as-function-pointers-from-c).