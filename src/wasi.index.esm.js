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
function aa(a, b) {
  aa =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (a, b) {
        a.__proto__ = b
      }) ||
    function (a, b) {
      for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }
  return aa(a, b)
}
function ba(a, b) {
  function c() {
    this.constructor = a
  }
  aa(a, b)
  a.prototype =
    null === b ? Object.create(b) : ((c.prototype = b.prototype), new c())
}
function ca(a) {
  var b = 'function' === typeof Symbol && a[Symbol.iterator],
    c = 0
  return b
    ? b.call(a)
    : {
        next: function () {
          a && c >= a.length && (a = void 0)
          return { value: a && a[c++], done: !a }
        },
      }
}
function da(a, b) {
  var c = 'function' === typeof Symbol && a[Symbol.iterator]
  if (!c) return a
  a = c.call(a)
  var d,
    e = []
  try {
    for (; (void 0 === b || 0 < b--) && !(d = a.next()).done; ) e.push(d.value)
  } catch (g) {
    var f = { error: g }
  } finally {
    try {
      d && !d.done && (c = a['return']) && c.call(a)
    } finally {
      if (f) throw f.error
    }
  }
  return e
}
function fa() {
  for (var a = [], b = 0; b < arguments.length; b++)
    a = a.concat(da(arguments[b]))
  return a
}
var ha =
    'undefined' !== typeof globalThis
      ? globalThis
      : 'undefined' !== typeof global
      ? global
      : {},
  k = 'undefined' !== typeof BigInt ? BigInt : ha.BigInt || Number,
  ia = DataView
ia.prototype.setBigUint64 ||
  ((ia.prototype.setBigUint64 = function (a, b, c) {
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
  (ia.prototype.getBigUint64 = function (a, b) {
    var c = this.getUint32(a + (b ? 0 : 4), b)
    a = this.getUint32(a + (b ? 4 : 0), b)
    c = c.toString(2)
    a = a.toString(2)
    b = ''
    for (var d = 0; d < 32 - c.length; d++) b += '0'
    return k('0b' + a + (b + c))
  }))
var ja =
    'undefined' !== typeof global
      ? global
      : 'undefined' !== typeof self
      ? self
      : 'undefined' !== typeof window
      ? window
      : {},
  m = [],
  u = [],
  ka = 'undefined' !== typeof Uint8Array ? Uint8Array : Array,
  la = !1
function ma() {
  la = !0
  for (var a = 0; 64 > a; ++a)
    (m[a] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[
      a
    ]),
      (u[
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charCodeAt(
          a
        )
      ] = a)
  u[45] = 62
  u[95] = 63
}
function na(a, b, c) {
  for (var d = [], e = b; e < c; e += 3)
    (b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2]),
      d.push(
        m[(b >> 18) & 63] + m[(b >> 12) & 63] + m[(b >> 6) & 63] + m[b & 63]
      )
  return d.join('')
}
function oa(a) {
  la || ma()
  for (
    var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c;
    f < g;
    f += 16383
  )
    e.push(na(a, f, f + 16383 > g ? g : f + 16383))
  1 === c
    ? ((a = a[b - 1]), (d += m[a >> 2]), (d += m[(a << 4) & 63]), (d += '=='))
    : 2 === c &&
      ((a = (a[b - 2] << 8) + a[b - 1]),
      (d += m[a >> 10]),
      (d += m[(a >> 4) & 63]),
      (d += m[(a << 2) & 63]),
      (d += '='))
  e.push(d)
  return e.join('')
}
function pa(a, b, c, d, e) {
  var f = 8 * e - d - 1
  var g = (1 << f) - 1,
    h = g >> 1,
    l = -7
  e = c ? e - 1 : 0
  var n = c ? -1 : 1,
    r = a[b + e]
  e += n
  c = r & ((1 << -l) - 1)
  r >>= -l
  for (l += f; 0 < l; c = 256 * c + a[b + e], e += n, l -= 8);
  f = c & ((1 << -l) - 1)
  c >>= -l
  for (l += d; 0 < l; f = 256 * f + a[b + e], e += n, l -= 8);
  if (0 === c) c = 1 - h
  else {
    if (c === g) return f ? NaN : Infinity * (r ? -1 : 1)
    f += Math.pow(2, d)
    c -= h
  }
  return (r ? -1 : 1) * f * Math.pow(2, c - d)
}
function qa(a, b, c, d, e, f) {
  var g,
    h = 8 * f - e - 1,
    l = (1 << h) - 1,
    n = l >> 1,
    r = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0
  f = d ? 0 : f - 1
  var p = d ? 1 : -1,
    y = 0 > b || (0 === b && 0 > 1 / b) ? 1 : 0
  b = Math.abs(b)
  isNaN(b) || Infinity === b
    ? ((b = isNaN(b) ? 1 : 0), (d = l))
    : ((d = Math.floor(Math.log(b) / Math.LN2)),
      1 > b * (g = Math.pow(2, -d)) && (d--, (g *= 2)),
      (b = 1 <= d + n ? b + r / g : b + r * Math.pow(2, 1 - n)),
      2 <= b * g && (d++, (g /= 2)),
      d + n >= l
        ? ((b = 0), (d = l))
        : 1 <= d + n
        ? ((b = (b * g - 1) * Math.pow(2, e)), (d += n))
        : ((b = b * Math.pow(2, n - 1) * Math.pow(2, e)), (d = 0)))
  for (; 8 <= e; a[c + f] = b & 255, f += p, b /= 256, e -= 8);
  d = (d << e) | b
  for (h += e; 0 < h; a[c + f] = d & 255, f += p, d /= 256, h -= 8);
  a[c + f - p] |= 128 * y
}
var ra = {}.toString,
  sa =
    Array.isArray ||
    function (a) {
      return '[object Array]' == ra.call(a)
    }
v.TYPED_ARRAY_SUPPORT =
  void 0 !== ja.TYPED_ARRAY_SUPPORT ? ja.TYPED_ARRAY_SUPPORT : !0
var ta = v.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
function w(a, b) {
  if ((v.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
    throw new RangeError('Invalid typed array length')
  v.TYPED_ARRAY_SUPPORT
    ? ((a = new Uint8Array(b)), (a.__proto__ = v.prototype))
    : (null === a && (a = new v(b)), (a.length = b))
  return a
}
function v(a, b, c) {
  if (!(v.TYPED_ARRAY_SUPPORT || this instanceof v)) return new v(a, b, c)
  if ('number' === typeof a) {
    if ('string' === typeof b)
      throw Error(
        'If encoding is specified then the first argument must be a string'
      )
    return va(this, a)
  }
  return wa(this, a, b, c)
}
v.poolSize = 8192
v._augment = function (a) {
  a.__proto__ = v.prototype
  return a
}
function wa(a, b, c, d) {
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
    v.TYPED_ARRAY_SUPPORT
      ? ((a = b), (a.__proto__ = v.prototype))
      : (a = xa(a, b))
    return a
  }
  if ('string' === typeof b) {
    d = a
    a = c
    if ('string' !== typeof a || '' === a) a = 'utf8'
    if (!v.isEncoding(a))
      throw new TypeError('"encoding" must be a valid string encoding')
    c = ya(b, a) | 0
    d = w(d, c)
    b = d.write(b, a)
    b !== c && (d = d.slice(0, b))
    return d
  }
  return za(a, b)
}
v.from = function (a, b, c) {
  return wa(null, a, b, c)
}
v.TYPED_ARRAY_SUPPORT &&
  ((v.prototype.__proto__ = Uint8Array.prototype), (v.__proto__ = Uint8Array))
function Aa(a) {
  if ('number' !== typeof a)
    throw new TypeError('"size" argument must be a number')
  if (0 > a) throw new RangeError('"size" argument must not be negative')
}
v.alloc = function (a, b, c) {
  Aa(a)
  a =
    0 >= a
      ? w(null, a)
      : void 0 !== b
      ? 'string' === typeof c
        ? w(null, a).fill(b, c)
        : w(null, a).fill(b)
      : w(null, a)
  return a
}
function va(a, b) {
  Aa(b)
  a = w(a, 0 > b ? 0 : Ba(b) | 0)
  if (!v.TYPED_ARRAY_SUPPORT) for (var c = 0; c < b; ++c) a[c] = 0
  return a
}
v.allocUnsafe = function (a) {
  return va(null, a)
}
v.allocUnsafeSlow = function (a) {
  return va(null, a)
}
function xa(a, b) {
  var c = 0 > b.length ? 0 : Ba(b.length) | 0
  a = w(a, c)
  for (var d = 0; d < c; d += 1) a[d] = b[d] & 255
  return a
}
function za(a, b) {
  if (z(b)) {
    var c = Ba(b.length) | 0
    a = w(a, c)
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
        c ? w(a, 0) : xa(a, b)
      )
    if ('Buffer' === b.type && sa(b.data)) return xa(a, b.data)
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
  )
}
function Ba(a) {
  if (a >= (v.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        (v.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
        ' bytes'
    )
  return a | 0
}
v.isBuffer = Ca
function z(a) {
  return !(null == a || !a._isBuffer)
}
v.compare = function (a, b) {
  if (!z(a) || !z(b)) throw new TypeError('Arguments must be Buffers')
  if (a === b) return 0
  for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
    if (a[e] !== b[e]) {
      c = a[e]
      d = b[e]
      break
    }
  return c < d ? -1 : d < c ? 1 : 0
}
v.isEncoding = function (a) {
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
v.concat = function (a, b) {
  if (!sa(a)) throw new TypeError('"list" argument must be an Array of Buffers')
  if (0 === a.length) return v.alloc(0)
  var c
  if (void 0 === b) for (c = b = 0; c < a.length; ++c) b += a[c].length
  b = v.allocUnsafe(b)
  var d = 0
  for (c = 0; c < a.length; ++c) {
    var e = a[c]
    if (!z(e))
      throw new TypeError('"list" argument must be an Array of Buffers')
    e.copy(b, d)
    d += e.length
  }
  return b
}
function ya(a, b) {
  if (z(a)) return a.length
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
        return Da(a).length
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
        if (d) return Da(a).length
        b = ('' + b).toLowerCase()
        d = !0
    }
}
v.byteLength = ya
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
          (b = 0 === b && c === this.length ? oa(this) : oa(this.slice(b, c))),
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
v.prototype._isBuffer = !0
function A(a, b, c) {
  var d = a[b]
  a[b] = a[c]
  a[c] = d
}
v.prototype.swap16 = function () {
  var a = this.length
  if (0 !== a % 2)
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  for (var b = 0; b < a; b += 2) A(this, b, b + 1)
  return this
}
v.prototype.swap32 = function () {
  var a = this.length
  if (0 !== a % 4)
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  for (var b = 0; b < a; b += 4) A(this, b, b + 3), A(this, b + 1, b + 2)
  return this
}
v.prototype.swap64 = function () {
  var a = this.length
  if (0 !== a % 8)
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  for (var b = 0; b < a; b += 8)
    A(this, b, b + 7),
      A(this, b + 1, b + 6),
      A(this, b + 2, b + 5),
      A(this, b + 3, b + 4)
  return this
}
v.prototype.toString = function () {
  var a = this.length | 0
  return 0 === a
    ? ''
    : 0 === arguments.length
    ? Ga(this, 0, a)
    : Fa.apply(this, arguments)
}
v.prototype.equals = function (a) {
  if (!z(a)) throw new TypeError('Argument must be a Buffer')
  return this === a ? !0 : 0 === v.compare(this, a)
}
v.prototype.inspect = function () {
  var a = ''
  0 < this.length &&
    ((a = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
    50 < this.length && (a += ' ... '))
  return '<Buffer ' + a + '>'
}
v.prototype.compare = function (a, b, c, d, e) {
  if (!z(a)) throw new TypeError('Argument must be a Buffer')
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
    h = Math.min(f, g)
  d = this.slice(d, e)
  a = a.slice(b, c)
  for (b = 0; b < h; ++b)
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
  'string' === typeof b && (b = v.from(b, d))
  if (z(b)) return 0 === b.length ? -1 : Ia(a, b, c, d, e)
  if ('number' === typeof b)
    return (
      (b &= 255),
      v.TYPED_ARRAY_SUPPORT &&
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
    h = a.length,
    l = b.length
  if (
    void 0 !== d &&
    ((d = String(d).toLowerCase()),
    'ucs2' === d || 'ucs-2' === d || 'utf16le' === d || 'utf-16le' === d)
  ) {
    if (2 > a.length || 2 > b.length) return -1
    g = 2
    h /= 2
    l /= 2
    c /= 2
  }
  if (e)
    for (d = -1; c < h; c++)
      if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
        if ((-1 === d && (d = c), c - d + 1 === l)) return d * g
      } else -1 !== d && (c -= c - d), (d = -1)
  else
    for (c + l > h && (c = h - l); 0 <= c; c--) {
      h = !0
      for (d = 0; d < l; d++)
        if (f(a, c + d) !== f(b, d)) {
          h = !1
          break
        }
      if (h) return c
    }
  return -1
}
v.prototype.includes = function (a, b, c) {
  return -1 !== this.indexOf(a, b, c)
}
v.prototype.indexOf = function (a, b, c) {
  return Ha(this, a, b, c, !0)
}
v.prototype.lastIndexOf = function (a, b, c) {
  return Ha(this, a, b, c, !1)
}
v.prototype.write = function (a, b, c, d) {
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
        return Ja(Da(a, this.length - b), this, b, c)
      case 'ascii':
        return Ja(Ka(a), this, b, c)
      case 'latin1':
      case 'binary':
        return Ja(Ka(a), this, b, c)
      case 'base64':
        return Ja(Ea(a), this, b, c)
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        d = a
        e = this.length - b
        for (var f = [], g = 0; g < d.length && !(0 > (e -= 2)); ++g) {
          var h = d.charCodeAt(g)
          a = h >> 8
          h %= 256
          f.push(h)
          f.push(a)
        }
        return Ja(f, this, b, c)
      default:
        if (e) throw new TypeError('Unknown encoding: ' + d)
        d = ('' + d).toLowerCase()
        e = !0
    }
}
v.prototype.toJSON = function () {
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
          var h = a[b + 1]
          128 === (h & 192) &&
            ((e = ((e & 31) << 6) | (h & 63)), 127 < e && (f = e))
          break
        case 3:
          h = a[b + 1]
          var l = a[b + 2]
          128 === (h & 192) &&
            128 === (l & 192) &&
            ((e = ((e & 15) << 12) | ((h & 63) << 6) | (l & 63)),
            2047 < e && (55296 > e || 57343 < e) && (f = e))
          break
        case 4:
          h = a[b + 1]
          l = a[b + 2]
          var n = a[b + 3]
          128 === (h & 192) &&
            128 === (l & 192) &&
            128 === (n & 192) &&
            ((e =
              ((e & 15) << 18) | ((h & 63) << 12) | ((l & 63) << 6) | (n & 63)),
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
  if (a <= La) d = String.fromCharCode.apply(String, d)
  else {
    c = ''
    for (b = 0; b < a; )
      c += String.fromCharCode.apply(String, d.slice(b, (b += La)))
    d = c
  }
  return d
}
var La = 4096
v.prototype.slice = function (a, b) {
  var c = this.length
  a = ~~a
  b = void 0 === b ? c : ~~b
  0 > a ? ((a += c), 0 > a && (a = 0)) : a > c && (a = c)
  0 > b ? ((b += c), 0 > b && (b = 0)) : b > c && (b = c)
  b < a && (b = a)
  if (v.TYPED_ARRAY_SUPPORT)
    (b = this.subarray(a, b)), (b.__proto__ = v.prototype)
  else {
    c = b - a
    b = new v(c, void 0)
    for (var d = 0; d < c; ++d) b[d] = this[d + a]
  }
  return b
}
function C(a, b, c) {
  if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint')
  if (a + b > c) throw new RangeError('Trying to access beyond buffer length')
}
v.prototype.readUIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  return c
}
v.prototype.readUIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a + --b]
  for (var d = 1; 0 < b && (d *= 256); ) c += this[a + --b] * d
  return c
}
v.prototype.readUInt8 = function (a, b) {
  b || C(a, 1, this.length)
  return this[a]
}
v.prototype.readUInt16LE = function (a, b) {
  b || C(a, 2, this.length)
  return this[a] | (this[a + 1] << 8)
}
v.prototype.readUInt16BE = function (a, b) {
  b || C(a, 2, this.length)
  return (this[a] << 8) | this[a + 1]
}
v.prototype.readUInt32LE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    (this[a] | (this[a + 1] << 8) | (this[a + 2] << 16)) +
    16777216 * this[a + 3]
  )
}
v.prototype.readUInt32BE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    16777216 * this[a] +
    ((this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3])
  )
}
v.prototype.readIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  c >= 128 * d && (c -= Math.pow(2, 8 * b))
  return c
}
v.prototype.readIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = b
  for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256); )
    e += this[a + --c] * d
  e >= 128 * d && (e -= Math.pow(2, 8 * b))
  return e
}
v.prototype.readInt8 = function (a, b) {
  b || C(a, 1, this.length)
  return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
}
v.prototype.readInt16LE = function (a, b) {
  b || C(a, 2, this.length)
  a = this[a] | (this[a + 1] << 8)
  return a & 32768 ? a | 4294901760 : a
}
v.prototype.readInt16BE = function (a, b) {
  b || C(a, 2, this.length)
  a = this[a + 1] | (this[a] << 8)
  return a & 32768 ? a | 4294901760 : a
}
v.prototype.readInt32LE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    this[a] | (this[a + 1] << 8) | (this[a + 2] << 16) | (this[a + 3] << 24)
  )
}
v.prototype.readInt32BE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    (this[a] << 24) | (this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3]
  )
}
v.prototype.readFloatLE = function (a, b) {
  b || C(a, 4, this.length)
  return pa(this, a, !0, 23, 4)
}
v.prototype.readFloatBE = function (a, b) {
  b || C(a, 4, this.length)
  return pa(this, a, !1, 23, 4)
}
v.prototype.readDoubleLE = function (a, b) {
  b || C(a, 8, this.length)
  return pa(this, a, !0, 52, 8)
}
v.prototype.readDoubleBE = function (a, b) {
  b || C(a, 8, this.length)
  return pa(this, a, !1, 52, 8)
}
function D(a, b, c, d, e, f) {
  if (!z(a)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (b > e || b < f) throw new RangeError('"value" argument is out of bounds')
  if (c + d > a.length) throw new RangeError('Index out of range')
}
v.prototype.writeUIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || D(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = 1
  var e = 0
  for (this[b] = a & 255; ++e < c && (d *= 256); ) this[b + e] = (a / d) & 255
  return b + c
}
v.prototype.writeUIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || D(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = c - 1
  var e = 1
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    this[b + d] = (a / e) & 255
  return b + c
}
v.prototype.writeUInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 1, 255, 0)
  v.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  this[b] = a & 255
  return b + 1
}
function Ma(a, b, c, d) {
  0 > b && (b = 65535 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
    a[c + e] = (b & (255 << (8 * (d ? e : 1 - e)))) >>> (8 * (d ? e : 1 - e))
}
v.prototype.writeUInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 2, 65535, 0)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : Ma(this, a, b, !0)
  return b + 2
}
v.prototype.writeUInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 2, 65535, 0)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : Ma(this, a, b, !1)
  return b + 2
}
function Na(a, b, c, d) {
  0 > b && (b = 4294967295 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
    a[c + e] = (b >>> (8 * (d ? e : 3 - e))) & 255
}
v.prototype.writeUInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 4, 4294967295, 0)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b + 3] = a >>> 24),
      (this[b + 2] = a >>> 16),
      (this[b + 1] = a >>> 8),
      (this[b] = a & 255))
    : Na(this, a, b, !0)
  return b + 4
}
v.prototype.writeUInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 4, 4294967295, 0)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : Na(this, a, b, !1)
  return b + 4
}
v.prototype.writeIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), D(this, a, b, c, d - 1, -d))
  d = 0
  var e = 1,
    f = 0
  for (this[b] = a & 255; ++d < c && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
v.prototype.writeIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), D(this, a, b, c, d - 1, -d))
  d = c - 1
  var e = 1,
    f = 0
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
v.prototype.writeInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 1, 127, -128)
  v.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  0 > a && (a = 255 + a + 1)
  this[b] = a & 255
  return b + 1
}
v.prototype.writeInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 2, 32767, -32768)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : Ma(this, a, b, !0)
  return b + 2
}
v.prototype.writeInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 2, 32767, -32768)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : Ma(this, a, b, !1)
  return b + 2
}
v.prototype.writeInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 4, 2147483647, -2147483648)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255),
      (this[b + 1] = a >>> 8),
      (this[b + 2] = a >>> 16),
      (this[b + 3] = a >>> 24))
    : Na(this, a, b, !0)
  return b + 4
}
v.prototype.writeInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || D(this, a, b, 4, 2147483647, -2147483648)
  0 > a && (a = 4294967295 + a + 1)
  v.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : Na(this, a, b, !1)
  return b + 4
}
function Oa(a, b, c, d) {
  if (c + d > a.length) throw new RangeError('Index out of range')
  if (0 > c) throw new RangeError('Index out of range')
}
v.prototype.writeFloatLE = function (a, b, c) {
  c || Oa(this, a, b, 4)
  qa(this, a, b, !0, 23, 4)
  return b + 4
}
v.prototype.writeFloatBE = function (a, b, c) {
  c || Oa(this, a, b, 4)
  qa(this, a, b, !1, 23, 4)
  return b + 4
}
v.prototype.writeDoubleLE = function (a, b, c) {
  c || Oa(this, a, b, 8)
  qa(this, a, b, !0, 52, 8)
  return b + 8
}
v.prototype.writeDoubleBE = function (a, b, c) {
  c || Oa(this, a, b, 8)
  qa(this, a, b, !1, 52, 8)
  return b + 8
}
v.prototype.copy = function (a, b, c, d) {
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
  else if (1e3 > e || !v.TYPED_ARRAY_SUPPORT)
    for (d = 0; d < e; ++d) a[d + b] = this[d + c]
  else Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b)
  return e
}
v.prototype.fill = function (a, b, c, d) {
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
    if ('string' === typeof d && !v.isEncoding(d))
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
      a = z(a) ? a : Da(new v(a, d).toString()), e = a.length, d = 0;
      d < c - b;
      ++d
    )
      this[d + b] = a[d % e]
  return this
}
var Pa = /[^+\/0-9A-Za-z-_]/g
function Da(a, b) {
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
function Ka(a) {
  for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255)
  return b
}
function Ea(a) {
  a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(Pa, '')
  if (2 > a.length) a = ''
  else for (; 0 !== a.length % 4; ) a += '='
  la || ma()
  var b = a.length
  if (0 < b % 4) throw Error('Invalid string. Length must be a multiple of 4')
  var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0
  var d = new ka((3 * b) / 4 - c)
  var e = 0 < c ? b - 4 : b
  var f = 0
  for (b = 0; b < e; b += 4) {
    var g =
      (u[a.charCodeAt(b)] << 18) |
      (u[a.charCodeAt(b + 1)] << 12) |
      (u[a.charCodeAt(b + 2)] << 6) |
      u[a.charCodeAt(b + 3)]
    d[f++] = (g >> 16) & 255
    d[f++] = (g >> 8) & 255
    d[f++] = g & 255
  }
  2 === c
    ? ((g = (u[a.charCodeAt(b)] << 2) | (u[a.charCodeAt(b + 1)] >> 4)),
      (d[f++] = g & 255))
    : 1 === c &&
      ((g =
        (u[a.charCodeAt(b)] << 10) |
        (u[a.charCodeAt(b + 1)] << 4) |
        (u[a.charCodeAt(b + 2)] >> 2)),
      (d[f++] = (g >> 8) & 255),
      (d[f++] = g & 255))
  return d
}
function Ja(a, b, c, d) {
  for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
    b[e + c] = a[e]
  return e
}
function Ca(a) {
  return (
    null != a &&
    (!!a._isBuffer ||
      Qa(a) ||
      ('function' === typeof a.readFloatLE &&
        'function' === typeof a.slice &&
        Qa(a.slice(0, 0))))
  )
}
function Qa(a) {
  return (
    !!a.constructor &&
    'function' === typeof a.constructor.isBuffer &&
    a.constructor.isBuffer(a)
  )
}
var Ra = Object.freeze({
    __proto__: null,
    INSPECT_MAX_BYTES: 50,
    kMaxLength: ta,
    Buffer: v,
    SlowBuffer: function (a) {
      ;+a != a && (a = 0)
      return v.alloc(+a)
    },
    isBuffer: Ca,
  }),
  E = v,
  Sa =
    'undefined' !== typeof globalThis
      ? globalThis
      : 'undefined' !== typeof window
      ? window
      : 'undefined' !== typeof global
      ? global
      : 'undefined' !== typeof self
      ? self
      : {}
function Ta(a, b) {
  return (b = { exports: {} }), a(b, b.exports), b.exports
}
function Ua() {
  throw Error('setTimeout has not been defined')
}
function Va() {
  throw Error('clearTimeout has not been defined')
}
var F = Ua,
  G = Va
'function' === typeof ja.setTimeout && (F = setTimeout)
'function' === typeof ja.clearTimeout && (G = clearTimeout)
function Wa(a) {
  if (F === setTimeout) return setTimeout(a, 0)
  if ((F === Ua || !F) && setTimeout) return (F = setTimeout), setTimeout(a, 0)
  try {
    return F(a, 0)
  } catch (b) {
    try {
      return F.call(null, a, 0)
    } catch (c) {
      return F.call(this, a, 0)
    }
  }
}
function Xa(a) {
  if (G === clearTimeout) return clearTimeout(a)
  if ((G === Va || !G) && clearTimeout)
    return (G = clearTimeout), clearTimeout(a)
  try {
    return G(a)
  } catch (b) {
    try {
      return G.call(null, a)
    } catch (c) {
      return G.call(this, a)
    }
  }
}
var H = [],
  I = !1,
  J,
  Ya = -1
function Za() {
  I &&
    J &&
    ((I = !1), J.length ? (H = J.concat(H)) : (Ya = -1), H.length && $a())
}
function $a() {
  if (!I) {
    var a = Wa(Za)
    I = !0
    for (var b = H.length; b; ) {
      J = H
      for (H = []; ++Ya < b; ) J && J[Ya].run()
      Ya = -1
      b = H.length
    }
    J = null
    I = !1
    Xa(a)
  }
}
function ab(a) {
  var b = Array(arguments.length - 1)
  if (1 < arguments.length)
    for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
  H.push(new bb(a, b))
  1 !== H.length || I || Wa($a)
}
function bb(a, b) {
  this.fun = a
  this.array = b
}
bb.prototype.run = function () {
  this.fun.apply(null, this.array)
}
function K() {}
var L = ja.performance || {},
  cb =
    L.now ||
    L.mozNow ||
    L.msNow ||
    L.oNow ||
    L.webkitNow ||
    function () {
      return new Date().getTime()
    },
  db = new Date(),
  eb = {
    nextTick: ab,
    title: 'browser',
    browser: !0,
    env: {},
    argv: [],
    version: '',
    versions: {},
    on: K,
    addListener: K,
    once: K,
    off: K,
    removeListener: K,
    removeAllListeners: K,
    emit: K,
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
      var b = 0.001 * cb.call(L),
        c = Math.floor(b)
      b = Math.floor((b % 1) * 1e9)
      a && ((c -= a[0]), (b -= a[1]), 0 > b && (c--, (b += 1e9)))
      return [c, b]
    },
    platform: 'browser',
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - db) / 1e3
    },
  },
  fb = Ta(function (a, b) {
    function c(a, b) {
      for (var c in a) b[c] = a[c]
    }
    function d(a, b, c) {
      return e(a, b, c)
    }
    var e = Ra.Buffer
    e.from && e.alloc && e.allocUnsafe && e.allocUnsafeSlow
      ? (a.exports = Ra)
      : (c(Ra, b), (b.Buffer = d))
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
      return Ra.SlowBuffer(a)
    }
  }),
  gb = Ta(function (a, b) {
    function c() {
      throw Error(
        'secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11'
      )
    }
    function d(a, b) {
      if ('number' !== typeof a || a !== a)
        throw new TypeError('offset must be a number')
      if (a > p || 0 > a) throw new TypeError('offset must be a uint32')
      if (a > n || a > b) throw new RangeError('offset out of range')
    }
    function e(a, b, c) {
      if ('number' !== typeof a || a !== a)
        throw new TypeError('size must be a number')
      if (a > p || 0 > a) throw new TypeError('size must be a uint32')
      if (a + b > c || a > n) throw new RangeError('buffer too small')
    }
    function f(a, b, c, f) {
      if (!(l.isBuffer(a) || a instanceof Sa.Uint8Array))
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
      r.getRandomValues(b)
      if (d)
        ab(function () {
          d(null, a)
        })
      else return a
    }
    function h(a, b, c) {
      'undefined' === typeof b && (b = 0)
      if (!(l.isBuffer(a) || a instanceof Sa.Uint8Array))
        throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
      d(b, a.length)
      void 0 === c && (c = a.length - b)
      e(c, b, a.length)
      return g(a, b, c)
    }
    var l = fb.Buffer,
      n = fb.kMaxLength,
      r = Sa.crypto || Sa.msCrypto,
      p = Math.pow(2, 32) - 1
    r && r.getRandomValues
      ? ((b.randomFill = f), (b.randomFillSync = h))
      : ((b.randomFill = c), (b.randomFillSync = c))
  }),
  hb = Ta(function (a) {
    a.exports = gb
  }).randomFillSync,
  ib = Math.floor(0.001 * (Date.now() - performance.now()))
function M(a) {
  if ('string' !== typeof a)
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(a))
}
function jb(a, b) {
  for (var c = '', d = 0, e = -1, f = 0, g, h = 0; h <= a.length; ++h) {
    if (h < a.length) g = a.charCodeAt(h)
    else if (47 === g) break
    else g = 47
    if (47 === g) {
      if (e !== h - 1 && 1 !== f)
        if (e !== h - 1 && 2 === f) {
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
                e = h
                f = 0
                continue
              }
            } else if (2 === c.length || 1 === c.length) {
              c = ''
              d = 0
              e = h
              f = 0
              continue
            }
          b && ((c = 0 < c.length ? c + '/..' : '..'), (d = 2))
        } else
          (c =
            0 < c.length ? c + ('/' + a.slice(e + 1, h)) : a.slice(e + 1, h)),
            (d = h - e - 1)
      e = h
      f = 0
    } else 46 === g && -1 !== f ? ++f : (f = -1)
  }
  return c
}
var kb = {
    resolve: function () {
      for (
        var a = '', b = !1, c, d = arguments.length - 1;
        -1 <= d && !b;
        d--
      ) {
        if (0 <= d) var e = arguments[d]
        else void 0 === c && (c = eb.cwd()), (e = c)
        M(e)
        0 !== e.length && ((a = e + '/' + a), (b = 47 === e.charCodeAt(0)))
      }
      a = jb(a, !b)
      return b ? (0 < a.length ? '/' + a : '/') : 0 < a.length ? a : '.'
    },
    normalize: function (a) {
      M(a)
      if (0 === a.length) return '.'
      var b = 47 === a.charCodeAt(0),
        c = 47 === a.charCodeAt(a.length - 1)
      a = jb(a, !b)
      0 !== a.length || b || (a = '.')
      0 < a.length && c && (a += '/')
      return b ? '/' + a : a
    },
    isAbsolute: function (a) {
      M(a)
      return 0 < a.length && 47 === a.charCodeAt(0)
    },
    join: function () {
      if (0 === arguments.length) return '.'
      for (var a, b = 0; b < arguments.length; ++b) {
        var c = arguments[b]
        M(c)
        0 < c.length && (a = void 0 === a ? c : a + ('/' + c))
      }
      return void 0 === a ? '.' : kb.normalize(a)
    },
    relative: function (a, b) {
      M(a)
      M(b)
      if (a === b) return ''
      a = kb.resolve(a)
      b = kb.resolve(b)
      if (a === b) return ''
      for (var c = 1; c < a.length && 47 === a.charCodeAt(c); ++c);
      for (
        var d = a.length, e = d - c, f = 1;
        f < b.length && 47 === b.charCodeAt(f);
        ++f
      );
      for (
        var g = b.length - f, h = e < g ? e : g, l = -1, n = 0;
        n <= h;
        ++n
      ) {
        if (n === h) {
          if (g > h) {
            if (47 === b.charCodeAt(f + n)) return b.slice(f + n + 1)
            if (0 === n) return b.slice(f + n)
          } else
            e > h && (47 === a.charCodeAt(c + n) ? (l = n) : 0 === n && (l = 0))
          break
        }
        var r = a.charCodeAt(c + n),
          p = b.charCodeAt(f + n)
        if (r !== p) break
        else 47 === r && (l = n)
      }
      e = ''
      for (n = c + l + 1; n <= d; ++n)
        if (n === d || 47 === a.charCodeAt(n))
          e = 0 === e.length ? e + '..' : e + '/..'
      if (0 < e.length) return e + b.slice(f + l)
      f += l
      47 === b.charCodeAt(f) && ++f
      return b.slice(f)
    },
    _makeLong: function (a) {
      return a
    },
    dirname: function (a) {
      M(a)
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
      M(a)
      var c = 0,
        d = -1,
        e = !0,
        f
      if (void 0 !== b && 0 < b.length && b.length <= a.length) {
        if (b.length === a.length && b === a) return ''
        var g = b.length - 1,
          h = -1
        for (f = a.length - 1; 0 <= f; --f) {
          var l = a.charCodeAt(f)
          if (47 === l) {
            if (!e) {
              c = f + 1
              break
            }
          } else
            -1 === h && ((e = !1), (h = f + 1)),
              0 <= g &&
                (l === b.charCodeAt(g)
                  ? -1 === --g && (d = f)
                  : ((g = -1), (d = h)))
        }
        c === d ? (d = h) : -1 === d && (d = a.length)
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
      M(a)
      for (
        var b = -1, c = 0, d = -1, e = !0, f = 0, g = a.length - 1;
        0 <= g;
        --g
      ) {
        var h = a.charCodeAt(g)
        if (47 === h) {
          if (!e) {
            c = g + 1
            break
          }
        } else
          -1 === d && ((e = !1), (d = g + 1)),
            46 === h
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
      M(a)
      var b = { root: '', dir: '', base: '', ext: '', name: '' }
      if (0 === a.length) return b
      var c = a.charCodeAt(0),
        d = 47 === c
      if (d) {
        b.root = '/'
        var e = 1
      } else e = 0
      for (
        var f = -1, g = 0, h = -1, l = !0, n = a.length - 1, r = 0;
        n >= e;
        --n
      )
        if (((c = a.charCodeAt(n)), 47 === c)) {
          if (!l) {
            g = n + 1
            break
          }
        } else
          -1 === h && ((l = !1), (h = n + 1)),
            46 === c
              ? -1 === f
                ? (f = n)
                : 1 !== r && (r = 1)
              : -1 !== f && (r = -1)
      ;-1 === f ||
      -1 === h ||
      0 === r ||
      (1 === r && f === h - 1 && f === g + 1)
        ? -1 !== h &&
          (b.base =
            0 === g && d ? (b.name = a.slice(1, h)) : (b.name = a.slice(g, h)))
        : (0 === g && d
            ? ((b.name = a.slice(1, f)), (b.base = a.slice(1, h)))
            : ((b.name = a.slice(g, f)), (b.base = a.slice(g, h))),
          (b.ext = a.slice(f, h)))
      0 < g ? (b.dir = a.slice(0, g - 1)) : d && (b.dir = '/')
      return b
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null,
  },
  lb = (kb.posix = kb),
  mb = Object.freeze({ __proto__: null, default: lb, __moduleExports: lb }),
  pb = {
    hrtime: (function (a) {
      return function (b) {
        b = a(b)
        return 1e9 * b[0] + b[1]
      }
    })(function (a) {
      var b = 0.001 * performance.now(),
        c = Math.floor(b) + ib
      b = Math.floor((b % 1) * 1e9)
      a && ((c -= a[0]), (b -= a[1]), 0 > b && (c--, (b += 1e9)))
      return [c, b]
    }),
    exit: function (a) {
      throw new nb(a)
    },
    kill: function (a) {
      throw new ob(a)
    },
    randomFillSync: hb,
    isTTY: function () {
      return !0
    },
    path: mb,
    fs: null,
  },
  N,
  O = k(1),
  P = k(2),
  Q = k(4),
  R = k(8),
  S = k(16),
  qb = k(32),
  T = k(64),
  V = k(128),
  sb = k(256),
  tb = k(512),
  ub = k(1024),
  vb = k(2048),
  wb = k(4096),
  xb = k(8192),
  yb = k(16384),
  zb = k(32768),
  Ab = k(65536),
  Bb = k(131072),
  Cb = k(262144),
  Db = k(524288),
  Eb = k(1048576),
  W = k(2097152),
  Ib = k(4194304),
  Jb = k(8388608),
  Kb = k(16777216),
  Lb = k(33554432),
  Mb = k(67108864),
  X = k(134217728),
  Nb = k(268435456),
  Ob =
    O |
    P |
    Q |
    R |
    S |
    qb |
    T |
    V |
    sb |
    tb |
    ub |
    vb |
    wb |
    xb |
    yb |
    zb |
    Ab |
    Bb |
    Cb |
    Db |
    Eb |
    W |
    Jb |
    Ib |
    Kb |
    Mb |
    Lb |
    X |
    Nb,
  Pb = O | P | Q | R | S | qb | T | V | sb | W | Ib | Jb | X,
  Qb = k(0),
  Rb =
    R |
    S |
    V |
    tb |
    ub |
    vb |
    wb |
    xb |
    yb |
    zb |
    Ab |
    Bb |
    Cb |
    Db |
    Eb |
    W |
    Jb |
    Kb |
    Mb |
    Lb |
    X,
  Sb = Rb | Pb,
  Tb = P | R | T | W | X | Nb,
  Ub = P | R | T | W | X,
  Vb = k(0),
  Wb = {
    E2BIG: 1,
    EACCES: 2,
    EADDRINUSE: 3,
    EADDRNOTAVAIL: 4,
    EAFNOSUPPORT: 5,
    EALREADY: 7,
    EAGAIN: 6,
    EBADF: 8,
    EBADMSG: 9,
    EBUSY: 10,
    ECANCELED: 11,
    ECHILD: 12,
    ECONNABORTED: 13,
    ECONNREFUSED: 14,
    ECONNRESET: 15,
    EDEADLOCK: 16,
    EDESTADDRREQ: 17,
    EDOM: 18,
    EDQUOT: 19,
    EEXIST: 20,
    EFAULT: 21,
    EFBIG: 22,
    EHOSTDOWN: 23,
    EHOSTUNREACH: 23,
    EIDRM: 24,
    EILSEQ: 25,
    EINPROGRESS: 26,
    EINTR: 27,
    EINVAL: 28,
    EIO: 29,
    EISCONN: 30,
    EISDIR: 31,
    ELOOP: 32,
    EMFILE: 33,
    EMLINK: 34,
    EMSGSIZE: 35,
    EMULTIHOP: 36,
    ENAMETOOLONG: 37,
    ENETDOWN: 38,
    ENETRESET: 39,
    ENETUNREACH: 40,
    ENFILE: 41,
    ENOBUFS: 42,
    ENODEV: 43,
    ENOENT: 44,
    ENOEXEC: 45,
    ENOLCK: 46,
    ENOLINK: 47,
    ENOMEM: 48,
    ENOMSG: 49,
    ENOPROTOOPT: 50,
    ENOSPC: 51,
    ENOSYS: 52,
    ENOTCONN: 53,
    ENOTDIR: 54,
    ENOTEMPTY: 55,
    ENOTRECOVERABLE: 56,
    ENOTSOCK: 57,
    ENOTTY: 59,
    ENXIO: 60,
    EOVERFLOW: 61,
    EOWNERDEAD: 62,
    EPERM: 63,
    EPIPE: 64,
    EPROTO: 65,
    EPROTONOSUPPORT: 66,
    EPROTOTYPE: 67,
    ERANGE: 68,
    EROFS: 69,
    ESPIPE: 70,
    ESRCH: 71,
    ESTALE: 72,
    ETIMEDOUT: 73,
    ETXTBSY: 74,
    EXDEV: 75,
  },
  Xb =
    ((N = {}),
    (N[6] = 'SIGHUP'),
    (N[8] = 'SIGINT'),
    (N[11] = 'SIGQUIT'),
    (N[7] = 'SIGILL'),
    (N[15] = 'SIGTRAP'),
    (N[0] = 'SIGABRT'),
    (N[2] = 'SIGBUS'),
    (N[5] = 'SIGFPE'),
    (N[9] = 'SIGKILL'),
    (N[20] = 'SIGUSR1'),
    (N[12] = 'SIGSEGV'),
    (N[21] = 'SIGUSR2'),
    (N[10] = 'SIGPIPE'),
    (N[1] = 'SIGALRM'),
    (N[14] = 'SIGTERM'),
    (N[3] = 'SIGCHLD'),
    (N[4] = 'SIGCONT'),
    (N[13] = 'SIGSTOP'),
    (N[16] = 'SIGTSTP'),
    (N[17] = 'SIGTTIN'),
    (N[18] = 'SIGTTOU'),
    (N[19] = 'SIGURG'),
    (N[23] = 'SIGXCPU'),
    (N[24] = 'SIGXFSZ'),
    (N[22] = 'SIGVTALRM'),
    N),
  Yb = O | P | S | V | W | X,
  Zb = O | T | S | V | W | X
function Y(a) {
  var b = Math.trunc(a)
  a = k(Math.round(1e6 * (a - b)))
  return k(b) * k(1e6) + a
}
function $b(a) {
  'number' === typeof a && (a = Math.trunc(a))
  a = k(a)
  return Number(a / k(1e6))
}
function Z(a) {
  return function () {
    for (var b = [], c = 0; c < arguments.length; c++) b[c] = arguments[c]
    try {
      return a.apply(void 0, fa(b))
    } catch (d) {
      if (d && d.code && 'string' === typeof d.code) return Wb[d.code] || 28
      if (d instanceof ac) return d.errno
      throw d
    }
  }
}
function bc(a, b) {
  var c = a.FD_MAP.get(b)
  if (!c) throw new ac(8)
  if (void 0 === c.filetype) {
    var d = a.bindings.fs.fstatSync(c.real)
    a = cc(a, b, d)
    b = a.rightsBase
    d = a.rightsInheriting
    c.filetype = a.filetype
    c.rights || (c.rights = { base: b, inheriting: d })
  }
  return c
}
function cc(a, b, c) {
  switch (!0) {
    case c.isBlockDevice():
      return { filetype: 1, rightsBase: Ob, rightsInheriting: Ob }
    case c.isCharacterDevice():
      return void 0 !== b && a.bindings.isTTY(b)
        ? { filetype: 2, rightsBase: Ub, rightsInheriting: Vb }
        : { filetype: 2, rightsBase: Ob, rightsInheriting: Ob }
    case c.isDirectory():
      return { filetype: 3, rightsBase: Rb, rightsInheriting: Sb }
    case c.isFIFO():
      return { filetype: 6, rightsBase: Tb, rightsInheriting: Ob }
    case c.isFile():
      return { filetype: 4, rightsBase: Pb, rightsInheriting: Qb }
    case c.isSocket():
      return { filetype: 6, rightsBase: Tb, rightsInheriting: Ob }
    case c.isSymbolicLink():
      return { filetype: 7, rightsBase: k(0), rightsInheriting: k(0) }
    default:
      return { filetype: 0, rightsBase: k(0), rightsInheriting: k(0) }
  }
}
var ac = (function (a) {
    function b(c) {
      var d = a.call(this) || this
      d.errno = c
      Object.setPrototypeOf(d, b.prototype)
      return d
    }
    ba(b, a)
    return b
  })(Error),
  nb = (function (a) {
    function b(c) {
      var d = a.call(this, 'WASI Exit error: ' + c) || this
      d.code = c
      Object.setPrototypeOf(d, b.prototype)
      return d
    }
    ba(b, a)
    return b
  })(Error),
  ob = (function (a) {
    function b(c) {
      var d = a.call(this, 'WASI Kill signal: ' + c) || this
      d.signal = c
      Object.setPrototypeOf(d, b.prototype)
      return d
    }
    ba(b, a)
    return b
  })(Error),
  dc = (function () {
    function a(a) {
      function b(a) {
        switch (a) {
          case 1:
            return r.hrtime()
          case 0:
            return Y(Date.now())
          case 2:
          case 3:
            return r.hrtime() - ec
          default:
            return null
        }
      }
      function d(a, b) {
        a = bc(g, a)
        if (b !== k(0) && (a.rights.base & b) === k(0)) throw new ac(63)
        return a
      }
      function e(a, b) {
        g.refreshMemory()
        return Array.from({ length: b }, function (b, c) {
          c = a + 8 * c
          b = g.view.getUint32(c, !0)
          c = g.view.getUint32(c + 4, !0)
          return new Uint8Array(g.memory.buffer, b, c)
        })
      }
      var f,
        g = this,
        h = {}
      a && a.preopens
        ? (h = a.preopens)
        : a && a.preopenDirectories && (h = a.preopenDirectories)
      var l = {}
      a && a.env && (l = a.env)
      var n = []
      a && a.args && (n = a.args)
      var r = pb
      a && a.bindings && (r = a.bindings)
      this.view = this.memory = void 0
      this.bindings = r
      this.FD_MAP = new Map([
        [
          0,
          {
            real: 0,
            filetype: 2,
            rights: { base: Yb, inheriting: k(0) },
            path: void 0,
          },
        ],
        [
          1,
          {
            real: 1,
            filetype: 2,
            rights: { base: Zb, inheriting: k(0) },
            path: void 0,
          },
        ],
        [
          2,
          {
            real: 2,
            filetype: 2,
            rights: { base: Zb, inheriting: k(0) },
            path: void 0,
          },
        ],
      ])
      var p = this.bindings.fs,
        y = this.bindings.path
      try {
        for (
          var ua = ca(Object.entries(h)), ea = ua.next();
          !ea.done;
          ea = ua.next()
        ) {
          var rb = da(ea.value, 2),
            fc = rb[0],
            Fb = rb[1],
            gc = p.openSync(Fb, p.constants.O_RDONLY),
            hc = fa(this.FD_MAP.keys()).reverse()[0] + 1
          this.FD_MAP.set(hc, {
            real: gc,
            filetype: 3,
            rights: { base: Rb, inheriting: Sb },
            fakePath: fc,
            path: Fb,
          })
        }
      } catch (t) {
        var Gb = { error: t }
      } finally {
        try {
          ea && !ea.done && (f = ua.return) && f.call(ua)
        } finally {
          if (Gb) throw Gb.error
        }
      }
      var ec = r.hrtime()
      this.wasiImport = {
        args_get: function (a, b) {
          g.refreshMemory()
          var c = a,
            d = b
          n.forEach(function (a) {
            g.view.setUint32(c, d, !0)
            c += 4
            d += E.from(g.memory.buffer).write(a + '\x00', d)
          })
          return 0
        },
        args_sizes_get: function (a, b) {
          g.refreshMemory()
          g.view.setUint32(a, n.length, !0)
          a = n.reduce(function (a, b) {
            return a + E.byteLength(b) + 1
          }, 0)
          g.view.setUint32(b, a, !0)
          return 0
        },
        environ_get: function (a, b) {
          g.refreshMemory()
          var c = a,
            d = b
          Object.entries(l).forEach(function (a) {
            var b = da(a, 2)
            a = b[0]
            b = b[1]
            g.view.setUint32(c, d, !0)
            c += 4
            d += E.from(g.memory.buffer).write(a + '=' + b + '\x00', d)
          })
          return 0
        },
        environ_sizes_get: function (a, b) {
          g.refreshMemory()
          var c = Object.entries(l).map(function (a) {
              a = da(a, 2)
              return a[0] + '=' + a[1] + '\x00'
            }),
            d = c.reduce(function (a, b) {
              return a + E.byteLength(b)
            }, 0)
          g.view.setUint32(a, c.length, !0)
          g.view.setUint32(b, d, !0)
          return 0
        },
        clock_res_get: function (a, b) {
          switch (a) {
            case 1:
            case 2:
            case 3:
              var c = k(1)
              break
            case 0:
              c = k(1e3)
          }
          g.view.setBigUint64(b, c)
          return 0
        },
        clock_time_get: function (a, c, d) {
          g.refreshMemory()
          a = b(a)
          if (null === a) return 28
          g.view.setBigUint64(d, k(a), !0)
          return 0
        },
        fd_advise: Z(function (a) {
          d(a, V)
          return 52
        }),
        fd_allocate: Z(function (a) {
          d(a, sb)
          return 52
        }),
        fd_close: Z(function (a) {
          var b = d(a, k(0))
          p.closeSync(b.real)
          g.FD_MAP.delete(a)
          return 0
        }),
        fd_datasync: Z(function (a) {
          a = d(a, O)
          p.fdatasyncSync(a.real)
          return 0
        }),
        fd_fdstat_get: Z(function (a, b) {
          a = d(a, k(0))
          g.refreshMemory()
          g.view.setUint8(b, a.filetype)
          g.view.setUint16(b + 2, 0, !0)
          g.view.setUint16(b + 4, 0, !0)
          g.view.setBigUint64(b + 8, k(a.rights.base), !0)
          g.view.setBigUint64(b + 8 + 8, k(a.rights.inheriting), !0)
          return 0
        }),
        fd_fdstat_set_flags: Z(function (a) {
          d(a, R)
          return 52
        }),
        fd_fdstat_set_rights: Z(function (a, b, c) {
          a = d(a, k(0))
          if (
            (a.rights.base | b) > a.rights.base ||
            (a.rights.inheriting | c) > a.rights.inheriting
          )
            return 63
          a.rights.base = b
          a.rights.inheriting = c
          return 0
        }),
        fd_filestat_get: Z(function (a, b) {
          a = d(a, W)
          var c = p.fstatSync(a.real)
          g.refreshMemory()
          g.view.setBigUint64(b, k(c.dev), !0)
          b += 8
          g.view.setBigUint64(b, k(c.ino), !0)
          b += 8
          g.view.setUint8(b, a.filetype)
          b += 8
          g.view.setBigUint64(b, k(c.nlink), !0)
          b += 8
          g.view.setBigUint64(b, k(c.size), !0)
          b += 8
          g.view.setBigUint64(b, Y(c.atimeMs), !0)
          b += 8
          g.view.setBigUint64(b, Y(c.mtimeMs), !0)
          g.view.setBigUint64(b + 8, Y(c.ctimeMs), !0)
          return 0
        }),
        fd_filestat_set_size: Z(function (a, b) {
          a = d(a, Ib)
          p.ftruncateSync(a.real, Number(b))
          return 0
        }),
        fd_filestat_set_times: Z(function (a, c, e, g) {
          a = d(a, Jb)
          var f = p.fstatSync(a.real),
            t = f.atime
          f = f.mtime
          var q = $b(b(0))
          if (3 === (g & 3) || 12 === (g & 12)) return 28
          1 === (g & 1) ? (t = $b(c)) : 2 === (g & 2) && (t = q)
          4 === (g & 4) ? (f = $b(e)) : 8 === (g & 8) && (f = q)
          p.futimesSync(a.real, new Date(t), new Date(f))
          return 0
        }),
        fd_prestat_get: Z(function (a, b) {
          a = d(a, k(0))
          if (!a.path) return 28
          g.refreshMemory()
          g.view.setUint8(b, 0)
          g.view.setUint32(b + 4, E.byteLength(a.fakePath), !0)
          return 0
        }),
        fd_prestat_dir_name: Z(function (a, b, c) {
          a = d(a, k(0))
          if (!a.path) return 28
          g.refreshMemory()
          E.from(g.memory.buffer).write(a.fakePath, b, c, 'utf8')
          return 0
        }),
        fd_pwrite: Z(function (a, b, c, f, h) {
          var t = d(a, T | Q),
            q = 0
          e(b, c).forEach(function (a) {
            for (var b = 0; b < a.byteLength; )
              b += p.writeSync(
                t.real,
                a,
                b,
                a.byteLength - b,
                Number(f) + q + b
              )
            q += b
          })
          g.view.setUint32(h, q, !0)
          return 0
        }),
        fd_write: Z(function (a, b, c, f) {
          var t = d(a, T),
            q = 0
          e(b, c).forEach(function (a) {
            for (var b = 0; b < a.byteLength; ) {
              var c = p.writeSync(
                t.real,
                a,
                b,
                a.byteLength - b,
                t.offset ? Number(t.offset) : null
              )
              t.offset && (t.offset += k(c))
              b += c
            }
            q += b
          })
          g.view.setUint32(f, q, !0)
          return 0
        }),
        fd_pread: Z(function (a, b, c, f, h) {
          var t
          a = d(a, P | Q)
          var q = 0
          try {
            var x = ca(e(b, c)),
              l = x.next()
            a: for (; !l.done; l = x.next()) {
              var n = l.value
              for (b = 0; b < n.byteLength; ) {
                var ic = n.byteLength - b,
                  B = p.readSync(
                    a.real,
                    n,
                    b,
                    n.byteLength - b,
                    Number(f) + q + b
                  )
                b += B
                q += B
                if (0 === B || B < ic) break a
              }
              q += b
            }
          } catch (U) {
            var r = { error: U }
          } finally {
            try {
              l && !l.done && (t = x.return) && t.call(x)
            } finally {
              if (r) throw r.error
            }
          }
          g.view.setUint32(h, q, !0)
          return 0
        }),
        fd_read: Z(function (a, b, c, f) {
          var t
          a = d(a, P)
          var q = 0 === a.real,
            h = 0
          try {
            var x = ca(e(b, c)),
              l = x.next()
            a: for (; !l.done; l = x.next()) {
              var n = l.value
              for (b = 0; b < n.byteLength; ) {
                var B = n.byteLength - b,
                  r = p.readSync(
                    a.real,
                    n,
                    b,
                    B,
                    q || void 0 === a.offset ? null : Number(a.offset)
                  )
                q || (a.offset = (a.offset ? a.offset : k(0)) + k(r))
                b += r
                h += r
                if (0 === r || r < B) break a
              }
            }
          } catch (U) {
            var y = { error: U }
          } finally {
            try {
              l && !l.done && (t = x.return) && t.call(x)
            } finally {
              if (y) throw y.error
            }
          }
          g.view.setUint32(f, h, !0)
          return 0
        }),
        fd_readdir: Z(function (a, b, c, e, f) {
          a = d(a, yb)
          g.refreshMemory()
          var t = p.readdirSync(a.path, { withFileTypes: !0 }),
            q = b
          for (e = Number(e); e < t.length; e += 1) {
            var h = t[e],
              x = E.byteLength(h.name)
            if (b - q > c) break
            g.view.setBigUint64(b, k(e + 1), !0)
            b += 8
            if (b - q > c) break
            var l = p.statSync(y.resolve(a.path, h.name))
            g.view.setBigUint64(b, k(l.ino), !0)
            b += 8
            if (b - q > c) break
            g.view.setUint32(b, x, !0)
            b += 4
            if (b - q > c) break
            switch (!0) {
              case l.isBlockDevice():
                l = 1
                break
              case l.isCharacterDevice():
                l = 2
                break
              case l.isDirectory():
                l = 3
                break
              case l.isFIFO():
                l = 6
                break
              case l.isFile():
                l = 4
                break
              case l.isSocket():
                l = 6
                break
              case l.isSymbolicLink():
                l = 7
                break
              default:
                l = 0
            }
            g.view.setUint8(b, l)
            b += 1
            b += 3
            if (b + x >= q + c) break
            E.from(g.memory.buffer).write(h.name, b)
            b += x
          }
          g.view.setUint32(f, Math.min(b - q, c), !0)
          return 0
        }),
        fd_renumber: Z(function (a, b) {
          d(a, k(0))
          d(b, k(0))
          p.closeSync(g.FD_MAP.get(a).real)
          g.FD_MAP.set(a, g.FD_MAP.get(b))
          g.FD_MAP.delete(b)
          return 0
        }),
        fd_seek: Z(function (a, b, c, e) {
          a = d(a, Q)
          g.refreshMemory()
          switch (c) {
            case 1:
              a.offset = (a.offset ? a.offset : k(0)) + k(b)
              break
            case 2:
              c = p.fstatSync(a.real).size
              a.offset = k(c) + k(b)
              break
            case 0:
              a.offset = k(b)
          }
          g.view.setBigUint64(e, a.offset, !0)
          return 0
        }),
        fd_tell: Z(function (a, b) {
          a = d(a, qb)
          g.refreshMemory()
          a.offset || (a.offset = k(0))
          g.view.setBigUint64(b, a.offset, !0)
          return 0
        }),
        fd_sync: Z(function (a) {
          a = d(a, S)
          p.fsyncSync(a.real)
          return 0
        }),
        path_create_directory: Z(function (a, b, c) {
          a = d(a, tb)
          if (!a.path) return 28
          g.refreshMemory()
          b = E.from(g.memory.buffer, b, c).toString()
          p.mkdirSync(y.resolve(a.path, b))
          return 0
        }),
        path_filestat_get: Z(function (a, b, c, e, f) {
          a = d(a, Cb)
          if (!a.path) return 28
          g.refreshMemory()
          c = E.from(g.memory.buffer, c, e).toString()
          c = p.statSync(y.resolve(a.path, c))
          g.view.setBigUint64(f, k(c.dev), !0)
          f += 8
          g.view.setBigUint64(f, k(c.ino), !0)
          f += 8
          g.view.setUint8(f, cc(g, void 0, c).filetype)
          f += 8
          g.view.setBigUint64(f, k(c.nlink), !0)
          f += 8
          g.view.setBigUint64(f, k(c.size), !0)
          f += 8
          g.view.setBigUint64(f, Y(c.atimeMs), !0)
          f += 8
          g.view.setBigUint64(f, Y(c.mtimeMs), !0)
          g.view.setBigUint64(f + 8, Y(c.ctimeMs), !0)
          return 0
        }),
        path_filestat_set_times: Z(function (a, c, e, f, h, l, n) {
          a = d(a, Eb)
          if (!a.path) return 28
          g.refreshMemory()
          var t = p.fstatSync(a.real)
          c = t.atime
          t = t.mtime
          var q = $b(b(0))
          if (3 === (n & 3) || 12 === (n & 12)) return 28
          1 === (n & 1) ? (c = $b(h)) : 2 === (n & 2) && (c = q)
          4 === (n & 4) ? (t = $b(l)) : 8 === (n & 8) && (t = q)
          e = E.from(g.memory.buffer, e, f).toString()
          p.utimesSync(y.resolve(a.path, e), new Date(c), new Date(t))
          return 0
        }),
        path_link: Z(function (a, b, c, e, f, h, l) {
          a = d(a, vb)
          f = d(f, wb)
          if (!a.path || !f.path) return 28
          g.refreshMemory()
          c = E.from(g.memory.buffer, c, e).toString()
          h = E.from(g.memory.buffer, h, l).toString()
          p.linkSync(y.resolve(a.path, c), y.resolve(f.path, h))
          return 0
        }),
        path_open: Z(function (a, b, c, e, f, h, l, n, r) {
          b = d(a, xb)
          h = k(h)
          l = k(l)
          a = (h & (P | yb)) !== k(0)
          var t = (h & (O | T | sb | Ib)) !== k(0)
          if (t && a) var q = p.constants.O_RDWR
          else a ? (q = p.constants.O_RDONLY) : t && (q = p.constants.O_WRONLY)
          a = h | xb
          h |= l
          0 !== (f & 1) && ((q |= p.constants.O_CREAT), (a |= ub))
          0 !== (f & 2) && (q |= p.constants.O_DIRECTORY)
          0 !== (f & 4) && (q |= p.constants.O_EXCL)
          0 !== (f & 8) && ((q |= p.constants.O_TRUNC), (a |= Db))
          0 !== (n & 1) && (q |= p.constants.O_APPEND)
          0 !== (n & 2) &&
            ((q = p.constants.O_DSYNC
              ? q | p.constants.O_DSYNC
              : q | p.constants.O_SYNC),
            (h |= O))
          0 !== (n & 4) && (q |= p.constants.O_NONBLOCK)
          0 !== (n & 8) &&
            ((q = p.constants.O_RSYNC
              ? q | p.constants.O_RSYNC
              : q | p.constants.O_SYNC),
            (h |= S))
          0 !== (n & 16) && ((q |= p.constants.O_SYNC), (h |= S))
          t &&
            0 === (q & (p.constants.O_APPEND | p.constants.O_TRUNC)) &&
            (h |= Q)
          g.refreshMemory()
          c = E.from(g.memory.buffer, c, e).toString()
          c = y.resolve(b.path, c)
          if (y.relative(b.path, c).startsWith('..')) return 76
          try {
            var x = p.realpathSync(c)
            if (y.relative(b.path, x).startsWith('..')) return 76
          } catch (U) {
            if ('ENOENT' === U.code) x = c
            else throw U
          }
          try {
            var B = p.statSync(x).isDirectory()
          } catch (U) {}
          q = !t && B ? p.openSync(x, p.constants.O_RDONLY) : p.openSync(x, q)
          B = fa(g.FD_MAP.keys()).reverse()[0] + 1
          g.FD_MAP.set(B, {
            real: q,
            filetype: void 0,
            rights: { base: a, inheriting: h },
            path: x,
          })
          bc(g, B)
          g.view.setUint32(r, B, !0)
          return 0
        }),
        path_readlink: Z(function (a, b, c, e, f, h) {
          a = d(a, zb)
          if (!a.path) return 28
          g.refreshMemory()
          b = E.from(g.memory.buffer, b, c).toString()
          b = y.resolve(a.path, b)
          b = p.readlinkSync(b)
          e = E.from(g.memory.buffer).write(b, e, f)
          g.view.setUint32(h, e, !0)
          return 0
        }),
        path_remove_directory: Z(function (a, b, c) {
          a = d(a, Lb)
          if (!a.path) return 28
          g.refreshMemory()
          b = E.from(g.memory.buffer, b, c).toString()
          p.rmdirSync(y.resolve(a.path, b))
          return 0
        }),
        path_rename: Z(function (a, b, c, e, f, h) {
          a = d(a, Ab)
          e = d(e, Bb)
          if (!a.path || !e.path) return 28
          g.refreshMemory()
          b = E.from(g.memory.buffer, b, c).toString()
          f = E.from(g.memory.buffer, f, h).toString()
          p.renameSync(y.resolve(a.path, b), y.resolve(e.path, f))
          return 0
        }),
        path_symlink: Z(function (a, b, c, e, f) {
          c = d(c, Kb)
          if (!c.path) return 28
          g.refreshMemory()
          a = E.from(g.memory.buffer, a, b).toString()
          e = E.from(g.memory.buffer, e, f).toString()
          p.symlinkSync(a, y.resolve(c.path, e))
          return 0
        }),
        path_unlink_file: Z(function (a, b, c) {
          a = d(a, Mb)
          if (!a.path) return 28
          g.refreshMemory()
          b = E.from(g.memory.buffer, b, c).toString()
          p.unlinkSync(y.resolve(a.path, b))
          return 0
        }),
        poll_oneoff: function (a, c, d, e) {
          var f = 0,
            h = 0
          g.refreshMemory()
          for (var l = 0; l < d; l += 1) {
            var n = g.view.getBigUint64(a, !0)
            a += 8
            var p = g.view.getUint8(a)
            a += 1
            switch (p) {
              case 0:
                a += 7
                g.view.getBigUint64(a, !0)
                a += 8
                var q = g.view.getUint32(a, !0)
                a += 4
                a += 4
                p = g.view.getBigUint64(a, !0)
                a += 8
                g.view.getBigUint64(a, !0)
                a += 8
                var t = g.view.getUint16(a, !0)
                a += 2
                a += 6
                var x = 1 === t
                t = 0
                q = k(b(q))
                null === q
                  ? (t = 28)
                  : ((p = x ? p : q + p), (h = p > h ? p : h))
                g.view.setBigUint64(c, n, !0)
                c += 8
                g.view.setUint16(c, t, !0)
                c += 2
                g.view.setUint8(c, 0)
                c += 1
                c += 5
                f += 1
                break
              case 1:
              case 2:
                a += 3
                g.view.getUint32(a, !0)
                a += 4
                g.view.setBigUint64(c, n, !0)
                c += 8
                g.view.setUint16(c, 52, !0)
                c += 2
                g.view.setUint8(c, p)
                c += 1
                c += 5
                f += 1
                break
              default:
                return 28
            }
          }
          for (g.view.setUint32(e, f, !0); r.hrtime() < h; );
          return 0
        },
        proc_exit: function (a) {
          r.exit(a)
          return 0
        },
        proc_raise: function (a) {
          if (!(a in Xb)) return 28
          r.kill(Xb[a])
          return 0
        },
        random_get: function (a, b) {
          g.refreshMemory()
          r.randomFillSync(new Uint8Array(g.memory.buffer), a, b)
          return 0
        },
        sched_yield: function () {
          return 0
        },
        sock_recv: function () {
          return 52
        },
        sock_send: function () {
          return 52
        },
        sock_shutdown: function () {
          return 52
        },
      }
      a.traceSyscalls &&
        Object.keys(this.wasiImport).forEach(function (a) {
          var b = g.wasiImport[a]
          g.wasiImport[a] = function () {
            for (var c = [], d = 0; d < arguments.length; d++)
              c[d] = arguments[d]
            console.log('WASI: wasiImport called: ' + a + ' (' + c + ')')
            try {
              var e = b.apply(void 0, fa(c))
              console.log('WASI:  => ' + e)
              return e
            } catch (Hb) {
              throw (console.log('Catched error: ' + Hb), Hb)
            }
          }
        })
    }
    a.prototype.refreshMemory = function () {
      ;(this.view && 0 !== this.view.buffer.byteLength) ||
        (this.view = new ia(this.memory.buffer))
    }
    a.prototype.setMemory = function (a) {
      this.memory = a
    }
    a.prototype.start = function (a) {
      a = a.exports
      if (null === a || 'object' !== typeof a)
        throw Error('instance.exports must be an Object. Received ' + a + '.')
      var b = a.memory
      if (!(b instanceof WebAssembly.Memory))
        throw Error(
          'instance.exports.memory must be a WebAssembly.Memory. Recceived ' +
            b +
            '.'
        )
      this.setMemory(b)
      a._start && a._start()
    }
    a.prototype.getImportNamespace = function (a) {
      var b,
        d = null
      try {
        for (
          var e = ca(WebAssembly.Module.imports(a)), f = e.next();
          !f.done;
          f = e.next()
        ) {
          var g = f.value
          if ('function' === g.kind && g.module.startsWith('wasi_'))
            if (!d) d = g.module
            else if (d !== g.module)
              throw Error('Multiple namespaces detected.')
        }
      } catch (l) {
        var h = { error: l }
      } finally {
        try {
          f && !f.done && (b = e.return) && b.call(e)
        } finally {
          if (h) throw h.error
        }
      }
      return d
    }
    a.prototype.getImports = function (a) {
      switch (this.getImportNamespace(a)) {
        case 'wasi_unstable':
          return { wasi_unstable: this.wasiImport }
        case 'wasi_snapshot_preview1':
          return { wasi_snapshot_preview1: this.wasiImport }
        default:
          throw Error(
            "Can't detect a WASI namespace for the WebAssembly Module"
          )
      }
    }
    a.defaultBindings = pb
    return a
  })()
export default dc
export { dc as WASI, ac as WASIError, nb as WASIExitError, ob as WASIKillError }
