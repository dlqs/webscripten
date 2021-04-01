const run = require('./lld.js').run
const util = require('./util.js')
let sysroot
function runLLD(code) {
  return new Promise((resolve, reject) => {
    function preRun() {
      // untar sysroot to lld's FS
      console.log('sysroot:', sysroot)
      let offset = 0
      const readStr = (len = -1) => {
        let str = ''
        let end = sysroot.length
        if (len != -1) {
          end = offset + len
        }
        for (let i = offset; i < end && sysroot[i] != 0; ++i) {
          str += String.fromCharCode(sysroot[i])
        }
        offset += len
        return str
      }
      const readOctal = (len) => {
        return parseInt(readStr(len), 8)
      }
      const alignUp = () => {
        offset = (offset + 511) & ~511
      }
      const readEntry = () => {
        if (offset + 512 > sysroot.length) {
          return null
        }
        const entry = {
          filename: readStr(100),
          mode: readOctal(8),
          owner: readOctal(8),
          group: readOctal(8),
          size: readOctal(12),
          mtim: readOctal(12),
          checksum: readOctal(8),
          type: readStr(1),
          linkname: readStr(100),
        }
        if (!readStr(8).startsWith('ustar')) {
          return null
        }
        entry.ownerName = readStr(32)
        entry.groupName = readStr(32)
        entry.devMajor = readStr(8)
        entry.devMinor = readStr(8)
        entry.filenamePrefix = readStr(155)
        alignUp()
        if (entry.type === '0') {
          // Regular file.
          entry.contents = sysroot.subarray(offset, offset + entry.size)
          offset += entry.size
          alignUp()
        } else if (entry.type !== '5') {
          // Directory.
          console.log('type', entry.type)
          assert(false)
        }
        return entry
      }
      let entry
      while ((entry = readEntry())) {
        switch (entry.type) {
          case '0': // Regular file.
            this.FS.writeFile(entry.filename, entry.contents)
            console.log('writing file: ' + entry.filename)
            break
          case '5':
            this.FS.mkdir(entry.filename)
            console.log('Making folder: ' + entry.filename)
            break
          default:
            break
        }
      }
      const hex = code
      const uint8 = util.HexToUint8Array(hex)
      this.FS.writeFile('./a.o', uint8)
    }
    function postRun() {
      const exists = this.FS.analyzePath('./a.wasm').exists
      if (exists) {
        const uint8 = this.FS.readFile('./a.wasm', { encoding: 'binary' })
        const hex = util.Uint8ArrayToHex(uint8)
        resolve(hex)
      } else {
        reject('LLD: post run: no output')
      }
    }
    module = {
      arguments: [
        '-flavor',
        'wasm',
        '-L/lib',
        '-lc',
        '-lc++',
        '-lc++abi',
        '/lib/clang/11.0.0/lib/wasi/libclang_rt.builtins-wasm32.a',
        '/lib/crt1.o',
        //"--import-memory",
        '--entry=main',
        './a.o',
        '-o',
        './a.wasm',
      ],
      locateFile: function (path, prefix) {
        return 'static/' + path
      },
      print: function (text) {
        if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(' ')
        console.log(text)
      },
      printErr: function (text) {
        if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(' ')
        console.error(text)
      },
    }
    module.preRun = preRun.bind(module)
    module.postRun = postRun.bind(module)
    fetch('static/sysroot.tar')
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        sysroot = new Uint8Array(buf)
        run(module)
      })
  })
}
exports.runLLD = runLLD

function hello_world_hex() {
  return '0061736D01000000018B80808000026000017F60027F7F017F02BC808080000303656E760F5F5F6C696E6561725F6D656D6F727902000103656E760F5F5F737461636B5F706F696E746572037F0103656E76067072696E746600010383808080000200010C8180808000010AC380808000023801017F23808080800041106B22002480808080002000410036020C41808080800041001080808080001A200041106A24808080800041000B08001081808080000B0B9480808000010041000B0E48656C6C6F2C20576F726C64210000D580808000076C696E6B696E670208AE80808000050000010F5F5F6F726967696E616C5F6D61696E0210000102062E4C2E73747200000E001000000002046D61696E059280808000010E2E726F646174612E2E4C2E737472000000A0808080000A72656C6F632E434F44450406070601071101041E0200002603073201003D0000A6808080000970726F647563657273010C70726F6365737365642D62790105636C616E670631312E302E31'
}
