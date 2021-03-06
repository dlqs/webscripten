const run = require('./llc.js').run
const util = require('./util.js')

function runLLC(code, staticPath) {
  return new Promise((resolve, reject) => {
    function preRun() {
      this.FS.writeFile('./a.ll', code)
    }
    function postRun() {
      const exists = this.FS.analyzePath('./a.o').exists
      if (exists) {
        const uint8 = this.FS.readFile('./a.o', { encoding: 'binary' })
        const hex = util.Uint8ArrayToHex(uint8)
        resolve(hex)
      } else {
        reject(new Error('run_llc: missing output from compilation'))
      }
    }
    module = {
      arguments: [
        '-march=wasm32',
        'a.ll',
        '-filetype=obj',
        '-O3',
        '-o',
        './a.o',
      ],
      locateFile: function (path, prefix) {
        // 'localhost:8000/assets/static/' + 'llc.wasm'
        return staticPath + path
      },
      print: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(' ')
        }
        console.log(text)
        if (element) {
          element.value += text + '\n'
          element.scrollTop = element.scrollHeight // focus on bottom
        }
      },
      printErr: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(' ')
        }
        // Swallow these annoying warnings
        const regex = new RegExp(
          '(is not a recognized feature|processor for this target)'
        )
        if (regex.test(text)) return
        console.error(text)
      },
    }
    module.preRun = preRun.bind(module)
    module.postRun = postRun.bind(module)
    run(module)
  })
}
exports.runLLC = runLLC
