/*
 *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*****************************************************************************/
var h =
  'undefined' !== typeof globalThis
    ? globalThis
    : 'undefined' !== typeof window
    ? window
    : 'undefined' !== typeof global
    ? global
    : 'undefined' !== typeof self
    ? self
    : {}
function aa(a, b) {
  return (b = { exports: {} }), a(b, b.exports), b.exports
}
var k =
  'undefined' !== typeof global
    ? global
    : 'undefined' !== typeof self
    ? self
    : 'undefined' !== typeof window
    ? window
    : {}
function ba() {
  throw Error('setTimeout has not been defined')
}
function ca() {
  throw Error('clearTimeout has not been defined')
}
var p = ba,
  r = ca
'function' === typeof k.setTimeout && (p = setTimeout)
'function' === typeof k.clearTimeout && (r = clearTimeout)
function da(a) {
  if (p === setTimeout) return setTimeout(a, 0)
  if ((p === ba || !p) && setTimeout) return (p = setTimeout), setTimeout(a, 0)
  try {
    return p(a, 0)
  } catch (b) {
    try {
      return p.call(null, a, 0)
    } catch (c) {
      return p.call(this, a, 0)
    }
  }
}
function ea(a) {
  if (r === clearTimeout) return clearTimeout(a)
  if ((r === ca || !r) && clearTimeout)
    return (r = clearTimeout), clearTimeout(a)
  try {
    return r(a)
  } catch (b) {
    try {
      return r.call(null, a)
    } catch (c) {
      return r.call(this, a)
    }
  }
}
var t = [],
  v = !1,
  w,
  x = -1
function fa() {
  v &&
    w &&
    ((v = !1), w.length ? (t = w.concat(t)) : (x = -1), t.length && ha())
}
function ha() {
  if (!v) {
    var a = da(fa)
    v = !0
    for (var b = t.length; b; ) {
      w = t
      for (t = []; ++x < b; ) w && w[x].run()
      x = -1
      b = t.length
    }
    w = null
    v = !1
    ea(a)
  }
}
function ia(a) {
  var b = Array(arguments.length - 1)
  if (1 < arguments.length)
    for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
  t.push(new ja(a, b))
  1 !== t.length || v || da(ha)
}
function ja(a, b) {
  this.fun = a
  this.array = b
}
ja.prototype.run = function () {
  this.fun.apply(null, this.array)
}
function y() {}
var z = k.performance || {},
  ka =
    z.now ||
    z.mozNow ||
    z.msNow ||
    z.oNow ||
    z.webkitNow ||
    function () {
      return new Date().getTime()
    },
  ma = new Date(),
  na = {
    nextTick: ia,
    title: 'browser',
    browser: !0,
    env: {},
    argv: [],
    version: '',
    versions: {},
    on: y,
    addListener: y,
    once: y,
    off: y,
    removeListener: y,
    removeAllListeners: y,
    emit: y,
    binding: function () {
      throw Error('process.binding is not supported')
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
      throw Error('process.chdir is not supported')
    },
    umask: function () {
      return 0
    },
    hrtime: function (a) {
      var b = 0.001 * ka.call(z),
        c = Math.floor(b)
      b = Math.floor((b % 1) * 1e9)
      a && ((c -= a[0]), (b -= a[1]), 0 > b && (c--, (b += 1e9)))
      return [c, b]
    },
    platform: 'browser',
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - ma) / 1e3
    },
  },
  A = [],
  B = [],
  oa = 'undefined' !== typeof Uint8Array ? Uint8Array : Array,
  pa = !1
function qa() {
  pa = !0
  for (var a = 0; 64 > a; ++a)
    (A[a] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[
      a
    ]),
      (B[
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charCodeAt(
          a
        )
      ] = a)
  B[45] = 62
  B[95] = 63
}
function ra(a, b, c) {
  for (var d = [], e = b; e < c; e += 3)
    (b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2]),
      d.push(
        A[(b >> 18) & 63] + A[(b >> 12) & 63] + A[(b >> 6) & 63] + A[b & 63]
      )
  return d.join('')
}
function sa(a) {
  pa || qa()
  for (
    var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c;
    f < g;
    f += 16383
  )
    e.push(ra(a, f, f + 16383 > g ? g : f + 16383))
  1 === c
    ? ((a = a[b - 1]), (d += A[a >> 2]), (d += A[(a << 4) & 63]), (d += '=='))
    : 2 === c &&
      ((a = (a[b - 2] << 8) + a[b - 1]),
      (d += A[a >> 10]),
      (d += A[(a >> 4) & 63]),
      (d += A[(a << 2) & 63]),
      (d += '='))
  e.push(d)
  return e.join('')
}
function C(a, b, c, d, e) {
  var f = 8 * e - d - 1
  var g = (1 << f) - 1,
    l = g >> 1,
    m = -7
  e = c ? e - 1 : 0
  var n = c ? -1 : 1,
    q = a[b + e]
  e += n
  c = q & ((1 << -m) - 1)
  q >>= -m
  for (m += f; 0 < m; c = 256 * c + a[b + e], e += n, m -= 8);
  f = c & ((1 << -m) - 1)
  c >>= -m
  for (m += d; 0 < m; f = 256 * f + a[b + e], e += n, m -= 8);
  if (0 === c) c = 1 - l
  else {
    if (c === g) return f ? NaN : Infinity * (q ? -1 : 1)
    f += Math.pow(2, d)
    c -= l
  }
  return (q ? -1 : 1) * f * Math.pow(2, c - d)
}
function D(a, b, c, d, e, f) {
  var g,
    l = 8 * f - e - 1,
    m = (1 << l) - 1,
    n = m >> 1,
    q = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0
  f = d ? 0 : f - 1
  var u = d ? 1 : -1,
    la = 0 > b || (0 === b && 0 > 1 / b) ? 1 : 0
  b = Math.abs(b)
  isNaN(b) || Infinity === b
    ? ((b = isNaN(b) ? 1 : 0), (d = m))
    : ((d = Math.floor(Math.log(b) / Math.LN2)),
      1 > b * (g = Math.pow(2, -d)) && (d--, (g *= 2)),
      (b = 1 <= d + n ? b + q / g : b + q * Math.pow(2, 1 - n)),
      2 <= b * g && (d++, (g /= 2)),
      d + n >= m
        ? ((b = 0), (d = m))
        : 1 <= d + n
        ? ((b = (b * g - 1) * Math.pow(2, e)), (d += n))
        : ((b = b * Math.pow(2, n - 1) * Math.pow(2, e)), (d = 0)))
  for (; 8 <= e; a[c + f] = b & 255, f += u, b /= 256, e -= 8);
  d = (d << e) | b
  for (l += e; 0 < l; a[c + f] = d & 255, f += u, d /= 256, l -= 8);
  a[c + f - u] |= 128 * la
}
var ta = {}.toString,
  ua =
    Array.isArray ||
    function (a) {
      return '[object Array]' == ta.call(a)
    }
E.TYPED_ARRAY_SUPPORT =
  void 0 !== k.TYPED_ARRAY_SUPPORT ? k.TYPED_ARRAY_SUPPORT : !0
var va = E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
function F(a, b) {
  if ((E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
    throw new RangeError('Invalid typed array length')
  E.TYPED_ARRAY_SUPPORT
    ? ((a = new Uint8Array(b)), (a.__proto__ = E.prototype))
    : (null === a && (a = new E(b)), (a.length = b))
  return a
}
function E(a, b, c) {
  if (!(E.TYPED_ARRAY_SUPPORT || this instanceof E)) return new E(a, b, c)
  if ('number' === typeof a) {
    if ('string' === typeof b)
      throw Error(
        'If encoding is specified then the first argument must be a string'
      )
    return wa(this, a)
  }
  return xa(this, a, b, c)
}
E.poolSize = 8192
E._augment = function (a) {
  a.__proto__ = E.prototype
  return a
}
function xa(a, b, c, d) {
  if ('number' === typeof b)
    throw new TypeError('"value" argument must not be a number')
  if ('undefined' !== typeof ArrayBuffer && b instanceof ArrayBuffer) {
    b.byteLength
    if (0 > c || b.byteLength < c)
      throw new RangeError("'offset' is out of bounds")
    if (b.byteLength < c + (d || 0))
      throw new RangeError("'length' is out of bounds")
    b =
      void 0 === c && void 0 === d
        ? new Uint8Array(b)
        : void 0 === d
        ? new Uint8Array(b, c)
        : new Uint8Array(b, c, d)
    E.TYPED_ARRAY_SUPPORT
      ? ((a = b), (a.__proto__ = E.prototype))
      : (a = ya(a, b))
    return a
  }
  if ('string' === typeof b) {
    d = a
    a = c
    if ('string' !== typeof a || '' === a) a = 'utf8'
    if (!E.isEncoding(a))
      throw new TypeError('"encoding" must be a valid string encoding')
    c = za(b, a) | 0
    d = F(d, c)
    b = d.write(b, a)
    b !== c && (d = d.slice(0, b))
    return d
  }
  return Aa(a, b)
}
E.from = function (a, b, c) {
  return xa(null, a, b, c)
}
E.TYPED_ARRAY_SUPPORT &&
  ((E.prototype.__proto__ = Uint8Array.prototype), (E.__proto__ = Uint8Array))
function Ba(a) {
  if ('number' !== typeof a)
    throw new TypeError('"size" argument must be a number')
  if (0 > a) throw new RangeError('"size" argument must not be negative')
}
E.alloc = function (a, b, c) {
  Ba(a)
  a =
    0 >= a
      ? F(null, a)
      : void 0 !== b
      ? 'string' === typeof c
        ? F(null, a).fill(b, c)
        : F(null, a).fill(b)
      : F(null, a)
  return a
}
function wa(a, b) {
  Ba(b)
  a = F(a, 0 > b ? 0 : Ca(b) | 0)
  if (!E.TYPED_ARRAY_SUPPORT) for (var c = 0; c < b; ++c) a[c] = 0
  return a
}
E.allocUnsafe = function (a) {
  return wa(null, a)
}
E.allocUnsafeSlow = function (a) {
  return wa(null, a)
}
function ya(a, b) {
  var c = 0 > b.length ? 0 : Ca(b.length) | 0
  a = F(a, c)
  for (var d = 0; d < c; d += 1) a[d] = b[d] & 255
  return a
}
function Aa(a, b) {
  if (G(b)) {
    var c = Ca(b.length) | 0
    a = F(a, c)
    if (0 === a.length) return a
    b.copy(a, 0, 0, c)
    return a
  }
  if (b) {
    if (
      ('undefined' !== typeof ArrayBuffer && b.buffer instanceof ArrayBuffer) ||
      'length' in b
    )
      return (
        (c = 'number' !== typeof b.length) || ((c = b.length), (c = c !== c)),
        c ? F(a, 0) : ya(a, b)
      )
    if ('Buffer' === b.type && ua(b.data)) return ya(a, b.data)
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
  )
}
function Ca(a) {
  if (a >= (E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        (E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
        ' bytes'
    )
  return a | 0
}
E.isBuffer = Da
function G(a) {
  return !(null == a || !a._isBuffer)
}
E.compare = function (a, b) {
  if (!G(a) || !G(b)) throw new TypeError('Arguments must be Buffers')
  if (a === b) return 0
  for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
    if (a[e] !== b[e]) {
      c = a[e]
      d = b[e]
      break
    }
  return c < d ? -1 : d < c ? 1 : 0
}
E.isEncoding = function (a) {
  switch (String(a).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return !0
    default:
      return !1
  }
}
E.concat = function (a, b) {
  if (!ua(a)) throw new TypeError('"list" argument must be an Array of Buffers')
  if (0 === a.length) return E.alloc(0)
  var c
  if (void 0 === b) for (c = b = 0; c < a.length; ++c) b += a[c].length
  b = E.allocUnsafe(b)
  var d = 0
  for (c = 0; c < a.length; ++c) {
    var e = a[c]
    if (!G(e))
      throw new TypeError('"list" argument must be an Array of Buffers')
    e.copy(b, d)
    d += e.length
  }
  return b
}
function za(a, b) {
  if (G(a)) return a.length
  if (
    'undefined' !== typeof ArrayBuffer &&
    'function' === typeof ArrayBuffer.isView &&
    (ArrayBuffer.isView(a) || a instanceof ArrayBuffer)
  )
    return a.byteLength
  'string' !== typeof a && (a = '' + a)
  var c = a.length
  if (0 === c) return 0
  for (var d = !1; ; )
    switch (b) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return c
      case 'utf8':
      case 'utf-8':
      case void 0:
        return H(a).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 2 * c
      case 'hex':
        return c >>> 1
      case 'base64':
        return Ea(a).length
      default:
        if (d) return H(a).length
        b = ('' + b).toLowerCase()
        d = !0
    }
}
E.byteLength = za
function Fa(a, b, c) {
  var d = !1
  if (void 0 === b || 0 > b) b = 0
  if (b > this.length) return ''
  if (void 0 === c || c > this.length) c = this.length
  if (0 >= c) return ''
  c >>>= 0
  b >>>= 0
  if (c <= b) return ''
  for (a || (a = 'utf8'); ; )
    switch (a) {
      case 'hex':
        a = b
        b = c
        c = this.length
        if (!a || 0 > a) a = 0
        if (!b || 0 > b || b > c) b = c
        d = ''
        for (c = a; c < b; ++c)
          (a = d),
            (d = this[c]),
            (d = 16 > d ? '0' + d.toString(16) : d.toString(16)),
            (d = a + d)
        return d
      case 'utf8':
      case 'utf-8':
        return Ga(this, b, c)
      case 'ascii':
        a = ''
        for (c = Math.min(this.length, c); b < c; ++b)
          a += String.fromCharCode(this[b] & 127)
        return a
      case 'latin1':
      case 'binary':
        a = ''
        for (c = Math.min(this.length, c); b < c; ++b)
          a += String.fromCharCode(this[b])
        return a
      case 'base64':
        return (
          (b = 0 === b && c === this.length ? sa(this) : sa(this.slice(b, c))),
          b
        )
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        b = this.slice(b, c)
        c = ''
        for (a = 0; a < b.length; a += 2)
          c += String.fromCharCode(b[a] + 256 * b[a + 1])
        return c
      default:
        if (d) throw new TypeError('Unknown encoding: ' + a)
        a = (a + '').toLowerCase()
        d = !0
    }
}
E.prototype._isBuffer = !0
function I(a, b, c) {
  var d = a[b]
  a[b] = a[c]
  a[c] = d
}
E.prototype.swap16 = function () {
  var a = this.length
  if (0 !== a % 2)
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  for (var b = 0; b < a; b += 2) I(this, b, b + 1)
  return this
}
E.prototype.swap32 = function () {
  var a = this.length
  if (0 !== a % 4)
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  for (var b = 0; b < a; b += 4) I(this, b, b + 3), I(this, b + 1, b + 2)
  return this
}
E.prototype.swap64 = function () {
  var a = this.length
  if (0 !== a % 8)
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  for (var b = 0; b < a; b += 8)
    I(this, b, b + 7),
      I(this, b + 1, b + 6),
      I(this, b + 2, b + 5),
      I(this, b + 3, b + 4)
  return this
}
E.prototype.toString = function () {
  var a = this.length | 0
  return 0 === a
    ? ''
    : 0 === arguments.length
    ? Ga(this, 0, a)
    : Fa.apply(this, arguments)
}
E.prototype.equals = function (a) {
  if (!G(a)) throw new TypeError('Argument must be a Buffer')
  return this === a ? !0 : 0 === E.compare(this, a)
}
E.prototype.inspect = function () {
  var a = ''
  0 < this.length &&
    ((a = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
    50 < this.length && (a += ' ... '))
  return '<Buffer ' + a + '>'
}
E.prototype.compare = function (a, b, c, d, e) {
  if (!G(a)) throw new TypeError('Argument must be a Buffer')
  void 0 === b && (b = 0)
  void 0 === c && (c = a ? a.length : 0)
  void 0 === d && (d = 0)
  void 0 === e && (e = this.length)
  if (0 > b || c > a.length || 0 > d || e > this.length)
    throw new RangeError('out of range index')
  if (d >= e && b >= c) return 0
  if (d >= e) return -1
  if (b >= c) return 1
  b >>>= 0
  c >>>= 0
  d >>>= 0
  e >>>= 0
  if (this === a) return 0
  var f = e - d,
    g = c - b,
    l = Math.min(f, g)
  d = this.slice(d, e)
  a = a.slice(b, c)
  for (b = 0; b < l; ++b)
    if (d[b] !== a[b]) {
      f = d[b]
      g = a[b]
      break
    }
  return f < g ? -1 : g < f ? 1 : 0
}
function Ha(a, b, c, d, e) {
  if (0 === a.length) return -1
  'string' === typeof c
    ? ((d = c), (c = 0))
    : 2147483647 < c
    ? (c = 2147483647)
    : -2147483648 > c && (c = -2147483648)
  c = +c
  isNaN(c) && (c = e ? 0 : a.length - 1)
  0 > c && (c = a.length + c)
  if (c >= a.length) {
    if (e) return -1
    c = a.length - 1
  } else if (0 > c)
    if (e) c = 0
    else return -1
  'string' === typeof b && (b = E.from(b, d))
  if (G(b)) return 0 === b.length ? -1 : Ia(a, b, c, d, e)
  if ('number' === typeof b)
    return (
      (b &= 255),
      E.TYPED_ARRAY_SUPPORT &&
      'function' === typeof Uint8Array.prototype.indexOf
        ? e
          ? Uint8Array.prototype.indexOf.call(a, b, c)
          : Uint8Array.prototype.lastIndexOf.call(a, b, c)
        : Ia(a, [b], c, d, e)
    )
  throw new TypeError('val must be string, number or Buffer')
}
function Ia(a, b, c, d, e) {
  function f(a, b) {
    return 1 === g ? a[b] : a.readUInt16BE(b * g)
  }
  var g = 1,
    l = a.length,
    m = b.length
  if (
    void 0 !== d &&
    ((d = String(d).toLowerCase()),
    'ucs2' === d || 'ucs-2' === d || 'utf16le' === d || 'utf-16le' === d)
  ) {
    if (2 > a.length || 2 > b.length) return -1
    g = 2
    l /= 2
    m /= 2
    c /= 2
  }
  if (e)
    for (d = -1; c < l; c++)
      if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
        if ((-1 === d && (d = c), c - d + 1 === m)) return d * g
      } else -1 !== d && (c -= c - d), (d = -1)
  else
    for (c + m > l && (c = l - m); 0 <= c; c--) {
      l = !0
      for (d = 0; d < m; d++)
        if (f(a, c + d) !== f(b, d)) {
          l = !1
          break
        }
      if (l) return c
    }
  return -1
}
E.prototype.includes = function (a, b, c) {
  return -1 !== this.indexOf(a, b, c)
}
E.prototype.indexOf = function (a, b, c) {
  return Ha(this, a, b, c, !0)
}
E.prototype.lastIndexOf = function (a, b, c) {
  return Ha(this, a, b, c, !1)
}
E.prototype.write = function (a, b, c, d) {
  if (void 0 === b) (d = 'utf8'), (c = this.length), (b = 0)
  else if (void 0 === c && 'string' === typeof b)
    (d = b), (c = this.length), (b = 0)
  else if (isFinite(b))
    (b |= 0),
      isFinite(c)
        ? ((c |= 0), void 0 === d && (d = 'utf8'))
        : ((d = c), (c = void 0))
  else
    throw Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  var e = this.length - b
  if (void 0 === c || c > e) c = e
  if ((0 < a.length && (0 > c || 0 > b)) || b > this.length)
    throw new RangeError('Attempt to write outside buffer bounds')
  d || (d = 'utf8')
  for (e = !1; ; )
    switch (d) {
      case 'hex':
        a: {
          b = Number(b) || 0
          d = this.length - b
          c ? ((c = Number(c)), c > d && (c = d)) : (c = d)
          d = a.length
          if (0 !== d % 2) throw new TypeError('Invalid hex string')
          c > d / 2 && (c = d / 2)
          for (d = 0; d < c; ++d) {
            e = parseInt(a.substr(2 * d, 2), 16)
            if (isNaN(e)) {
              a = d
              break a
            }
            this[b + d] = e
          }
          a = d
        }
        return a
      case 'utf8':
      case 'utf-8':
        return J(H(a, this.length - b), this, b, c)
      case 'ascii':
        return J(Ja(a), this, b, c)
      case 'latin1':
      case 'binary':
        return J(Ja(a), this, b, c)
      case 'base64':
        return J(Ea(a), this, b, c)
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        d = a
        e = this.length - b
        for (var f = [], g = 0; g < d.length && !(0 > (e -= 2)); ++g) {
          var l = d.charCodeAt(g)
          a = l >> 8
          l %= 256
          f.push(l)
          f.push(a)
        }
        return J(f, this, b, c)
      default:
        if (e) throw new TypeError('Unknown encoding: ' + d)
        d = ('' + d).toLowerCase()
        e = !0
    }
}
E.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0),
  }
}
function Ga(a, b, c) {
  c = Math.min(a.length, c)
  for (var d = []; b < c; ) {
    var e = a[b],
      f = null,
      g = 239 < e ? 4 : 223 < e ? 3 : 191 < e ? 2 : 1
    if (b + g <= c)
      switch (g) {
        case 1:
          128 > e && (f = e)
          break
        case 2:
          var l = a[b + 1]
          128 === (l & 192) &&
            ((e = ((e & 31) << 6) | (l & 63)), 127 < e && (f = e))
          break
        case 3:
          l = a[b + 1]
          var m = a[b + 2]
          128 === (l & 192) &&
            128 === (m & 192) &&
            ((e = ((e & 15) << 12) | ((l & 63) << 6) | (m & 63)),
            2047 < e && (55296 > e || 57343 < e) && (f = e))
          break
        case 4:
          l = a[b + 1]
          m = a[b + 2]
          var n = a[b + 3]
          128 === (l & 192) &&
            128 === (m & 192) &&
            128 === (n & 192) &&
            ((e =
              ((e & 15) << 18) | ((l & 63) << 12) | ((m & 63) << 6) | (n & 63)),
            65535 < e && 1114112 > e && (f = e))
      }
    null === f
      ? ((f = 65533), (g = 1))
      : 65535 < f &&
        ((f -= 65536),
        d.push(((f >>> 10) & 1023) | 55296),
        (f = 56320 | (f & 1023)))
    d.push(f)
    b += g
  }
  a = d.length
  if (a <= Ka) d = String.fromCharCode.apply(String, d)
  else {
    c = ''
    for (b = 0; b < a; )
      c += String.fromCharCode.apply(String, d.slice(b, (b += Ka)))
    d = c
  }
  return d
}
var Ka = 4096
E.prototype.slice = function (a, b) {
  var c = this.length
  a = ~~a
  b = void 0 === b ? c : ~~b
  0 > a ? ((a += c), 0 > a && (a = 0)) : a > c && (a = c)
  0 > b ? ((b += c), 0 > b && (b = 0)) : b > c && (b = c)
  b < a && (b = a)
  if (E.TYPED_ARRAY_SUPPORT)
    (b = this.subarray(a, b)), (b.__proto__ = E.prototype)
  else {
    c = b - a
    b = new E(c, void 0)
    for (var d = 0; d < c; ++d) b[d] = this[d + a]
  }
  return b
}
function K(a, b, c) {
  if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint')
  if (a + b > c) throw new RangeError('Trying to access beyond buffer length')
}
E.prototype.readUIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || K(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  return c
}
E.prototype.readUIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || K(a, b, this.length)
  c = this[a + --b]
  for (var d = 1; 0 < b && (d *= 256); ) c += this[a + --b] * d
  return c
}
E.prototype.readUInt8 = function (a, b) {
  b || K(a, 1, this.length)
  return this[a]
}
E.prototype.readUInt16LE = function (a, b) {
  b || K(a, 2, this.length)
  return this[a] | (this[a + 1] << 8)
}
E.prototype.readUInt16BE = function (a, b) {
  b || K(a, 2, this.length)
  return (this[a] << 8) | this[a + 1]
}
E.prototype.readUInt32LE = function (a, b) {
  b || K(a, 4, this.length)
  return (
    (this[a] | (this[a + 1] << 8) | (this[a + 2] << 16)) +
    16777216 * this[a + 3]
  )
}
E.prototype.readUInt32BE = function (a, b) {
  b || K(a, 4, this.length)
  return (
    16777216 * this[a] +
    ((this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3])
  )
}
E.prototype.readIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || K(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  c >= 128 * d && (c -= Math.pow(2, 8 * b))
  return c
}
E.prototype.readIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || K(a, b, this.length)
  c = b
  for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256); )
    e += this[a + --c] * d
  e >= 128 * d && (e -= Math.pow(2, 8 * b))
  return e
}
E.prototype.readInt8 = function (a, b) {
  b || K(a, 1, this.length)
  return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
}
E.prototype.readInt16LE = function (a, b) {
  b || K(a, 2, this.length)
  a = this[a] | (this[a + 1] << 8)
  return a & 32768 ? a | 4294901760 : a
}
E.prototype.readInt16BE = function (a, b) {
  b || K(a, 2, this.length)
  a = this[a + 1] | (this[a] << 8)
  return a & 32768 ? a | 4294901760 : a
}
E.prototype.readInt32LE = function (a, b) {
  b || K(a, 4, this.length)
  return (
    this[a] | (this[a + 1] << 8) | (this[a + 2] << 16) | (this[a + 3] << 24)
  )
}
E.prototype.readInt32BE = function (a, b) {
  b || K(a, 4, this.length)
  return (
    (this[a] << 24) | (this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3]
  )
}
E.prototype.readFloatLE = function (a, b) {
  b || K(a, 4, this.length)
  return C(this, a, !0, 23, 4)
}
E.prototype.readFloatBE = function (a, b) {
  b || K(a, 4, this.length)
  return C(this, a, !1, 23, 4)
}
E.prototype.readDoubleLE = function (a, b) {
  b || K(a, 8, this.length)
  return C(this, a, !0, 52, 8)
}
E.prototype.readDoubleBE = function (a, b) {
  b || K(a, 8, this.length)
  return C(this, a, !1, 52, 8)
}
function L(a, b, c, d, e, f) {
  if (!G(a)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (b > e || b < f) throw new RangeError('"value" argument is out of bounds')
  if (c + d > a.length) throw new RangeError('Index out of range')
}
E.prototype.writeUIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || L(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = 1
  var e = 0
  for (this[b] = a & 255; ++e < c && (d *= 256); ) this[b + e] = (a / d) & 255
  return b + c
}
E.prototype.writeUIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || L(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = c - 1
  var e = 1
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    this[b + d] = (a / e) & 255
  return b + c
}
E.prototype.writeUInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 1, 255, 0)
  E.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  this[b] = a & 255
  return b + 1
}
function M(a, b, c, d) {
  0 > b && (b = 65535 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
    a[c + e] = (b & (255 << (8 * (d ? e : 1 - e)))) >>> (8 * (d ? e : 1 - e))
}
E.prototype.writeUInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 2, 65535, 0)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : M(this, a, b, !0)
  return b + 2
}
E.prototype.writeUInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 2, 65535, 0)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : M(this, a, b, !1)
  return b + 2
}
function N(a, b, c, d) {
  0 > b && (b = 4294967295 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
    a[c + e] = (b >>> (8 * (d ? e : 3 - e))) & 255
}
E.prototype.writeUInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 4, 4294967295, 0)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b + 3] = a >>> 24),
      (this[b + 2] = a >>> 16),
      (this[b + 1] = a >>> 8),
      (this[b] = a & 255))
    : N(this, a, b, !0)
  return b + 4
}
E.prototype.writeUInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 4, 4294967295, 0)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : N(this, a, b, !1)
  return b + 4
}
E.prototype.writeIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), L(this, a, b, c, d - 1, -d))
  d = 0
  var e = 1,
    f = 0
  for (this[b] = a & 255; ++d < c && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
E.prototype.writeIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), L(this, a, b, c, d - 1, -d))
  d = c - 1
  var e = 1,
    f = 0
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
E.prototype.writeInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 1, 127, -128)
  E.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  0 > a && (a = 255 + a + 1)
  this[b] = a & 255
  return b + 1
}
E.prototype.writeInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 2, 32767, -32768)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : M(this, a, b, !0)
  return b + 2
}
E.prototype.writeInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 2, 32767, -32768)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : M(this, a, b, !1)
  return b + 2
}
E.prototype.writeInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 4, 2147483647, -2147483648)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255),
      (this[b + 1] = a >>> 8),
      (this[b + 2] = a >>> 16),
      (this[b + 3] = a >>> 24))
    : N(this, a, b, !0)
  return b + 4
}
E.prototype.writeInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || L(this, a, b, 4, 2147483647, -2147483648)
  0 > a && (a = 4294967295 + a + 1)
  E.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : N(this, a, b, !1)
  return b + 4
}
function La(a, b, c, d) {
  if (c + d > a.length) throw new RangeError('Index out of range')
  if (0 > c) throw new RangeError('Index out of range')
}
E.prototype.writeFloatLE = function (a, b, c) {
  c || La(this, a, b, 4)
  D(this, a, b, !0, 23, 4)
  return b + 4
}
E.prototype.writeFloatBE = function (a, b, c) {
  c || La(this, a, b, 4)
  D(this, a, b, !1, 23, 4)
  return b + 4
}
E.prototype.writeDoubleLE = function (a, b, c) {
  c || La(this, a, b, 8)
  D(this, a, b, !0, 52, 8)
  return b + 8
}
E.prototype.writeDoubleBE = function (a, b, c) {
  c || La(this, a, b, 8)
  D(this, a, b, !1, 52, 8)
  return b + 8
}
E.prototype.copy = function (a, b, c, d) {
  c || (c = 0)
  d || 0 === d || (d = this.length)
  b >= a.length && (b = a.length)
  b || (b = 0)
  0 < d && d < c && (d = c)
  if (d === c || 0 === a.length || 0 === this.length) return 0
  if (0 > b) throw new RangeError('targetStart out of bounds')
  if (0 > c || c >= this.length)
    throw new RangeError('sourceStart out of bounds')
  if (0 > d) throw new RangeError('sourceEnd out of bounds')
  d > this.length && (d = this.length)
  a.length - b < d - c && (d = a.length - b + c)
  var e = d - c
  if (this === a && c < b && b < d)
    for (d = e - 1; 0 <= d; --d) a[d + b] = this[d + c]
  else if (1e3 > e || !E.TYPED_ARRAY_SUPPORT)
    for (d = 0; d < e; ++d) a[d + b] = this[d + c]
  else Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b)
  return e
}
E.prototype.fill = function (a, b, c, d) {
  if ('string' === typeof a) {
    'string' === typeof b
      ? ((d = b), (b = 0), (c = this.length))
      : 'string' === typeof c && ((d = c), (c = this.length))
    if (1 === a.length) {
      var e = a.charCodeAt(0)
      256 > e && (a = e)
    }
    if (void 0 !== d && 'string' !== typeof d)
      throw new TypeError('encoding must be a string')
    if ('string' === typeof d && !E.isEncoding(d))
      throw new TypeError('Unknown encoding: ' + d)
  } else 'number' === typeof a && (a &= 255)
  if (0 > b || this.length < b || this.length < c)
    throw new RangeError('Out of range index')
  if (c <= b) return this
  b >>>= 0
  c = void 0 === c ? this.length : c >>> 0
  a || (a = 0)
  if ('number' === typeof a) for (d = b; d < c; ++d) this[d] = a
  else
    for (
      a = G(a) ? a : H(new E(a, d).toString()), e = a.length, d = 0;
      d < c - b;
      ++d
    )
      this[d + b] = a[d % e]
  return this
}
var Ma = /[^+\/0-9A-Za-z-_]/g
function H(a, b) {
  b = b || Infinity
  for (var c, d = a.length, e = null, f = [], g = 0; g < d; ++g) {
    c = a.charCodeAt(g)
    if (55295 < c && 57344 > c) {
      if (!e) {
        if (56319 < c) {
          ;-1 < (b -= 3) && f.push(239, 191, 189)
          continue
        } else if (g + 1 === d) {
          ;-1 < (b -= 3) && f.push(239, 191, 189)
          continue
        }
        e = c
        continue
      }
      if (56320 > c) {
        ;-1 < (b -= 3) && f.push(239, 191, 189)
        e = c
        continue
      }
      c = (((e - 55296) << 10) | (c - 56320)) + 65536
    } else e && -1 < (b -= 3) && f.push(239, 191, 189)
    e = null
    if (128 > c) {
      if (0 > --b) break
      f.push(c)
    } else if (2048 > c) {
      if (0 > (b -= 2)) break
      f.push((c >> 6) | 192, (c & 63) | 128)
    } else if (65536 > c) {
      if (0 > (b -= 3)) break
      f.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128)
    } else if (1114112 > c) {
      if (0 > (b -= 4)) break
      f.push(
        (c >> 18) | 240,
        ((c >> 12) & 63) | 128,
        ((c >> 6) & 63) | 128,
        (c & 63) | 128
      )
    } else throw Error('Invalid code point')
  }
  return f
}
function Ja(a) {
  for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255)
  return b
}
function Ea(a) {
  a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(Ma, '')
  if (2 > a.length) a = ''
  else for (; 0 !== a.length % 4; ) a += '='
  pa || qa()
  var b = a.length
  if (0 < b % 4) throw Error('Invalid string. Length must be a multiple of 4')
  var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0
  var d = new oa((3 * b) / 4 - c)
  var e = 0 < c ? b - 4 : b
  var f = 0
  for (b = 0; b < e; b += 4) {
    var g =
      (B[a.charCodeAt(b)] << 18) |
      (B[a.charCodeAt(b + 1)] << 12) |
      (B[a.charCodeAt(b + 2)] << 6) |
      B[a.charCodeAt(b + 3)]
    d[f++] = (g >> 16) & 255
    d[f++] = (g >> 8) & 255
    d[f++] = g & 255
  }
  2 === c
    ? ((g = (B[a.charCodeAt(b)] << 2) | (B[a.charCodeAt(b + 1)] >> 4)),
      (d[f++] = g & 255))
    : 1 === c &&
      ((g =
        (B[a.charCodeAt(b)] << 10) |
        (B[a.charCodeAt(b + 1)] << 4) |
        (B[a.charCodeAt(b + 2)] >> 2)),
      (d[f++] = (g >> 8) & 255),
      (d[f++] = g & 255))
  return d
}
function J(a, b, c, d) {
  for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
    b[e + c] = a[e]
  return e
}
function Da(a) {
  return (
    null != a &&
    (!!a._isBuffer ||
      Na(a) ||
      ('function' === typeof a.readFloatLE &&
        'function' === typeof a.slice &&
        Na(a.slice(0, 0))))
  )
}
function Na(a) {
  return (
    !!a.constructor &&
    'function' === typeof a.constructor.isBuffer &&
    a.constructor.isBuffer(a)
  )
}
var Oa = Object.freeze({
    __proto__: null,
    INSPECT_MAX_BYTES: 50,
    kMaxLength: va,
    Buffer: E,
    SlowBuffer: function (a) {
      ;+a != a && (a = 0)
      return E.alloc(+a)
    },
    isBuffer: Da,
  }),
  Pa = aa(function (a, b) {
    function c(a, b) {
      for (var c in a) b[c] = a[c]
    }
    function d(a, b, c) {
      return e(a, b, c)
    }
    var e = Oa.Buffer
    e.from && e.alloc && e.allocUnsafe && e.allocUnsafeSlow
      ? (a.exports = Oa)
      : (c(Oa, b), (b.Buffer = d))
    d.prototype = Object.create(e.prototype)
    c(e, d)
    d.from = function (a, b, c) {
      if ('number' === typeof a)
        throw new TypeError('Argument must not be a number')
      return e(a, b, c)
    }
    d.alloc = function (a, b, c) {
      if ('number' !== typeof a)
        throw new TypeError('Argument must be a number')
      a = e(a)
      void 0 !== b
        ? 'string' === typeof c
          ? a.fill(b, c)
          : a.fill(b)
        : a.fill(0)
      return a
    }
    d.allocUnsafe = function (a) {
      if ('number' !== typeof a)
        throw new TypeError('Argument must be a number')
      return e(a)
    }
    d.allocUnsafeSlow = function (a) {
      if ('number' !== typeof a)
        throw new TypeError('Argument must be a number')
      return Oa.SlowBuffer(a)
    }
  })
Pa.Buffer
var Qa = aa(function (a, b) {
  function c() {
    throw Error(
      'secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11'
    )
  }
  function d(a, b) {
    if ('number' !== typeof a || a !== a)
      throw new TypeError('offset must be a number')
    if (a > u || 0 > a) throw new TypeError('offset must be a uint32')
    if (a > n || a > b) throw new RangeError('offset out of range')
  }
  function e(a, b, c) {
    if ('number' !== typeof a || a !== a)
      throw new TypeError('size must be a number')
    if (a > u || 0 > a) throw new TypeError('size must be a uint32')
    if (a + b > c || a > n) throw new RangeError('buffer too small')
  }
  function f(a, b, c, f) {
    if (!(m.isBuffer(a) || a instanceof h.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
    if ('function' === typeof b) (f = b), (b = 0), (c = a.length)
    else if ('function' === typeof c) (f = c), (c = a.length - b)
    else if ('function' !== typeof f)
      throw new TypeError('"cb" argument must be a function')
    d(b, a.length)
    e(c, b, a.length)
    return g(a, b, c, f)
  }
  function g(a, b, c, d) {
    b = new Uint8Array(a.buffer, b, c)
    q.getRandomValues(b)
    if (d)
      ia(function () {
        d(null, a)
      })
    else return a
  }
  function l(a, b, c) {
    'undefined' === typeof b && (b = 0)
    if (!(m.isBuffer(a) || a instanceof h.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
    d(b, a.length)
    void 0 === c && (c = a.length - b)
    e(c, b, a.length)
    return g(a, b, c)
  }
  var m = Pa.Buffer,
    n = Pa.kMaxLength,
    q = h.crypto || h.msCrypto,
    u = Math.pow(2, 32) - 1
  q && q.getRandomValues
    ? ((b.randomFill = f), (b.randomFillSync = l))
    : ((b.randomFill = c), (b.randomFillSync = c))
})
Qa.randomFill
Qa.randomFillSync
var Ra = aa(function (a) {
  a.exports = Qa
})
Ra.randomFill
var Sa = Ra.randomFillSync,
  Ta = Math.floor(0.001 * (Date.now() - performance.now()))
function O(a) {
  if ('string' !== typeof a)
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(a))
}
function Ua(a, b) {
  for (var c = '', d = 0, e = -1, f = 0, g, l = 0; l <= a.length; ++l) {
    if (l < a.length) g = a.charCodeAt(l)
    else if (47 === g) break
    else g = 47
    if (47 === g) {
      if (e !== l - 1 && 1 !== f)
        if (e !== l - 1 && 2 === f) {
          if (
            2 > c.length ||
            2 !== d ||
            46 !== c.charCodeAt(c.length - 1) ||
            46 !== c.charCodeAt(c.length - 2)
          )
            if (2 < c.length) {
              if (((e = c.lastIndexOf('/')), e !== c.length - 1)) {
                ;-1 === e
                  ? ((c = ''), (d = 0))
                  : ((c = c.slice(0, e)),
                    (d = c.length - 1 - c.lastIndexOf('/')))
                e = l
                f = 0
                continue
              }
            } else if (2 === c.length || 1 === c.length) {
              c = ''
              d = 0
              e = l
              f = 0
              continue
            }
          b && ((c = 0 < c.length ? c + '/..' : '..'), (d = 2))
        } else
          (c =
            0 < c.length ? c + ('/' + a.slice(e + 1, l)) : a.slice(e + 1, l)),
            (d = l - e - 1)
      e = l
      f = 0
    } else 46 === g && -1 !== f ? ++f : (f = -1)
  }
  return c
}
var P = {
    resolve: function () {
      for (
        var a = '', b = !1, c, d = arguments.length - 1;
        -1 <= d && !b;
        d--
      ) {
        if (0 <= d) var e = arguments[d]
        else void 0 === c && (c = na.cwd()), (e = c)
        O(e)
        0 !== e.length && ((a = e + '/' + a), (b = 47 === e.charCodeAt(0)))
      }
      a = Ua(a, !b)
      return b ? (0 < a.length ? '/' + a : '/') : 0 < a.length ? a : '.'
    },
    normalize: function (a) {
      O(a)
      if (0 === a.length) return '.'
      var b = 47 === a.charCodeAt(0),
        c = 47 === a.charCodeAt(a.length - 1)
      a = Ua(a, !b)
      0 !== a.length || b || (a = '.')
      0 < a.length && c && (a += '/')
      return b ? '/' + a : a
    },
    isAbsolute: function (a) {
      O(a)
      return 0 < a.length && 47 === a.charCodeAt(0)
    },
    join: function () {
      if (0 === arguments.length) return '.'
      for (var a, b = 0; b < arguments.length; ++b) {
        var c = arguments[b]
        O(c)
        0 < c.length && (a = void 0 === a ? c : a + ('/' + c))
      }
      return void 0 === a ? '.' : P.normalize(a)
    },
    relative: function (a, b) {
      O(a)
      O(b)
      if (a === b) return ''
      a = P.resolve(a)
      b = P.resolve(b)
      if (a === b) return ''
      for (var c = 1; c < a.length && 47 === a.charCodeAt(c); ++c);
      for (
        var d = a.length, e = d - c, f = 1;
        f < b.length && 47 === b.charCodeAt(f);
        ++f
      );
      for (
        var g = b.length - f, l = e < g ? e : g, m = -1, n = 0;
        n <= l;
        ++n
      ) {
        if (n === l) {
          if (g > l) {
            if (47 === b.charCodeAt(f + n)) return b.slice(f + n + 1)
            if (0 === n) return b.slice(f + n)
          } else
            e > l && (47 === a.charCodeAt(c + n) ? (m = n) : 0 === n && (m = 0))
          break
        }
        var q = a.charCodeAt(c + n),
          u = b.charCodeAt(f + n)
        if (q !== u) break
        else 47 === q && (m = n)
      }
      e = ''
      for (n = c + m + 1; n <= d; ++n)
        if (n === d || 47 === a.charCodeAt(n))
          e = 0 === e.length ? e + '..' : e + '/..'
      if (0 < e.length) return e + b.slice(f + m)
      f += m
      47 === b.charCodeAt(f) && ++f
      return b.slice(f)
    },
    _makeLong: function (a) {
      return a
    },
    dirname: function (a) {
      O(a)
      if (0 === a.length) return '.'
      for (
        var b = a.charCodeAt(0), c = 47 === b, d = -1, e = !0, f = a.length - 1;
        1 <= f;
        --f
      )
        if (((b = a.charCodeAt(f)), 47 === b)) {
          if (!e) {
            d = f
            break
          }
        } else e = !1
      return -1 === d ? (c ? '/' : '.') : c && 1 === d ? '//' : a.slice(0, d)
    },
    basename: function (a, b) {
      if (void 0 !== b && 'string' !== typeof b)
        throw new TypeError('"ext" argument must be a string')
      O(a)
      var c = 0,
        d = -1,
        e = !0,
        f
      if (void 0 !== b && 0 < b.length && b.length <= a.length) {
        if (b.length === a.length && b === a) return ''
        var g = b.length - 1,
          l = -1
        for (f = a.length - 1; 0 <= f; --f) {
          var m = a.charCodeAt(f)
          if (47 === m) {
            if (!e) {
              c = f + 1
              break
            }
          } else
            -1 === l && ((e = !1), (l = f + 1)),
              0 <= g &&
                (m === b.charCodeAt(g)
                  ? -1 === --g && (d = f)
                  : ((g = -1), (d = l)))
        }
        c === d ? (d = l) : -1 === d && (d = a.length)
        return a.slice(c, d)
      }
      for (f = a.length - 1; 0 <= f; --f)
        if (47 === a.charCodeAt(f)) {
          if (!e) {
            c = f + 1
            break
          }
        } else -1 === d && ((e = !1), (d = f + 1))
      return -1 === d ? '' : a.slice(c, d)
    },
    extname: function (a) {
      O(a)
      for (
        var b = -1, c = 0, d = -1, e = !0, f = 0, g = a.length - 1;
        0 <= g;
        --g
      ) {
        var l = a.charCodeAt(g)
        if (47 === l) {
          if (!e) {
            c = g + 1
            break
          }
        } else
          -1 === d && ((e = !1), (d = g + 1)),
            46 === l
              ? -1 === b
                ? (b = g)
                : 1 !== f && (f = 1)
              : -1 !== b && (f = -1)
      }
      return -1 === b ||
        -1 === d ||
        0 === f ||
        (1 === f && b === d - 1 && b === c + 1)
        ? ''
        : a.slice(b, d)
    },
    format: function (a) {
      if (null === a || 'object' !== typeof a)
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' +
            typeof a
        )
      var b = a.dir || a.root,
        c = a.base || (a.name || '') + (a.ext || '')
      a = b ? (b === a.root ? b + c : b + '/' + c) : c
      return a
    },
    parse: function (a) {
      O(a)
      var b = { root: '', dir: '', base: '', ext: '', name: '' }
      if (0 === a.length) return b
      var c = a.charCodeAt(0),
        d = 47 === c
      if (d) {
        b.root = '/'
        var e = 1
      } else e = 0
      for (
        var f = -1, g = 0, l = -1, m = !0, n = a.length - 1, q = 0;
        n >= e;
        --n
      )
        if (((c = a.charCodeAt(n)), 47 === c)) {
          if (!m) {
            g = n + 1
            break
          }
        } else
          -1 === l && ((m = !1), (l = n + 1)),
            46 === c
              ? -1 === f
                ? (f = n)
                : 1 !== q && (q = 1)
              : -1 !== f && (q = -1)
      ;-1 === f ||
      -1 === l ||
      0 === q ||
      (1 === q && f === l - 1 && f === g + 1)
        ? -1 !== l &&
          (b.base =
            0 === g && d ? (b.name = a.slice(1, l)) : (b.name = a.slice(g, l)))
        : (0 === g && d
            ? ((b.name = a.slice(1, f)), (b.base = a.slice(1, l)))
            : ((b.name = a.slice(g, f)), (b.base = a.slice(g, l))),
          (b.ext = a.slice(f, l)))
      0 < g ? (b.dir = a.slice(0, g - 1)) : d && (b.dir = '/')
      return b
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null,
  },
  Va = (P.posix = P),
  Wa = Object.freeze({ __proto__: null, default: Va, __moduleExports: Va })
function Xa(a, b) {
  Xa =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (a, b) {
        a.__proto__ = b
      }) ||
    function (a, b) {
      for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }
  return Xa(a, b)
}
function Ya(a, b) {
  function c() {
    this.constructor = a
  }
  Xa(a, b)
  a.prototype =
    null === b ? Object.create(b) : ((c.prototype = b.prototype), new c())
}
var Za =
    'undefined' !== typeof globalThis
      ? globalThis
      : 'undefined' !== typeof global
      ? global
      : {},
  Q = 'undefined' !== typeof BigInt ? BigInt : Za.BigInt || Number,
  $a = DataView
$a.prototype.setBigUint64 ||
  (($a.prototype.setBigUint64 = function (a, b, c) {
    if (b < Math.pow(2, 32)) {
      b = Number(b)
      var d = 0
    } else {
      d = b.toString(2)
      b = ''
      for (var e = 0; e < 64 - d.length; e++) b += '0'
      b += d
      d = parseInt(b.substring(0, 32), 2)
      b = parseInt(b.substring(32), 2)
    }
    this.setUint32(a + (c ? 0 : 4), b, c)
    this.setUint32(a + (c ? 4 : 0), d, c)
  }),
  ($a.prototype.getBigUint64 = function (a, b) {
    var c = this.getUint32(a + (b ? 0 : 4), b)
    a = this.getUint32(a + (b ? 4 : 0), b)
    c = c.toString(2)
    a = a.toString(2)
    b = ''
    for (var d = 0; d < 32 - c.length; d++) b += '0'
    return Q('0b' + a + (b + c))
  }))
var R = [],
  S = [],
  ab = 'undefined' !== typeof Uint8Array ? Uint8Array : Array,
  bb = !1
function cb() {
  bb = !0
  for (var a = 0; 64 > a; ++a)
    (R[a] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[
      a
    ]),
      (S[
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charCodeAt(
          a
        )
      ] = a)
  S[45] = 62
  S[95] = 63
}
function db(a, b, c) {
  for (var d = [], e = b; e < c; e += 3)
    (b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2]),
      d.push(
        R[(b >> 18) & 63] + R[(b >> 12) & 63] + R[(b >> 6) & 63] + R[b & 63]
      )
  return d.join('')
}
function eb(a) {
  bb || cb()
  for (
    var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c;
    f < g;
    f += 16383
  )
    e.push(db(a, f, f + 16383 > g ? g : f + 16383))
  1 === c
    ? ((a = a[b - 1]), (d += R[a >> 2]), (d += R[(a << 4) & 63]), (d += '=='))
    : 2 === c &&
      ((a = (a[b - 2] << 8) + a[b - 1]),
      (d += R[a >> 10]),
      (d += R[(a >> 4) & 63]),
      (d += R[(a << 2) & 63]),
      (d += '='))
  e.push(d)
  return e.join('')
}
function fb(a, b, c, d, e) {
  var f = 8 * e - d - 1
  var g = (1 << f) - 1,
    l = g >> 1,
    m = -7
  e = c ? e - 1 : 0
  var n = c ? -1 : 1,
    q = a[b + e]
  e += n
  c = q & ((1 << -m) - 1)
  q >>= -m
  for (m += f; 0 < m; c = 256 * c + a[b + e], e += n, m -= 8);
  f = c & ((1 << -m) - 1)
  c >>= -m
  for (m += d; 0 < m; f = 256 * f + a[b + e], e += n, m -= 8);
  if (0 === c) c = 1 - l
  else {
    if (c === g) return f ? NaN : Infinity * (q ? -1 : 1)
    f += Math.pow(2, d)
    c -= l
  }
  return (q ? -1 : 1) * f * Math.pow(2, c - d)
}
function gb(a, b, c, d, e, f) {
  var g,
    l = 8 * f - e - 1,
    m = (1 << l) - 1,
    n = m >> 1,
    q = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0
  f = d ? 0 : f - 1
  var u = d ? 1 : -1,
    la = 0 > b || (0 === b && 0 > 1 / b) ? 1 : 0
  b = Math.abs(b)
  isNaN(b) || Infinity === b
    ? ((b = isNaN(b) ? 1 : 0), (d = m))
    : ((d = Math.floor(Math.log(b) / Math.LN2)),
      1 > b * (g = Math.pow(2, -d)) && (d--, (g *= 2)),
      (b = 1 <= d + n ? b + q / g : b + q * Math.pow(2, 1 - n)),
      2 <= b * g && (d++, (g /= 2)),
      d + n >= m
        ? ((b = 0), (d = m))
        : 1 <= d + n
        ? ((b = (b * g - 1) * Math.pow(2, e)), (d += n))
        : ((b = b * Math.pow(2, n - 1) * Math.pow(2, e)), (d = 0)))
  for (; 8 <= e; a[c + f] = b & 255, f += u, b /= 256, e -= 8);
  d = (d << e) | b
  for (l += e; 0 < l; a[c + f] = d & 255, f += u, d /= 256, l -= 8);
  a[c + f - u] |= 128 * la
}
var hb = {}.toString,
  ib =
    Array.isArray ||
    function (a) {
      return '[object Array]' == hb.call(a)
    }
T.TYPED_ARRAY_SUPPORT =
  void 0 !== k.TYPED_ARRAY_SUPPORT ? k.TYPED_ARRAY_SUPPORT : !0
function U(a, b) {
  if ((T.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
    throw new RangeError('Invalid typed array length')
  T.TYPED_ARRAY_SUPPORT
    ? ((a = new Uint8Array(b)), (a.__proto__ = T.prototype))
    : (null === a && (a = new T(b)), (a.length = b))
  return a
}
function T(a, b, c) {
  if (!(T.TYPED_ARRAY_SUPPORT || this instanceof T)) return new T(a, b, c)
  if ('number' === typeof a) {
    if ('string' === typeof b)
      throw Error(
        'If encoding is specified then the first argument must be a string'
      )
    return jb(this, a)
  }
  return kb(this, a, b, c)
}
T.poolSize = 8192
T._augment = function (a) {
  a.__proto__ = T.prototype
  return a
}
function kb(a, b, c, d) {
  if ('number' === typeof b)
    throw new TypeError('"value" argument must not be a number')
  if ('undefined' !== typeof ArrayBuffer && b instanceof ArrayBuffer) {
    b.byteLength
    if (0 > c || b.byteLength < c)
      throw new RangeError("'offset' is out of bounds")
    if (b.byteLength < c + (d || 0))
      throw new RangeError("'length' is out of bounds")
    b =
      void 0 === c && void 0 === d
        ? new Uint8Array(b)
        : void 0 === d
        ? new Uint8Array(b, c)
        : new Uint8Array(b, c, d)
    T.TYPED_ARRAY_SUPPORT
      ? ((a = b), (a.__proto__ = T.prototype))
      : (a = lb(a, b))
    return a
  }
  if ('string' === typeof b) {
    d = a
    a = c
    if ('string' !== typeof a || '' === a) a = 'utf8'
    if (!T.isEncoding(a))
      throw new TypeError('"encoding" must be a valid string encoding')
    c = mb(b, a) | 0
    d = U(d, c)
    b = d.write(b, a)
    b !== c && (d = d.slice(0, b))
    return d
  }
  return nb(a, b)
}
T.from = function (a, b, c) {
  return kb(null, a, b, c)
}
T.TYPED_ARRAY_SUPPORT &&
  ((T.prototype.__proto__ = Uint8Array.prototype), (T.__proto__ = Uint8Array))
function ob(a) {
  if ('number' !== typeof a)
    throw new TypeError('"size" argument must be a number')
  if (0 > a) throw new RangeError('"size" argument must not be negative')
}
T.alloc = function (a, b, c) {
  ob(a)
  a =
    0 >= a
      ? U(null, a)
      : void 0 !== b
      ? 'string' === typeof c
        ? U(null, a).fill(b, c)
        : U(null, a).fill(b)
      : U(null, a)
  return a
}
function jb(a, b) {
  ob(b)
  a = U(a, 0 > b ? 0 : pb(b) | 0)
  if (!T.TYPED_ARRAY_SUPPORT) for (var c = 0; c < b; ++c) a[c] = 0
  return a
}
T.allocUnsafe = function (a) {
  return jb(null, a)
}
T.allocUnsafeSlow = function (a) {
  return jb(null, a)
}
function lb(a, b) {
  var c = 0 > b.length ? 0 : pb(b.length) | 0
  a = U(a, c)
  for (var d = 0; d < c; d += 1) a[d] = b[d] & 255
  return a
}
function nb(a, b) {
  if (V(b)) {
    var c = pb(b.length) | 0
    a = U(a, c)
    if (0 === a.length) return a
    b.copy(a, 0, 0, c)
    return a
  }
  if (b) {
    if (
      ('undefined' !== typeof ArrayBuffer && b.buffer instanceof ArrayBuffer) ||
      'length' in b
    )
      return (
        (c = 'number' !== typeof b.length) || ((c = b.length), (c = c !== c)),
        c ? U(a, 0) : lb(a, b)
      )
    if ('Buffer' === b.type && ib(b.data)) return lb(a, b.data)
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
  )
}
function pb(a) {
  if (a >= (T.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        (T.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
        ' bytes'
    )
  return a | 0
}
T.isBuffer = qb
function V(a) {
  return !(null == a || !a._isBuffer)
}
T.compare = function (a, b) {
  if (!V(a) || !V(b)) throw new TypeError('Arguments must be Buffers')
  if (a === b) return 0
  for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
    if (a[e] !== b[e]) {
      c = a[e]
      d = b[e]
      break
    }
  return c < d ? -1 : d < c ? 1 : 0
}
T.isEncoding = function (a) {
  switch (String(a).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return !0
    default:
      return !1
  }
}
T.concat = function (a, b) {
  if (!ib(a)) throw new TypeError('"list" argument must be an Array of Buffers')
  if (0 === a.length) return T.alloc(0)
  var c
  if (void 0 === b) for (c = b = 0; c < a.length; ++c) b += a[c].length
  b = T.allocUnsafe(b)
  var d = 0
  for (c = 0; c < a.length; ++c) {
    var e = a[c]
    if (!V(e))
      throw new TypeError('"list" argument must be an Array of Buffers')
    e.copy(b, d)
    d += e.length
  }
  return b
}
function mb(a, b) {
  if (V(a)) return a.length
  if (
    'undefined' !== typeof ArrayBuffer &&
    'function' === typeof ArrayBuffer.isView &&
    (ArrayBuffer.isView(a) || a instanceof ArrayBuffer)
  )
    return a.byteLength
  'string' !== typeof a && (a = '' + a)
  var c = a.length
  if (0 === c) return 0
  for (var d = !1; ; )
    switch (b) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return c
      case 'utf8':
      case 'utf-8':
      case void 0:
        return rb(a).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 2 * c
      case 'hex':
        return c >>> 1
      case 'base64':
        return sb(a).length
      default:
        if (d) return rb(a).length
        b = ('' + b).toLowerCase()
        d = !0
    }
}
T.byteLength = mb
function tb(a, b, c) {
  var d = !1
  if (void 0 === b || 0 > b) b = 0
  if (b > this.length) return ''
  if (void 0 === c || c > this.length) c = this.length
  if (0 >= c) return ''
  c >>>= 0
  b >>>= 0
  if (c <= b) return ''
  for (a || (a = 'utf8'); ; )
    switch (a) {
      case 'hex':
        a = b
        b = c
        c = this.length
        if (!a || 0 > a) a = 0
        if (!b || 0 > b || b > c) b = c
        d = ''
        for (c = a; c < b; ++c)
          (a = d),
            (d = this[c]),
            (d = 16 > d ? '0' + d.toString(16) : d.toString(16)),
            (d = a + d)
        return d
      case 'utf8':
      case 'utf-8':
        return ub(this, b, c)
      case 'ascii':
        a = ''
        for (c = Math.min(this.length, c); b < c; ++b)
          a += String.fromCharCode(this[b] & 127)
        return a
      case 'latin1':
      case 'binary':
        a = ''
        for (c = Math.min(this.length, c); b < c; ++b)
          a += String.fromCharCode(this[b])
        return a
      case 'base64':
        return (
          (b = 0 === b && c === this.length ? eb(this) : eb(this.slice(b, c))),
          b
        )
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        b = this.slice(b, c)
        c = ''
        for (a = 0; a < b.length; a += 2)
          c += String.fromCharCode(b[a] + 256 * b[a + 1])
        return c
      default:
        if (d) throw new TypeError('Unknown encoding: ' + a)
        a = (a + '').toLowerCase()
        d = !0
    }
}
T.prototype._isBuffer = !0
function W(a, b, c) {
  var d = a[b]
  a[b] = a[c]
  a[c] = d
}
T.prototype.swap16 = function () {
  var a = this.length
  if (0 !== a % 2)
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  for (var b = 0; b < a; b += 2) W(this, b, b + 1)
  return this
}
T.prototype.swap32 = function () {
  var a = this.length
  if (0 !== a % 4)
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  for (var b = 0; b < a; b += 4) W(this, b, b + 3), W(this, b + 1, b + 2)
  return this
}
T.prototype.swap64 = function () {
  var a = this.length
  if (0 !== a % 8)
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  for (var b = 0; b < a; b += 8)
    W(this, b, b + 7),
      W(this, b + 1, b + 6),
      W(this, b + 2, b + 5),
      W(this, b + 3, b + 4)
  return this
}
T.prototype.toString = function () {
  var a = this.length | 0
  return 0 === a
    ? ''
    : 0 === arguments.length
    ? ub(this, 0, a)
    : tb.apply(this, arguments)
}
T.prototype.equals = function (a) {
  if (!V(a)) throw new TypeError('Argument must be a Buffer')
  return this === a ? !0 : 0 === T.compare(this, a)
}
T.prototype.inspect = function () {
  var a = ''
  0 < this.length &&
    ((a = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
    50 < this.length && (a += ' ... '))
  return '<Buffer ' + a + '>'
}
T.prototype.compare = function (a, b, c, d, e) {
  if (!V(a)) throw new TypeError('Argument must be a Buffer')
  void 0 === b && (b = 0)
  void 0 === c && (c = a ? a.length : 0)
  void 0 === d && (d = 0)
  void 0 === e && (e = this.length)
  if (0 > b || c > a.length || 0 > d || e > this.length)
    throw new RangeError('out of range index')
  if (d >= e && b >= c) return 0
  if (d >= e) return -1
  if (b >= c) return 1
  b >>>= 0
  c >>>= 0
  d >>>= 0
  e >>>= 0
  if (this === a) return 0
  var f = e - d,
    g = c - b,
    l = Math.min(f, g)
  d = this.slice(d, e)
  a = a.slice(b, c)
  for (b = 0; b < l; ++b)
    if (d[b] !== a[b]) {
      f = d[b]
      g = a[b]
      break
    }
  return f < g ? -1 : g < f ? 1 : 0
}
function vb(a, b, c, d, e) {
  if (0 === a.length) return -1
  'string' === typeof c
    ? ((d = c), (c = 0))
    : 2147483647 < c
    ? (c = 2147483647)
    : -2147483648 > c && (c = -2147483648)
  c = +c
  isNaN(c) && (c = e ? 0 : a.length - 1)
  0 > c && (c = a.length + c)
  if (c >= a.length) {
    if (e) return -1
    c = a.length - 1
  } else if (0 > c)
    if (e) c = 0
    else return -1
  'string' === typeof b && (b = T.from(b, d))
  if (V(b)) return 0 === b.length ? -1 : wb(a, b, c, d, e)
  if ('number' === typeof b)
    return (
      (b &= 255),
      T.TYPED_ARRAY_SUPPORT &&
      'function' === typeof Uint8Array.prototype.indexOf
        ? e
          ? Uint8Array.prototype.indexOf.call(a, b, c)
          : Uint8Array.prototype.lastIndexOf.call(a, b, c)
        : wb(a, [b], c, d, e)
    )
  throw new TypeError('val must be string, number or Buffer')
}
function wb(a, b, c, d, e) {
  function f(a, b) {
    return 1 === g ? a[b] : a.readUInt16BE(b * g)
  }
  var g = 1,
    l = a.length,
    m = b.length
  if (
    void 0 !== d &&
    ((d = String(d).toLowerCase()),
    'ucs2' === d || 'ucs-2' === d || 'utf16le' === d || 'utf-16le' === d)
  ) {
    if (2 > a.length || 2 > b.length) return -1
    g = 2
    l /= 2
    m /= 2
    c /= 2
  }
  if (e)
    for (d = -1; c < l; c++)
      if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
        if ((-1 === d && (d = c), c - d + 1 === m)) return d * g
      } else -1 !== d && (c -= c - d), (d = -1)
  else
    for (c + m > l && (c = l - m); 0 <= c; c--) {
      l = !0
      for (d = 0; d < m; d++)
        if (f(a, c + d) !== f(b, d)) {
          l = !1
          break
        }
      if (l) return c
    }
  return -1
}
T.prototype.includes = function (a, b, c) {
  return -1 !== this.indexOf(a, b, c)
}
T.prototype.indexOf = function (a, b, c) {
  return vb(this, a, b, c, !0)
}
T.prototype.lastIndexOf = function (a, b, c) {
  return vb(this, a, b, c, !1)
}
T.prototype.write = function (a, b, c, d) {
  if (void 0 === b) (d = 'utf8'), (c = this.length), (b = 0)
  else if (void 0 === c && 'string' === typeof b)
    (d = b), (c = this.length), (b = 0)
  else if (isFinite(b))
    (b |= 0),
      isFinite(c)
        ? ((c |= 0), void 0 === d && (d = 'utf8'))
        : ((d = c), (c = void 0))
  else
    throw Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  var e = this.length - b
  if (void 0 === c || c > e) c = e
  if ((0 < a.length && (0 > c || 0 > b)) || b > this.length)
    throw new RangeError('Attempt to write outside buffer bounds')
  d || (d = 'utf8')
  for (e = !1; ; )
    switch (d) {
      case 'hex':
        a: {
          b = Number(b) || 0
          d = this.length - b
          c ? ((c = Number(c)), c > d && (c = d)) : (c = d)
          d = a.length
          if (0 !== d % 2) throw new TypeError('Invalid hex string')
          c > d / 2 && (c = d / 2)
          for (d = 0; d < c; ++d) {
            e = parseInt(a.substr(2 * d, 2), 16)
            if (isNaN(e)) {
              a = d
              break a
            }
            this[b + d] = e
          }
          a = d
        }
        return a
      case 'utf8':
      case 'utf-8':
        return X(rb(a, this.length - b), this, b, c)
      case 'ascii':
        return X(xb(a), this, b, c)
      case 'latin1':
      case 'binary':
        return X(xb(a), this, b, c)
      case 'base64':
        return X(sb(a), this, b, c)
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        d = a
        e = this.length - b
        for (var f = [], g = 0; g < d.length && !(0 > (e -= 2)); ++g) {
          var l = d.charCodeAt(g)
          a = l >> 8
          l %= 256
          f.push(l)
          f.push(a)
        }
        return X(f, this, b, c)
      default:
        if (e) throw new TypeError('Unknown encoding: ' + d)
        d = ('' + d).toLowerCase()
        e = !0
    }
}
T.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0),
  }
}
function ub(a, b, c) {
  c = Math.min(a.length, c)
  for (var d = []; b < c; ) {
    var e = a[b],
      f = null,
      g = 239 < e ? 4 : 223 < e ? 3 : 191 < e ? 2 : 1
    if (b + g <= c)
      switch (g) {
        case 1:
          128 > e && (f = e)
          break
        case 2:
          var l = a[b + 1]
          128 === (l & 192) &&
            ((e = ((e & 31) << 6) | (l & 63)), 127 < e && (f = e))
          break
        case 3:
          l = a[b + 1]
          var m = a[b + 2]
          128 === (l & 192) &&
            128 === (m & 192) &&
            ((e = ((e & 15) << 12) | ((l & 63) << 6) | (m & 63)),
            2047 < e && (55296 > e || 57343 < e) && (f = e))
          break
        case 4:
          l = a[b + 1]
          m = a[b + 2]
          var n = a[b + 3]
          128 === (l & 192) &&
            128 === (m & 192) &&
            128 === (n & 192) &&
            ((e =
              ((e & 15) << 18) | ((l & 63) << 12) | ((m & 63) << 6) | (n & 63)),
            65535 < e && 1114112 > e && (f = e))
      }
    null === f
      ? ((f = 65533), (g = 1))
      : 65535 < f &&
        ((f -= 65536),
        d.push(((f >>> 10) & 1023) | 55296),
        (f = 56320 | (f & 1023)))
    d.push(f)
    b += g
  }
  a = d.length
  if (a <= yb) d = String.fromCharCode.apply(String, d)
  else {
    c = ''
    for (b = 0; b < a; )
      c += String.fromCharCode.apply(String, d.slice(b, (b += yb)))
    d = c
  }
  return d
}
var yb = 4096
T.prototype.slice = function (a, b) {
  var c = this.length
  a = ~~a
  b = void 0 === b ? c : ~~b
  0 > a ? ((a += c), 0 > a && (a = 0)) : a > c && (a = c)
  0 > b ? ((b += c), 0 > b && (b = 0)) : b > c && (b = c)
  b < a && (b = a)
  if (T.TYPED_ARRAY_SUPPORT)
    (b = this.subarray(a, b)), (b.__proto__ = T.prototype)
  else {
    c = b - a
    b = new T(c, void 0)
    for (var d = 0; d < c; ++d) b[d] = this[d + a]
  }
  return b
}
function Y(a, b, c) {
  if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint')
  if (a + b > c) throw new RangeError('Trying to access beyond buffer length')
}
T.prototype.readUIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || Y(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  return c
}
T.prototype.readUIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || Y(a, b, this.length)
  c = this[a + --b]
  for (var d = 1; 0 < b && (d *= 256); ) c += this[a + --b] * d
  return c
}
T.prototype.readUInt8 = function (a, b) {
  b || Y(a, 1, this.length)
  return this[a]
}
T.prototype.readUInt16LE = function (a, b) {
  b || Y(a, 2, this.length)
  return this[a] | (this[a + 1] << 8)
}
T.prototype.readUInt16BE = function (a, b) {
  b || Y(a, 2, this.length)
  return (this[a] << 8) | this[a + 1]
}
T.prototype.readUInt32LE = function (a, b) {
  b || Y(a, 4, this.length)
  return (
    (this[a] | (this[a + 1] << 8) | (this[a + 2] << 16)) +
    16777216 * this[a + 3]
  )
}
T.prototype.readUInt32BE = function (a, b) {
  b || Y(a, 4, this.length)
  return (
    16777216 * this[a] +
    ((this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3])
  )
}
T.prototype.readIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || Y(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  c >= 128 * d && (c -= Math.pow(2, 8 * b))
  return c
}
T.prototype.readIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || Y(a, b, this.length)
  c = b
  for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256); )
    e += this[a + --c] * d
  e >= 128 * d && (e -= Math.pow(2, 8 * b))
  return e
}
T.prototype.readInt8 = function (a, b) {
  b || Y(a, 1, this.length)
  return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
}
T.prototype.readInt16LE = function (a, b) {
  b || Y(a, 2, this.length)
  a = this[a] | (this[a + 1] << 8)
  return a & 32768 ? a | 4294901760 : a
}
T.prototype.readInt16BE = function (a, b) {
  b || Y(a, 2, this.length)
  a = this[a + 1] | (this[a] << 8)
  return a & 32768 ? a | 4294901760 : a
}
T.prototype.readInt32LE = function (a, b) {
  b || Y(a, 4, this.length)
  return (
    this[a] | (this[a + 1] << 8) | (this[a + 2] << 16) | (this[a + 3] << 24)
  )
}
T.prototype.readInt32BE = function (a, b) {
  b || Y(a, 4, this.length)
  return (
    (this[a] << 24) | (this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3]
  )
}
T.prototype.readFloatLE = function (a, b) {
  b || Y(a, 4, this.length)
  return fb(this, a, !0, 23, 4)
}
T.prototype.readFloatBE = function (a, b) {
  b || Y(a, 4, this.length)
  return fb(this, a, !1, 23, 4)
}
T.prototype.readDoubleLE = function (a, b) {
  b || Y(a, 8, this.length)
  return fb(this, a, !0, 52, 8)
}
T.prototype.readDoubleBE = function (a, b) {
  b || Y(a, 8, this.length)
  return fb(this, a, !1, 52, 8)
}
function Z(a, b, c, d, e, f) {
  if (!V(a)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (b > e || b < f) throw new RangeError('"value" argument is out of bounds')
  if (c + d > a.length) throw new RangeError('Index out of range')
}
T.prototype.writeUIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || Z(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = 1
  var e = 0
  for (this[b] = a & 255; ++e < c && (d *= 256); ) this[b + e] = (a / d) & 255
  return b + c
}
T.prototype.writeUIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || Z(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = c - 1
  var e = 1
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    this[b + d] = (a / e) & 255
  return b + c
}
T.prototype.writeUInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 1, 255, 0)
  T.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  this[b] = a & 255
  return b + 1
}
function zb(a, b, c, d) {
  0 > b && (b = 65535 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
    a[c + e] = (b & (255 << (8 * (d ? e : 1 - e)))) >>> (8 * (d ? e : 1 - e))
}
T.prototype.writeUInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 2, 65535, 0)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : zb(this, a, b, !0)
  return b + 2
}
T.prototype.writeUInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 2, 65535, 0)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : zb(this, a, b, !1)
  return b + 2
}
function Ab(a, b, c, d) {
  0 > b && (b = 4294967295 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
    a[c + e] = (b >>> (8 * (d ? e : 3 - e))) & 255
}
T.prototype.writeUInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 4, 4294967295, 0)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b + 3] = a >>> 24),
      (this[b + 2] = a >>> 16),
      (this[b + 1] = a >>> 8),
      (this[b] = a & 255))
    : Ab(this, a, b, !0)
  return b + 4
}
T.prototype.writeUInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 4, 4294967295, 0)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : Ab(this, a, b, !1)
  return b + 4
}
T.prototype.writeIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), Z(this, a, b, c, d - 1, -d))
  d = 0
  var e = 1,
    f = 0
  for (this[b] = a & 255; ++d < c && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
T.prototype.writeIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), Z(this, a, b, c, d - 1, -d))
  d = c - 1
  var e = 1,
    f = 0
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
T.prototype.writeInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 1, 127, -128)
  T.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  0 > a && (a = 255 + a + 1)
  this[b] = a & 255
  return b + 1
}
T.prototype.writeInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 2, 32767, -32768)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : zb(this, a, b, !0)
  return b + 2
}
T.prototype.writeInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 2, 32767, -32768)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : zb(this, a, b, !1)
  return b + 2
}
T.prototype.writeInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 4, 2147483647, -2147483648)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255),
      (this[b + 1] = a >>> 8),
      (this[b + 2] = a >>> 16),
      (this[b + 3] = a >>> 24))
    : Ab(this, a, b, !0)
  return b + 4
}
T.prototype.writeInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || Z(this, a, b, 4, 2147483647, -2147483648)
  0 > a && (a = 4294967295 + a + 1)
  T.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : Ab(this, a, b, !1)
  return b + 4
}
function Bb(a, b, c, d) {
  if (c + d > a.length) throw new RangeError('Index out of range')
  if (0 > c) throw new RangeError('Index out of range')
}
T.prototype.writeFloatLE = function (a, b, c) {
  c || Bb(this, a, b, 4)
  gb(this, a, b, !0, 23, 4)
  return b + 4
}
T.prototype.writeFloatBE = function (a, b, c) {
  c || Bb(this, a, b, 4)
  gb(this, a, b, !1, 23, 4)
  return b + 4
}
T.prototype.writeDoubleLE = function (a, b, c) {
  c || Bb(this, a, b, 8)
  gb(this, a, b, !0, 52, 8)
  return b + 8
}
T.prototype.writeDoubleBE = function (a, b, c) {
  c || Bb(this, a, b, 8)
  gb(this, a, b, !1, 52, 8)
  return b + 8
}
T.prototype.copy = function (a, b, c, d) {
  c || (c = 0)
  d || 0 === d || (d = this.length)
  b >= a.length && (b = a.length)
  b || (b = 0)
  0 < d && d < c && (d = c)
  if (d === c || 0 === a.length || 0 === this.length) return 0
  if (0 > b) throw new RangeError('targetStart out of bounds')
  if (0 > c || c >= this.length)
    throw new RangeError('sourceStart out of bounds')
  if (0 > d) throw new RangeError('sourceEnd out of bounds')
  d > this.length && (d = this.length)
  a.length - b < d - c && (d = a.length - b + c)
  var e = d - c
  if (this === a && c < b && b < d)
    for (d = e - 1; 0 <= d; --d) a[d + b] = this[d + c]
  else if (1e3 > e || !T.TYPED_ARRAY_SUPPORT)
    for (d = 0; d < e; ++d) a[d + b] = this[d + c]
  else Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b)
  return e
}
T.prototype.fill = function (a, b, c, d) {
  if ('string' === typeof a) {
    'string' === typeof b
      ? ((d = b), (b = 0), (c = this.length))
      : 'string' === typeof c && ((d = c), (c = this.length))
    if (1 === a.length) {
      var e = a.charCodeAt(0)
      256 > e && (a = e)
    }
    if (void 0 !== d && 'string' !== typeof d)
      throw new TypeError('encoding must be a string')
    if ('string' === typeof d && !T.isEncoding(d))
      throw new TypeError('Unknown encoding: ' + d)
  } else 'number' === typeof a && (a &= 255)
  if (0 > b || this.length < b || this.length < c)
    throw new RangeError('Out of range index')
  if (c <= b) return this
  b >>>= 0
  c = void 0 === c ? this.length : c >>> 0
  a || (a = 0)
  if ('number' === typeof a) for (d = b; d < c; ++d) this[d] = a
  else
    for (
      a = V(a) ? a : rb(new T(a, d).toString()), e = a.length, d = 0;
      d < c - b;
      ++d
    )
      this[d + b] = a[d % e]
  return this
}
var Cb = /[^+\/0-9A-Za-z-_]/g
function rb(a, b) {
  b = b || Infinity
  for (var c, d = a.length, e = null, f = [], g = 0; g < d; ++g) {
    c = a.charCodeAt(g)
    if (55295 < c && 57344 > c) {
      if (!e) {
        if (56319 < c) {
          ;-1 < (b -= 3) && f.push(239, 191, 189)
          continue
        } else if (g + 1 === d) {
          ;-1 < (b -= 3) && f.push(239, 191, 189)
          continue
        }
        e = c
        continue
      }
      if (56320 > c) {
        ;-1 < (b -= 3) && f.push(239, 191, 189)
        e = c
        continue
      }
      c = (((e - 55296) << 10) | (c - 56320)) + 65536
    } else e && -1 < (b -= 3) && f.push(239, 191, 189)
    e = null
    if (128 > c) {
      if (0 > --b) break
      f.push(c)
    } else if (2048 > c) {
      if (0 > (b -= 2)) break
      f.push((c >> 6) | 192, (c & 63) | 128)
    } else if (65536 > c) {
      if (0 > (b -= 3)) break
      f.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128)
    } else if (1114112 > c) {
      if (0 > (b -= 4)) break
      f.push(
        (c >> 18) | 240,
        ((c >> 12) & 63) | 128,
        ((c >> 6) & 63) | 128,
        (c & 63) | 128
      )
    } else throw Error('Invalid code point')
  }
  return f
}
function xb(a) {
  for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255)
  return b
}
function sb(a) {
  a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(Cb, '')
  if (2 > a.length) a = ''
  else for (; 0 !== a.length % 4; ) a += '='
  bb || cb()
  var b = a.length
  if (0 < b % 4) throw Error('Invalid string. Length must be a multiple of 4')
  var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0
  var d = new ab((3 * b) / 4 - c)
  var e = 0 < c ? b - 4 : b
  var f = 0
  for (b = 0; b < e; b += 4) {
    var g =
      (S[a.charCodeAt(b)] << 18) |
      (S[a.charCodeAt(b + 1)] << 12) |
      (S[a.charCodeAt(b + 2)] << 6) |
      S[a.charCodeAt(b + 3)]
    d[f++] = (g >> 16) & 255
    d[f++] = (g >> 8) & 255
    d[f++] = g & 255
  }
  2 === c
    ? ((g = (S[a.charCodeAt(b)] << 2) | (S[a.charCodeAt(b + 1)] >> 4)),
      (d[f++] = g & 255))
    : 1 === c &&
      ((g =
        (S[a.charCodeAt(b)] << 10) |
        (S[a.charCodeAt(b + 1)] << 4) |
        (S[a.charCodeAt(b + 2)] >> 2)),
      (d[f++] = (g >> 8) & 255),
      (d[f++] = g & 255))
  return d
}
function X(a, b, c, d) {
  for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
    b[e + c] = a[e]
  return e
}
function qb(a) {
  return (
    null != a &&
    (!!a._isBuffer ||
      Db(a) ||
      ('function' === typeof a.readFloatLE &&
        'function' === typeof a.slice &&
        Db(a.slice(0, 0))))
  )
}
function Db(a) {
  return (
    !!a.constructor &&
    'function' === typeof a.constructor.isBuffer &&
    a.constructor.isBuffer(a)
  )
}
Q(1)
Q(2)
Q(4)
Q(8)
Q(16)
Q(32)
Q(64)
Q(128)
Q(256)
Q(512)
Q(1024)
Q(2048)
Q(4096)
Q(8192)
Q(16384)
Q(32768)
Q(65536)
Q(131072)
Q(262144)
Q(524288)
Q(1048576)
Q(2097152)
Q(4194304)
Q(8388608)
Q(16777216)
Q(33554432)
Q(67108864)
Q(134217728)
Q(268435456)
Q(0)
Q(0)
;({
  6: 'SIGHUP',
  8: 'SIGINT',
  11: 'SIGQUIT',
  7: 'SIGILL',
  15: 'SIGTRAP',
  0: 'SIGABRT',
  2: 'SIGBUS',
  5: 'SIGFPE',
  9: 'SIGKILL',
  20: 'SIGUSR1',
  12: 'SIGSEGV',
  21: 'SIGUSR2',
  10: 'SIGPIPE',
  1: 'SIGALRM',
  14: 'SIGTERM',
  3: 'SIGCHLD',
  4: 'SIGCONT',
  13: 'SIGSTOP',
  16: 'SIGTSTP',
  17: 'SIGTTIN',
  18: 'SIGTTOU',
  19: 'SIGURG',
  23: 'SIGXCPU',
  24: 'SIGXFSZ',
  22: 'SIGVTALRM',
})
;(function (a) {
  function b(c) {
    var d = a.call(this) || this
    d.errno = c
    Object.setPrototypeOf(d, b.prototype)
    return d
  }
  Ya(b, a)
  return b
})(Error)
var Eb = (function (a) {
    function b(c) {
      var d = a.call(this, 'WASI Exit error: ' + c) || this
      d.code = c
      Object.setPrototypeOf(d, b.prototype)
      return d
    }
    Ya(b, a)
    return b
  })(Error),
  Fb = (function (a) {
    function b(c) {
      var d = a.call(this, 'WASI Kill signal: ' + c) || this
      d.signal = c
      Object.setPrototypeOf(d, b.prototype)
      return d
    }
    Ya(b, a)
    return b
  })(Error),
  Gb = {
    hrtime: (function (a) {
      return function (b) {
        b = a(b)
        return 1e9 * b[0] + b[1]
      }
    })(function (a) {
      var b = 0.001 * performance.now(),
        c = Math.floor(b) + Ta
      b = Math.floor((b % 1) * 1e9)
      a && ((c -= a[0]), (b -= a[1]), 0 > b && (c--, (b += 1e9)))
      return [c, b]
    }),
    exit: function (a) {
      throw new Eb(a)
    },
    kill: function (a) {
      throw new Fb(a)
    },
    randomFillSync: Sa,
    isTTY: function () {
      return !0
    },
    path: Wa,
    fs: null,
  }
export default Gb
