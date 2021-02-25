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