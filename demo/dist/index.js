/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 440:
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 470:
/***/ ((module) => {

"use strict";
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ 417:
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_16731__) => {

"use strict";
/* harmony export */ __nested_webpack_require_16731__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    : 'undefined' !== typeof __nested_webpack_require_16731__.g
    ? __nested_webpack_require_16731__.g
    : 'undefined' !== typeof self
    ? self
    : {}
function aa(a, b) {
  return (b = { exports: {} }), a(b, b.exports), b.exports
}
var k =
  'undefined' !== typeof __nested_webpack_require_16731__.g
    ? __nested_webpack_require_16731__.g
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
      : 'undefined' !== typeof __nested_webpack_require_16731__.g
      ? __nested_webpack_require_16731__.g
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gb);


/***/ }),

/***/ 869:
/***/ ((module, exports, __nested_webpack_require_96156__) => {

var __dirname = "/";
function run(Module) {
  var Module = typeof Module !== 'undefined' ? Module : {}
  var moduleOverrides = {}
  var key
  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key]
    }
  }
  var arguments_ = []
  var thisProgram = './this.program'
  var quit_ = function (status, toThrow) {
    throw toThrow
  }
  var ENVIRONMENT_IS_WEB = false
  var ENVIRONMENT_IS_WORKER = false
  var ENVIRONMENT_IS_NODE = false
  var ENVIRONMENT_IS_SHELL = false
  ENVIRONMENT_IS_WEB = typeof window === 'object'
  ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'
  ENVIRONMENT_IS_NODE =
    typeof process === 'object' &&
    typeof process.versions === 'object' &&
    typeof process.versions.node === 'string'
  ENVIRONMENT_IS_SHELL =
    !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER
  var scriptDirectory = ''
  function locateFile(path) {
    if (Module['locateFile']) {
      return Module['locateFile'](path, scriptDirectory)
    }
    return scriptDirectory + path
  }
  var read_, readAsync, readBinary, setWindowTitle
  var nodeFS
  var nodePath
  if (ENVIRONMENT_IS_NODE) {
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = __nested_webpack_require_96156__(470).dirname(scriptDirectory) + '/'
    } else {
      scriptDirectory = __dirname + '/'
    }
    read_ = function shell_read(filename, binary) {
      if (!nodeFS) nodeFS = __nested_webpack_require_96156__(351)
      if (!nodePath) nodePath = __nested_webpack_require_96156__(470)
      filename = nodePath['normalize'](filename)
      return nodeFS['readFileSync'](filename, binary ? null : 'utf8')
    }
    readBinary = function readBinary(filename) {
      var ret = read_(filename, true)
      if (!ret.buffer) {
        ret = new Uint8Array(ret)
      }
      assert(ret.buffer)
      return ret
    }
    if (process['argv'].length > 1) {
      thisProgram = process['argv'][1].replace(/\\/g, '/')
    }
    arguments_ = process['argv'].slice(2)
    if (true) {
      module['exports'] = Module
    }
    process['on']('uncaughtException', function (ex) {
      if (!(ex instanceof ExitStatus)) {
        throw ex
      }
    })
    process['on']('unhandledRejection', abort)
    quit_ = function (status) {
      process['exit'](status)
    }
    Module['inspect'] = function () {
      return '[Emscripten Module object]'
    }
  } else if (ENVIRONMENT_IS_SHELL) {
    if (typeof read != 'undefined') {
      read_ = function shell_read(f) {
        return read(f)
      }
    }
    readBinary = function readBinary(f) {
      var data
      if (typeof readbuffer === 'function') {
        return new Uint8Array(readbuffer(f))
      }
      data = read(f, 'binary')
      assert(typeof data === 'object')
      return data
    }
    if (typeof scriptArgs != 'undefined') {
      arguments_ = scriptArgs
    } else if (typeof arguments != 'undefined') {
      arguments_ = arguments
    }
    if (typeof quit === 'function') {
      quit_ = function (status) {
        quit(status)
      }
    }
    if (typeof print !== 'undefined') {
      if (typeof console === 'undefined') console = {}
      console.log = print
      console.warn = console.error =
        typeof printErr !== 'undefined' ? printErr : print
    }
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = self.location.href
    } else if (typeof document !== 'undefined' && document.currentScript) {
      scriptDirectory = document.currentScript.src
    }
    if (scriptDirectory.indexOf('blob:') !== 0) {
      scriptDirectory = scriptDirectory.substr(
        0,
        scriptDirectory.lastIndexOf('/') + 1
      )
    } else {
      scriptDirectory = ''
    }
    {
      read_ = function (url) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.send(null)
        return xhr.responseText
      }
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = function (url) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          xhr.responseType = 'arraybuffer'
          xhr.send(null)
          return new Uint8Array(xhr.response)
        }
      }
      readAsync = function (url, onload, onerror) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function () {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
            onload(xhr.response)
            return
          }
          onerror()
        }
        xhr.onerror = onerror
        xhr.send(null)
      }
    }
    setWindowTitle = function (title) {
      document.title = title
    }
  } else {
  }
  var out = Module['print'] || console.log.bind(console)
  var err = Module['printErr'] || console.warn.bind(console)
  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key]
    }
  }
  moduleOverrides = null
  if (Module['arguments']) arguments_ = Module['arguments']
  if (Module['thisProgram']) thisProgram = Module['thisProgram']
  if (Module['quit']) quit_ = Module['quit']
  var STACK_ALIGN = 16
  function alignMemory(size, factor) {
    if (!factor) factor = STACK_ALIGN
    return Math.ceil(size / factor) * factor
  }
  var tempRet0 = 0
  var setTempRet0 = function (value) {
    tempRet0 = value
  }
  var wasmBinary
  if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']
  var noExitRuntime = Module['noExitRuntime'] || true
  if (typeof WebAssembly !== 'object') {
    abort('no native wasm support detected')
  }
  var wasmMemory
  var ABORT = false
  var EXITSTATUS
  function assert(condition, text) {
    if (!condition) {
      abort('Assertion failed: ' + text)
    }
  }
  var UTF8Decoder =
    typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined
  function UTF8ArrayToString(heap, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead
    var endPtr = idx
    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr
    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(heap.subarray(idx, endPtr))
    } else {
      var str = ''
      while (idx < endPtr) {
        var u0 = heap[idx++]
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0)
          continue
        }
        var u1 = heap[idx++] & 63
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1)
          continue
        }
        var u2 = heap[idx++] & 63
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63)
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0)
        } else {
          var ch = u0 - 65536
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
        }
      }
    }
    return str
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ''
  }
  function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0
    var startIdx = outIdx
    var endIdx = outIdx + maxBytesToWrite - 1
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i)
        u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
      }
      if (u <= 127) {
        if (outIdx >= endIdx) break
        heap[outIdx++] = u
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break
        heap[outIdx++] = 192 | (u >> 6)
        heap[outIdx++] = 128 | (u & 63)
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break
        heap[outIdx++] = 224 | (u >> 12)
        heap[outIdx++] = 128 | ((u >> 6) & 63)
        heap[outIdx++] = 128 | (u & 63)
      } else {
        if (outIdx + 3 >= endIdx) break
        heap[outIdx++] = 240 | (u >> 18)
        heap[outIdx++] = 128 | ((u >> 12) & 63)
        heap[outIdx++] = 128 | ((u >> 6) & 63)
        heap[outIdx++] = 128 | (u & 63)
      }
    }
    heap[outIdx] = 0
    return outIdx - startIdx
  }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
  }
  function lengthBytesUTF8(str) {
    var len = 0
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
      if (u <= 127) ++len
      else if (u <= 2047) len += 2
      else if (u <= 65535) len += 3
      else len += 4
    }
    return len
  }
  function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1
    var ret = _malloc(size)
    if (ret) stringToUTF8Array(str, HEAP8, ret, size)
    return ret
  }
  function allocateUTF8OnStack(str) {
    var size = lengthBytesUTF8(str) + 1
    var ret = stackAlloc(size)
    stringToUTF8Array(str, HEAP8, ret, size)
    return ret
  }
  function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer)
  }
  function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++ >> 0] = str.charCodeAt(i)
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0
  }
  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
  function updateGlobalBufferAndViews(buf) {
    buffer = buf
    Module['HEAP8'] = HEAP8 = new Int8Array(buf)
    Module['HEAP16'] = HEAP16 = new Int16Array(buf)
    Module['HEAP32'] = HEAP32 = new Int32Array(buf)
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf)
    Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf)
    Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf)
    Module['HEAPF32'] = HEAPF32 = new Float32Array(buf)
    Module['HEAPF64'] = HEAPF64 = new Float64Array(buf)
  }
  var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216
  var wasmTable
  var __ATPRERUN__ = []
  var __ATINIT__ = []
  var __ATMAIN__ = []
  var __ATPOSTRUN__ = []
  var runtimeInitialized = false
  var runtimeExited = false
  __ATINIT__.push({
    func: function () {
      ___wasm_call_ctors()
    },
  })
  function preRun() {
    if (Module['preRun']) {
      if (typeof Module['preRun'] == 'function')
        Module['preRun'] = [Module['preRun']]
      while (Module['preRun'].length) {
        addOnPreRun(Module['preRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPRERUN__)
  }
  function initRuntime() {
    runtimeInitialized = true
    if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
    TTY.init()
    callRuntimeCallbacks(__ATINIT__)
  }
  function preMain() {
    FS.ignorePermissions = false
    callRuntimeCallbacks(__ATMAIN__)
  }
  function exitRuntime() {
    runtimeExited = true
  }
  function postRun() {
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function')
        Module['postRun'] = [Module['postRun']]
      while (Module['postRun'].length) {
        addOnPostRun(Module['postRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__)
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb)
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb)
  }
  var runDependencies = 0
  var runDependencyWatcher = null
  var dependenciesFulfilled = null
  function getUniqueRunDependency(id) {
    return id
  }
  function addRunDependency(id) {
    runDependencies++
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
  }
  function removeRunDependency(id) {
    runDependencies--
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher)
        runDependencyWatcher = null
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled
        dependenciesFulfilled = null
        callback()
      }
    }
  }
  Module['preloadedImages'] = {}
  Module['preloadedAudios'] = {}
  function abort(what) {
    if (Module['onAbort']) {
      Module['onAbort'](what)
    }
    what += ''
    err(what)
    ABORT = true
    EXITSTATUS = 1
    what = 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.'
    var e = new WebAssembly.RuntimeError(what)
    throw e
  }
  function hasPrefix(str, prefix) {
    return String.prototype.startsWith
      ? str.startsWith(prefix)
      : str.indexOf(prefix) === 0
  }
  var dataURIPrefix = 'data:application/octet-stream;base64,'
  function isDataURI(filename) {
    return hasPrefix(filename, dataURIPrefix)
  }
  var fileURIPrefix = 'file://'
  function isFileURI(filename) {
    return hasPrefix(filename, fileURIPrefix)
  }
  var wasmBinaryFile = 'llc.wasm'
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile)
  }
  function getBinary(file) {
    try {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary)
      }
      if (readBinary) {
        return readBinary(file)
      } else {
        throw 'both async and sync fetching of the wasm failed'
      }
    } catch (err) {
      abort(err)
    }
  }
  function getBinaryPromise() {
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
      if (typeof fetch === 'function' && !isFileURI(wasmBinaryFile)) {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' })
          .then(function (response) {
            if (!response['ok']) {
              throw (
                "failed to load wasm binary file at '" + wasmBinaryFile + "'"
              )
            }
            return response['arrayBuffer']()
          })
          .catch(function () {
            return getBinary(wasmBinaryFile)
          })
      } else {
        if (readAsync) {
          return new Promise(function (resolve, reject) {
            readAsync(
              wasmBinaryFile,
              function (response) {
                resolve(new Uint8Array(response))
              },
              reject
            )
          })
        }
      }
    }
    return Promise.resolve().then(function () {
      return getBinary(wasmBinaryFile)
    })
  }
  function createWasm() {
    var info = { a: asmLibraryArg }
    function receiveInstance(instance, module) {
      var exports = instance.exports
      Module['asm'] = exports
      wasmMemory = Module['asm']['V']
      updateGlobalBufferAndViews(wasmMemory.buffer)
      wasmTable = Module['asm']['_']
      removeRunDependency('wasm-instantiate')
    }
    addRunDependency('wasm-instantiate')
    function receiveInstantiatedSource(output) {
      receiveInstance(output['instance'])
    }
    function instantiateArrayBuffer(receiver) {
      return getBinaryPromise()
        .then(function (binary) {
          return WebAssembly.instantiate(binary, info)
        })
        .then(receiver, function (reason) {
          err('failed to asynchronously prepare wasm: ' + reason)
          abort(reason)
        })
    }
    function instantiateAsync() {
      if (
        !wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function'
      ) {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(
          function (response) {
            var result = WebAssembly.instantiateStreaming(response, info)
            return result.then(receiveInstantiatedSource, function (reason) {
              err('wasm streaming compile failed: ' + reason)
              err('falling back to ArrayBuffer instantiation')
              return instantiateArrayBuffer(receiveInstantiatedSource)
            })
          }
        )
      } else {
        return instantiateArrayBuffer(receiveInstantiatedSource)
      }
    }
    if (Module['instantiateWasm']) {
      try {
        var exports = Module['instantiateWasm'](info, receiveInstance)
        return exports
      } catch (e) {
        err('Module.instantiateWasm callback failed with error: ' + e)
        return false
      }
    }
    instantiateAsync()
    return {}
  }
  var tempDouble
  var tempI64
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift()
      if (typeof callback == 'function') {
        callback(Module)
        continue
      }
      var func = callback.func
      if (typeof func === 'number') {
        if (callback.arg === undefined) {
          wasmTable.get(func)()
        } else {
          wasmTable.get(func)(callback.arg)
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg)
      }
    }
  }
  Module['callRuntimeCallbacks'] = callRuntimeCallbacks
  function demangle(func) {
    return func
  }
  Module['demangle'] = demangle
  function demangleAll(text) {
    var regex = /\b_Z[\w\d_]+/g
    return text.replace(regex, function (x) {
      var y = demangle(x)
      return x === y ? x : y + ' [' + x + ']'
    })
  }
  Module['demangleAll'] = demangleAll
  function jsStackTrace() {
    var error = new Error()
    if (!error.stack) {
      try {
        throw new Error()
      } catch (e) {
        error = e
      }
      if (!error.stack) {
        return '(no stack trace available)'
      }
    }
    return error.stack.toString()
  }
  Module['jsStackTrace'] = jsStackTrace
  function stackTrace() {
    var js = jsStackTrace()
    if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']()
    return demangleAll(js)
  }
  Module['stackTrace'] = stackTrace
  function _atexit(func, arg) {}
  Module['_atexit'] = _atexit
  function ___cxa_atexit(a0, a1) {
    return _atexit(a0, a1)
  }
  Module['___cxa_atexit'] = ___cxa_atexit
  var PATH = {
    splitPath: function (filename) {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      return splitPathRe.exec(filename).slice(1)
    },
    normalizeArray: function (parts, allowAboveRoot) {
      var up = 0
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i]
        if (last === '.') {
          parts.splice(i, 1)
        } else if (last === '..') {
          parts.splice(i, 1)
          up++
        } else if (up) {
          parts.splice(i, 1)
          up--
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift('..')
        }
      }
      return parts
    },
    normalize: function (path) {
      var isAbsolute = path.charAt(0) === '/',
        trailingSlash = path.substr(-1) === '/'
      path = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        !isAbsolute
      ).join('/')
      if (!path && !isAbsolute) {
        path = '.'
      }
      if (path && trailingSlash) {
        path += '/'
      }
      return (isAbsolute ? '/' : '') + path
    },
    dirname: function (path) {
      var result = PATH.splitPath(path),
        root = result[0],
        dir = result[1]
      if (!root && !dir) {
        return '.'
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1)
      }
      return root + dir
    },
    basename: function (path) {
      if (path === '/') return '/'
      path = PATH.normalize(path)
      path = path.replace(/\/$/, '')
      var lastSlash = path.lastIndexOf('/')
      if (lastSlash === -1) return path
      return path.substr(lastSlash + 1)
    },
    extname: function (path) {
      return PATH.splitPath(path)[3]
    },
    join: function () {
      var paths = Array.prototype.slice.call(arguments, 0)
      return PATH.normalize(paths.join('/'))
    },
    join2: function (l, r) {
      return PATH.normalize(l + '/' + r)
    },
  }
  Module['PATH'] = PATH
  function getRandomDevice() {
    if (
      typeof crypto === 'object' &&
      typeof crypto['getRandomValues'] === 'function'
    ) {
      var randomBuffer = new Uint8Array(1)
      return function () {
        crypto.getRandomValues(randomBuffer)
        return randomBuffer[0]
      }
    } else if (ENVIRONMENT_IS_NODE) {
      try {
        var crypto_module = __nested_webpack_require_96156__(85)
        return function () {
          return crypto_module['randomBytes'](1)[0]
        }
      } catch (e) {}
    }
    return function () {
      abort('randomDevice')
    }
  }
  Module['getRandomDevice'] = getRandomDevice
  var PATH_FS = {
    resolve: function () {
      var resolvedPath = '',
        resolvedAbsolute = false
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd()
        if (typeof path !== 'string') {
          throw new TypeError('Arguments to path.resolve must be strings')
        } else if (!path) {
          return ''
        }
        resolvedPath = path + '/' + resolvedPath
        resolvedAbsolute = path.charAt(0) === '/'
      }
      resolvedPath = PATH.normalizeArray(
        resolvedPath.split('/').filter(function (p) {
          return !!p
        }),
        !resolvedAbsolute
      ).join('/')
      return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
    },
    relative: function (from, to) {
      from = PATH_FS.resolve(from).substr(1)
      to = PATH_FS.resolve(to).substr(1)
      function trim(arr) {
        var start = 0
        for (; start < arr.length; start++) {
          if (arr[start] !== '') break
        }
        var end = arr.length - 1
        for (; end >= 0; end--) {
          if (arr[end] !== '') break
        }
        if (start > end) return []
        return arr.slice(start, end - start + 1)
      }
      var fromParts = trim(from.split('/'))
      var toParts = trim(to.split('/'))
      var length = Math.min(fromParts.length, toParts.length)
      var samePartsLength = length
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i
          break
        }
      }
      var outputParts = []
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..')
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength))
      return outputParts.join('/')
    },
  }
  Module['PATH_FS'] = PATH_FS
  var TTY = {
    ttys: [],
    init: function () {},
    shutdown: function () {},
    register: function (dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops: ops }
      FS.registerDevice(dev, TTY.stream_ops)
    },
    stream_ops: {
      open: function (stream) {
        var tty = TTY.ttys[stream.node.rdev]
        if (!tty) {
          throw new FS.ErrnoError(43)
        }
        stream.tty = tty
        stream.seekable = false
      },
      close: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      flush: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      read: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(60)
        }
        var bytesRead = 0
        for (var i = 0; i < length; i++) {
          var result
          try {
            result = stream.tty.ops.get_char(stream.tty)
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6)
          }
          if (result === null || result === undefined) break
          bytesRead++
          buffer[offset + i] = result
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now()
        }
        return bytesRead
      },
      write: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(60)
        }
        try {
          for (var i = 0; i < length; i++) {
            stream.tty.ops.put_char(stream.tty, buffer[offset + i])
          }
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
        if (length) {
          stream.node.timestamp = Date.now()
        }
        return i
      },
    },
    default_tty_ops: {
      get_char: function (tty) {
        if (!tty.input.length) {
          var result = null
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256
            var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE)
            var bytesRead = 0
            try {
              bytesRead = nodeFS.readSync(
                process.stdin.fd,
                buf,
                0,
                BUFSIZE,
                null
              )
            } catch (e) {
              if (e.toString().indexOf('EOF') != -1) bytesRead = 0
              else throw e
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString('utf-8')
            } else {
              result = null
            }
          } else if (
            typeof window != 'undefined' &&
            typeof window.prompt == 'function'
          ) {
            result = window.prompt('Input: ')
            if (result !== null) {
              result += '\n'
            }
          } else if (typeof readline == 'function') {
            result = readline()
            if (result !== null) {
              result += '\n'
            }
          }
          if (!result) {
            return null
          }
          tty.input = intArrayFromString(result, true)
        }
        return tty.input.shift()
      },
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          out(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          out(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
    default_tty1_ops: {
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          err(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          err(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
  }
  Module['TTY'] = TTY
  function mmapAlloc(size) {
    var alignedSize = alignMemory(size, 16384)
    var ptr = _malloc(alignedSize)
    while (size < alignedSize) HEAP8[ptr + size++] = 0
    return ptr
  }
  Module['mmapAlloc'] = mmapAlloc
  var MEMFS = {
    ops_table: null,
    mount: function (mount) {
      return MEMFS.createNode(null, '/', 16384 | 511, 0)
    },
    createNode: function (parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63)
      }
      if (!MEMFS.ops_table) {
        MEMFS.ops_table = {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink,
            },
            stream: { llseek: MEMFS.stream_ops.llseek },
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync,
            },
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink,
            },
            stream: {},
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: FS.chrdev_stream_ops,
          },
        }
      }
      var node = FS.createNode(parent, name, mode, dev)
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node
        node.stream_ops = MEMFS.ops_table.dir.stream
        node.contents = {}
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node
        node.stream_ops = MEMFS.ops_table.file.stream
        node.usedBytes = 0
        node.contents = null
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node
        node.stream_ops = MEMFS.ops_table.link.stream
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node
        node.stream_ops = MEMFS.ops_table.chrdev.stream
      }
      node.timestamp = Date.now()
      if (parent) {
        parent.contents[name] = node
        parent.timestamp = node.timestamp
      }
      return node
    },
    getFileDataAsTypedArray: function (node) {
      if (!node.contents) return new Uint8Array(0)
      if (node.contents.subarray)
        return node.contents.subarray(0, node.usedBytes)
      return new Uint8Array(node.contents)
    },
    expandFileStorage: function (node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0
      if (prevCapacity >= newCapacity) return
      var CAPACITY_DOUBLING_MAX = 1024 * 1024
      newCapacity = Math.max(
        newCapacity,
        (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
          0
      )
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
      var oldContents = node.contents
      node.contents = new Uint8Array(newCapacity)
      if (node.usedBytes > 0)
        node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
    },
    resizeFileStorage: function (node, newSize) {
      if (node.usedBytes == newSize) return
      if (newSize == 0) {
        node.contents = null
        node.usedBytes = 0
      } else {
        var oldContents = node.contents
        node.contents = new Uint8Array(newSize)
        if (oldContents) {
          node.contents.set(
            oldContents.subarray(0, Math.min(newSize, node.usedBytes))
          )
        }
        node.usedBytes = newSize
      }
    },
    node_ops: {
      getattr: function (node) {
        var attr = {}
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1
        attr.ino = node.id
        attr.mode = node.mode
        attr.nlink = 1
        attr.uid = 0
        attr.gid = 0
        attr.rdev = node.rdev
        if (FS.isDir(node.mode)) {
          attr.size = 4096
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length
        } else {
          attr.size = 0
        }
        attr.atime = new Date(node.timestamp)
        attr.mtime = new Date(node.timestamp)
        attr.ctime = new Date(node.timestamp)
        attr.blksize = 4096
        attr.blocks = Math.ceil(attr.size / attr.blksize)
        return attr
      },
      setattr: function (node, attr) {
        if (attr.mode !== undefined) {
          node.mode = attr.mode
        }
        if (attr.timestamp !== undefined) {
          node.timestamp = attr.timestamp
        }
        if (attr.size !== undefined) {
          MEMFS.resizeFileStorage(node, attr.size)
        }
      },
      lookup: function (parent, name) {
        throw FS.genericErrors[44]
      },
      mknod: function (parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev)
      },
      rename: function (old_node, new_dir, new_name) {
        if (FS.isDir(old_node.mode)) {
          var new_node
          try {
            new_node = FS.lookupNode(new_dir, new_name)
          } catch (e) {}
          if (new_node) {
            for (var i in new_node.contents) {
              throw new FS.ErrnoError(55)
            }
          }
        }
        delete old_node.parent.contents[old_node.name]
        old_node.parent.timestamp = Date.now()
        old_node.name = new_name
        new_dir.contents[new_name] = old_node
        new_dir.timestamp = old_node.parent.timestamp
        old_node.parent = new_dir
      },
      unlink: function (parent, name) {
        delete parent.contents[name]
        parent.timestamp = Date.now()
      },
      rmdir: function (parent, name) {
        var node = FS.lookupNode(parent, name)
        for (var i in node.contents) {
          throw new FS.ErrnoError(55)
        }
        delete parent.contents[name]
        parent.timestamp = Date.now()
      },
      readdir: function (node) {
        var entries = ['.', '..']
        for (var key in node.contents) {
          if (!node.contents.hasOwnProperty(key)) {
            continue
          }
          entries.push(key)
        }
        return entries
      },
      symlink: function (parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
        node.link = oldpath
        return node
      },
      readlink: function (node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(28)
        }
        return node.link
      },
    },
    stream_ops: {
      read: function (stream, buffer, offset, length, position) {
        var contents = stream.node.contents
        if (position >= stream.node.usedBytes) return 0
        var size = Math.min(stream.node.usedBytes - position, length)
        if (size > 8 && contents.subarray) {
          buffer.set(contents.subarray(position, position + size), offset)
        } else {
          for (var i = 0; i < size; i++)
            buffer[offset + i] = contents[position + i]
        }
        return size
      },
      write: function (stream, buffer, offset, length, position, canOwn) {
        if (!length) return 0
        var node = stream.node
        node.timestamp = Date.now()
        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            node.contents = buffer.subarray(offset, offset + length)
            node.usedBytes = length
            return length
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = buffer.slice(offset, offset + length)
            node.usedBytes = length
            return length
          } else if (position + length <= node.usedBytes) {
            node.contents.set(
              buffer.subarray(offset, offset + length),
              position
            )
            return length
          }
        }
        MEMFS.expandFileStorage(node, position + length)
        if (node.contents.subarray && buffer.subarray) {
          node.contents.set(buffer.subarray(offset, offset + length), position)
        } else {
          for (var i = 0; i < length; i++) {
            node.contents[position + i] = buffer[offset + i]
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length)
        return length
      },
      llseek: function (stream, offset, whence) {
        var position = offset
        if (whence === 1) {
          position += stream.position
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28)
        }
        return position
      },
      allocate: function (stream, offset, length) {
        MEMFS.expandFileStorage(stream.node, offset + length)
        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
      },
      mmap: function (stream, address, length, position, prot, flags) {
        if (address !== 0) {
          throw new FS.ErrnoError(28)
        }
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        var ptr
        var allocated
        var contents = stream.node.contents
        if (!(flags & 2) && contents.buffer === buffer) {
          allocated = false
          ptr = contents.byteOffset
        } else {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length)
            } else {
              contents = Array.prototype.slice.call(
                contents,
                position,
                position + length
              )
            }
          }
          allocated = true
          ptr = mmapAlloc(length)
          if (!ptr) {
            throw new FS.ErrnoError(48)
          }
          HEAP8.set(contents, ptr)
        }
        return { ptr: ptr, allocated: allocated }
      },
      msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        if (mmapFlags & 2) {
          return 0
        }
        var bytesWritten = MEMFS.stream_ops.write(
          stream,
          buffer,
          0,
          length,
          offset,
          false
        )
        return 0
      },
    },
  }
  Module['MEMFS'] = MEMFS
  var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: '/',
    initialized: false,
    ignorePermissions: true,
    trackingDelegate: {},
    tracking: { openFlags: { READ: 1, WRITE: 2 } },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    lookupPath: function (path, opts) {
      path = PATH_FS.resolve(FS.cwd(), path)
      opts = opts || {}
      if (!path) return { path: '', node: null }
      var defaults = { follow_mount: true, recurse_count: 0 }
      for (var key in defaults) {
        if (opts[key] === undefined) {
          opts[key] = defaults[key]
        }
      }
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(32)
      }
      var parts = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        false
      )
      var current = FS.root
      var current_path = '/'
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1
        if (islast && opts.parent) {
          break
        }
        current = FS.lookupNode(current, parts[i])
        current_path = PATH.join2(current_path, parts[i])
        if (FS.isMountpoint(current)) {
          if (!islast || (islast && opts.follow_mount)) {
            current = current.mounted.root
          }
        }
        if (!islast || opts.follow) {
          var count = 0
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path)
            current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
            var lookup = FS.lookupPath(current_path, {
              recurse_count: opts.recurse_count,
            })
            current = lookup.node
            if (count++ > 40) {
              throw new FS.ErrnoError(32)
            }
          }
        }
      }
      return { path: current_path, node: current }
    },
    getPath: function (node) {
      var path
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint
          if (!path) return mount
          return mount[mount.length - 1] !== '/'
            ? mount + '/' + path
            : mount + path
        }
        path = path ? node.name + '/' + path : node.name
        node = node.parent
      }
    },
    hashName: function (parentid, name) {
      var hash = 0
      for (var i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
      }
      return ((parentid + hash) >>> 0) % FS.nameTable.length
    },
    hashAddNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      node.name_next = FS.nameTable[hash]
      FS.nameTable[hash] = node
    },
    hashRemoveNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next
      } else {
        var current = FS.nameTable[hash]
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next
            break
          }
          current = current.name_next
        }
      }
    },
    lookupNode: function (parent, name) {
      var errCode = FS.mayLookup(parent)
      if (errCode) {
        throw new FS.ErrnoError(errCode, parent)
      }
      var hash = FS.hashName(parent.id, name)
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name
        if (node.parent.id === parent.id && nodeName === name) {
          return node
        }
      }
      return FS.lookup(parent, name)
    },
    createNode: function (parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev)
      FS.hashAddNode(node)
      return node
    },
    destroyNode: function (node) {
      FS.hashRemoveNode(node)
    },
    isRoot: function (node) {
      return node === node.parent
    },
    isMountpoint: function (node) {
      return !!node.mounted
    },
    isFile: function (mode) {
      return (mode & 61440) === 32768
    },
    isDir: function (mode) {
      return (mode & 61440) === 16384
    },
    isLink: function (mode) {
      return (mode & 61440) === 40960
    },
    isChrdev: function (mode) {
      return (mode & 61440) === 8192
    },
    isBlkdev: function (mode) {
      return (mode & 61440) === 24576
    },
    isFIFO: function (mode) {
      return (mode & 61440) === 4096
    },
    isSocket: function (mode) {
      return (mode & 49152) === 49152
    },
    flagModes: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
    modeStringToFlags: function (str) {
      var flags = FS.flagModes[str]
      if (typeof flags === 'undefined') {
        throw new Error('Unknown file open mode: ' + str)
      }
      return flags
    },
    flagsToPermissionString: function (flag) {
      var perms = ['r', 'w', 'rw'][flag & 3]
      if (flag & 512) {
        perms += 'w'
      }
      return perms
    },
    nodePermissions: function (node, perms) {
      if (FS.ignorePermissions) {
        return 0
      }
      if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
        return 2
      } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
        return 2
      } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
        return 2
      }
      return 0
    },
    mayLookup: function (dir) {
      var errCode = FS.nodePermissions(dir, 'x')
      if (errCode) return errCode
      if (!dir.node_ops.lookup) return 2
      return 0
    },
    mayCreate: function (dir, name) {
      try {
        var node = FS.lookupNode(dir, name)
        return 20
      } catch (e) {}
      return FS.nodePermissions(dir, 'wx')
    },
    mayDelete: function (dir, name, isdir) {
      var node
      try {
        node = FS.lookupNode(dir, name)
      } catch (e) {
        return e.errno
      }
      var errCode = FS.nodePermissions(dir, 'wx')
      if (errCode) {
        return errCode
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31
        }
      }
      return 0
    },
    mayOpen: function (node, flags) {
      if (!node) {
        return 44
      }
      if (FS.isLink(node.mode)) {
        return 32
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
          return 31
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function (fd_start, fd_end) {
      fd_start = fd_start || 0
      fd_end = fd_end || FS.MAX_OPEN_FDS
      for (var fd = fd_start; fd <= fd_end; fd++) {
        if (!FS.streams[fd]) {
          return fd
        }
      }
      throw new FS.ErrnoError(33)
    },
    getStream: function (fd) {
      return FS.streams[fd]
    },
    createStream: function (stream, fd_start, fd_end) {
      if (!FS.FSStream) {
        FS.FSStream = function () {}
        FS.FSStream.prototype = {
          object: {
            get: function () {
              return this.node
            },
            set: function (val) {
              this.node = val
            },
          },
          isRead: {
            get: function () {
              return (this.flags & 2097155) !== 1
            },
          },
          isWrite: {
            get: function () {
              return (this.flags & 2097155) !== 0
            },
          },
          isAppend: {
            get: function () {
              return this.flags & 1024
            },
          },
        }
      }
      var newStream = new FS.FSStream()
      for (var p in stream) {
        newStream[p] = stream[p]
      }
      stream = newStream
      var fd = FS.nextfd(fd_start, fd_end)
      stream.fd = fd
      FS.streams[fd] = stream
      return stream
    },
    closeStream: function (fd) {
      FS.streams[fd] = null
    },
    chrdev_stream_ops: {
      open: function (stream) {
        var device = FS.getDevice(stream.node.rdev)
        stream.stream_ops = device.stream_ops
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream)
        }
      },
      llseek: function () {
        throw new FS.ErrnoError(70)
      },
    },
    major: function (dev) {
      return dev >> 8
    },
    minor: function (dev) {
      return dev & 255
    },
    makedev: function (ma, mi) {
      return (ma << 8) | mi
    },
    registerDevice: function (dev, ops) {
      FS.devices[dev] = { stream_ops: ops }
    },
    getDevice: function (dev) {
      return FS.devices[dev]
    },
    getMounts: function (mount) {
      var mounts = []
      var check = [mount]
      while (check.length) {
        var m = check.pop()
        mounts.push(m)
        check.push.apply(check, m.mounts)
      }
      return mounts
    },
    syncfs: function (populate, callback) {
      if (typeof populate === 'function') {
        callback = populate
        populate = false
      }
      FS.syncFSRequests++
      if (FS.syncFSRequests > 1) {
        err(
          'warning: ' +
            FS.syncFSRequests +
            ' FS.syncfs operations in flight at once, probably just doing extra work'
        )
      }
      var mounts = FS.getMounts(FS.root.mount)
      var completed = 0
      function doCallback(errCode) {
        FS.syncFSRequests--
        return callback(errCode)
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true
            return doCallback(errCode)
          }
          return
        }
        if (++completed >= mounts.length) {
          doCallback(null)
        }
      }
      mounts.forEach(function (mount) {
        if (!mount.type.syncfs) {
          return done(null)
        }
        mount.type.syncfs(mount, populate, done)
      })
    },
    mount: function (type, opts, mountpoint) {
      var root = mountpoint === '/'
      var pseudo = !mountpoint
      var node
      if (root && FS.root) {
        throw new FS.ErrnoError(10)
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
        mountpoint = lookup.path
        node = lookup.node
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54)
        }
      }
      var mount = {
        type: type,
        opts: opts,
        mountpoint: mountpoint,
        mounts: [],
      }
      var mountRoot = type.mount(mount)
      mountRoot.mount = mount
      mount.root = mountRoot
      if (root) {
        FS.root = mountRoot
      } else if (node) {
        node.mounted = mount
        if (node.mount) {
          node.mount.mounts.push(mount)
        }
      }
      return mountRoot
    },
    unmount: function (mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28)
      }
      var node = lookup.node
      var mount = node.mounted
      var mounts = FS.getMounts(mount)
      Object.keys(FS.nameTable).forEach(function (hash) {
        var current = FS.nameTable[hash]
        while (current) {
          var next = current.name_next
          if (mounts.indexOf(current.mount) !== -1) {
            FS.destroyNode(current)
          }
          current = next
        }
      })
      node.mounted = null
      var idx = node.mount.mounts.indexOf(mount)
      node.mount.mounts.splice(idx, 1)
    },
    lookup: function (parent, name) {
      return parent.node_ops.lookup(parent, name)
    },
    mknod: function (path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      if (!name || name === '.' || name === '..') {
        throw new FS.ErrnoError(28)
      }
      var errCode = FS.mayCreate(parent, name)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63)
      }
      return parent.node_ops.mknod(parent, name, mode, dev)
    },
    create: function (path, mode) {
      mode = mode !== undefined ? mode : 438
      mode &= 4095
      mode |= 32768
      return FS.mknod(path, mode, 0)
    },
    mkdir: function (path, mode) {
      mode = mode !== undefined ? mode : 511
      mode &= 511 | 512
      mode |= 16384
      return FS.mknod(path, mode, 0)
    },
    mkdirTree: function (path, mode) {
      var dirs = path.split('/')
      var d = ''
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i]) continue
        d += '/' + dirs[i]
        try {
          FS.mkdir(d, mode)
        } catch (e) {
          if (e.errno != 20) throw e
        }
      }
    },
    mkdev: function (path, mode, dev) {
      if (typeof dev === 'undefined') {
        dev = mode
        mode = 438
      }
      mode |= 8192
      return FS.mknod(path, mode, dev)
    },
    symlink: function (oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44)
      }
      var lookup = FS.lookupPath(newpath, { parent: true })
      var parent = lookup.node
      if (!parent) {
        throw new FS.ErrnoError(44)
      }
      var newname = PATH.basename(newpath)
      var errCode = FS.mayCreate(parent, newname)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63)
      }
      return parent.node_ops.symlink(parent, newname, oldpath)
    },
    rename: function (old_path, new_path) {
      var old_dirname = PATH.dirname(old_path)
      var new_dirname = PATH.dirname(new_path)
      var old_name = PATH.basename(old_path)
      var new_name = PATH.basename(new_path)
      var lookup, old_dir, new_dir
      lookup = FS.lookupPath(old_path, { parent: true })
      old_dir = lookup.node
      lookup = FS.lookupPath(new_path, { parent: true })
      new_dir = lookup.node
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75)
      }
      var old_node = FS.lookupNode(old_dir, old_name)
      var relative = PATH_FS.relative(old_path, new_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(28)
      }
      relative = PATH_FS.relative(new_path, old_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(55)
      }
      var new_node
      try {
        new_node = FS.lookupNode(new_dir, new_name)
      } catch (e) {}
      if (old_node === new_node) {
        return
      }
      var isdir = FS.isDir(old_node.mode)
      var errCode = FS.mayDelete(old_dir, old_name, isdir)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      errCode = new_node
        ? FS.mayDelete(new_dir, new_name, isdir)
        : FS.mayCreate(new_dir, new_name)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63)
      }
      if (
        FS.isMountpoint(old_node) ||
        (new_node && FS.isMountpoint(new_node))
      ) {
        throw new FS.ErrnoError(10)
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, 'w')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
      }
      try {
        if (FS.trackingDelegate['willMovePath']) {
          FS.trackingDelegate['willMovePath'](old_path, new_path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        )
      }
      FS.hashRemoveNode(old_node)
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name)
      } catch (e) {
        throw e
      } finally {
        FS.hashAddNode(old_node)
      }
      try {
        if (FS.trackingDelegate['onMovePath'])
          FS.trackingDelegate['onMovePath'](old_path, new_path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    rmdir: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var errCode = FS.mayDelete(parent, name, true)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
      parent.node_ops.rmdir(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath'])
          FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    readdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(54)
      }
      return node.node_ops.readdir(node)
    },
    unlink: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var errCode = FS.mayDelete(parent, name, false)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
      parent.node_ops.unlink(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath'])
          FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    readlink: function (path) {
      var lookup = FS.lookupPath(path)
      var link = lookup.node
      if (!link) {
        throw new FS.ErrnoError(44)
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28)
      }
      return PATH_FS.resolve(
        FS.getPath(link.parent),
        link.node_ops.readlink(link)
      )
    },
    stat: function (path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      var node = lookup.node
      if (!node) {
        throw new FS.ErrnoError(44)
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(63)
      }
      return node.node_ops.getattr(node)
    },
    lstat: function (path) {
      return FS.stat(path, true)
    },
    chmod: function (path, mode, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      node.node_ops.setattr(node, {
        mode: (mode & 4095) | (node.mode & ~4095),
        timestamp: Date.now(),
      })
    },
    lchmod: function (path, mode) {
      FS.chmod(path, mode, true)
    },
    fchmod: function (fd, mode) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      FS.chmod(stream.node, mode)
    },
    chown: function (path, uid, gid, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      node.node_ops.setattr(node, { timestamp: Date.now() })
    },
    lchown: function (path, uid, gid) {
      FS.chown(path, uid, gid, true)
    },
    fchown: function (fd, uid, gid) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      FS.chown(stream.node, uid, gid)
    },
    truncate: function (path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28)
      }
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: true })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28)
      }
      var errCode = FS.nodePermissions(node, 'w')
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
    },
    ftruncate: function (fd, len) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28)
      }
      FS.truncate(stream.node, len)
    },
    utime: function (path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
    },
    open: function (path, flags, mode, fd_start, fd_end) {
      if (path === '') {
        throw new FS.ErrnoError(44)
      }
      flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags
      mode = typeof mode === 'undefined' ? 438 : mode
      if (flags & 64) {
        mode = (mode & 4095) | 32768
      } else {
        mode = 0
      }
      var node
      if (typeof path === 'object') {
        node = path
      } else {
        path = PATH.normalize(path)
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
          node = lookup.node
        } catch (e) {}
      }
      var created = false
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20)
          }
        } else {
          node = FS.mknod(path, mode, 0)
          created = true
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44)
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54)
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
      }
      if (flags & 512) {
        FS.truncate(node, 0)
      }
      flags &= ~(128 | 512 | 131072)
      var stream = FS.createStream(
        {
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false,
        },
        fd_start,
        fd_end
      )
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream)
      }
      if (Module['logReadFiles'] && !(flags & 1)) {
        if (!FS.readFiles) FS.readFiles = {}
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1
          err('FS.trackingDelegate error on read file: ' + path)
        }
      }
      try {
        if (FS.trackingDelegate['onOpenFile']) {
          var trackingFlags = 0
          if ((flags & 2097155) !== 1) {
            trackingFlags |= FS.tracking.openFlags.READ
          }
          if ((flags & 2097155) !== 0) {
            trackingFlags |= FS.tracking.openFlags.WRITE
          }
          FS.trackingDelegate['onOpenFile'](path, trackingFlags)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['onOpenFile']('" +
            path +
            "', flags) threw an exception: " +
            e.message
        )
      }
      return stream
    },
    close: function (stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (stream.getdents) stream.getdents = null
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream)
        }
      } catch (e) {
        throw e
      } finally {
        FS.closeStream(stream.fd)
      }
      stream.fd = null
    },
    isClosed: function (stream) {
      return stream.fd === null
    },
    llseek: function (stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70)
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28)
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence)
      stream.ungotten = []
      return stream.position
    },
    read: function (stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70)
      }
      var bytesRead = stream.stream_ops.read(
        stream,
        buffer,
        offset,
        length,
        position
      )
      if (!seeking) stream.position += bytesRead
      return bytesRead
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28)
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70)
      }
      var bytesWritten = stream.stream_ops.write(
        stream,
        buffer,
        offset,
        length,
        position,
        canOwn
      )
      if (!seeking) stream.position += bytesWritten
      try {
        if (stream.path && FS.trackingDelegate['onWriteToFile'])
          FS.trackingDelegate['onWriteToFile'](stream.path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onWriteToFile']('" +
            stream.path +
            "') threw an exception: " +
            e.message
        )
      }
      return bytesWritten
    },
    allocate: function (stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(28)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8)
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(43)
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(138)
      }
      stream.stream_ops.allocate(stream, offset, length)
    },
    mmap: function (stream, address, length, position, prot, flags) {
      if (
        (prot & 2) !== 0 &&
        (flags & 2) === 0 &&
        (stream.flags & 2097155) !== 2
      ) {
        throw new FS.ErrnoError(2)
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2)
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43)
      }
      return stream.stream_ops.mmap(
        stream,
        address,
        length,
        position,
        prot,
        flags
      )
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      if (!stream || !stream.stream_ops.msync) {
        return 0
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
    },
    munmap: function (stream) {
      return 0
    },
    ioctl: function (stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59)
      }
      return stream.stream_ops.ioctl(stream, cmd, arg)
    },
    readFile: function (path, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 0
      opts.encoding = opts.encoding || 'binary'
      if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
        throw new Error('Invalid encoding type "' + opts.encoding + '"')
      }
      var ret
      var stream = FS.open(path, opts.flags)
      var stat = FS.stat(path)
      var length = stat.size
      var buf = new Uint8Array(length)
      FS.read(stream, buf, 0, length, 0)
      if (opts.encoding === 'utf8') {
        ret = UTF8ArrayToString(buf, 0)
      } else if (opts.encoding === 'binary') {
        ret = buf
      }
      FS.close(stream)
      return ret
    },
    writeFile: function (path, data, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 577
      var stream = FS.open(path, opts.flags, opts.mode)
      if (typeof data === 'string') {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
      } else {
        throw new Error('Unsupported data type')
      }
      FS.close(stream)
    },
    cwd: function () {
      return FS.currentPath
    },
    chdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      if (lookup.node === null) {
        throw new FS.ErrnoError(44)
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54)
      }
      var errCode = FS.nodePermissions(lookup.node, 'x')
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      FS.currentPath = lookup.path
    },
    createDefaultDirectories: function () {
      FS.mkdir('/tmp')
      FS.mkdir('/home')
      FS.mkdir('/home/web_user')
    },
    createDefaultDevices: function () {
      FS.mkdir('/dev')
      FS.registerDevice(FS.makedev(1, 3), {
        read: function () {
          return 0
        },
        write: function (stream, buffer, offset, length, pos) {
          return length
        },
      })
      FS.mkdev('/dev/null', FS.makedev(1, 3))
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
      FS.mkdev('/dev/tty', FS.makedev(5, 0))
      FS.mkdev('/dev/tty1', FS.makedev(6, 0))
      var random_device = getRandomDevice()
      FS.createDevice('/dev', 'random', random_device)
      FS.createDevice('/dev', 'urandom', random_device)
      FS.mkdir('/dev/shm')
      FS.mkdir('/dev/shm/tmp')
    },
    createSpecialDirectories: function () {
      FS.mkdir('/proc')
      var proc_self = FS.mkdir('/proc/self')
      FS.mkdir('/proc/self/fd')
      FS.mount(
        {
          mount: function () {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511, 73)
            node.node_ops = {
              lookup: function (parent, name) {
                var fd = +name
                var stream = FS.getStream(fd)
                if (!stream) throw new FS.ErrnoError(8)
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: {
                    readlink: function () {
                      return stream.path
                    },
                  },
                }
                ret.parent = ret
                return ret
              },
            }
            return node
          },
        },
        {},
        '/proc/self/fd'
      )
    },
    createStandardStreams: function () {
      if (Module['stdin']) {
        FS.createDevice('/dev', 'stdin', Module['stdin'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdin')
      }
      if (Module['stdout']) {
        FS.createDevice('/dev', 'stdout', null, Module['stdout'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdout')
      }
      if (Module['stderr']) {
        FS.createDevice('/dev', 'stderr', null, Module['stderr'])
      } else {
        FS.symlink('/dev/tty1', '/dev/stderr')
      }
      var stdin = FS.open('/dev/stdin', 0)
      var stdout = FS.open('/dev/stdout', 1)
      var stderr = FS.open('/dev/stderr', 1)
    },
    ensureErrnoError: function () {
      if (FS.ErrnoError) return
      FS.ErrnoError = function ErrnoError(errno, node) {
        this.node = node
        this.setErrno = function (errno) {
          this.errno = errno
        }
        this.setErrno(errno)
        this.message = 'FS error'
      }
      FS.ErrnoError.prototype = new Error()
      FS.ErrnoError.prototype.constructor = FS.ErrnoError
      ;[44].forEach(function (code) {
        FS.genericErrors[code] = new FS.ErrnoError(code)
        FS.genericErrors[code].stack = '<generic error, no stack>'
      })
    },
    staticInit: function () {
      FS.ensureErrnoError()
      FS.nameTable = new Array(4096)
      FS.mount(MEMFS, {}, '/')
      FS.createDefaultDirectories()
      FS.createDefaultDevices()
      FS.createSpecialDirectories()
      FS.filesystems = { MEMFS: MEMFS }
    },
    init: function (input, output, error) {
      FS.init.initialized = true
      FS.ensureErrnoError()
      Module['stdin'] = input || Module['stdin']
      Module['stdout'] = output || Module['stdout']
      Module['stderr'] = error || Module['stderr']
      FS.createStandardStreams()
    },
    quit: function () {
      FS.init.initialized = false
      var fflush = Module['_fflush']
      if (fflush) fflush(0)
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i]
        if (!stream) {
          continue
        }
        FS.close(stream)
      }
    },
    getMode: function (canRead, canWrite) {
      var mode = 0
      if (canRead) mode |= 292 | 73
      if (canWrite) mode |= 146
      return mode
    },
    findObject: function (path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink)
      if (ret.exists) {
        return ret.object
      } else {
        return null
      }
    },
    analyzePath: function (path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        path = lookup.path
      } catch (e) {}
      var ret = {
        isRoot: false,
        exists: false,
        error: 0,
        name: null,
        path: null,
        object: null,
        parentExists: false,
        parentPath: null,
        parentObject: null,
      }
      try {
        var lookup = FS.lookupPath(path, { parent: true })
        ret.parentExists = true
        ret.parentPath = lookup.path
        ret.parentObject = lookup.node
        ret.name = PATH.basename(path)
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        ret.exists = true
        ret.path = lookup.path
        ret.object = lookup.node
        ret.name = lookup.node.name
        ret.isRoot = lookup.path === '/'
      } catch (e) {
        ret.error = e.errno
      }
      return ret
    },
    createPath: function (parent, path, canRead, canWrite) {
      parent = typeof parent === 'string' ? parent : FS.getPath(parent)
      var parts = path.split('/').reverse()
      while (parts.length) {
        var part = parts.pop()
        if (!part) continue
        var current = PATH.join2(parent, part)
        try {
          FS.mkdir(current)
        } catch (e) {}
        parent = current
      }
      return current
    },
    createFile: function (parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(
        typeof parent === 'string' ? parent : FS.getPath(parent),
        name
      )
      var mode = FS.getMode(canRead, canWrite)
      return FS.create(path, mode)
    },
    createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
      var path = name
        ? PATH.join2(
            typeof parent === 'string' ? parent : FS.getPath(parent),
            name
          )
        : parent
      var mode = FS.getMode(canRead, canWrite)
      var node = FS.create(path, mode)
      if (data) {
        if (typeof data === 'string') {
          var arr = new Array(data.length)
          for (var i = 0, len = data.length; i < len; ++i)
            arr[i] = data.charCodeAt(i)
          data = arr
        }
        FS.chmod(node, mode | 146)
        var stream = FS.open(node, 577)
        FS.write(stream, data, 0, data.length, 0, canOwn)
        FS.close(stream)
        FS.chmod(node, mode)
      }
      return node
    },
    createDevice: function (parent, name, input, output) {
      var path = PATH.join2(
        typeof parent === 'string' ? parent : FS.getPath(parent),
        name
      )
      var mode = FS.getMode(!!input, !!output)
      if (!FS.createDevice.major) FS.createDevice.major = 64
      var dev = FS.makedev(FS.createDevice.major++, 0)
      FS.registerDevice(dev, {
        open: function (stream) {
          stream.seekable = false
        },
        close: function (stream) {
          if (output && output.buffer && output.buffer.length) {
            output(10)
          }
        },
        read: function (stream, buffer, offset, length, pos) {
          var bytesRead = 0
          for (var i = 0; i < length; i++) {
            var result
            try {
              result = input()
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6)
            }
            if (result === null || result === undefined) break
            bytesRead++
            buffer[offset + i] = result
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now()
          }
          return bytesRead
        },
        write: function (stream, buffer, offset, length, pos) {
          for (var i = 0; i < length; i++) {
            try {
              output(buffer[offset + i])
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
          }
          if (length) {
            stream.node.timestamp = Date.now()
          }
          return i
        },
      })
      return FS.mkdev(path, mode, dev)
    },
    forceLoadFile: function (obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
      if (typeof XMLHttpRequest !== 'undefined') {
        throw new Error(
          'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
        )
      } else if (read_) {
        try {
          obj.contents = intArrayFromString(read_(obj.url), true)
          obj.usedBytes = obj.contents.length
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
      } else {
        throw new Error('Cannot load without read() or XMLHttpRequest.')
      }
    },
    createLazyFile: function (parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false
        this.chunks = []
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined
        }
        var chunkOffset = idx % this.chunkSize
        var chunkNum = (idx / this.chunkSize) | 0
        return this.getter(chunkNum)[chunkOffset]
      }
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(
        getter
      ) {
        this.getter = getter
      }
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url, false)
        xhr.send(null)
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
        var datalength = Number(xhr.getResponseHeader('Content-length'))
        var header
        var hasByteServing =
          (header = xhr.getResponseHeader('Accept-Ranges')) &&
          header === 'bytes'
        var usesGzip =
          (header = xhr.getResponseHeader('Content-Encoding')) &&
          header === 'gzip'
        var chunkSize = 1024 * 1024
        if (!hasByteServing) chunkSize = datalength
        var doXHR = function (from, to) {
          if (from > to)
            throw new Error(
              'invalid range (' + from + ', ' + to + ') or no bytes requested!'
            )
          if (to > datalength - 1)
            throw new Error(
              'only ' + datalength + ' bytes available! programmer error!'
            )
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          if (datalength !== chunkSize)
            xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
          if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer'
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined')
          }
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || [])
          } else {
            return intArrayFromString(xhr.responseText || '', true)
          }
        }
        var lazyArray = this
        lazyArray.setDataGetter(function (chunkNum) {
          var start = chunkNum * chunkSize
          var end = (chunkNum + 1) * chunkSize - 1
          end = Math.min(end, datalength - 1)
          if (typeof lazyArray.chunks[chunkNum] === 'undefined') {
            lazyArray.chunks[chunkNum] = doXHR(start, end)
          }
          if (typeof lazyArray.chunks[chunkNum] === 'undefined')
            throw new Error('doXHR failed!')
          return lazyArray.chunks[chunkNum]
        })
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1
          datalength = this.getter(0).length
          chunkSize = datalength
          out(
            'LazyFiles on gzip forces download of the whole file when length is accessed'
          )
        }
        this._length = datalength
        this._chunkSize = chunkSize
        this.lengthKnown = true
      }
      if (typeof XMLHttpRequest !== 'undefined') {
        if (!ENVIRONMENT_IS_WORKER)
          throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
        var lazyArray = new LazyUint8Array()
        Object.defineProperties(lazyArray, {
          length: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._length
            },
          },
          chunkSize: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._chunkSize
            },
          },
        })
        var properties = { isDevice: false, contents: lazyArray }
      } else {
        var properties = { isDevice: false, url: url }
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite)
      if (properties.contents) {
        node.contents = properties.contents
      } else if (properties.url) {
        node.contents = null
        node.url = properties.url
      }
      Object.defineProperties(node, {
        usedBytes: {
          get: function () {
            return this.contents.length
          },
        },
      })
      var stream_ops = {}
      var keys = Object.keys(node.stream_ops)
      keys.forEach(function (key) {
        var fn = node.stream_ops[key]
        stream_ops[key] = function forceLoadLazyFile() {
          FS.forceLoadFile(node)
          return fn.apply(null, arguments)
        }
      })
      stream_ops.read = function stream_ops_read(
        stream,
        buffer,
        offset,
        length,
        position
      ) {
        FS.forceLoadFile(node)
        var contents = stream.node.contents
        if (position >= contents.length) return 0
        var size = Math.min(contents.length - position, length)
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i]
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i)
          }
        }
        return size
      }
      node.stream_ops = stream_ops
      return node
    },
    createPreloadedFile: function (
      parent,
      name,
      url,
      canRead,
      canWrite,
      onload,
      onerror,
      dontCreateFile,
      canOwn,
      preFinish
    ) {
      Browser.init()
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
      var dep = getUniqueRunDependency('cp ' + fullname)
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish()
          if (!dontCreateFile) {
            FS.createDataFile(
              parent,
              name,
              byteArray,
              canRead,
              canWrite,
              canOwn
            )
          }
          if (onload) onload()
          removeRunDependency(dep)
        }
        var handled = false
        Module['preloadPlugins'].forEach(function (plugin) {
          if (handled) return
          if (plugin['canHandle'](fullname)) {
            plugin['handle'](byteArray, fullname, finish, function () {
              if (onerror) onerror()
              removeRunDependency(dep)
            })
            handled = true
          }
        })
        if (!handled) finish(byteArray)
      }
      addRunDependency(dep)
      if (typeof url == 'string') {
        Browser.asyncLoad(
          url,
          function (byteArray) {
            processData(byteArray)
          },
          onerror
        )
      } else {
        processData(url)
      }
    },
    indexedDB: function () {
      return (
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB
      )
    },
    DB_NAME: function () {
      return 'EM_FS_' + window.location.pathname
    },
    DB_VERSION: 20,
    DB_STORE_NAME: 'FILE_DATA',
    saveFilesToDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
        out('creating db')
        var db = openRequest.result
        db.createObjectStore(FS.DB_STORE_NAME)
      }
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var putRequest = files.put(FS.analyzePath(path).object.contents, path)
          putRequest.onsuccess = function putRequest_onsuccess() {
            ok++
            if (ok + fail == total) finish()
          }
          putRequest.onerror = function putRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
    loadFilesFromDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = onerror
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        try {
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
        } catch (e) {
          onerror(e)
          return
        }
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var getRequest = files.get(path)
          getRequest.onsuccess = function getRequest_onsuccess() {
            if (FS.analyzePath(path).exists) {
              FS.unlink(path)
            }
            FS.createDataFile(
              PATH.dirname(path),
              PATH.basename(path),
              getRequest.result,
              true,
              true,
              true
            )
            ok++
            if (ok + fail == total) finish()
          }
          getRequest.onerror = function getRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
  }
  Module['FS'] = FS
  var SYSCALLS = {
    mappings: {},
    DEFAULT_POLLMASK: 5,
    umask: 511,
    calculateAt: function (dirfd, path, allowEmpty) {
      if (path[0] === '/') {
        return path
      }
      var dir
      if (dirfd === -100) {
        dir = FS.cwd()
      } else {
        var dirstream = FS.getStream(dirfd)
        if (!dirstream) throw new FS.ErrnoError(8)
        dir = dirstream.path
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44)
        }
        return dir
      }
      return PATH.join2(dir, path)
    },
    doStat: function (func, path, buf) {
      try {
        var stat = func(path)
      } catch (e) {
        if (
          e &&
          e.node &&
          PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
        ) {
          return -54
        }
        throw e
      }
      HEAP32[buf >> 2] = stat.dev
      HEAP32[(buf + 4) >> 2] = 0
      HEAP32[(buf + 8) >> 2] = stat.ino
      HEAP32[(buf + 12) >> 2] = stat.mode
      HEAP32[(buf + 16) >> 2] = stat.nlink
      HEAP32[(buf + 20) >> 2] = stat.uid
      HEAP32[(buf + 24) >> 2] = stat.gid
      HEAP32[(buf + 28) >> 2] = stat.rdev
      HEAP32[(buf + 32) >> 2] = 0
      ;(tempI64 = [
        stat.size >>> 0,
        ((tempDouble = stat.size),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(buf + 40) >> 2] = tempI64[0]),
        (HEAP32[(buf + 44) >> 2] = tempI64[1])
      HEAP32[(buf + 48) >> 2] = 4096
      HEAP32[(buf + 52) >> 2] = stat.blocks
      HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0
      HEAP32[(buf + 60) >> 2] = 0
      HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0
      HEAP32[(buf + 68) >> 2] = 0
      HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0
      HEAP32[(buf + 76) >> 2] = 0
      ;(tempI64 = [
        stat.ino >>> 0,
        ((tempDouble = stat.ino),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(buf + 80) >> 2] = tempI64[0]),
        (HEAP32[(buf + 84) >> 2] = tempI64[1])
      return 0
    },
    doMsync: function (addr, stream, len, flags, offset) {
      var buffer = HEAPU8.slice(addr, addr + len)
      FS.msync(stream, buffer, offset, len, flags)
    },
    doMkdir: function (path, mode) {
      path = PATH.normalize(path)
      if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
      FS.mkdir(path, mode, 0)
      return 0
    },
    doMknod: function (path, mode, dev) {
      switch (mode & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break
        default:
          return -28
      }
      FS.mknod(path, mode, dev)
      return 0
    },
    doReadlink: function (path, buf, bufsize) {
      if (bufsize <= 0) return -28
      var ret = FS.readlink(path)
      var len = Math.min(bufsize, lengthBytesUTF8(ret))
      var endChar = HEAP8[buf + len]
      stringToUTF8(ret, buf, bufsize + 1)
      HEAP8[buf + len] = endChar
      return len
    },
    doAccess: function (path, amode) {
      if (amode & ~7) {
        return -28
      }
      var node
      var lookup = FS.lookupPath(path, { follow: true })
      node = lookup.node
      if (!node) {
        return -44
      }
      var perms = ''
      if (amode & 4) perms += 'r'
      if (amode & 2) perms += 'w'
      if (amode & 1) perms += 'x'
      if (perms && FS.nodePermissions(node, perms)) {
        return -2
      }
      return 0
    },
    doDup: function (path, flags, suggestFD) {
      var suggest = FS.getStream(suggestFD)
      if (suggest) FS.close(suggest)
      return FS.open(path, flags, 0, suggestFD, suggestFD).fd
    },
    doReadv: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.read(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
        if (curr < len) break
      }
      return ret
    },
    doWritev: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.write(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
      }
      return ret
    },
    varargs: undefined,
    get: function () {
      SYSCALLS.varargs += 4
      var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
      return ret
    },
    getStr: function (ptr) {
      var ret = UTF8ToString(ptr)
      return ret
    },
    getStreamFromFD: function (fd) {
      var stream = FS.getStream(fd)
      if (!stream) throw new FS.ErrnoError(8)
      return stream
    },
    get64: function (low, high) {
      return low
    },
  }
  Module['SYSCALLS'] = SYSCALLS
  function ___sys_access(path, amode) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doAccess(path, amode)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_access'] = ___sys_access
  function ___sys_chdir(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.chdir(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_chdir'] = ___sys_chdir
  function ___sys_dup2(oldfd, suggestFD) {
    try {
      var old = SYSCALLS.getStreamFromFD(oldfd)
      if (old.fd === suggestFD) return suggestFD
      return SYSCALLS.doDup(old.path, old.flags, suggestFD)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_dup2'] = ___sys_dup2
  function ___sys_fstat64(fd, buf) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      return SYSCALLS.doStat(FS.stat, stream.path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_fstat64'] = ___sys_fstat64
  function ___sys_getcwd(buf, size) {
    try {
      if (size === 0) return -28
      var cwd = FS.cwd()
      var cwdLengthInBytes = lengthBytesUTF8(cwd)
      if (size < cwdLengthInBytes + 1) return -68
      stringToUTF8(cwd, buf, size)
      return buf
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getcwd'] = ___sys_getcwd
  function ___sys_getdents64(fd, dirp, count) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      if (!stream.getdents) {
        stream.getdents = FS.readdir(stream.path)
      }
      var struct_size = 280
      var pos = 0
      var off = FS.llseek(stream, 0, 1)
      var idx = Math.floor(off / struct_size)
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id
        var type
        var name = stream.getdents[idx]
        if (name[0] === '.') {
          id = 1
          type = 4
        } else {
          var child = FS.lookupNode(stream.node, name)
          id = child.id
          type = FS.isChrdev(child.mode)
            ? 2
            : FS.isDir(child.mode)
            ? 4
            : FS.isLink(child.mode)
            ? 10
            : 8
        }
        ;(tempI64 = [
          id >>> 0,
          ((tempDouble = id),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
          (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1])
        ;(tempI64 = [
          ((idx + 1) * struct_size) >>> 0,
          ((tempDouble = (idx + 1) * struct_size),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
          (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1])
        HEAP16[(dirp + pos + 16) >> 1] = 280
        HEAP8[(dirp + pos + 18) >> 0] = type
        stringToUTF8(name, dirp + pos + 19, 256)
        pos += struct_size
        idx += 1
      }
      FS.llseek(stream, idx * struct_size, 0)
      return pos
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getdents64'] = ___sys_getdents64
  function ___sys_getpid() {
    return 42
  }
  Module['___sys_getpid'] = ___sys_getpid
  function ___sys_getrusage(who, usage) {
    try {
      _memset(usage, 0, 136)
      HEAP32[usage >> 2] = 1
      HEAP32[(usage + 4) >> 2] = 2
      HEAP32[(usage + 8) >> 2] = 3
      HEAP32[(usage + 12) >> 2] = 4
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getrusage'] = ___sys_getrusage
  function ___sys_getegid32() {
    return 0
  }
  Module['___sys_getegid32'] = ___sys_getegid32
  function ___sys_getuid32() {
    return ___sys_getegid32()
  }
  Module['___sys_getuid32'] = ___sys_getuid32
  function ___sys_lstat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doStat(FS.lstat, path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_lstat64'] = ___sys_lstat64
  function ___sys_mkdir(path, mode) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doMkdir(path, mode)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_mkdir'] = ___sys_mkdir
  function syscallMmap2(addr, len, prot, flags, fd, off) {
    off <<= 12
    var ptr
    var allocated = false
    if ((flags & 16) !== 0 && addr % 16384 !== 0) {
      return -28
    }
    if ((flags & 32) !== 0) {
      ptr = _memalign(16384, len)
      if (!ptr) return -48
      _memset(ptr, 0, len)
      allocated = true
    } else {
      var info = FS.getStream(fd)
      if (!info) return -8
      var res = FS.mmap(info, addr, len, off, prot, flags)
      ptr = res.ptr
      allocated = res.allocated
    }
    SYSCALLS.mappings[ptr] = {
      malloc: ptr,
      len: len,
      allocated: allocated,
      fd: fd,
      prot: prot,
      flags: flags,
      offset: off,
    }
    return ptr
  }
  Module['syscallMmap2'] = syscallMmap2
  function ___sys_mmap2(addr, len, prot, flags, fd, off) {
    try {
      return syscallMmap2(addr, len, prot, flags, fd, off)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_mmap2'] = ___sys_mmap2
  function syscallMunmap(addr, len) {
    if ((addr | 0) === -1 || len === 0) {
      return -28
    }
    var info = SYSCALLS.mappings[addr]
    if (!info) return 0
    if (len === info.len) {
      var stream = FS.getStream(info.fd)
      if (stream) {
        if (info.prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
        }
        FS.munmap(stream)
      }
      SYSCALLS.mappings[addr] = null
      if (info.allocated) {
        _free(info.malloc)
      }
    }
    return 0
  }
  Module['syscallMunmap'] = syscallMunmap
  function ___sys_munmap(addr, len) {
    try {
      return syscallMunmap(addr, len)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_munmap'] = ___sys_munmap
  function ___sys_open(path, flags, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var pathname = SYSCALLS.getStr(path)
      var mode = varargs ? SYSCALLS.get() : 0
      var stream = FS.open(pathname, flags, mode)
      return stream.fd
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_open'] = ___sys_open
  function ___sys_prlimit64(pid, resource, new_limit, old_limit) {
    try {
      if (old_limit) {
        HEAP32[old_limit >> 2] = -1
        HEAP32[(old_limit + 4) >> 2] = -1
        HEAP32[(old_limit + 8) >> 2] = -1
        HEAP32[(old_limit + 12) >> 2] = -1
      }
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_prlimit64'] = ___sys_prlimit64
  function ___sys_readlink(path, buf, bufsize) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doReadlink(path, buf, bufsize)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_readlink'] = ___sys_readlink
  function ___sys_rmdir(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.rmdir(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_rmdir'] = ___sys_rmdir
  function ___sys_setrlimit(varargs) {
    return 0
  }
  Module['___sys_setrlimit'] = ___sys_setrlimit
  function ___sys_stat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doStat(FS.stat, path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_stat64'] = ___sys_stat64
  function ___sys_statfs64(path, size, buf) {
    try {
      path = SYSCALLS.getStr(path)
      HEAP32[(buf + 4) >> 2] = 4096
      HEAP32[(buf + 40) >> 2] = 4096
      HEAP32[(buf + 8) >> 2] = 1e6
      HEAP32[(buf + 12) >> 2] = 5e5
      HEAP32[(buf + 16) >> 2] = 5e5
      HEAP32[(buf + 20) >> 2] = FS.nextInode
      HEAP32[(buf + 24) >> 2] = 1e6
      HEAP32[(buf + 28) >> 2] = 42
      HEAP32[(buf + 44) >> 2] = 2
      HEAP32[(buf + 36) >> 2] = 255
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_statfs64'] = ___sys_statfs64
  function ___sys_ugetrlimit(resource, rlim) {
    try {
      HEAP32[rlim >> 2] = -1
      HEAP32[(rlim + 4) >> 2] = -1
      HEAP32[(rlim + 8) >> 2] = -1
      HEAP32[(rlim + 12) >> 2] = -1
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_ugetrlimit'] = ___sys_ugetrlimit
  function ___sys_uname(buf) {
    try {
      if (!buf) return -21
      var layout = {
        __size__: 390,
        domainname: 325,
        machine: 260,
        nodename: 65,
        release: 130,
        sysname: 0,
        version: 195,
      }
      var copyString = function (element, value) {
        var offset = layout[element]
        writeAsciiToMemory(value, buf + offset)
      }
      copyString('sysname', 'Emscripten')
      copyString('nodename', 'emscripten')
      copyString('release', '1.0')
      copyString('version', '#1')
      copyString('machine', 'x86-JS')
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_uname'] = ___sys_uname
  function ___sys_unlink(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.unlink(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_unlink'] = ___sys_unlink
  function ___sys_wait4(pid, wstart, options, rusage) {
    try {
      abort('cannot wait on child processes')
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_wait4'] = ___sys_wait4
  function _exit(status) {
    exit(status)
  }
  Module['_exit'] = _exit
  function __exit(a0) {
    return _exit(a0)
  }
  Module['__exit'] = __exit
  function _abort() {
    abort()
  }
  Module['_abort'] = _abort
  var __sigalrm_handler = 0
  Module['__sigalrm_handler'] = __sigalrm_handler
  function _alarm(seconds) {
    setTimeout(function () {
      if (__sigalrm_handler) wasmTable.get(__sigalrm_handler)(0)
    }, seconds * 1e3)
  }
  Module['_alarm'] = _alarm
  var _emscripten_get_now
  if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function () {
      var t = process['hrtime']()
      return t[0] * 1e3 + t[1] / 1e6
    }
  } else if (typeof dateNow !== 'undefined') {
    _emscripten_get_now = dateNow
  } else
    _emscripten_get_now = function () {
      return performance.now()
    }
  Module['_emscripten_get_now'] = _emscripten_get_now
  var _emscripten_get_now_is_monotonic = true
  Module['_emscripten_get_now_is_monotonic'] = _emscripten_get_now_is_monotonic
  function setErrNo(value) {
    HEAP32[___errno_location() >> 2] = value
    return value
  }
  Module['setErrNo'] = setErrNo
  function _clock_gettime(clk_id, tp) {
    var now
    if (clk_id === 0) {
      now = Date.now()
    } else if (
      (clk_id === 1 || clk_id === 4) &&
      _emscripten_get_now_is_monotonic
    ) {
      now = _emscripten_get_now()
    } else {
      setErrNo(28)
      return -1
    }
    HEAP32[tp >> 2] = (now / 1e3) | 0
    HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0
    return 0
  }
  Module['_clock_gettime'] = _clock_gettime
  function _dlclose(handle) {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlclose'] = _dlclose
  function _dlerror() {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlerror'] = _dlerror
  function _dlopen(filename, flag) {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlopen'] = _dlopen
  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.copyWithin(dest, src, src + num)
  }
  Module['_emscripten_memcpy_big'] = _emscripten_memcpy_big
  function _emscripten_get_heap_size() {
    return HEAPU8.length
  }
  Module['_emscripten_get_heap_size'] = _emscripten_get_heap_size
  function abortOnCannotGrowMemory(requestedSize) {
    abort('OOM')
  }
  Module['abortOnCannotGrowMemory'] = abortOnCannotGrowMemory
  function _emscripten_resize_heap(requestedSize) {
    abortOnCannotGrowMemory(requestedSize)
  }
  Module['_emscripten_resize_heap'] = _emscripten_resize_heap
  var ENV = {}
  Module['ENV'] = ENV
  function getExecutableName() {
    return thisProgram || './this.program'
  }
  Module['getExecutableName'] = getExecutableName
  function getEnvStrings() {
    if (!getEnvStrings.strings) {
      var lang =
        (
          (typeof navigator === 'object' &&
            navigator.languages &&
            navigator.languages[0]) ||
          'C'
        ).replace('-', '_') + '.UTF-8'
      var env = {
        USER: 'web_user',
        LOGNAME: 'web_user',
        PATH: '/',
        PWD: '/',
        HOME: '/home/web_user',
        LANG: lang,
        _: getExecutableName(),
      }
      for (var x in ENV) {
        env[x] = ENV[x]
      }
      var strings = []
      for (var x in env) {
        strings.push(x + '=' + env[x])
      }
      getEnvStrings.strings = strings
    }
    return getEnvStrings.strings
  }
  Module['getEnvStrings'] = getEnvStrings
  function _environ_get(__environ, environ_buf) {
    try {
      var bufSize = 0
      getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize
        HEAP32[(__environ + i * 4) >> 2] = ptr
        writeAsciiToMemory(string, ptr)
        bufSize += string.length + 1
      })
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_environ_get'] = _environ_get
  function _environ_sizes_get(penviron_count, penviron_buf_size) {
    try {
      var strings = getEnvStrings()
      HEAP32[penviron_count >> 2] = strings.length
      var bufSize = 0
      strings.forEach(function (string) {
        bufSize += string.length + 1
      })
      HEAP32[penviron_buf_size >> 2] = bufSize
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_environ_sizes_get'] = _environ_sizes_get
  function _execve(path, argv, envp) {
    setErrNo(45)
    return -1
  }
  Module['_execve'] = _execve
  function _fd_close(fd) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      FS.close(stream)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_close'] = _fd_close
  function _fd_fdstat_get(fd, pbuf) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var type = stream.tty
        ? 2
        : FS.isDir(stream.mode)
        ? 3
        : FS.isLink(stream.mode)
        ? 7
        : 4
      HEAP8[pbuf >> 0] = type
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_fdstat_get'] = _fd_fdstat_get
  function _fd_pread(fd, iov, iovcnt, offset_low, offset_high, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doReadv(stream, iov, iovcnt, offset_low)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_pread'] = _fd_pread
  function _fd_read(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doReadv(stream, iov, iovcnt)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_read'] = _fd_read
  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var HIGH_OFFSET = 4294967296
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0)
      var DOUBLE_LIMIT = 9007199254740992
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61
      }
      FS.llseek(stream, offset, whence)
      ;(tempI64 = [
        stream.position >>> 0,
        ((tempDouble = stream.position),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[newOffset >> 2] = tempI64[0]),
        (HEAP32[(newOffset + 4) >> 2] = tempI64[1])
      if (stream.getdents && offset === 0 && whence === 0)
        stream.getdents = null
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_seek'] = _fd_seek
  function _fd_write(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doWritev(stream, iov, iovcnt)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_write'] = _fd_write
  function _fork() {
    setErrNo(6)
    return -1
  }
  Module['_fork'] = _fork
  function _getpwnam() {
    throw 'getpwnam: TODO'
  }
  Module['_getpwnam'] = _getpwnam
  function _getpwuid() {
    throw 'getpwuid: TODO'
  }
  Module['_getpwuid'] = _getpwuid
  var ERRNO_CODES = {
    EPERM: 63,
    ENOENT: 44,
    ESRCH: 71,
    EINTR: 27,
    EIO: 29,
    ENXIO: 60,
    E2BIG: 1,
    ENOEXEC: 45,
    EBADF: 8,
    ECHILD: 12,
    EAGAIN: 6,
    EWOULDBLOCK: 6,
    ENOMEM: 48,
    EACCES: 2,
    EFAULT: 21,
    ENOTBLK: 105,
    EBUSY: 10,
    EEXIST: 20,
    EXDEV: 75,
    ENODEV: 43,
    ENOTDIR: 54,
    EISDIR: 31,
    EINVAL: 28,
    ENFILE: 41,
    EMFILE: 33,
    ENOTTY: 59,
    ETXTBSY: 74,
    EFBIG: 22,
    ENOSPC: 51,
    ESPIPE: 70,
    EROFS: 69,
    EMLINK: 34,
    EPIPE: 64,
    EDOM: 18,
    ERANGE: 68,
    ENOMSG: 49,
    EIDRM: 24,
    ECHRNG: 106,
    EL2NSYNC: 156,
    EL3HLT: 107,
    EL3RST: 108,
    ELNRNG: 109,
    EUNATCH: 110,
    ENOCSI: 111,
    EL2HLT: 112,
    EDEADLK: 16,
    ENOLCK: 46,
    EBADE: 113,
    EBADR: 114,
    EXFULL: 115,
    ENOANO: 104,
    EBADRQC: 103,
    EBADSLT: 102,
    EDEADLOCK: 16,
    EBFONT: 101,
    ENOSTR: 100,
    ENODATA: 116,
    ETIME: 117,
    ENOSR: 118,
    ENONET: 119,
    ENOPKG: 120,
    EREMOTE: 121,
    ENOLINK: 47,
    EADV: 122,
    ESRMNT: 123,
    ECOMM: 124,
    EPROTO: 65,
    EMULTIHOP: 36,
    EDOTDOT: 125,
    EBADMSG: 9,
    ENOTUNIQ: 126,
    EBADFD: 127,
    EREMCHG: 128,
    ELIBACC: 129,
    ELIBBAD: 130,
    ELIBSCN: 131,
    ELIBMAX: 132,
    ELIBEXEC: 133,
    ENOSYS: 52,
    ENOTEMPTY: 55,
    ENAMETOOLONG: 37,
    ELOOP: 32,
    EOPNOTSUPP: 138,
    EPFNOSUPPORT: 139,
    ECONNRESET: 15,
    ENOBUFS: 42,
    EAFNOSUPPORT: 5,
    EPROTOTYPE: 67,
    ENOTSOCK: 57,
    ENOPROTOOPT: 50,
    ESHUTDOWN: 140,
    ECONNREFUSED: 14,
    EADDRINUSE: 3,
    ECONNABORTED: 13,
    ENETUNREACH: 40,
    ENETDOWN: 38,
    ETIMEDOUT: 73,
    EHOSTDOWN: 142,
    EHOSTUNREACH: 23,
    EINPROGRESS: 26,
    EALREADY: 7,
    EDESTADDRREQ: 17,
    EMSGSIZE: 35,
    EPROTONOSUPPORT: 66,
    ESOCKTNOSUPPORT: 137,
    EADDRNOTAVAIL: 4,
    ENETRESET: 39,
    EISCONN: 30,
    ENOTCONN: 53,
    ETOOMANYREFS: 141,
    EUSERS: 136,
    EDQUOT: 19,
    ESTALE: 72,
    ENOTSUP: 138,
    ENOMEDIUM: 148,
    EILSEQ: 25,
    EOVERFLOW: 61,
    ECANCELED: 11,
    ENOTRECOVERABLE: 56,
    EOWNERDEAD: 62,
    ESTRPIPE: 135,
  }
  Module['ERRNO_CODES'] = ERRNO_CODES
  function _kill(pid, sig) {
    setErrNo(ERRNO_CODES.EPERM)
    return -1
  }
  Module['_kill'] = _kill
  function _tzset() {
    if (_tzset.called) return
    _tzset.called = true
    var currentYear = new Date().getFullYear()
    var winter = new Date(currentYear, 0, 1)
    var summer = new Date(currentYear, 6, 1)
    var winterOffset = winter.getTimezoneOffset()
    var summerOffset = summer.getTimezoneOffset()
    var stdTimezoneOffset = Math.max(winterOffset, summerOffset)
    HEAP32[__get_timezone() >> 2] = stdTimezoneOffset * 60
    HEAP32[__get_daylight() >> 2] = Number(winterOffset != summerOffset)
    function extractZone(date) {
      var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
      return match ? match[1] : 'GMT'
    }
    var winterName = extractZone(winter)
    var summerName = extractZone(summer)
    var winterNamePtr = allocateUTF8(winterName)
    var summerNamePtr = allocateUTF8(summerName)
    if (summerOffset < winterOffset) {
      HEAP32[__get_tzname() >> 2] = winterNamePtr
      HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr
    } else {
      HEAP32[__get_tzname() >> 2] = summerNamePtr
      HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr
    }
  }
  Module['_tzset'] = _tzset
  function _localtime_r(time, tmPtr) {
    _tzset()
    var date = new Date(HEAP32[time >> 2] * 1e3)
    HEAP32[tmPtr >> 2] = date.getSeconds()
    HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
    HEAP32[(tmPtr + 8) >> 2] = date.getHours()
    HEAP32[(tmPtr + 12) >> 2] = date.getDate()
    HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
    HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
    HEAP32[(tmPtr + 24) >> 2] = date.getDay()
    var start = new Date(date.getFullYear(), 0, 1)
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
    HEAP32[(tmPtr + 28) >> 2] = yday
    HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
    var winterOffset = start.getTimezoneOffset()
    var dst =
      (summerOffset != winterOffset &&
        date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
    HEAP32[(tmPtr + 32) >> 2] = dst
    var zonePtr = HEAP32[(__get_tzname() + (dst ? 4 : 0)) >> 2]
    HEAP32[(tmPtr + 40) >> 2] = zonePtr
    return tmPtr
  }
  Module['_localtime_r'] = _localtime_r
  function _posix_spawn() {
    return _fork()
  }
  Module['_posix_spawn'] = _posix_spawn
  function _raise(sig) {
    setErrNo(ERRNO_CODES.ENOSYS)
    return -1
  }
  Module['_raise'] = _raise
  function _setTempRet0($i) {
    setTempRet0($i | 0)
  }
  Module['_setTempRet0'] = _setTempRet0
  function _sigaction(signum, act, oldact) {
    return 0
  }
  Module['_sigaction'] = _sigaction
  function _sigemptyset(set) {
    HEAP32[set >> 2] = 0
    return 0
  }
  Module['_sigemptyset'] = _sigemptyset
  function _sigfillset(set) {
    HEAP32[set >> 2] = -1 >>> 0
    return 0
  }
  Module['_sigfillset'] = _sigfillset
  function _sigprocmask() {
    return 0
  }
  Module['_sigprocmask'] = _sigprocmask
  function __isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  }
  Module['__isLeapYear'] = __isLeapYear
  function __arraySum(array, index) {
    var sum = 0
    for (var i = 0; i <= index; sum += array[i++]) {}
    return sum
  }
  Module['__arraySum'] = __arraySum
  var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  Module['__MONTH_DAYS_LEAP'] = __MONTH_DAYS_LEAP
  var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  Module['__MONTH_DAYS_REGULAR'] = __MONTH_DAYS_REGULAR
  function __addDays(date, days) {
    var newDate = new Date(date.getTime())
    while (days > 0) {
      var leap = __isLeapYear(newDate.getFullYear())
      var currentMonth = newDate.getMonth()
      var daysInCurrentMonth = (leap
        ? __MONTH_DAYS_LEAP
        : __MONTH_DAYS_REGULAR)[currentMonth]
      if (days > daysInCurrentMonth - newDate.getDate()) {
        days -= daysInCurrentMonth - newDate.getDate() + 1
        newDate.setDate(1)
        if (currentMonth < 11) {
          newDate.setMonth(currentMonth + 1)
        } else {
          newDate.setMonth(0)
          newDate.setFullYear(newDate.getFullYear() + 1)
        }
      } else {
        newDate.setDate(newDate.getDate() + days)
        return newDate
      }
    }
    return newDate
  }
  Module['__addDays'] = __addDays
  function _strftime(s, maxsize, format, tm) {
    var tm_zone = HEAP32[(tm + 40) >> 2]
    var date = {
      tm_sec: HEAP32[tm >> 2],
      tm_min: HEAP32[(tm + 4) >> 2],
      tm_hour: HEAP32[(tm + 8) >> 2],
      tm_mday: HEAP32[(tm + 12) >> 2],
      tm_mon: HEAP32[(tm + 16) >> 2],
      tm_year: HEAP32[(tm + 20) >> 2],
      tm_wday: HEAP32[(tm + 24) >> 2],
      tm_yday: HEAP32[(tm + 28) >> 2],
      tm_isdst: HEAP32[(tm + 32) >> 2],
      tm_gmtoff: HEAP32[(tm + 36) >> 2],
      tm_zone: tm_zone ? UTF8ToString(tm_zone) : '',
    }
    var pattern = UTF8ToString(format)
    var EXPANSION_RULES_1 = {
      '%c': '%a %b %d %H:%M:%S %Y',
      '%D': '%m/%d/%y',
      '%F': '%Y-%m-%d',
      '%h': '%b',
      '%r': '%I:%M:%S %p',
      '%R': '%H:%M',
      '%T': '%H:%M:%S',
      '%x': '%m/%d/%y',
      '%X': '%H:%M:%S',
      '%Ec': '%c',
      '%EC': '%C',
      '%Ex': '%m/%d/%y',
      '%EX': '%H:%M:%S',
      '%Ey': '%y',
      '%EY': '%Y',
      '%Od': '%d',
      '%Oe': '%e',
      '%OH': '%H',
      '%OI': '%I',
      '%Om': '%m',
      '%OM': '%M',
      '%OS': '%S',
      '%Ou': '%u',
      '%OU': '%U',
      '%OV': '%V',
      '%Ow': '%w',
      '%OW': '%W',
      '%Oy': '%y',
    }
    for (var rule in EXPANSION_RULES_1) {
      pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule])
    }
    var WEEKDAYS = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    function leadingSomething(value, digits, character) {
      var str = typeof value === 'number' ? value.toString() : value || ''
      while (str.length < digits) {
        str = character[0] + str
      }
      return str
    }
    function leadingNulls(value, digits) {
      return leadingSomething(value, digits, '0')
    }
    function compareByDay(date1, date2) {
      function sgn(value) {
        return value < 0 ? -1 : value > 0 ? 1 : 0
      }
      var compare
      if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
        if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
          compare = sgn(date1.getDate() - date2.getDate())
        }
      }
      return compare
    }
    function getFirstWeekStartDate(janFourth) {
      switch (janFourth.getDay()) {
        case 0:
          return new Date(janFourth.getFullYear() - 1, 11, 29)
        case 1:
          return janFourth
        case 2:
          return new Date(janFourth.getFullYear(), 0, 3)
        case 3:
          return new Date(janFourth.getFullYear(), 0, 2)
        case 4:
          return new Date(janFourth.getFullYear(), 0, 1)
        case 5:
          return new Date(janFourth.getFullYear() - 1, 11, 31)
        case 6:
          return new Date(janFourth.getFullYear() - 1, 11, 30)
      }
    }
    function getWeekBasedYear(date) {
      var thisDate = __addDays(
        new Date(date.tm_year + 1900, 0, 1),
        date.tm_yday
      )
      var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
      var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
      var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
      var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
      if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
        if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
          return thisDate.getFullYear() + 1
        } else {
          return thisDate.getFullYear()
        }
      } else {
        return thisDate.getFullYear() - 1
      }
    }
    var EXPANSION_RULES_2 = {
      '%a': function (date) {
        return WEEKDAYS[date.tm_wday].substring(0, 3)
      },
      '%A': function (date) {
        return WEEKDAYS[date.tm_wday]
      },
      '%b': function (date) {
        return MONTHS[date.tm_mon].substring(0, 3)
      },
      '%B': function (date) {
        return MONTHS[date.tm_mon]
      },
      '%C': function (date) {
        var year = date.tm_year + 1900
        return leadingNulls((year / 100) | 0, 2)
      },
      '%d': function (date) {
        return leadingNulls(date.tm_mday, 2)
      },
      '%e': function (date) {
        return leadingSomething(date.tm_mday, 2, ' ')
      },
      '%g': function (date) {
        return getWeekBasedYear(date).toString().substring(2)
      },
      '%G': function (date) {
        return getWeekBasedYear(date)
      },
      '%H': function (date) {
        return leadingNulls(date.tm_hour, 2)
      },
      '%I': function (date) {
        var twelveHour = date.tm_hour
        if (twelveHour == 0) twelveHour = 12
        else if (twelveHour > 12) twelveHour -= 12
        return leadingNulls(twelveHour, 2)
      },
      '%j': function (date) {
        return leadingNulls(
          date.tm_mday +
            __arraySum(
              __isLeapYear(date.tm_year + 1900)
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              date.tm_mon - 1
            ),
          3
        )
      },
      '%m': function (date) {
        return leadingNulls(date.tm_mon + 1, 2)
      },
      '%M': function (date) {
        return leadingNulls(date.tm_min, 2)
      },
      '%n': function () {
        return '\n'
      },
      '%p': function (date) {
        if (date.tm_hour >= 0 && date.tm_hour < 12) {
          return 'AM'
        } else {
          return 'PM'
        }
      },
      '%S': function (date) {
        return leadingNulls(date.tm_sec, 2)
      },
      '%t': function () {
        return '\t'
      },
      '%u': function (date) {
        return date.tm_wday || 7
      },
      '%U': function (date) {
        var janFirst = new Date(date.tm_year + 1900, 0, 1)
        var firstSunday =
          janFirst.getDay() === 0
            ? janFirst
            : __addDays(janFirst, 7 - janFirst.getDay())
        var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
        if (compareByDay(firstSunday, endDate) < 0) {
          var februaryFirstUntilEndMonth =
            __arraySum(
              __isLeapYear(endDate.getFullYear())
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              endDate.getMonth() - 1
            ) - 31
          var firstSundayUntilEndJanuary = 31 - firstSunday.getDate()
          var days =
            firstSundayUntilEndJanuary +
            februaryFirstUntilEndMonth +
            endDate.getDate()
          return leadingNulls(Math.ceil(days / 7), 2)
        }
        return compareByDay(firstSunday, janFirst) === 0 ? '01' : '00'
      },
      '%V': function (date) {
        var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4)
        var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4)
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
        var endDate = __addDays(
          new Date(date.tm_year + 1900, 0, 1),
          date.tm_yday
        )
        if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
          return '53'
        }
        if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
          return '01'
        }
        var daysDifference
        if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
          daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
        } else {
          daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
        }
        return leadingNulls(Math.ceil(daysDifference / 7), 2)
      },
      '%w': function (date) {
        return date.tm_wday
      },
      '%W': function (date) {
        var janFirst = new Date(date.tm_year, 0, 1)
        var firstMonday =
          janFirst.getDay() === 1
            ? janFirst
            : __addDays(
                janFirst,
                janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1
              )
        var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
        if (compareByDay(firstMonday, endDate) < 0) {
          var februaryFirstUntilEndMonth =
            __arraySum(
              __isLeapYear(endDate.getFullYear())
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              endDate.getMonth() - 1
            ) - 31
          var firstMondayUntilEndJanuary = 31 - firstMonday.getDate()
          var days =
            firstMondayUntilEndJanuary +
            februaryFirstUntilEndMonth +
            endDate.getDate()
          return leadingNulls(Math.ceil(days / 7), 2)
        }
        return compareByDay(firstMonday, janFirst) === 0 ? '01' : '00'
      },
      '%y': function (date) {
        return (date.tm_year + 1900).toString().substring(2)
      },
      '%Y': function (date) {
        return date.tm_year + 1900
      },
      '%z': function (date) {
        var off = date.tm_gmtoff
        var ahead = off >= 0
        off = Math.abs(off) / 60
        off = (off / 60) * 100 + (off % 60)
        return (ahead ? '+' : '-') + String('0000' + off).slice(-4)
      },
      '%Z': function (date) {
        return date.tm_zone
      },
      '%%': function () {
        return '%'
      },
    }
    for (var rule in EXPANSION_RULES_2) {
      if (pattern.indexOf(rule) >= 0) {
        pattern = pattern.replace(
          new RegExp(rule, 'g'),
          EXPANSION_RULES_2[rule](date)
        )
      }
    }
    var bytes = intArrayFromString(pattern, false)
    if (bytes.length > maxsize) {
      return 0
    }
    writeArrayToMemory(bytes, s)
    return bytes.length - 1
  }
  Module['_strftime'] = _strftime
  function _strftime_l(s, maxsize, format, tm) {
    return _strftime(s, maxsize, format, tm)
  }
  Module['_strftime_l'] = _strftime_l
  function _time(ptr) {
    var ret = (Date.now() / 1e3) | 0
    if (ptr) {
      HEAP32[ptr >> 2] = ret
    }
    return ret
  }
  Module['_time'] = _time
  function _wait(stat_loc) {
    setErrNo(12)
    return -1
  }
  Module['_wait'] = _wait
  function _wait4(a0) {
    return _wait(a0)
  }
  Module['_wait4'] = _wait4
  var FSNode = function (parent, name, mode, rdev) {
    if (!parent) {
      parent = this
    }
    this.parent = parent
    this.mount = parent.mount
    this.mounted = null
    this.id = FS.nextInode++
    this.name = name
    this.mode = mode
    this.node_ops = {}
    this.stream_ops = {}
    this.rdev = rdev
  }
  var readMode = 292 | 73
  var writeMode = 146
  Object.defineProperties(FSNode.prototype, {
    read: {
      get: function () {
        return (this.mode & readMode) === readMode
      },
      set: function (val) {
        val ? (this.mode |= readMode) : (this.mode &= ~readMode)
      },
    },
    write: {
      get: function () {
        return (this.mode & writeMode) === writeMode
      },
      set: function (val) {
        val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
      },
    },
    isFolder: {
      get: function () {
        return FS.isDir(this.mode)
      },
    },
    isDevice: {
      get: function () {
        return FS.isChrdev(this.mode)
      },
    },
  })
  FS.FSNode = FSNode
  FS.staticInit()
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
    var u8array = new Array(len)
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
    if (dontAddNull) u8array.length = numBytesWritten
    return u8array
  }
  var asmLibraryArg = {
    H: ___sys_access,
    B: ___sys_chdir,
    Q: ___sys_fstat64,
    D: ___sys_getcwd,
    N: ___sys_getdents64,
    C: ___sys_getpid,
    J: ___sys_getrusage,
    R: ___sys_lstat64,
    z: ___sys_mmap2,
    A: ___sys_munmap,
    m: ___sys_open,
    M: ___sys_prlimit64,
    I: ___sys_readlink,
    y: ___sys_rmdir,
    L: ___sys_setrlimit,
    l: ___sys_stat64,
    O: ___sys_statfs64,
    K: ___sys_uname,
    k: ___sys_unlink,
    a: _abort,
    i: _clock_gettime,
    f: _dlclose,
    o: _dlerror,
    p: _dlopen,
    s: _emscripten_memcpy_big,
    t: _emscripten_resize_heap,
    v: _environ_get,
    x: _environ_sizes_get,
    d: _exit,
    g: _fd_close,
    j: _fd_fdstat_get,
    r: _fd_pread,
    E: _fd_read,
    q: _fd_seek,
    G: _fd_write,
    F: _localtime_r,
    T: _posix_spawn,
    U: _raise,
    e: _setTempRet0,
    b: _sigaction,
    c: _sigemptyset,
    n: _sigfillset,
    h: _sigprocmask,
    w: _strftime,
    u: _strftime_l,
    P: _time,
    S: _wait4,
  }
  var asm = createWasm()
  var ___wasm_call_ctors = (Module['___wasm_call_ctors'] = function () {
    return (___wasm_call_ctors = Module['___wasm_call_ctors'] =
      Module['asm']['W']).apply(null, arguments)
  })
  var _free = (Module['_free'] = function () {
    return (_free = Module['_free'] = Module['asm']['X']).apply(null, arguments)
  })
  var _main = (Module['_main'] = function () {
    return (_main = Module['_main'] = Module['asm']['Y']).apply(null, arguments)
  })
  var _memset = (Module['_memset'] = function () {
    return (_memset = Module['_memset'] = Module['asm']['Z']).apply(
      null,
      arguments
    )
  })
  var _malloc = (Module['_malloc'] = function () {
    return (_malloc = Module['_malloc'] = Module['asm']['$']).apply(
      null,
      arguments
    )
  })
  var _realloc = (Module['_realloc'] = function () {
    return (_realloc = Module['_realloc'] = Module['asm']['aa']).apply(
      null,
      arguments
    )
  })
  var ___errno_location = (Module['___errno_location'] = function () {
    return (___errno_location = Module['___errno_location'] =
      Module['asm']['ba']).apply(null, arguments)
  })
  var _testSetjmp = (Module['_testSetjmp'] = function () {
    return (_testSetjmp = Module['_testSetjmp'] = Module['asm']['ca']).apply(
      null,
      arguments
    )
  })
  var _saveSetjmp = (Module['_saveSetjmp'] = function () {
    return (_saveSetjmp = Module['_saveSetjmp'] = Module['asm']['da']).apply(
      null,
      arguments
    )
  })
  var __get_tzname = (Module['__get_tzname'] = function () {
    return (__get_tzname = Module['__get_tzname'] = Module['asm']['ea']).apply(
      null,
      arguments
    )
  })
  var __get_daylight = (Module['__get_daylight'] = function () {
    return (__get_daylight = Module['__get_daylight'] =
      Module['asm']['fa']).apply(null, arguments)
  })
  var __get_timezone = (Module['__get_timezone'] = function () {
    return (__get_timezone = Module['__get_timezone'] =
      Module['asm']['ga']).apply(null, arguments)
  })
  var _emscripten_main_thread_process_queued_calls = (Module[
    '_emscripten_main_thread_process_queued_calls'
  ] = function () {
    return (_emscripten_main_thread_process_queued_calls = Module[
      '_emscripten_main_thread_process_queued_calls'
    ] = Module['asm']['ha']).apply(null, arguments)
  })
  var stackSave = (Module['stackSave'] = function () {
    return (stackSave = Module['stackSave'] = Module['asm']['ia']).apply(
      null,
      arguments
    )
  })
  var stackRestore = (Module['stackRestore'] = function () {
    return (stackRestore = Module['stackRestore'] = Module['asm']['ja']).apply(
      null,
      arguments
    )
  })
  var stackAlloc = (Module['stackAlloc'] = function () {
    return (stackAlloc = Module['stackAlloc'] = Module['asm']['ka']).apply(
      null,
      arguments
    )
  })
  var _setThrew = (Module['_setThrew'] = function () {
    return (_setThrew = Module['_setThrew'] = Module['asm']['la']).apply(
      null,
      arguments
    )
  })
  var _memalign = (Module['_memalign'] = function () {
    return (_memalign = Module['_memalign'] = Module['asm']['ma']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiij = (Module['dynCall_iiij'] = function () {
    return (dynCall_iiij = Module['dynCall_iiij'] = Module['asm']['na']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiiiji = (Module['dynCall_iiiiiji'] = function () {
    return (dynCall_iiiiiji = Module['dynCall_iiiiiji'] =
      Module['asm']['oa']).apply(null, arguments)
  })
  var dynCall_iiiijji = (Module['dynCall_iiiijji'] = function () {
    return (dynCall_iiiijji = Module['dynCall_iiiijji'] =
      Module['asm']['pa']).apply(null, arguments)
  })
  var dynCall_viiiij = (Module['dynCall_viiiij'] = function () {
    return (dynCall_viiiij = Module['dynCall_viiiij'] =
      Module['asm']['qa']).apply(null, arguments)
  })
  var dynCall_jiij = (Module['dynCall_jiij'] = function () {
    return (dynCall_jiij = Module['dynCall_jiij'] = Module['asm']['ra']).apply(
      null,
      arguments
    )
  })
  var dynCall_jiii = (Module['dynCall_jiii'] = function () {
    return (dynCall_jiii = Module['dynCall_jiii'] = Module['asm']['sa']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiij = (Module['dynCall_iiiij'] = function () {
    return (dynCall_iiiij = Module['dynCall_iiiij'] =
      Module['asm']['ta']).apply(null, arguments)
  })
  var dynCall_viiij = (Module['dynCall_viiij'] = function () {
    return (dynCall_viiij = Module['dynCall_viiij'] =
      Module['asm']['ua']).apply(null, arguments)
  })
  var dynCall_iiiiiiij = (Module['dynCall_iiiiiiij'] = function () {
    return (dynCall_iiiiiiij = Module['dynCall_iiiiiiij'] =
      Module['asm']['va']).apply(null, arguments)
  })
  var dynCall_iiiiij = (Module['dynCall_iiiiij'] = function () {
    return (dynCall_iiiiij = Module['dynCall_iiiiij'] =
      Module['asm']['wa']).apply(null, arguments)
  })
  var dynCall_iiijjii = (Module['dynCall_iiijjii'] = function () {
    return (dynCall_iiijjii = Module['dynCall_iiijjii'] =
      Module['asm']['xa']).apply(null, arguments)
  })
  var dynCall_iij = (Module['dynCall_iij'] = function () {
    return (dynCall_iij = Module['dynCall_iij'] = Module['asm']['ya']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiijijii = (Module['dynCall_iiiijijii'] = function () {
    return (dynCall_iiiijijii = Module['dynCall_iiiijijii'] =
      Module['asm']['za']).apply(null, arguments)
  })
  var dynCall_iiiijiji = (Module['dynCall_iiiijiji'] = function () {
    return (dynCall_iiiijiji = Module['dynCall_iiiijiji'] =
      Module['asm']['Aa']).apply(null, arguments)
  })
  var dynCall_iiiiijii = (Module['dynCall_iiiiijii'] = function () {
    return (dynCall_iiiiijii = Module['dynCall_iiiiijii'] =
      Module['asm']['Ba']).apply(null, arguments)
  })
  var dynCall_viijiii = (Module['dynCall_viijiii'] = function () {
    return (dynCall_viijiii = Module['dynCall_viijiii'] =
      Module['asm']['Ca']).apply(null, arguments)
  })
  var dynCall_viiiiijii = (Module['dynCall_viiiiijii'] = function () {
    return (dynCall_viiiiijii = Module['dynCall_viiiiijii'] =
      Module['asm']['Da']).apply(null, arguments)
  })
  var dynCall_iiiijiii = (Module['dynCall_iiiijiii'] = function () {
    return (dynCall_iiiijiii = Module['dynCall_iiiijiii'] =
      Module['asm']['Ea']).apply(null, arguments)
  })
  var dynCall_iiijii = (Module['dynCall_iiijii'] = function () {
    return (dynCall_iiijii = Module['dynCall_iiijii'] =
      Module['asm']['Fa']).apply(null, arguments)
  })
  var dynCall_viij = (Module['dynCall_viij'] = function () {
    return (dynCall_viij = Module['dynCall_viij'] = Module['asm']['Ga']).apply(
      null,
      arguments
    )
  })
  var dynCall_viji = (Module['dynCall_viji'] = function () {
    return (dynCall_viji = Module['dynCall_viji'] = Module['asm']['Ha']).apply(
      null,
      arguments
    )
  })
  var dynCall_vijii = (Module['dynCall_vijii'] = function () {
    return (dynCall_vijii = Module['dynCall_vijii'] =
      Module['asm']['Ia']).apply(null, arguments)
  })
  var dynCall_ji = (Module['dynCall_ji'] = function () {
    return (dynCall_ji = Module['dynCall_ji'] = Module['asm']['Ja']).apply(
      null,
      arguments
    )
  })
  var dynCall_vij = (Module['dynCall_vij'] = function () {
    return (dynCall_vij = Module['dynCall_vij'] = Module['asm']['Ka']).apply(
      null,
      arguments
    )
  })
  var dynCall_viijii = (Module['dynCall_viijii'] = function () {
    return (dynCall_viijii = Module['dynCall_viijii'] =
      Module['asm']['La']).apply(null, arguments)
  })
  var dynCall_viiji = (Module['dynCall_viiji'] = function () {
    return (dynCall_viiji = Module['dynCall_viiji'] =
      Module['asm']['Ma']).apply(null, arguments)
  })
  var dynCall_viiijii = (Module['dynCall_viiijii'] = function () {
    return (dynCall_viiijii = Module['dynCall_viiijii'] =
      Module['asm']['Na']).apply(null, arguments)
  })
  var dynCall_viiiji = (Module['dynCall_viiiji'] = function () {
    return (dynCall_viiiji = Module['dynCall_viiiji'] =
      Module['asm']['Oa']).apply(null, arguments)
  })
  var dynCall_viijji = (Module['dynCall_viijji'] = function () {
    return (dynCall_viijji = Module['dynCall_viijji'] =
      Module['asm']['Pa']).apply(null, arguments)
  })
  var dynCall_vijji = (Module['dynCall_vijji'] = function () {
    return (dynCall_vijji = Module['dynCall_vijji'] =
      Module['asm']['Qa']).apply(null, arguments)
  })
  var dynCall_vijj = (Module['dynCall_vijj'] = function () {
    return (dynCall_vijj = Module['dynCall_vijj'] = Module['asm']['Ra']).apply(
      null,
      arguments
    )
  })
  var dynCall_vijjjji = (Module['dynCall_vijjjji'] = function () {
    return (dynCall_vijjjji = Module['dynCall_vijjjji'] =
      Module['asm']['Sa']).apply(null, arguments)
  })
  var dynCall_iiiiijj = (Module['dynCall_iiiiijj'] = function () {
    return (dynCall_iiiiijj = Module['dynCall_iiiiijj'] =
      Module['asm']['Ta']).apply(null, arguments)
  })
  var dynCall_iiiiiijj = (Module['dynCall_iiiiiijj'] = function () {
    return (dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] =
      Module['asm']['Ua']).apply(null, arguments)
  })
  var calledRun
  function ExitStatus(status) {
    this.name = 'ExitStatus'
    this.message = 'Program terminated with exit(' + status + ')'
    this.status = status
  }
  var calledMain = false
  dependenciesFulfilled = function runCaller() {
    if (!calledRun) run()
    if (!calledRun) dependenciesFulfilled = runCaller
  }
  function callMain(args) {
    var entryFunction = Module['_main']
    args = args || []
    var argc = args.length + 1
    var argv = stackAlloc((argc + 1) * 4)
    HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram)
    for (var i = 1; i < argc; i++) {
      HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
    }
    HEAP32[(argv >> 2) + argc] = 0
    try {
      var ret = entryFunction(argc, argv)
      exit(ret, true)
    } catch (e) {
      if (e instanceof ExitStatus) {
        return
      } else if (e == 'unwind') {
        noExitRuntime = true
        return
      } else {
        var toLog = e
        if (e && typeof e === 'object' && e.stack) {
          toLog = [e, e.stack]
        }
        err('exception thrown: ' + toLog)
        quit_(1, e)
      }
    } finally {
      calledMain = true
    }
  }
  function run(args) {
    args = args || arguments_
    if (runDependencies > 0) {
      return
    }
    preRun()
    if (runDependencies > 0) {
      return
    }
    function doRun() {
      if (calledRun) return
      calledRun = true
      Module['calledRun'] = true
      if (ABORT) return
      initRuntime()
      preMain()
      if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
      if (shouldRunNow) callMain(args)
      postRun()
    }
    if (Module['setStatus']) {
      Module['setStatus']('Running...')
      setTimeout(function () {
        setTimeout(function () {
          Module['setStatus']('')
        }, 1)
        doRun()
      }, 1)
    } else {
      doRun()
    }
  }
  Module['run'] = run
  function exit(status, implicit) {
    if (implicit && noExitRuntime && status === 0) {
      return
    }
    if (noExitRuntime) {
    } else {
      EXITSTATUS = status
      exitRuntime()
      if (Module['onExit']) Module['onExit'](status)
      ABORT = true
    }
    quit_(status, new ExitStatus(status))
  }
  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function')
      Module['preInit'] = [Module['preInit']]
    while (Module['preInit'].length > 0) {
      Module['preInit'].pop()()
    }
  }
  var shouldRunNow = true
  if (Module['noInitialRun']) shouldRunNow = false
  run()
}

exports.run = run


/***/ }),

/***/ 242:
/***/ ((module, exports, __nested_webpack_require_241450__) => {

var __dirname = "/";
function run(Module) {
  var Module = typeof Module !== 'undefined' ? Module : {}
  var moduleOverrides = {}
  var key
  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key]
    }
  }
  var arguments_ = []
  var thisProgram = './this.program'
  var quit_ = function (status, toThrow) {
    throw toThrow
  }
  var ENVIRONMENT_IS_WEB = false
  var ENVIRONMENT_IS_WORKER = false
  var ENVIRONMENT_IS_NODE = false
  var ENVIRONMENT_IS_SHELL = false
  ENVIRONMENT_IS_WEB = typeof window === 'object'
  ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'
  ENVIRONMENT_IS_NODE =
    typeof process === 'object' &&
    typeof process.versions === 'object' &&
    typeof process.versions.node === 'string'
  ENVIRONMENT_IS_SHELL =
    !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER
  var scriptDirectory = ''
  function locateFile(path) {
    if (Module['locateFile']) {
      return Module['locateFile'](path, scriptDirectory)
    }
    return scriptDirectory + path
  }
  var read_, readAsync, readBinary, setWindowTitle
  var nodeFS
  var nodePath
  if (ENVIRONMENT_IS_NODE) {
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = __nested_webpack_require_241450__(470).dirname(scriptDirectory) + '/'
    } else {
      scriptDirectory = __dirname + '/'
    }
    read_ = function shell_read(filename, binary) {
      if (!nodeFS) nodeFS = __nested_webpack_require_241450__(351)
      if (!nodePath) nodePath = __nested_webpack_require_241450__(470)
      filename = nodePath['normalize'](filename)
      return nodeFS['readFileSync'](filename, binary ? null : 'utf8')
    }
    readBinary = function readBinary(filename) {
      var ret = read_(filename, true)
      if (!ret.buffer) {
        ret = new Uint8Array(ret)
      }
      assert(ret.buffer)
      return ret
    }
    if (process['argv'].length > 1) {
      thisProgram = process['argv'][1].replace(/\\/g, '/')
    }
    arguments_ = process['argv'].slice(2)
    if (true) {
      module['exports'] = Module
    }
    process['on']('uncaughtException', function (ex) {
      if (!(ex instanceof ExitStatus)) {
        throw ex
      }
    })
    process['on']('unhandledRejection', abort)
    quit_ = function (status) {
      process['exit'](status)
    }
    Module['inspect'] = function () {
      return '[Emscripten Module object]'
    }
  } else if (ENVIRONMENT_IS_SHELL) {
    if (typeof read != 'undefined') {
      read_ = function shell_read(f) {
        return read(f)
      }
    }
    readBinary = function readBinary(f) {
      var data
      if (typeof readbuffer === 'function') {
        return new Uint8Array(readbuffer(f))
      }
      data = read(f, 'binary')
      assert(typeof data === 'object')
      return data
    }
    if (typeof scriptArgs != 'undefined') {
      arguments_ = scriptArgs
    } else if (typeof arguments != 'undefined') {
      arguments_ = arguments
    }
    if (typeof quit === 'function') {
      quit_ = function (status) {
        quit(status)
      }
    }
    if (typeof print !== 'undefined') {
      if (typeof console === 'undefined') console = {}
      console.log = print
      console.warn = console.error =
        typeof printErr !== 'undefined' ? printErr : print
    }
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = self.location.href
    } else if (typeof document !== 'undefined' && document.currentScript) {
      scriptDirectory = document.currentScript.src
    }
    if (scriptDirectory.indexOf('blob:') !== 0) {
      scriptDirectory = scriptDirectory.substr(
        0,
        scriptDirectory.lastIndexOf('/') + 1
      )
    } else {
      scriptDirectory = ''
    }
    {
      read_ = function (url) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.send(null)
        return xhr.responseText
      }
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = function (url) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          xhr.responseType = 'arraybuffer'
          xhr.send(null)
          return new Uint8Array(xhr.response)
        }
      }
      readAsync = function (url, onload, onerror) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function () {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
            onload(xhr.response)
            return
          }
          onerror()
        }
        xhr.onerror = onerror
        xhr.send(null)
      }
    }
    setWindowTitle = function (title) {
      document.title = title
    }
  } else {
  }
  var out = Module['print'] || console.log.bind(console)
  var err = Module['printErr'] || console.warn.bind(console)
  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key]
    }
  }
  moduleOverrides = null
  if (Module['arguments']) arguments_ = Module['arguments']
  if (Module['thisProgram']) thisProgram = Module['thisProgram']
  if (Module['quit']) quit_ = Module['quit']
  var STACK_ALIGN = 16
  function alignMemory(size, factor) {
    if (!factor) factor = STACK_ALIGN
    return Math.ceil(size / factor) * factor
  }
  var tempRet0 = 0
  var setTempRet0 = function (value) {
    tempRet0 = value
  }
  var getTempRet0 = function () {
    return tempRet0
  }
  var wasmBinary
  if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']
  var noExitRuntime = Module['noExitRuntime'] || true
  if (typeof WebAssembly !== 'object') {
    abort('no native wasm support detected')
  }
  var wasmMemory
  var ABORT = false
  var EXITSTATUS
  function assert(condition, text) {
    if (!condition) {
      abort('Assertion failed: ' + text)
    }
  }
  var UTF8Decoder =
    typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined
  function UTF8ArrayToString(heap, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead
    var endPtr = idx
    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr
    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(heap.subarray(idx, endPtr))
    } else {
      var str = ''
      while (idx < endPtr) {
        var u0 = heap[idx++]
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0)
          continue
        }
        var u1 = heap[idx++] & 63
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1)
          continue
        }
        var u2 = heap[idx++] & 63
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63)
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0)
        } else {
          var ch = u0 - 65536
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
        }
      }
    }
    return str
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ''
  }
  function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0
    var startIdx = outIdx
    var endIdx = outIdx + maxBytesToWrite - 1
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i)
        u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
      }
      if (u <= 127) {
        if (outIdx >= endIdx) break
        heap[outIdx++] = u
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break
        heap[outIdx++] = 192 | (u >> 6)
        heap[outIdx++] = 128 | (u & 63)
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break
        heap[outIdx++] = 224 | (u >> 12)
        heap[outIdx++] = 128 | ((u >> 6) & 63)
        heap[outIdx++] = 128 | (u & 63)
      } else {
        if (outIdx + 3 >= endIdx) break
        heap[outIdx++] = 240 | (u >> 18)
        heap[outIdx++] = 128 | ((u >> 12) & 63)
        heap[outIdx++] = 128 | ((u >> 6) & 63)
        heap[outIdx++] = 128 | (u & 63)
      }
    }
    heap[outIdx] = 0
    return outIdx - startIdx
  }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
  }
  function lengthBytesUTF8(str) {
    var len = 0
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i)
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
      if (u <= 127) ++len
      else if (u <= 2047) len += 2
      else if (u <= 65535) len += 3
      else len += 4
    }
    return len
  }
  function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1
    var ret = _malloc(size)
    if (ret) stringToUTF8Array(str, HEAP8, ret, size)
    return ret
  }
  function allocateUTF8OnStack(str) {
    var size = lengthBytesUTF8(str) + 1
    var ret = stackAlloc(size)
    stringToUTF8Array(str, HEAP8, ret, size)
    return ret
  }
  function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer)
  }
  function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++ >> 0] = str.charCodeAt(i)
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0
  }
  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
  function updateGlobalBufferAndViews(buf) {
    buffer = buf
    Module['HEAP8'] = HEAP8 = new Int8Array(buf)
    Module['HEAP16'] = HEAP16 = new Int16Array(buf)
    Module['HEAP32'] = HEAP32 = new Int32Array(buf)
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf)
    Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf)
    Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf)
    Module['HEAPF32'] = HEAPF32 = new Float32Array(buf)
    Module['HEAPF64'] = HEAPF64 = new Float64Array(buf)
  }
  var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216
  var wasmTable
  var __ATPRERUN__ = []
  var __ATINIT__ = []
  var __ATMAIN__ = []
  var __ATPOSTRUN__ = []
  var runtimeInitialized = false
  var runtimeExited = false
  __ATINIT__.push({
    func: function () {
      ___wasm_call_ctors()
    },
  })
  function preRun() {
    if (Module['preRun']) {
      if (typeof Module['preRun'] == 'function')
        Module['preRun'] = [Module['preRun']]
      while (Module['preRun'].length) {
        addOnPreRun(Module['preRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPRERUN__)
  }
  function initRuntime() {
    runtimeInitialized = true
    if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
    TTY.init()
    callRuntimeCallbacks(__ATINIT__)
  }
  function preMain() {
    FS.ignorePermissions = false
    callRuntimeCallbacks(__ATMAIN__)
  }
  function exitRuntime() {
    runtimeExited = true
  }
  function postRun() {
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function')
        Module['postRun'] = [Module['postRun']]
      while (Module['postRun'].length) {
        addOnPostRun(Module['postRun'].shift())
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__)
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb)
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb)
  }
  var runDependencies = 0
  var runDependencyWatcher = null
  var dependenciesFulfilled = null
  function getUniqueRunDependency(id) {
    return id
  }
  function addRunDependency(id) {
    runDependencies++
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
  }
  function removeRunDependency(id) {
    runDependencies--
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies)
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher)
        runDependencyWatcher = null
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled
        dependenciesFulfilled = null
        callback()
      }
    }
  }
  Module['preloadedImages'] = {}
  Module['preloadedAudios'] = {}
  function abort(what) {
    if (Module['onAbort']) {
      Module['onAbort'](what)
    }
    what += ''
    err(what)
    ABORT = true
    EXITSTATUS = 1
    what = 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.'
    var e = new WebAssembly.RuntimeError(what)
    throw e
  }
  function hasPrefix(str, prefix) {
    return String.prototype.startsWith
      ? str.startsWith(prefix)
      : str.indexOf(prefix) === 0
  }
  var dataURIPrefix = 'data:application/octet-stream;base64,'
  function isDataURI(filename) {
    return hasPrefix(filename, dataURIPrefix)
  }
  var fileURIPrefix = 'file://'
  function isFileURI(filename) {
    return hasPrefix(filename, fileURIPrefix)
  }
  var wasmBinaryFile = 'lld.wasm'
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile)
  }
  function getBinary(file) {
    try {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary)
      }
      if (readBinary) {
        return readBinary(file)
      } else {
        throw 'both async and sync fetching of the wasm failed'
      }
    } catch (err) {
      abort(err)
    }
  }
  function getBinaryPromise() {
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
      if (typeof fetch === 'function' && !isFileURI(wasmBinaryFile)) {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' })
          .then(function (response) {
            if (!response['ok']) {
              throw (
                "failed to load wasm binary file at '" + wasmBinaryFile + "'"
              )
            }
            return response['arrayBuffer']()
          })
          .catch(function () {
            return getBinary(wasmBinaryFile)
          })
      } else {
        if (readAsync) {
          return new Promise(function (resolve, reject) {
            readAsync(
              wasmBinaryFile,
              function (response) {
                resolve(new Uint8Array(response))
              },
              reject
            )
          })
        }
      }
    }
    return Promise.resolve().then(function () {
      return getBinary(wasmBinaryFile)
    })
  }
  function createWasm() {
    var info = { a: asmLibraryArg }
    function receiveInstance(instance, module) {
      var exports = instance.exports
      Module['asm'] = exports
      wasmMemory = Module['asm']['na']
      updateGlobalBufferAndViews(wasmMemory.buffer)
      wasmTable = Module['asm']['sa']
      removeRunDependency('wasm-instantiate')
    }
    addRunDependency('wasm-instantiate')
    function receiveInstantiatedSource(output) {
      receiveInstance(output['instance'])
    }
    function instantiateArrayBuffer(receiver) {
      return getBinaryPromise()
        .then(function (binary) {
          return WebAssembly.instantiate(binary, info)
        })
        .then(receiver, function (reason) {
          err('failed to asynchronously prepare wasm: ' + reason)
          abort(reason)
        })
    }
    function instantiateAsync() {
      if (
        !wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function'
      ) {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(
          function (response) {
            var result = WebAssembly.instantiateStreaming(response, info)
            return result.then(receiveInstantiatedSource, function (reason) {
              err('wasm streaming compile failed: ' + reason)
              err('falling back to ArrayBuffer instantiation')
              return instantiateArrayBuffer(receiveInstantiatedSource)
            })
          }
        )
      } else {
        return instantiateArrayBuffer(receiveInstantiatedSource)
      }
    }
    if (Module['instantiateWasm']) {
      try {
        var exports = Module['instantiateWasm'](info, receiveInstance)
        return exports
      } catch (e) {
        err('Module.instantiateWasm callback failed with error: ' + e)
        return false
      }
    }
    instantiateAsync()
    return {}
  }
  var tempDouble
  var tempI64
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift()
      if (typeof callback == 'function') {
        callback(Module)
        continue
      }
      var func = callback.func
      if (typeof func === 'number') {
        if (callback.arg === undefined) {
          wasmTable.get(func)()
        } else {
          wasmTable.get(func)(callback.arg)
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg)
      }
    }
  }
  Module['callRuntimeCallbacks'] = callRuntimeCallbacks
  function demangle(func) {
    return func
  }
  Module['demangle'] = demangle
  function demangleAll(text) {
    var regex = /\b_Z[\w\d_]+/g
    return text.replace(regex, function (x) {
      var y = demangle(x)
      return x === y ? x : y + ' [' + x + ']'
    })
  }
  Module['demangleAll'] = demangleAll
  function jsStackTrace() {
    var error = new Error()
    if (!error.stack) {
      try {
        throw new Error()
      } catch (e) {
        error = e
      }
      if (!error.stack) {
        return '(no stack trace available)'
      }
    }
    return error.stack.toString()
  }
  Module['jsStackTrace'] = jsStackTrace
  function stackTrace() {
    var js = jsStackTrace()
    if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']()
    return demangleAll(js)
  }
  Module['stackTrace'] = stackTrace
  function _exit(status) {
    exit(status)
  }
  Module['_exit'] = _exit
  function __Exit(a0) {
    return _exit(a0)
  }
  Module['__Exit'] = __Exit
  function _atexit(func, arg) {}
  Module['_atexit'] = _atexit
  function ___cxa_atexit(a0, a1) {
    return _atexit(a0, a1)
  }
  Module['___cxa_atexit'] = ___cxa_atexit
  function _tzset() {
    if (_tzset.called) return
    _tzset.called = true
    var currentYear = new Date().getFullYear()
    var winter = new Date(currentYear, 0, 1)
    var summer = new Date(currentYear, 6, 1)
    var winterOffset = winter.getTimezoneOffset()
    var summerOffset = summer.getTimezoneOffset()
    var stdTimezoneOffset = Math.max(winterOffset, summerOffset)
    HEAP32[__get_timezone() >> 2] = stdTimezoneOffset * 60
    HEAP32[__get_daylight() >> 2] = Number(winterOffset != summerOffset)
    function extractZone(date) {
      var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
      return match ? match[1] : 'GMT'
    }
    var winterName = extractZone(winter)
    var summerName = extractZone(summer)
    var winterNamePtr = allocateUTF8(winterName)
    var summerNamePtr = allocateUTF8(summerName)
    if (summerOffset < winterOffset) {
      HEAP32[__get_tzname() >> 2] = winterNamePtr
      HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr
    } else {
      HEAP32[__get_tzname() >> 2] = summerNamePtr
      HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr
    }
  }
  Module['_tzset'] = _tzset
  function _localtime_r(time, tmPtr) {
    _tzset()
    var date = new Date(HEAP32[time >> 2] * 1e3)
    HEAP32[tmPtr >> 2] = date.getSeconds()
    HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
    HEAP32[(tmPtr + 8) >> 2] = date.getHours()
    HEAP32[(tmPtr + 12) >> 2] = date.getDate()
    HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
    HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
    HEAP32[(tmPtr + 24) >> 2] = date.getDay()
    var start = new Date(date.getFullYear(), 0, 1)
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
    HEAP32[(tmPtr + 28) >> 2] = yday
    HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
    var winterOffset = start.getTimezoneOffset()
    var dst =
      (summerOffset != winterOffset &&
        date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
    HEAP32[(tmPtr + 32) >> 2] = dst
    var zonePtr = HEAP32[(__get_tzname() + (dst ? 4 : 0)) >> 2]
    HEAP32[(tmPtr + 40) >> 2] = zonePtr
    return tmPtr
  }
  Module['_localtime_r'] = _localtime_r
  function ___localtime_r(a0, a1) {
    return _localtime_r(a0, a1)
  }
  Module['___localtime_r'] = ___localtime_r
  var PATH = {
    splitPath: function (filename) {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      return splitPathRe.exec(filename).slice(1)
    },
    normalizeArray: function (parts, allowAboveRoot) {
      var up = 0
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i]
        if (last === '.') {
          parts.splice(i, 1)
        } else if (last === '..') {
          parts.splice(i, 1)
          up++
        } else if (up) {
          parts.splice(i, 1)
          up--
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift('..')
        }
      }
      return parts
    },
    normalize: function (path) {
      var isAbsolute = path.charAt(0) === '/',
        trailingSlash = path.substr(-1) === '/'
      path = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        !isAbsolute
      ).join('/')
      if (!path && !isAbsolute) {
        path = '.'
      }
      if (path && trailingSlash) {
        path += '/'
      }
      return (isAbsolute ? '/' : '') + path
    },
    dirname: function (path) {
      var result = PATH.splitPath(path),
        root = result[0],
        dir = result[1]
      if (!root && !dir) {
        return '.'
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1)
      }
      return root + dir
    },
    basename: function (path) {
      if (path === '/') return '/'
      path = PATH.normalize(path)
      path = path.replace(/\/$/, '')
      var lastSlash = path.lastIndexOf('/')
      if (lastSlash === -1) return path
      return path.substr(lastSlash + 1)
    },
    extname: function (path) {
      return PATH.splitPath(path)[3]
    },
    join: function () {
      var paths = Array.prototype.slice.call(arguments, 0)
      return PATH.normalize(paths.join('/'))
    },
    join2: function (l, r) {
      return PATH.normalize(l + '/' + r)
    },
  }
  Module['PATH'] = PATH
  function getRandomDevice() {
    if (
      typeof crypto === 'object' &&
      typeof crypto['getRandomValues'] === 'function'
    ) {
      var randomBuffer = new Uint8Array(1)
      return function () {
        crypto.getRandomValues(randomBuffer)
        return randomBuffer[0]
      }
    } else if (ENVIRONMENT_IS_NODE) {
      try {
        var crypto_module = __nested_webpack_require_241450__(85)
        return function () {
          return crypto_module['randomBytes'](1)[0]
        }
      } catch (e) {}
    }
    return function () {
      abort('randomDevice')
    }
  }
  Module['getRandomDevice'] = getRandomDevice
  var PATH_FS = {
    resolve: function () {
      var resolvedPath = '',
        resolvedAbsolute = false
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd()
        if (typeof path !== 'string') {
          throw new TypeError('Arguments to path.resolve must be strings')
        } else if (!path) {
          return ''
        }
        resolvedPath = path + '/' + resolvedPath
        resolvedAbsolute = path.charAt(0) === '/'
      }
      resolvedPath = PATH.normalizeArray(
        resolvedPath.split('/').filter(function (p) {
          return !!p
        }),
        !resolvedAbsolute
      ).join('/')
      return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
    },
    relative: function (from, to) {
      from = PATH_FS.resolve(from).substr(1)
      to = PATH_FS.resolve(to).substr(1)
      function trim(arr) {
        var start = 0
        for (; start < arr.length; start++) {
          if (arr[start] !== '') break
        }
        var end = arr.length - 1
        for (; end >= 0; end--) {
          if (arr[end] !== '') break
        }
        if (start > end) return []
        return arr.slice(start, end - start + 1)
      }
      var fromParts = trim(from.split('/'))
      var toParts = trim(to.split('/'))
      var length = Math.min(fromParts.length, toParts.length)
      var samePartsLength = length
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i
          break
        }
      }
      var outputParts = []
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..')
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength))
      return outputParts.join('/')
    },
  }
  Module['PATH_FS'] = PATH_FS
  var TTY = {
    ttys: [],
    init: function () {},
    shutdown: function () {},
    register: function (dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops: ops }
      FS.registerDevice(dev, TTY.stream_ops)
    },
    stream_ops: {
      open: function (stream) {
        var tty = TTY.ttys[stream.node.rdev]
        if (!tty) {
          throw new FS.ErrnoError(43)
        }
        stream.tty = tty
        stream.seekable = false
      },
      close: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      flush: function (stream) {
        stream.tty.ops.flush(stream.tty)
      },
      read: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(60)
        }
        var bytesRead = 0
        for (var i = 0; i < length; i++) {
          var result
          try {
            result = stream.tty.ops.get_char(stream.tty)
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6)
          }
          if (result === null || result === undefined) break
          bytesRead++
          buffer[offset + i] = result
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now()
        }
        return bytesRead
      },
      write: function (stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(60)
        }
        try {
          for (var i = 0; i < length; i++) {
            stream.tty.ops.put_char(stream.tty, buffer[offset + i])
          }
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
        if (length) {
          stream.node.timestamp = Date.now()
        }
        return i
      },
    },
    default_tty_ops: {
      get_char: function (tty) {
        if (!tty.input.length) {
          var result = null
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256
            var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE)
            var bytesRead = 0
            try {
              bytesRead = nodeFS.readSync(
                process.stdin.fd,
                buf,
                0,
                BUFSIZE,
                null
              )
            } catch (e) {
              if (e.toString().indexOf('EOF') != -1) bytesRead = 0
              else throw e
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString('utf-8')
            } else {
              result = null
            }
          } else if (
            typeof window != 'undefined' &&
            typeof window.prompt == 'function'
          ) {
            result = window.prompt('Input: ')
            if (result !== null) {
              result += '\n'
            }
          } else if (typeof readline == 'function') {
            result = readline()
            if (result !== null) {
              result += '\n'
            }
          }
          if (!result) {
            return null
          }
          tty.input = intArrayFromString(result, true)
        }
        return tty.input.shift()
      },
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          out(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          out(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
    default_tty1_ops: {
      put_char: function (tty, val) {
        if (val === null || val === 10) {
          err(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        } else {
          if (val != 0) tty.output.push(val)
        }
      },
      flush: function (tty) {
        if (tty.output && tty.output.length > 0) {
          err(UTF8ArrayToString(tty.output, 0))
          tty.output = []
        }
      },
    },
  }
  Module['TTY'] = TTY
  function mmapAlloc(size) {
    var alignedSize = alignMemory(size, 16384)
    var ptr = _malloc(alignedSize)
    while (size < alignedSize) HEAP8[ptr + size++] = 0
    return ptr
  }
  Module['mmapAlloc'] = mmapAlloc
  var MEMFS = {
    ops_table: null,
    mount: function (mount) {
      return MEMFS.createNode(null, '/', 16384 | 511, 0)
    },
    createNode: function (parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63)
      }
      if (!MEMFS.ops_table) {
        MEMFS.ops_table = {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink,
            },
            stream: { llseek: MEMFS.stream_ops.llseek },
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync,
            },
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink,
            },
            stream: {},
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: FS.chrdev_stream_ops,
          },
        }
      }
      var node = FS.createNode(parent, name, mode, dev)
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node
        node.stream_ops = MEMFS.ops_table.dir.stream
        node.contents = {}
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node
        node.stream_ops = MEMFS.ops_table.file.stream
        node.usedBytes = 0
        node.contents = null
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node
        node.stream_ops = MEMFS.ops_table.link.stream
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node
        node.stream_ops = MEMFS.ops_table.chrdev.stream
      }
      node.timestamp = Date.now()
      if (parent) {
        parent.contents[name] = node
        parent.timestamp = node.timestamp
      }
      return node
    },
    getFileDataAsTypedArray: function (node) {
      if (!node.contents) return new Uint8Array(0)
      if (node.contents.subarray)
        return node.contents.subarray(0, node.usedBytes)
      return new Uint8Array(node.contents)
    },
    expandFileStorage: function (node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0
      if (prevCapacity >= newCapacity) return
      var CAPACITY_DOUBLING_MAX = 1024 * 1024
      newCapacity = Math.max(
        newCapacity,
        (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
          0
      )
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
      var oldContents = node.contents
      node.contents = new Uint8Array(newCapacity)
      if (node.usedBytes > 0)
        node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
    },
    resizeFileStorage: function (node, newSize) {
      if (node.usedBytes == newSize) return
      if (newSize == 0) {
        node.contents = null
        node.usedBytes = 0
      } else {
        var oldContents = node.contents
        node.contents = new Uint8Array(newSize)
        if (oldContents) {
          node.contents.set(
            oldContents.subarray(0, Math.min(newSize, node.usedBytes))
          )
        }
        node.usedBytes = newSize
      }
    },
    node_ops: {
      getattr: function (node) {
        var attr = {}
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1
        attr.ino = node.id
        attr.mode = node.mode
        attr.nlink = 1
        attr.uid = 0
        attr.gid = 0
        attr.rdev = node.rdev
        if (FS.isDir(node.mode)) {
          attr.size = 4096
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length
        } else {
          attr.size = 0
        }
        attr.atime = new Date(node.timestamp)
        attr.mtime = new Date(node.timestamp)
        attr.ctime = new Date(node.timestamp)
        attr.blksize = 4096
        attr.blocks = Math.ceil(attr.size / attr.blksize)
        return attr
      },
      setattr: function (node, attr) {
        if (attr.mode !== undefined) {
          node.mode = attr.mode
        }
        if (attr.timestamp !== undefined) {
          node.timestamp = attr.timestamp
        }
        if (attr.size !== undefined) {
          MEMFS.resizeFileStorage(node, attr.size)
        }
      },
      lookup: function (parent, name) {
        throw FS.genericErrors[44]
      },
      mknod: function (parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev)
      },
      rename: function (old_node, new_dir, new_name) {
        if (FS.isDir(old_node.mode)) {
          var new_node
          try {
            new_node = FS.lookupNode(new_dir, new_name)
          } catch (e) {}
          if (new_node) {
            for (var i in new_node.contents) {
              throw new FS.ErrnoError(55)
            }
          }
        }
        delete old_node.parent.contents[old_node.name]
        old_node.parent.timestamp = Date.now()
        old_node.name = new_name
        new_dir.contents[new_name] = old_node
        new_dir.timestamp = old_node.parent.timestamp
        old_node.parent = new_dir
      },
      unlink: function (parent, name) {
        delete parent.contents[name]
        parent.timestamp = Date.now()
      },
      rmdir: function (parent, name) {
        var node = FS.lookupNode(parent, name)
        for (var i in node.contents) {
          throw new FS.ErrnoError(55)
        }
        delete parent.contents[name]
        parent.timestamp = Date.now()
      },
      readdir: function (node) {
        var entries = ['.', '..']
        for (var key in node.contents) {
          if (!node.contents.hasOwnProperty(key)) {
            continue
          }
          entries.push(key)
        }
        return entries
      },
      symlink: function (parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
        node.link = oldpath
        return node
      },
      readlink: function (node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(28)
        }
        return node.link
      },
    },
    stream_ops: {
      read: function (stream, buffer, offset, length, position) {
        var contents = stream.node.contents
        if (position >= stream.node.usedBytes) return 0
        var size = Math.min(stream.node.usedBytes - position, length)
        if (size > 8 && contents.subarray) {
          buffer.set(contents.subarray(position, position + size), offset)
        } else {
          for (var i = 0; i < size; i++)
            buffer[offset + i] = contents[position + i]
        }
        return size
      },
      write: function (stream, buffer, offset, length, position, canOwn) {
        if (!length) return 0
        var node = stream.node
        node.timestamp = Date.now()
        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            node.contents = buffer.subarray(offset, offset + length)
            node.usedBytes = length
            return length
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = buffer.slice(offset, offset + length)
            node.usedBytes = length
            return length
          } else if (position + length <= node.usedBytes) {
            node.contents.set(
              buffer.subarray(offset, offset + length),
              position
            )
            return length
          }
        }
        MEMFS.expandFileStorage(node, position + length)
        if (node.contents.subarray && buffer.subarray) {
          node.contents.set(buffer.subarray(offset, offset + length), position)
        } else {
          for (var i = 0; i < length; i++) {
            node.contents[position + i] = buffer[offset + i]
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length)
        return length
      },
      llseek: function (stream, offset, whence) {
        var position = offset
        if (whence === 1) {
          position += stream.position
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28)
        }
        return position
      },
      allocate: function (stream, offset, length) {
        MEMFS.expandFileStorage(stream.node, offset + length)
        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
      },
      mmap: function (stream, address, length, position, prot, flags) {
        if (address !== 0) {
          throw new FS.ErrnoError(28)
        }
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        var ptr
        var allocated
        var contents = stream.node.contents
        if (!(flags & 2) && contents.buffer === buffer) {
          allocated = false
          ptr = contents.byteOffset
        } else {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length)
            } else {
              contents = Array.prototype.slice.call(
                contents,
                position,
                position + length
              )
            }
          }
          allocated = true
          ptr = mmapAlloc(length)
          if (!ptr) {
            throw new FS.ErrnoError(48)
          }
          HEAP8.set(contents, ptr)
        }
        return { ptr: ptr, allocated: allocated }
      },
      msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        if (mmapFlags & 2) {
          return 0
        }
        var bytesWritten = MEMFS.stream_ops.write(
          stream,
          buffer,
          0,
          length,
          offset,
          false
        )
        return 0
      },
    },
  }
  Module['MEMFS'] = MEMFS
  var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: '/',
    initialized: false,
    ignorePermissions: true,
    trackingDelegate: {},
    tracking: { openFlags: { READ: 1, WRITE: 2 } },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    lookupPath: function (path, opts) {
      path = PATH_FS.resolve(FS.cwd(), path)
      opts = opts || {}
      if (!path) return { path: '', node: null }
      var defaults = { follow_mount: true, recurse_count: 0 }
      for (var key in defaults) {
        if (opts[key] === undefined) {
          opts[key] = defaults[key]
        }
      }
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(32)
      }
      var parts = PATH.normalizeArray(
        path.split('/').filter(function (p) {
          return !!p
        }),
        false
      )
      var current = FS.root
      var current_path = '/'
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1
        if (islast && opts.parent) {
          break
        }
        current = FS.lookupNode(current, parts[i])
        current_path = PATH.join2(current_path, parts[i])
        if (FS.isMountpoint(current)) {
          if (!islast || (islast && opts.follow_mount)) {
            current = current.mounted.root
          }
        }
        if (!islast || opts.follow) {
          var count = 0
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path)
            current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
            var lookup = FS.lookupPath(current_path, {
              recurse_count: opts.recurse_count,
            })
            current = lookup.node
            if (count++ > 40) {
              throw new FS.ErrnoError(32)
            }
          }
        }
      }
      return { path: current_path, node: current }
    },
    getPath: function (node) {
      var path
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint
          if (!path) return mount
          return mount[mount.length - 1] !== '/'
            ? mount + '/' + path
            : mount + path
        }
        path = path ? node.name + '/' + path : node.name
        node = node.parent
      }
    },
    hashName: function (parentid, name) {
      var hash = 0
      for (var i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
      }
      return ((parentid + hash) >>> 0) % FS.nameTable.length
    },
    hashAddNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      node.name_next = FS.nameTable[hash]
      FS.nameTable[hash] = node
    },
    hashRemoveNode: function (node) {
      var hash = FS.hashName(node.parent.id, node.name)
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next
      } else {
        var current = FS.nameTable[hash]
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next
            break
          }
          current = current.name_next
        }
      }
    },
    lookupNode: function (parent, name) {
      var errCode = FS.mayLookup(parent)
      if (errCode) {
        throw new FS.ErrnoError(errCode, parent)
      }
      var hash = FS.hashName(parent.id, name)
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name
        if (node.parent.id === parent.id && nodeName === name) {
          return node
        }
      }
      return FS.lookup(parent, name)
    },
    createNode: function (parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev)
      FS.hashAddNode(node)
      return node
    },
    destroyNode: function (node) {
      FS.hashRemoveNode(node)
    },
    isRoot: function (node) {
      return node === node.parent
    },
    isMountpoint: function (node) {
      return !!node.mounted
    },
    isFile: function (mode) {
      return (mode & 61440) === 32768
    },
    isDir: function (mode) {
      return (mode & 61440) === 16384
    },
    isLink: function (mode) {
      return (mode & 61440) === 40960
    },
    isChrdev: function (mode) {
      return (mode & 61440) === 8192
    },
    isBlkdev: function (mode) {
      return (mode & 61440) === 24576
    },
    isFIFO: function (mode) {
      return (mode & 61440) === 4096
    },
    isSocket: function (mode) {
      return (mode & 49152) === 49152
    },
    flagModes: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
    modeStringToFlags: function (str) {
      var flags = FS.flagModes[str]
      if (typeof flags === 'undefined') {
        throw new Error('Unknown file open mode: ' + str)
      }
      return flags
    },
    flagsToPermissionString: function (flag) {
      var perms = ['r', 'w', 'rw'][flag & 3]
      if (flag & 512) {
        perms += 'w'
      }
      return perms
    },
    nodePermissions: function (node, perms) {
      if (FS.ignorePermissions) {
        return 0
      }
      if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
        return 2
      } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
        return 2
      } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
        return 2
      }
      return 0
    },
    mayLookup: function (dir) {
      var errCode = FS.nodePermissions(dir, 'x')
      if (errCode) return errCode
      if (!dir.node_ops.lookup) return 2
      return 0
    },
    mayCreate: function (dir, name) {
      try {
        var node = FS.lookupNode(dir, name)
        return 20
      } catch (e) {}
      return FS.nodePermissions(dir, 'wx')
    },
    mayDelete: function (dir, name, isdir) {
      var node
      try {
        node = FS.lookupNode(dir, name)
      } catch (e) {
        return e.errno
      }
      var errCode = FS.nodePermissions(dir, 'wx')
      if (errCode) {
        return errCode
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31
        }
      }
      return 0
    },
    mayOpen: function (node, flags) {
      if (!node) {
        return 44
      }
      if (FS.isLink(node.mode)) {
        return 32
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
          return 31
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function (fd_start, fd_end) {
      fd_start = fd_start || 0
      fd_end = fd_end || FS.MAX_OPEN_FDS
      for (var fd = fd_start; fd <= fd_end; fd++) {
        if (!FS.streams[fd]) {
          return fd
        }
      }
      throw new FS.ErrnoError(33)
    },
    getStream: function (fd) {
      return FS.streams[fd]
    },
    createStream: function (stream, fd_start, fd_end) {
      if (!FS.FSStream) {
        FS.FSStream = function () {}
        FS.FSStream.prototype = {
          object: {
            get: function () {
              return this.node
            },
            set: function (val) {
              this.node = val
            },
          },
          isRead: {
            get: function () {
              return (this.flags & 2097155) !== 1
            },
          },
          isWrite: {
            get: function () {
              return (this.flags & 2097155) !== 0
            },
          },
          isAppend: {
            get: function () {
              return this.flags & 1024
            },
          },
        }
      }
      var newStream = new FS.FSStream()
      for (var p in stream) {
        newStream[p] = stream[p]
      }
      stream = newStream
      var fd = FS.nextfd(fd_start, fd_end)
      stream.fd = fd
      FS.streams[fd] = stream
      return stream
    },
    closeStream: function (fd) {
      FS.streams[fd] = null
    },
    chrdev_stream_ops: {
      open: function (stream) {
        var device = FS.getDevice(stream.node.rdev)
        stream.stream_ops = device.stream_ops
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream)
        }
      },
      llseek: function () {
        throw new FS.ErrnoError(70)
      },
    },
    major: function (dev) {
      return dev >> 8
    },
    minor: function (dev) {
      return dev & 255
    },
    makedev: function (ma, mi) {
      return (ma << 8) | mi
    },
    registerDevice: function (dev, ops) {
      FS.devices[dev] = { stream_ops: ops }
    },
    getDevice: function (dev) {
      return FS.devices[dev]
    },
    getMounts: function (mount) {
      var mounts = []
      var check = [mount]
      while (check.length) {
        var m = check.pop()
        mounts.push(m)
        check.push.apply(check, m.mounts)
      }
      return mounts
    },
    syncfs: function (populate, callback) {
      if (typeof populate === 'function') {
        callback = populate
        populate = false
      }
      FS.syncFSRequests++
      if (FS.syncFSRequests > 1) {
        err(
          'warning: ' +
            FS.syncFSRequests +
            ' FS.syncfs operations in flight at once, probably just doing extra work'
        )
      }
      var mounts = FS.getMounts(FS.root.mount)
      var completed = 0
      function doCallback(errCode) {
        FS.syncFSRequests--
        return callback(errCode)
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true
            return doCallback(errCode)
          }
          return
        }
        if (++completed >= mounts.length) {
          doCallback(null)
        }
      }
      mounts.forEach(function (mount) {
        if (!mount.type.syncfs) {
          return done(null)
        }
        mount.type.syncfs(mount, populate, done)
      })
    },
    mount: function (type, opts, mountpoint) {
      var root = mountpoint === '/'
      var pseudo = !mountpoint
      var node
      if (root && FS.root) {
        throw new FS.ErrnoError(10)
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
        mountpoint = lookup.path
        node = lookup.node
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54)
        }
      }
      var mount = {
        type: type,
        opts: opts,
        mountpoint: mountpoint,
        mounts: [],
      }
      var mountRoot = type.mount(mount)
      mountRoot.mount = mount
      mount.root = mountRoot
      if (root) {
        FS.root = mountRoot
      } else if (node) {
        node.mounted = mount
        if (node.mount) {
          node.mount.mounts.push(mount)
        }
      }
      return mountRoot
    },
    unmount: function (mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28)
      }
      var node = lookup.node
      var mount = node.mounted
      var mounts = FS.getMounts(mount)
      Object.keys(FS.nameTable).forEach(function (hash) {
        var current = FS.nameTable[hash]
        while (current) {
          var next = current.name_next
          if (mounts.indexOf(current.mount) !== -1) {
            FS.destroyNode(current)
          }
          current = next
        }
      })
      node.mounted = null
      var idx = node.mount.mounts.indexOf(mount)
      node.mount.mounts.splice(idx, 1)
    },
    lookup: function (parent, name) {
      return parent.node_ops.lookup(parent, name)
    },
    mknod: function (path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      if (!name || name === '.' || name === '..') {
        throw new FS.ErrnoError(28)
      }
      var errCode = FS.mayCreate(parent, name)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63)
      }
      return parent.node_ops.mknod(parent, name, mode, dev)
    },
    create: function (path, mode) {
      mode = mode !== undefined ? mode : 438
      mode &= 4095
      mode |= 32768
      return FS.mknod(path, mode, 0)
    },
    mkdir: function (path, mode) {
      mode = mode !== undefined ? mode : 511
      mode &= 511 | 512
      mode |= 16384
      return FS.mknod(path, mode, 0)
    },
    mkdirTree: function (path, mode) {
      var dirs = path.split('/')
      var d = ''
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i]) continue
        d += '/' + dirs[i]
        try {
          FS.mkdir(d, mode)
        } catch (e) {
          if (e.errno != 20) throw e
        }
      }
    },
    mkdev: function (path, mode, dev) {
      if (typeof dev === 'undefined') {
        dev = mode
        mode = 438
      }
      mode |= 8192
      return FS.mknod(path, mode, dev)
    },
    symlink: function (oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44)
      }
      var lookup = FS.lookupPath(newpath, { parent: true })
      var parent = lookup.node
      if (!parent) {
        throw new FS.ErrnoError(44)
      }
      var newname = PATH.basename(newpath)
      var errCode = FS.mayCreate(parent, newname)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63)
      }
      return parent.node_ops.symlink(parent, newname, oldpath)
    },
    rename: function (old_path, new_path) {
      var old_dirname = PATH.dirname(old_path)
      var new_dirname = PATH.dirname(new_path)
      var old_name = PATH.basename(old_path)
      var new_name = PATH.basename(new_path)
      var lookup, old_dir, new_dir
      lookup = FS.lookupPath(old_path, { parent: true })
      old_dir = lookup.node
      lookup = FS.lookupPath(new_path, { parent: true })
      new_dir = lookup.node
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75)
      }
      var old_node = FS.lookupNode(old_dir, old_name)
      var relative = PATH_FS.relative(old_path, new_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(28)
      }
      relative = PATH_FS.relative(new_path, old_dirname)
      if (relative.charAt(0) !== '.') {
        throw new FS.ErrnoError(55)
      }
      var new_node
      try {
        new_node = FS.lookupNode(new_dir, new_name)
      } catch (e) {}
      if (old_node === new_node) {
        return
      }
      var isdir = FS.isDir(old_node.mode)
      var errCode = FS.mayDelete(old_dir, old_name, isdir)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      errCode = new_node
        ? FS.mayDelete(new_dir, new_name, isdir)
        : FS.mayCreate(new_dir, new_name)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63)
      }
      if (
        FS.isMountpoint(old_node) ||
        (new_node && FS.isMountpoint(new_node))
      ) {
        throw new FS.ErrnoError(10)
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, 'w')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
      }
      try {
        if (FS.trackingDelegate['willMovePath']) {
          FS.trackingDelegate['willMovePath'](old_path, new_path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        )
      }
      FS.hashRemoveNode(old_node)
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name)
      } catch (e) {
        throw e
      } finally {
        FS.hashAddNode(old_node)
      }
      try {
        if (FS.trackingDelegate['onMovePath'])
          FS.trackingDelegate['onMovePath'](old_path, new_path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    rmdir: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var errCode = FS.mayDelete(parent, name, true)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
      parent.node_ops.rmdir(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath'])
          FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    readdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(54)
      }
      return node.node_ops.readdir(node)
    },
    unlink: function (path) {
      var lookup = FS.lookupPath(path, { parent: true })
      var parent = lookup.node
      var name = PATH.basename(path)
      var node = FS.lookupNode(parent, name)
      var errCode = FS.mayDelete(parent, name, false)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      try {
        if (FS.trackingDelegate['willDeletePath']) {
          FS.trackingDelegate['willDeletePath'](path)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
      parent.node_ops.unlink(parent, name)
      FS.destroyNode(node)
      try {
        if (FS.trackingDelegate['onDeletePath'])
          FS.trackingDelegate['onDeletePath'](path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        )
      }
    },
    readlink: function (path) {
      var lookup = FS.lookupPath(path)
      var link = lookup.node
      if (!link) {
        throw new FS.ErrnoError(44)
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28)
      }
      return PATH_FS.resolve(
        FS.getPath(link.parent),
        link.node_ops.readlink(link)
      )
    },
    stat: function (path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      var node = lookup.node
      if (!node) {
        throw new FS.ErrnoError(44)
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(63)
      }
      return node.node_ops.getattr(node)
    },
    lstat: function (path) {
      return FS.stat(path, true)
    },
    chmod: function (path, mode, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      node.node_ops.setattr(node, {
        mode: (mode & 4095) | (node.mode & ~4095),
        timestamp: Date.now(),
      })
    },
    lchmod: function (path, mode) {
      FS.chmod(path, mode, true)
    },
    fchmod: function (fd, mode) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      FS.chmod(stream.node, mode)
    },
    chown: function (path, uid, gid, dontFollow) {
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      node.node_ops.setattr(node, { timestamp: Date.now() })
    },
    lchown: function (path, uid, gid) {
      FS.chown(path, uid, gid, true)
    },
    fchown: function (fd, uid, gid) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      FS.chown(stream.node, uid, gid)
    },
    truncate: function (path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28)
      }
      var node
      if (typeof path === 'string') {
        var lookup = FS.lookupPath(path, { follow: true })
        node = lookup.node
      } else {
        node = path
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63)
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28)
      }
      var errCode = FS.nodePermissions(node, 'w')
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
    },
    ftruncate: function (fd, len) {
      var stream = FS.getStream(fd)
      if (!stream) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28)
      }
      FS.truncate(stream.node, len)
    },
    utime: function (path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true })
      var node = lookup.node
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
    },
    open: function (path, flags, mode, fd_start, fd_end) {
      if (path === '') {
        throw new FS.ErrnoError(44)
      }
      flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags
      mode = typeof mode === 'undefined' ? 438 : mode
      if (flags & 64) {
        mode = (mode & 4095) | 32768
      } else {
        mode = 0
      }
      var node
      if (typeof path === 'object') {
        node = path
      } else {
        path = PATH.normalize(path)
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
          node = lookup.node
        } catch (e) {}
      }
      var created = false
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20)
          }
        } else {
          node = FS.mknod(path, mode, 0)
          created = true
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44)
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54)
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
      }
      if (flags & 512) {
        FS.truncate(node, 0)
      }
      flags &= ~(128 | 512 | 131072)
      var stream = FS.createStream(
        {
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false,
        },
        fd_start,
        fd_end
      )
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream)
      }
      if (Module['logReadFiles'] && !(flags & 1)) {
        if (!FS.readFiles) FS.readFiles = {}
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1
          err('FS.trackingDelegate error on read file: ' + path)
        }
      }
      try {
        if (FS.trackingDelegate['onOpenFile']) {
          var trackingFlags = 0
          if ((flags & 2097155) !== 1) {
            trackingFlags |= FS.tracking.openFlags.READ
          }
          if ((flags & 2097155) !== 0) {
            trackingFlags |= FS.tracking.openFlags.WRITE
          }
          FS.trackingDelegate['onOpenFile'](path, trackingFlags)
        }
      } catch (e) {
        err(
          "FS.trackingDelegate['onOpenFile']('" +
            path +
            "', flags) threw an exception: " +
            e.message
        )
      }
      return stream
    },
    close: function (stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (stream.getdents) stream.getdents = null
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream)
        }
      } catch (e) {
        throw e
      } finally {
        FS.closeStream(stream.fd)
      }
      stream.fd = null
    },
    isClosed: function (stream) {
      return stream.fd === null
    },
    llseek: function (stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70)
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28)
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence)
      stream.ungotten = []
      return stream.position
    },
    read: function (stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70)
      }
      var bytesRead = stream.stream_ops.read(
        stream,
        buffer,
        offset,
        length,
        position
      )
      if (!seeking) stream.position += bytesRead
      return bytesRead
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28)
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8)
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31)
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28)
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2)
      }
      var seeking = typeof position !== 'undefined'
      if (!seeking) {
        position = stream.position
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70)
      }
      var bytesWritten = stream.stream_ops.write(
        stream,
        buffer,
        offset,
        length,
        position,
        canOwn
      )
      if (!seeking) stream.position += bytesWritten
      try {
        if (stream.path && FS.trackingDelegate['onWriteToFile'])
          FS.trackingDelegate['onWriteToFile'](stream.path)
      } catch (e) {
        err(
          "FS.trackingDelegate['onWriteToFile']('" +
            stream.path +
            "') threw an exception: " +
            e.message
        )
      }
      return bytesWritten
    },
    allocate: function (stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8)
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(28)
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8)
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(43)
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(138)
      }
      stream.stream_ops.allocate(stream, offset, length)
    },
    mmap: function (stream, address, length, position, prot, flags) {
      if (
        (prot & 2) !== 0 &&
        (flags & 2) === 0 &&
        (stream.flags & 2097155) !== 2
      ) {
        throw new FS.ErrnoError(2)
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2)
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43)
      }
      return stream.stream_ops.mmap(
        stream,
        address,
        length,
        position,
        prot,
        flags
      )
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      if (!stream || !stream.stream_ops.msync) {
        return 0
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
    },
    munmap: function (stream) {
      return 0
    },
    ioctl: function (stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59)
      }
      return stream.stream_ops.ioctl(stream, cmd, arg)
    },
    readFile: function (path, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 0
      opts.encoding = opts.encoding || 'binary'
      if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
        throw new Error('Invalid encoding type "' + opts.encoding + '"')
      }
      var ret
      var stream = FS.open(path, opts.flags)
      var stat = FS.stat(path)
      var length = stat.size
      var buf = new Uint8Array(length)
      FS.read(stream, buf, 0, length, 0)
      if (opts.encoding === 'utf8') {
        ret = UTF8ArrayToString(buf, 0)
      } else if (opts.encoding === 'binary') {
        ret = buf
      }
      FS.close(stream)
      return ret
    },
    writeFile: function (path, data, opts) {
      opts = opts || {}
      opts.flags = opts.flags || 577
      var stream = FS.open(path, opts.flags, opts.mode)
      if (typeof data === 'string') {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
      } else {
        throw new Error('Unsupported data type')
      }
      FS.close(stream)
    },
    cwd: function () {
      return FS.currentPath
    },
    chdir: function (path) {
      var lookup = FS.lookupPath(path, { follow: true })
      if (lookup.node === null) {
        throw new FS.ErrnoError(44)
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54)
      }
      var errCode = FS.nodePermissions(lookup.node, 'x')
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
      FS.currentPath = lookup.path
    },
    createDefaultDirectories: function () {
      FS.mkdir('/tmp')
      FS.mkdir('/home')
      FS.mkdir('/home/web_user')
    },
    createDefaultDevices: function () {
      FS.mkdir('/dev')
      FS.registerDevice(FS.makedev(1, 3), {
        read: function () {
          return 0
        },
        write: function (stream, buffer, offset, length, pos) {
          return length
        },
      })
      FS.mkdev('/dev/null', FS.makedev(1, 3))
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
      FS.mkdev('/dev/tty', FS.makedev(5, 0))
      FS.mkdev('/dev/tty1', FS.makedev(6, 0))
      var random_device = getRandomDevice()
      FS.createDevice('/dev', 'random', random_device)
      FS.createDevice('/dev', 'urandom', random_device)
      FS.mkdir('/dev/shm')
      FS.mkdir('/dev/shm/tmp')
    },
    createSpecialDirectories: function () {
      FS.mkdir('/proc')
      var proc_self = FS.mkdir('/proc/self')
      FS.mkdir('/proc/self/fd')
      FS.mount(
        {
          mount: function () {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511, 73)
            node.node_ops = {
              lookup: function (parent, name) {
                var fd = +name
                var stream = FS.getStream(fd)
                if (!stream) throw new FS.ErrnoError(8)
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: {
                    readlink: function () {
                      return stream.path
                    },
                  },
                }
                ret.parent = ret
                return ret
              },
            }
            return node
          },
        },
        {},
        '/proc/self/fd'
      )
    },
    createStandardStreams: function () {
      if (Module['stdin']) {
        FS.createDevice('/dev', 'stdin', Module['stdin'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdin')
      }
      if (Module['stdout']) {
        FS.createDevice('/dev', 'stdout', null, Module['stdout'])
      } else {
        FS.symlink('/dev/tty', '/dev/stdout')
      }
      if (Module['stderr']) {
        FS.createDevice('/dev', 'stderr', null, Module['stderr'])
      } else {
        FS.symlink('/dev/tty1', '/dev/stderr')
      }
      var stdin = FS.open('/dev/stdin', 0)
      var stdout = FS.open('/dev/stdout', 1)
      var stderr = FS.open('/dev/stderr', 1)
    },
    ensureErrnoError: function () {
      if (FS.ErrnoError) return
      FS.ErrnoError = function ErrnoError(errno, node) {
        this.node = node
        this.setErrno = function (errno) {
          this.errno = errno
        }
        this.setErrno(errno)
        this.message = 'FS error'
      }
      FS.ErrnoError.prototype = new Error()
      FS.ErrnoError.prototype.constructor = FS.ErrnoError
      ;[44].forEach(function (code) {
        FS.genericErrors[code] = new FS.ErrnoError(code)
        FS.genericErrors[code].stack = '<generic error, no stack>'
      })
    },
    staticInit: function () {
      FS.ensureErrnoError()
      FS.nameTable = new Array(4096)
      FS.mount(MEMFS, {}, '/')
      FS.createDefaultDirectories()
      FS.createDefaultDevices()
      FS.createSpecialDirectories()
      FS.filesystems = { MEMFS: MEMFS }
    },
    init: function (input, output, error) {
      FS.init.initialized = true
      FS.ensureErrnoError()
      Module['stdin'] = input || Module['stdin']
      Module['stdout'] = output || Module['stdout']
      Module['stderr'] = error || Module['stderr']
      FS.createStandardStreams()
    },
    quit: function () {
      FS.init.initialized = false
      var fflush = Module['_fflush']
      if (fflush) fflush(0)
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i]
        if (!stream) {
          continue
        }
        FS.close(stream)
      }
    },
    getMode: function (canRead, canWrite) {
      var mode = 0
      if (canRead) mode |= 292 | 73
      if (canWrite) mode |= 146
      return mode
    },
    findObject: function (path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink)
      if (ret.exists) {
        return ret.object
      } else {
        return null
      }
    },
    analyzePath: function (path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        path = lookup.path
      } catch (e) {}
      var ret = {
        isRoot: false,
        exists: false,
        error: 0,
        name: null,
        path: null,
        object: null,
        parentExists: false,
        parentPath: null,
        parentObject: null,
      }
      try {
        var lookup = FS.lookupPath(path, { parent: true })
        ret.parentExists = true
        ret.parentPath = lookup.path
        ret.parentObject = lookup.node
        ret.name = PATH.basename(path)
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
        ret.exists = true
        ret.path = lookup.path
        ret.object = lookup.node
        ret.name = lookup.node.name
        ret.isRoot = lookup.path === '/'
      } catch (e) {
        ret.error = e.errno
      }
      return ret
    },
    createPath: function (parent, path, canRead, canWrite) {
      parent = typeof parent === 'string' ? parent : FS.getPath(parent)
      var parts = path.split('/').reverse()
      while (parts.length) {
        var part = parts.pop()
        if (!part) continue
        var current = PATH.join2(parent, part)
        try {
          FS.mkdir(current)
        } catch (e) {}
        parent = current
      }
      return current
    },
    createFile: function (parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(
        typeof parent === 'string' ? parent : FS.getPath(parent),
        name
      )
      var mode = FS.getMode(canRead, canWrite)
      return FS.create(path, mode)
    },
    createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
      var path = name
        ? PATH.join2(
            typeof parent === 'string' ? parent : FS.getPath(parent),
            name
          )
        : parent
      var mode = FS.getMode(canRead, canWrite)
      var node = FS.create(path, mode)
      if (data) {
        if (typeof data === 'string') {
          var arr = new Array(data.length)
          for (var i = 0, len = data.length; i < len; ++i)
            arr[i] = data.charCodeAt(i)
          data = arr
        }
        FS.chmod(node, mode | 146)
        var stream = FS.open(node, 577)
        FS.write(stream, data, 0, data.length, 0, canOwn)
        FS.close(stream)
        FS.chmod(node, mode)
      }
      return node
    },
    createDevice: function (parent, name, input, output) {
      var path = PATH.join2(
        typeof parent === 'string' ? parent : FS.getPath(parent),
        name
      )
      var mode = FS.getMode(!!input, !!output)
      if (!FS.createDevice.major) FS.createDevice.major = 64
      var dev = FS.makedev(FS.createDevice.major++, 0)
      FS.registerDevice(dev, {
        open: function (stream) {
          stream.seekable = false
        },
        close: function (stream) {
          if (output && output.buffer && output.buffer.length) {
            output(10)
          }
        },
        read: function (stream, buffer, offset, length, pos) {
          var bytesRead = 0
          for (var i = 0; i < length; i++) {
            var result
            try {
              result = input()
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6)
            }
            if (result === null || result === undefined) break
            bytesRead++
            buffer[offset + i] = result
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now()
          }
          return bytesRead
        },
        write: function (stream, buffer, offset, length, pos) {
          for (var i = 0; i < length; i++) {
            try {
              output(buffer[offset + i])
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
          }
          if (length) {
            stream.node.timestamp = Date.now()
          }
          return i
        },
      })
      return FS.mkdev(path, mode, dev)
    },
    forceLoadFile: function (obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
      if (typeof XMLHttpRequest !== 'undefined') {
        throw new Error(
          'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
        )
      } else if (read_) {
        try {
          obj.contents = intArrayFromString(read_(obj.url), true)
          obj.usedBytes = obj.contents.length
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
      } else {
        throw new Error('Cannot load without read() or XMLHttpRequest.')
      }
    },
    createLazyFile: function (parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false
        this.chunks = []
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined
        }
        var chunkOffset = idx % this.chunkSize
        var chunkNum = (idx / this.chunkSize) | 0
        return this.getter(chunkNum)[chunkOffset]
      }
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(
        getter
      ) {
        this.getter = getter
      }
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url, false)
        xhr.send(null)
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
        var datalength = Number(xhr.getResponseHeader('Content-length'))
        var header
        var hasByteServing =
          (header = xhr.getResponseHeader('Accept-Ranges')) &&
          header === 'bytes'
        var usesGzip =
          (header = xhr.getResponseHeader('Content-Encoding')) &&
          header === 'gzip'
        var chunkSize = 1024 * 1024
        if (!hasByteServing) chunkSize = datalength
        var doXHR = function (from, to) {
          if (from > to)
            throw new Error(
              'invalid range (' + from + ', ' + to + ') or no bytes requested!'
            )
          if (to > datalength - 1)
            throw new Error(
              'only ' + datalength + ' bytes available! programmer error!'
            )
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          if (datalength !== chunkSize)
            xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
          if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer'
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined')
          }
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || [])
          } else {
            return intArrayFromString(xhr.responseText || '', true)
          }
        }
        var lazyArray = this
        lazyArray.setDataGetter(function (chunkNum) {
          var start = chunkNum * chunkSize
          var end = (chunkNum + 1) * chunkSize - 1
          end = Math.min(end, datalength - 1)
          if (typeof lazyArray.chunks[chunkNum] === 'undefined') {
            lazyArray.chunks[chunkNum] = doXHR(start, end)
          }
          if (typeof lazyArray.chunks[chunkNum] === 'undefined')
            throw new Error('doXHR failed!')
          return lazyArray.chunks[chunkNum]
        })
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1
          datalength = this.getter(0).length
          chunkSize = datalength
          out(
            'LazyFiles on gzip forces download of the whole file when length is accessed'
          )
        }
        this._length = datalength
        this._chunkSize = chunkSize
        this.lengthKnown = true
      }
      if (typeof XMLHttpRequest !== 'undefined') {
        if (!ENVIRONMENT_IS_WORKER)
          throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
        var lazyArray = new LazyUint8Array()
        Object.defineProperties(lazyArray, {
          length: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._length
            },
          },
          chunkSize: {
            get: function () {
              if (!this.lengthKnown) {
                this.cacheLength()
              }
              return this._chunkSize
            },
          },
        })
        var properties = { isDevice: false, contents: lazyArray }
      } else {
        var properties = { isDevice: false, url: url }
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite)
      if (properties.contents) {
        node.contents = properties.contents
      } else if (properties.url) {
        node.contents = null
        node.url = properties.url
      }
      Object.defineProperties(node, {
        usedBytes: {
          get: function () {
            return this.contents.length
          },
        },
      })
      var stream_ops = {}
      var keys = Object.keys(node.stream_ops)
      keys.forEach(function (key) {
        var fn = node.stream_ops[key]
        stream_ops[key] = function forceLoadLazyFile() {
          FS.forceLoadFile(node)
          return fn.apply(null, arguments)
        }
      })
      stream_ops.read = function stream_ops_read(
        stream,
        buffer,
        offset,
        length,
        position
      ) {
        FS.forceLoadFile(node)
        var contents = stream.node.contents
        if (position >= contents.length) return 0
        var size = Math.min(contents.length - position, length)
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i]
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i)
          }
        }
        return size
      }
      node.stream_ops = stream_ops
      return node
    },
    createPreloadedFile: function (
      parent,
      name,
      url,
      canRead,
      canWrite,
      onload,
      onerror,
      dontCreateFile,
      canOwn,
      preFinish
    ) {
      Browser.init()
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
      var dep = getUniqueRunDependency('cp ' + fullname)
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish()
          if (!dontCreateFile) {
            FS.createDataFile(
              parent,
              name,
              byteArray,
              canRead,
              canWrite,
              canOwn
            )
          }
          if (onload) onload()
          removeRunDependency(dep)
        }
        var handled = false
        Module['preloadPlugins'].forEach(function (plugin) {
          if (handled) return
          if (plugin['canHandle'](fullname)) {
            plugin['handle'](byteArray, fullname, finish, function () {
              if (onerror) onerror()
              removeRunDependency(dep)
            })
            handled = true
          }
        })
        if (!handled) finish(byteArray)
      }
      addRunDependency(dep)
      if (typeof url == 'string') {
        Browser.asyncLoad(
          url,
          function (byteArray) {
            processData(byteArray)
          },
          onerror
        )
      } else {
        processData(url)
      }
    },
    indexedDB: function () {
      return (
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB
      )
    },
    DB_NAME: function () {
      return 'EM_FS_' + window.location.pathname
    },
    DB_VERSION: 20,
    DB_STORE_NAME: 'FILE_DATA',
    saveFilesToDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
        out('creating db')
        var db = openRequest.result
        db.createObjectStore(FS.DB_STORE_NAME)
      }
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var putRequest = files.put(FS.analyzePath(path).object.contents, path)
          putRequest.onsuccess = function putRequest_onsuccess() {
            ok++
            if (ok + fail == total) finish()
          }
          putRequest.onerror = function putRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
    loadFilesFromDB: function (paths, onload, onerror) {
      onload = onload || function () {}
      onerror = onerror || function () {}
      var indexedDB = FS.indexedDB()
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
      } catch (e) {
        return onerror(e)
      }
      openRequest.onupgradeneeded = onerror
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result
        try {
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
        } catch (e) {
          onerror(e)
          return
        }
        var files = transaction.objectStore(FS.DB_STORE_NAME)
        var ok = 0,
          fail = 0,
          total = paths.length
        function finish() {
          if (fail == 0) onload()
          else onerror()
        }
        paths.forEach(function (path) {
          var getRequest = files.get(path)
          getRequest.onsuccess = function getRequest_onsuccess() {
            if (FS.analyzePath(path).exists) {
              FS.unlink(path)
            }
            FS.createDataFile(
              PATH.dirname(path),
              PATH.basename(path),
              getRequest.result,
              true,
              true,
              true
            )
            ok++
            if (ok + fail == total) finish()
          }
          getRequest.onerror = function getRequest_onerror() {
            fail++
            if (ok + fail == total) finish()
          }
        })
        transaction.onerror = onerror
      }
      openRequest.onerror = onerror
    },
  }
  Module['FS'] = FS
  var SYSCALLS = {
    mappings: {},
    DEFAULT_POLLMASK: 5,
    umask: 511,
    calculateAt: function (dirfd, path, allowEmpty) {
      if (path[0] === '/') {
        return path
      }
      var dir
      if (dirfd === -100) {
        dir = FS.cwd()
      } else {
        var dirstream = FS.getStream(dirfd)
        if (!dirstream) throw new FS.ErrnoError(8)
        dir = dirstream.path
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44)
        }
        return dir
      }
      return PATH.join2(dir, path)
    },
    doStat: function (func, path, buf) {
      try {
        var stat = func(path)
      } catch (e) {
        if (
          e &&
          e.node &&
          PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
        ) {
          return -54
        }
        throw e
      }
      HEAP32[buf >> 2] = stat.dev
      HEAP32[(buf + 4) >> 2] = 0
      HEAP32[(buf + 8) >> 2] = stat.ino
      HEAP32[(buf + 12) >> 2] = stat.mode
      HEAP32[(buf + 16) >> 2] = stat.nlink
      HEAP32[(buf + 20) >> 2] = stat.uid
      HEAP32[(buf + 24) >> 2] = stat.gid
      HEAP32[(buf + 28) >> 2] = stat.rdev
      HEAP32[(buf + 32) >> 2] = 0
      ;(tempI64 = [
        stat.size >>> 0,
        ((tempDouble = stat.size),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(buf + 40) >> 2] = tempI64[0]),
        (HEAP32[(buf + 44) >> 2] = tempI64[1])
      HEAP32[(buf + 48) >> 2] = 4096
      HEAP32[(buf + 52) >> 2] = stat.blocks
      HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0
      HEAP32[(buf + 60) >> 2] = 0
      HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0
      HEAP32[(buf + 68) >> 2] = 0
      HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0
      HEAP32[(buf + 76) >> 2] = 0
      ;(tempI64 = [
        stat.ino >>> 0,
        ((tempDouble = stat.ino),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(buf + 80) >> 2] = tempI64[0]),
        (HEAP32[(buf + 84) >> 2] = tempI64[1])
      return 0
    },
    doMsync: function (addr, stream, len, flags, offset) {
      var buffer = HEAPU8.slice(addr, addr + len)
      FS.msync(stream, buffer, offset, len, flags)
    },
    doMkdir: function (path, mode) {
      path = PATH.normalize(path)
      if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
      FS.mkdir(path, mode, 0)
      return 0
    },
    doMknod: function (path, mode, dev) {
      switch (mode & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break
        default:
          return -28
      }
      FS.mknod(path, mode, dev)
      return 0
    },
    doReadlink: function (path, buf, bufsize) {
      if (bufsize <= 0) return -28
      var ret = FS.readlink(path)
      var len = Math.min(bufsize, lengthBytesUTF8(ret))
      var endChar = HEAP8[buf + len]
      stringToUTF8(ret, buf, bufsize + 1)
      HEAP8[buf + len] = endChar
      return len
    },
    doAccess: function (path, amode) {
      if (amode & ~7) {
        return -28
      }
      var node
      var lookup = FS.lookupPath(path, { follow: true })
      node = lookup.node
      if (!node) {
        return -44
      }
      var perms = ''
      if (amode & 4) perms += 'r'
      if (amode & 2) perms += 'w'
      if (amode & 1) perms += 'x'
      if (perms && FS.nodePermissions(node, perms)) {
        return -2
      }
      return 0
    },
    doDup: function (path, flags, suggestFD) {
      var suggest = FS.getStream(suggestFD)
      if (suggest) FS.close(suggest)
      return FS.open(path, flags, 0, suggestFD, suggestFD).fd
    },
    doReadv: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.read(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
        if (curr < len) break
      }
      return ret
    },
    doWritev: function (stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2]
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
        var curr = FS.write(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
      }
      return ret
    },
    varargs: undefined,
    get: function () {
      SYSCALLS.varargs += 4
      var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
      return ret
    },
    getStr: function (ptr) {
      var ret = UTF8ToString(ptr)
      return ret
    },
    getStreamFromFD: function (fd) {
      var stream = FS.getStream(fd)
      if (!stream) throw new FS.ErrnoError(8)
      return stream
    },
    get64: function (low, high) {
      return low
    },
  }
  Module['SYSCALLS'] = SYSCALLS
  function ___sys_access(path, amode) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doAccess(path, amode)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_access'] = ___sys_access
  function ___sys_chdir(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.chdir(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_chdir'] = ___sys_chdir
  function ___sys_chown32(path, owner, group) {
    try {
      path = SYSCALLS.getStr(path)
      FS.chown(path, owner, group)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_chown32'] = ___sys_chown32
  function ___sys_dup2(oldfd, suggestFD) {
    try {
      var old = SYSCALLS.getStreamFromFD(oldfd)
      if (old.fd === suggestFD) return suggestFD
      return SYSCALLS.doDup(old.path, old.flags, suggestFD)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_dup2'] = ___sys_dup2
  function ___sys_fallocate(fd, mode, off_low, off_high, len_low, len_high) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var offset = SYSCALLS.get64(off_low, off_high)
      var len = SYSCALLS.get64(len_low, len_high)
      FS.allocate(stream, offset, len)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_fallocate'] = ___sys_fallocate
  function ___sys_fchown32(fd, owner, group) {
    try {
      FS.fchown(fd, owner, group)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_fchown32'] = ___sys_fchown32
  function ___sys_fstat64(fd, buf) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      return SYSCALLS.doStat(FS.stat, stream.path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_fstat64'] = ___sys_fstat64
  function ___sys_ftruncate64(fd, zero, low, high) {
    try {
      var length = SYSCALLS.get64(low, high)
      FS.ftruncate(fd, length)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_ftruncate64'] = ___sys_ftruncate64
  function ___sys_getcwd(buf, size) {
    try {
      if (size === 0) return -28
      var cwd = FS.cwd()
      var cwdLengthInBytes = lengthBytesUTF8(cwd)
      if (size < cwdLengthInBytes + 1) return -68
      stringToUTF8(cwd, buf, size)
      return buf
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getcwd'] = ___sys_getcwd
  function ___sys_getdents64(fd, dirp, count) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      if (!stream.getdents) {
        stream.getdents = FS.readdir(stream.path)
      }
      var struct_size = 280
      var pos = 0
      var off = FS.llseek(stream, 0, 1)
      var idx = Math.floor(off / struct_size)
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id
        var type
        var name = stream.getdents[idx]
        if (name[0] === '.') {
          id = 1
          type = 4
        } else {
          var child = FS.lookupNode(stream.node, name)
          id = child.id
          type = FS.isChrdev(child.mode)
            ? 2
            : FS.isDir(child.mode)
            ? 4
            : FS.isLink(child.mode)
            ? 10
            : 8
        }
        ;(tempI64 = [
          id >>> 0,
          ((tempDouble = id),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
          (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1])
        ;(tempI64 = [
          ((idx + 1) * struct_size) >>> 0,
          ((tempDouble = (idx + 1) * struct_size),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
          (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1])
        HEAP16[(dirp + pos + 16) >> 1] = 280
        HEAP8[(dirp + pos + 18) >> 0] = type
        stringToUTF8(name, dirp + pos + 19, 256)
        pos += struct_size
        idx += 1
      }
      FS.llseek(stream, idx * struct_size, 0)
      return pos
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getdents64'] = ___sys_getdents64
  function ___sys_getpid() {
    return 42
  }
  Module['___sys_getpid'] = ___sys_getpid
  function ___sys_getrusage(who, usage) {
    try {
      _memset(usage, 0, 136)
      HEAP32[usage >> 2] = 1
      HEAP32[(usage + 4) >> 2] = 2
      HEAP32[(usage + 8) >> 2] = 3
      HEAP32[(usage + 12) >> 2] = 4
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_getrusage'] = ___sys_getrusage
  function ___sys_getegid32() {
    return 0
  }
  Module['___sys_getegid32'] = ___sys_getegid32
  function ___sys_getuid32() {
    return ___sys_getegid32()
  }
  Module['___sys_getuid32'] = ___sys_getuid32
  function ___sys_lstat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doStat(FS.lstat, path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_lstat64'] = ___sys_lstat64
  function ___sys_mkdir(path, mode) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doMkdir(path, mode)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_mkdir'] = ___sys_mkdir
  function syscallMmap2(addr, len, prot, flags, fd, off) {
    off <<= 12
    var ptr
    var allocated = false
    if ((flags & 16) !== 0 && addr % 16384 !== 0) {
      return -28
    }
    if ((flags & 32) !== 0) {
      ptr = _memalign(16384, len)
      if (!ptr) return -48
      _memset(ptr, 0, len)
      allocated = true
    } else {
      var info = FS.getStream(fd)
      if (!info) return -8
      var res = FS.mmap(info, addr, len, off, prot, flags)
      ptr = res.ptr
      allocated = res.allocated
    }
    SYSCALLS.mappings[ptr] = {
      malloc: ptr,
      len: len,
      allocated: allocated,
      fd: fd,
      prot: prot,
      flags: flags,
      offset: off,
    }
    return ptr
  }
  Module['syscallMmap2'] = syscallMmap2
  function ___sys_mmap2(addr, len, prot, flags, fd, off) {
    try {
      return syscallMmap2(addr, len, prot, flags, fd, off)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_mmap2'] = ___sys_mmap2
  function ___sys_mprotect(addr, len, size) {
    return 0
  }
  Module['___sys_mprotect'] = ___sys_mprotect
  function syscallMunmap(addr, len) {
    if ((addr | 0) === -1 || len === 0) {
      return -28
    }
    var info = SYSCALLS.mappings[addr]
    if (!info) return 0
    if (len === info.len) {
      var stream = FS.getStream(info.fd)
      if (stream) {
        if (info.prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
        }
        FS.munmap(stream)
      }
      SYSCALLS.mappings[addr] = null
      if (info.allocated) {
        _free(info.malloc)
      }
    }
    return 0
  }
  Module['syscallMunmap'] = syscallMunmap
  function ___sys_munmap(addr, len) {
    try {
      return syscallMunmap(addr, len)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_munmap'] = ___sys_munmap
  function ___sys_open(path, flags, varargs) {
    SYSCALLS.varargs = varargs
    try {
      var pathname = SYSCALLS.getStr(path)
      var mode = varargs ? SYSCALLS.get() : 0
      var stream = FS.open(pathname, flags, mode)
      return stream.fd
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_open'] = ___sys_open
  function ___sys_prlimit64(pid, resource, new_limit, old_limit) {
    try {
      if (old_limit) {
        HEAP32[old_limit >> 2] = -1
        HEAP32[(old_limit + 4) >> 2] = -1
        HEAP32[(old_limit + 8) >> 2] = -1
        HEAP32[(old_limit + 12) >> 2] = -1
      }
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_prlimit64'] = ___sys_prlimit64
  function ___sys_readlink(path, buf, bufsize) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doReadlink(path, buf, bufsize)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_readlink'] = ___sys_readlink
  function ___sys_rename(old_path, new_path) {
    try {
      old_path = SYSCALLS.getStr(old_path)
      new_path = SYSCALLS.getStr(new_path)
      FS.rename(old_path, new_path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_rename'] = ___sys_rename
  function ___sys_rmdir(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.rmdir(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_rmdir'] = ___sys_rmdir
  function ___sys_setrlimit(varargs) {
    return 0
  }
  Module['___sys_setrlimit'] = ___sys_setrlimit
  function ___sys_stat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path)
      return SYSCALLS.doStat(FS.stat, path, buf)
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_stat64'] = ___sys_stat64
  function ___sys_statfs64(path, size, buf) {
    try {
      path = SYSCALLS.getStr(path)
      HEAP32[(buf + 4) >> 2] = 4096
      HEAP32[(buf + 40) >> 2] = 4096
      HEAP32[(buf + 8) >> 2] = 1e6
      HEAP32[(buf + 12) >> 2] = 5e5
      HEAP32[(buf + 16) >> 2] = 5e5
      HEAP32[(buf + 20) >> 2] = FS.nextInode
      HEAP32[(buf + 24) >> 2] = 1e6
      HEAP32[(buf + 28) >> 2] = 42
      HEAP32[(buf + 44) >> 2] = 2
      HEAP32[(buf + 36) >> 2] = 255
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_statfs64'] = ___sys_statfs64
  function ___sys_ugetrlimit(resource, rlim) {
    try {
      HEAP32[rlim >> 2] = -1
      HEAP32[(rlim + 4) >> 2] = -1
      HEAP32[(rlim + 8) >> 2] = -1
      HEAP32[(rlim + 12) >> 2] = -1
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_ugetrlimit'] = ___sys_ugetrlimit
  function ___sys_uname(buf) {
    try {
      if (!buf) return -21
      var layout = {
        __size__: 390,
        domainname: 325,
        machine: 260,
        nodename: 65,
        release: 130,
        sysname: 0,
        version: 195,
      }
      var copyString = function (element, value) {
        var offset = layout[element]
        writeAsciiToMemory(value, buf + offset)
      }
      copyString('sysname', 'Emscripten')
      copyString('nodename', 'emscripten')
      copyString('release', '1.0')
      copyString('version', '#1')
      copyString('machine', 'x86-JS')
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_uname'] = ___sys_uname
  function ___sys_unlink(path) {
    try {
      path = SYSCALLS.getStr(path)
      FS.unlink(path)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_unlink'] = ___sys_unlink
  function ___sys_wait4(pid, wstart, options, rusage) {
    try {
      abort('cannot wait on child processes')
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return -e.errno
    }
  }
  Module['___sys_wait4'] = ___sys_wait4
  function __exit(a0) {
    return _exit(a0)
  }
  Module['__exit'] = __exit
  function _abort() {
    abort()
  }
  Module['_abort'] = _abort
  var __sigalrm_handler = 0
  Module['__sigalrm_handler'] = __sigalrm_handler
  function _alarm(seconds) {
    setTimeout(function () {
      if (__sigalrm_handler) wasmTable.get(__sigalrm_handler)(0)
    }, seconds * 1e3)
  }
  Module['_alarm'] = _alarm
  var _emscripten_get_now
  if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function () {
      var t = process['hrtime']()
      return t[0] * 1e3 + t[1] / 1e6
    }
  } else if (typeof dateNow !== 'undefined') {
    _emscripten_get_now = dateNow
  } else
    _emscripten_get_now = function () {
      return performance.now()
    }
  Module['_emscripten_get_now'] = _emscripten_get_now
  var _emscripten_get_now_is_monotonic = true
  Module['_emscripten_get_now_is_monotonic'] = _emscripten_get_now_is_monotonic
  function setErrNo(value) {
    HEAP32[___errno_location() >> 2] = value
    return value
  }
  Module['setErrNo'] = setErrNo
  function _clock_gettime(clk_id, tp) {
    var now
    if (clk_id === 0) {
      now = Date.now()
    } else if (
      (clk_id === 1 || clk_id === 4) &&
      _emscripten_get_now_is_monotonic
    ) {
      now = _emscripten_get_now()
    } else {
      setErrNo(28)
      return -1
    }
    HEAP32[tp >> 2] = (now / 1e3) | 0
    HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0
    return 0
  }
  Module['_clock_gettime'] = _clock_gettime
  function _dlclose(handle) {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlclose'] = _dlclose
  function _dlerror() {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlerror'] = _dlerror
  function _dlopen(filename, flag) {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlopen'] = _dlopen
  function _dlsym(handle, symbol) {
    abort(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
    )
  }
  Module['_dlsym'] = _dlsym
  function _longjmp(env, value) {
    _setThrew(env, value || 1)
    throw 'longjmp'
  }
  Module['_longjmp'] = _longjmp
  function _emscripten_longjmp(a0, a1) {
    return _longjmp(a0, a1)
  }
  Module['_emscripten_longjmp'] = _emscripten_longjmp
  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.copyWithin(dest, src, src + num)
  }
  Module['_emscripten_memcpy_big'] = _emscripten_memcpy_big
  function _emscripten_get_heap_size() {
    return HEAPU8.length
  }
  Module['_emscripten_get_heap_size'] = _emscripten_get_heap_size
  function abortOnCannotGrowMemory(requestedSize) {
    abort('OOM')
  }
  Module['abortOnCannotGrowMemory'] = abortOnCannotGrowMemory
  function _emscripten_resize_heap(requestedSize) {
    abortOnCannotGrowMemory(requestedSize)
  }
  Module['_emscripten_resize_heap'] = _emscripten_resize_heap
  var ENV = {}
  Module['ENV'] = ENV
  function getExecutableName() {
    return thisProgram || './this.program'
  }
  Module['getExecutableName'] = getExecutableName
  function getEnvStrings() {
    if (!getEnvStrings.strings) {
      var lang =
        (
          (typeof navigator === 'object' &&
            navigator.languages &&
            navigator.languages[0]) ||
          'C'
        ).replace('-', '_') + '.UTF-8'
      var env = {
        USER: 'web_user',
        LOGNAME: 'web_user',
        PATH: '/',
        PWD: '/',
        HOME: '/home/web_user',
        LANG: lang,
        _: getExecutableName(),
      }
      for (var x in ENV) {
        env[x] = ENV[x]
      }
      var strings = []
      for (var x in env) {
        strings.push(x + '=' + env[x])
      }
      getEnvStrings.strings = strings
    }
    return getEnvStrings.strings
  }
  Module['getEnvStrings'] = getEnvStrings
  function _environ_get(__environ, environ_buf) {
    try {
      var bufSize = 0
      getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize
        HEAP32[(__environ + i * 4) >> 2] = ptr
        writeAsciiToMemory(string, ptr)
        bufSize += string.length + 1
      })
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_environ_get'] = _environ_get
  function _environ_sizes_get(penviron_count, penviron_buf_size) {
    try {
      var strings = getEnvStrings()
      HEAP32[penviron_count >> 2] = strings.length
      var bufSize = 0
      strings.forEach(function (string) {
        bufSize += string.length + 1
      })
      HEAP32[penviron_buf_size >> 2] = bufSize
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_environ_sizes_get'] = _environ_sizes_get
  function _execve(path, argv, envp) {
    setErrNo(45)
    return -1
  }
  Module['_execve'] = _execve
  function _fd_close(fd) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      FS.close(stream)
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_close'] = _fd_close
  function _fd_fdstat_get(fd, pbuf) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var type = stream.tty
        ? 2
        : FS.isDir(stream.mode)
        ? 3
        : FS.isLink(stream.mode)
        ? 7
        : 4
      HEAP8[pbuf >> 0] = type
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_fdstat_get'] = _fd_fdstat_get
  function _fd_pread(fd, iov, iovcnt, offset_low, offset_high, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doReadv(stream, iov, iovcnt, offset_low)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_pread'] = _fd_pread
  function _fd_read(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doReadv(stream, iov, iovcnt)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_read'] = _fd_read
  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var HIGH_OFFSET = 4294967296
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0)
      var DOUBLE_LIMIT = 9007199254740992
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61
      }
      FS.llseek(stream, offset, whence)
      ;(tempI64 = [
        stream.position >>> 0,
        ((tempDouble = stream.position),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0),
      ]),
        (HEAP32[newOffset >> 2] = tempI64[0]),
        (HEAP32[(newOffset + 4) >> 2] = tempI64[1])
      if (stream.getdents && offset === 0 && whence === 0)
        stream.getdents = null
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_seek'] = _fd_seek
  function _fd_write(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = SYSCALLS.doWritev(stream, iov, iovcnt)
      HEAP32[pnum >> 2] = num
      return 0
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
      return e.errno
    }
  }
  Module['_fd_write'] = _fd_write
  function _fork() {
    setErrNo(6)
    return -1
  }
  Module['_fork'] = _fork
  function _getTempRet0() {
    return getTempRet0() | 0
  }
  Module['_getTempRet0'] = _getTempRet0
  function _getentropy(buffer, size) {
    if (!_getentropy.randomDevice) {
      _getentropy.randomDevice = getRandomDevice()
    }
    for (var i = 0; i < size; i++) {
      HEAP8[(buffer + i) >> 0] = _getentropy.randomDevice()
    }
    return 0
  }
  Module['_getentropy'] = _getentropy
  function _getpwnam() {
    throw 'getpwnam: TODO'
  }
  Module['_getpwnam'] = _getpwnam
  function _getpwuid() {
    throw 'getpwuid: TODO'
  }
  Module['_getpwuid'] = _getpwuid
  var ERRNO_CODES = {
    EPERM: 63,
    ENOENT: 44,
    ESRCH: 71,
    EINTR: 27,
    EIO: 29,
    ENXIO: 60,
    E2BIG: 1,
    ENOEXEC: 45,
    EBADF: 8,
    ECHILD: 12,
    EAGAIN: 6,
    EWOULDBLOCK: 6,
    ENOMEM: 48,
    EACCES: 2,
    EFAULT: 21,
    ENOTBLK: 105,
    EBUSY: 10,
    EEXIST: 20,
    EXDEV: 75,
    ENODEV: 43,
    ENOTDIR: 54,
    EISDIR: 31,
    EINVAL: 28,
    ENFILE: 41,
    EMFILE: 33,
    ENOTTY: 59,
    ETXTBSY: 74,
    EFBIG: 22,
    ENOSPC: 51,
    ESPIPE: 70,
    EROFS: 69,
    EMLINK: 34,
    EPIPE: 64,
    EDOM: 18,
    ERANGE: 68,
    ENOMSG: 49,
    EIDRM: 24,
    ECHRNG: 106,
    EL2NSYNC: 156,
    EL3HLT: 107,
    EL3RST: 108,
    ELNRNG: 109,
    EUNATCH: 110,
    ENOCSI: 111,
    EL2HLT: 112,
    EDEADLK: 16,
    ENOLCK: 46,
    EBADE: 113,
    EBADR: 114,
    EXFULL: 115,
    ENOANO: 104,
    EBADRQC: 103,
    EBADSLT: 102,
    EDEADLOCK: 16,
    EBFONT: 101,
    ENOSTR: 100,
    ENODATA: 116,
    ETIME: 117,
    ENOSR: 118,
    ENONET: 119,
    ENOPKG: 120,
    EREMOTE: 121,
    ENOLINK: 47,
    EADV: 122,
    ESRMNT: 123,
    ECOMM: 124,
    EPROTO: 65,
    EMULTIHOP: 36,
    EDOTDOT: 125,
    EBADMSG: 9,
    ENOTUNIQ: 126,
    EBADFD: 127,
    EREMCHG: 128,
    ELIBACC: 129,
    ELIBBAD: 130,
    ELIBSCN: 131,
    ELIBMAX: 132,
    ELIBEXEC: 133,
    ENOSYS: 52,
    ENOTEMPTY: 55,
    ENAMETOOLONG: 37,
    ELOOP: 32,
    EOPNOTSUPP: 138,
    EPFNOSUPPORT: 139,
    ECONNRESET: 15,
    ENOBUFS: 42,
    EAFNOSUPPORT: 5,
    EPROTOTYPE: 67,
    ENOTSOCK: 57,
    ENOPROTOOPT: 50,
    ESHUTDOWN: 140,
    ECONNREFUSED: 14,
    EADDRINUSE: 3,
    ECONNABORTED: 13,
    ENETUNREACH: 40,
    ENETDOWN: 38,
    ETIMEDOUT: 73,
    EHOSTDOWN: 142,
    EHOSTUNREACH: 23,
    EINPROGRESS: 26,
    EALREADY: 7,
    EDESTADDRREQ: 17,
    EMSGSIZE: 35,
    EPROTONOSUPPORT: 66,
    ESOCKTNOSUPPORT: 137,
    EADDRNOTAVAIL: 4,
    ENETRESET: 39,
    EISCONN: 30,
    ENOTCONN: 53,
    ETOOMANYREFS: 141,
    EUSERS: 136,
    EDQUOT: 19,
    ESTALE: 72,
    ENOTSUP: 138,
    ENOMEDIUM: 148,
    EILSEQ: 25,
    EOVERFLOW: 61,
    ECANCELED: 11,
    ENOTRECOVERABLE: 56,
    EOWNERDEAD: 62,
    ESTRPIPE: 135,
  }
  Module['ERRNO_CODES'] = ERRNO_CODES
  function _kill(pid, sig) {
    setErrNo(ERRNO_CODES.EPERM)
    return -1
  }
  Module['_kill'] = _kill
  function _posix_spawn() {
    return _fork()
  }
  Module['_posix_spawn'] = _posix_spawn
  function _pthread_create() {
    return 6
  }
  Module['_pthread_create'] = _pthread_create
  function _raise(sig) {
    setErrNo(ERRNO_CODES.ENOSYS)
    return -1
  }
  Module['_raise'] = _raise
  function _setTempRet0($i) {
    setTempRet0($i | 0)
  }
  Module['_setTempRet0'] = _setTempRet0
  function _sigaction(signum, act, oldact) {
    return 0
  }
  Module['_sigaction'] = _sigaction
  function _sigaddset(set, signum) {
    HEAP32[set >> 2] = HEAP32[set >> 2] | (1 << (signum - 1))
    return 0
  }
  Module['_sigaddset'] = _sigaddset
  function _sigemptyset(set) {
    HEAP32[set >> 2] = 0
    return 0
  }
  Module['_sigemptyset'] = _sigemptyset
  function _sigfillset(set) {
    HEAP32[set >> 2] = -1 >>> 0
    return 0
  }
  Module['_sigfillset'] = _sigfillset
  function _sigprocmask() {
    return 0
  }
  Module['_sigprocmask'] = _sigprocmask
  function __isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  }
  Module['__isLeapYear'] = __isLeapYear
  function __arraySum(array, index) {
    var sum = 0
    for (var i = 0; i <= index; sum += array[i++]) {}
    return sum
  }
  Module['__arraySum'] = __arraySum
  var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  Module['__MONTH_DAYS_LEAP'] = __MONTH_DAYS_LEAP
  var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  Module['__MONTH_DAYS_REGULAR'] = __MONTH_DAYS_REGULAR
  function __addDays(date, days) {
    var newDate = new Date(date.getTime())
    while (days > 0) {
      var leap = __isLeapYear(newDate.getFullYear())
      var currentMonth = newDate.getMonth()
      var daysInCurrentMonth = (leap
        ? __MONTH_DAYS_LEAP
        : __MONTH_DAYS_REGULAR)[currentMonth]
      if (days > daysInCurrentMonth - newDate.getDate()) {
        days -= daysInCurrentMonth - newDate.getDate() + 1
        newDate.setDate(1)
        if (currentMonth < 11) {
          newDate.setMonth(currentMonth + 1)
        } else {
          newDate.setMonth(0)
          newDate.setFullYear(newDate.getFullYear() + 1)
        }
      } else {
        newDate.setDate(newDate.getDate() + days)
        return newDate
      }
    }
    return newDate
  }
  Module['__addDays'] = __addDays
  function _strftime(s, maxsize, format, tm) {
    var tm_zone = HEAP32[(tm + 40) >> 2]
    var date = {
      tm_sec: HEAP32[tm >> 2],
      tm_min: HEAP32[(tm + 4) >> 2],
      tm_hour: HEAP32[(tm + 8) >> 2],
      tm_mday: HEAP32[(tm + 12) >> 2],
      tm_mon: HEAP32[(tm + 16) >> 2],
      tm_year: HEAP32[(tm + 20) >> 2],
      tm_wday: HEAP32[(tm + 24) >> 2],
      tm_yday: HEAP32[(tm + 28) >> 2],
      tm_isdst: HEAP32[(tm + 32) >> 2],
      tm_gmtoff: HEAP32[(tm + 36) >> 2],
      tm_zone: tm_zone ? UTF8ToString(tm_zone) : '',
    }
    var pattern = UTF8ToString(format)
    var EXPANSION_RULES_1 = {
      '%c': '%a %b %d %H:%M:%S %Y',
      '%D': '%m/%d/%y',
      '%F': '%Y-%m-%d',
      '%h': '%b',
      '%r': '%I:%M:%S %p',
      '%R': '%H:%M',
      '%T': '%H:%M:%S',
      '%x': '%m/%d/%y',
      '%X': '%H:%M:%S',
      '%Ec': '%c',
      '%EC': '%C',
      '%Ex': '%m/%d/%y',
      '%EX': '%H:%M:%S',
      '%Ey': '%y',
      '%EY': '%Y',
      '%Od': '%d',
      '%Oe': '%e',
      '%OH': '%H',
      '%OI': '%I',
      '%Om': '%m',
      '%OM': '%M',
      '%OS': '%S',
      '%Ou': '%u',
      '%OU': '%U',
      '%OV': '%V',
      '%Ow': '%w',
      '%OW': '%W',
      '%Oy': '%y',
    }
    for (var rule in EXPANSION_RULES_1) {
      pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule])
    }
    var WEEKDAYS = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    function leadingSomething(value, digits, character) {
      var str = typeof value === 'number' ? value.toString() : value || ''
      while (str.length < digits) {
        str = character[0] + str
      }
      return str
    }
    function leadingNulls(value, digits) {
      return leadingSomething(value, digits, '0')
    }
    function compareByDay(date1, date2) {
      function sgn(value) {
        return value < 0 ? -1 : value > 0 ? 1 : 0
      }
      var compare
      if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
        if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
          compare = sgn(date1.getDate() - date2.getDate())
        }
      }
      return compare
    }
    function getFirstWeekStartDate(janFourth) {
      switch (janFourth.getDay()) {
        case 0:
          return new Date(janFourth.getFullYear() - 1, 11, 29)
        case 1:
          return janFourth
        case 2:
          return new Date(janFourth.getFullYear(), 0, 3)
        case 3:
          return new Date(janFourth.getFullYear(), 0, 2)
        case 4:
          return new Date(janFourth.getFullYear(), 0, 1)
        case 5:
          return new Date(janFourth.getFullYear() - 1, 11, 31)
        case 6:
          return new Date(janFourth.getFullYear() - 1, 11, 30)
      }
    }
    function getWeekBasedYear(date) {
      var thisDate = __addDays(
        new Date(date.tm_year + 1900, 0, 1),
        date.tm_yday
      )
      var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
      var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
      var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
      var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
      if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
        if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
          return thisDate.getFullYear() + 1
        } else {
          return thisDate.getFullYear()
        }
      } else {
        return thisDate.getFullYear() - 1
      }
    }
    var EXPANSION_RULES_2 = {
      '%a': function (date) {
        return WEEKDAYS[date.tm_wday].substring(0, 3)
      },
      '%A': function (date) {
        return WEEKDAYS[date.tm_wday]
      },
      '%b': function (date) {
        return MONTHS[date.tm_mon].substring(0, 3)
      },
      '%B': function (date) {
        return MONTHS[date.tm_mon]
      },
      '%C': function (date) {
        var year = date.tm_year + 1900
        return leadingNulls((year / 100) | 0, 2)
      },
      '%d': function (date) {
        return leadingNulls(date.tm_mday, 2)
      },
      '%e': function (date) {
        return leadingSomething(date.tm_mday, 2, ' ')
      },
      '%g': function (date) {
        return getWeekBasedYear(date).toString().substring(2)
      },
      '%G': function (date) {
        return getWeekBasedYear(date)
      },
      '%H': function (date) {
        return leadingNulls(date.tm_hour, 2)
      },
      '%I': function (date) {
        var twelveHour = date.tm_hour
        if (twelveHour == 0) twelveHour = 12
        else if (twelveHour > 12) twelveHour -= 12
        return leadingNulls(twelveHour, 2)
      },
      '%j': function (date) {
        return leadingNulls(
          date.tm_mday +
            __arraySum(
              __isLeapYear(date.tm_year + 1900)
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              date.tm_mon - 1
            ),
          3
        )
      },
      '%m': function (date) {
        return leadingNulls(date.tm_mon + 1, 2)
      },
      '%M': function (date) {
        return leadingNulls(date.tm_min, 2)
      },
      '%n': function () {
        return '\n'
      },
      '%p': function (date) {
        if (date.tm_hour >= 0 && date.tm_hour < 12) {
          return 'AM'
        } else {
          return 'PM'
        }
      },
      '%S': function (date) {
        return leadingNulls(date.tm_sec, 2)
      },
      '%t': function () {
        return '\t'
      },
      '%u': function (date) {
        return date.tm_wday || 7
      },
      '%U': function (date) {
        var janFirst = new Date(date.tm_year + 1900, 0, 1)
        var firstSunday =
          janFirst.getDay() === 0
            ? janFirst
            : __addDays(janFirst, 7 - janFirst.getDay())
        var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
        if (compareByDay(firstSunday, endDate) < 0) {
          var februaryFirstUntilEndMonth =
            __arraySum(
              __isLeapYear(endDate.getFullYear())
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              endDate.getMonth() - 1
            ) - 31
          var firstSundayUntilEndJanuary = 31 - firstSunday.getDate()
          var days =
            firstSundayUntilEndJanuary +
            februaryFirstUntilEndMonth +
            endDate.getDate()
          return leadingNulls(Math.ceil(days / 7), 2)
        }
        return compareByDay(firstSunday, janFirst) === 0 ? '01' : '00'
      },
      '%V': function (date) {
        var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4)
        var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4)
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
        var endDate = __addDays(
          new Date(date.tm_year + 1900, 0, 1),
          date.tm_yday
        )
        if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
          return '53'
        }
        if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
          return '01'
        }
        var daysDifference
        if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
          daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
        } else {
          daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
        }
        return leadingNulls(Math.ceil(daysDifference / 7), 2)
      },
      '%w': function (date) {
        return date.tm_wday
      },
      '%W': function (date) {
        var janFirst = new Date(date.tm_year, 0, 1)
        var firstMonday =
          janFirst.getDay() === 1
            ? janFirst
            : __addDays(
                janFirst,
                janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1
              )
        var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
        if (compareByDay(firstMonday, endDate) < 0) {
          var februaryFirstUntilEndMonth =
            __arraySum(
              __isLeapYear(endDate.getFullYear())
                ? __MONTH_DAYS_LEAP
                : __MONTH_DAYS_REGULAR,
              endDate.getMonth() - 1
            ) - 31
          var firstMondayUntilEndJanuary = 31 - firstMonday.getDate()
          var days =
            firstMondayUntilEndJanuary +
            februaryFirstUntilEndMonth +
            endDate.getDate()
          return leadingNulls(Math.ceil(days / 7), 2)
        }
        return compareByDay(firstMonday, janFirst) === 0 ? '01' : '00'
      },
      '%y': function (date) {
        return (date.tm_year + 1900).toString().substring(2)
      },
      '%Y': function (date) {
        return date.tm_year + 1900
      },
      '%z': function (date) {
        var off = date.tm_gmtoff
        var ahead = off >= 0
        off = Math.abs(off) / 60
        off = (off / 60) * 100 + (off % 60)
        return (ahead ? '+' : '-') + String('0000' + off).slice(-4)
      },
      '%Z': function (date) {
        return date.tm_zone
      },
      '%%': function () {
        return '%'
      },
    }
    for (var rule in EXPANSION_RULES_2) {
      if (pattern.indexOf(rule) >= 0) {
        pattern = pattern.replace(
          new RegExp(rule, 'g'),
          EXPANSION_RULES_2[rule](date)
        )
      }
    }
    var bytes = intArrayFromString(pattern, false)
    if (bytes.length > maxsize) {
      return 0
    }
    writeArrayToMemory(bytes, s)
    return bytes.length - 1
  }
  Module['_strftime'] = _strftime
  function _strftime_l(s, maxsize, format, tm) {
    return _strftime(s, maxsize, format, tm)
  }
  Module['_strftime_l'] = _strftime_l
  function _time(ptr) {
    var ret = (Date.now() / 1e3) | 0
    if (ptr) {
      HEAP32[ptr >> 2] = ret
    }
    return ret
  }
  Module['_time'] = _time
  function _wait(stat_loc) {
    setErrNo(12)
    return -1
  }
  Module['_wait'] = _wait
  function _wait4(a0) {
    return _wait(a0)
  }
  Module['_wait4'] = _wait4
  var FSNode = function (parent, name, mode, rdev) {
    if (!parent) {
      parent = this
    }
    this.parent = parent
    this.mount = parent.mount
    this.mounted = null
    this.id = FS.nextInode++
    this.name = name
    this.mode = mode
    this.node_ops = {}
    this.stream_ops = {}
    this.rdev = rdev
  }
  var readMode = 292 | 73
  var writeMode = 146
  Object.defineProperties(FSNode.prototype, {
    read: {
      get: function () {
        return (this.mode & readMode) === readMode
      },
      set: function (val) {
        val ? (this.mode |= readMode) : (this.mode &= ~readMode)
      },
    },
    write: {
      get: function () {
        return (this.mode & writeMode) === writeMode
      },
      set: function (val) {
        val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
      },
    },
    isFolder: {
      get: function () {
        return FS.isDir(this.mode)
      },
    },
    isDevice: {
      get: function () {
        return FS.isChrdev(this.mode)
      },
    },
  })
  FS.FSNode = FSNode
  FS.staticInit()
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
    var u8array = new Array(len)
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
    if (dontAddNull) u8array.length = numBytesWritten
    return u8array
  }
  var asmLibraryArg = {
    ha: __Exit,
    G: ___localtime_r,
    S: ___sys_access,
    M: ___sys_chdir,
    N: ___sys_chown32,
    ba: ___sys_fallocate,
    O: ___sys_fchown32,
    _: ___sys_fstat64,
    L: ___sys_ftruncate64,
    P: ___sys_getcwd,
    Y: ___sys_getdents64,
    s: ___sys_getpid,
    U: ___sys_getrusage,
    R: ___sys_getuid32,
    $: ___sys_lstat64,
    aa: ___sys_mkdir,
    J: ___sys_mmap2,
    K: ___sys_munmap,
    v: ___sys_open,
    X: ___sys_prlimit64,
    T: ___sys_readlink,
    H: ___sys_rename,
    I: ___sys_rmdir,
    W: ___sys_setrlimit,
    u: ___sys_stat64,
    Z: ___sys_statfs64,
    V: ___sys_uname,
    r: ___sys_unlink,
    a: _abort,
    p: _clock_gettime,
    j: _dlclose,
    ja: _dlerror,
    ka: _dlopen,
    h: _dlsym,
    i: _emscripten_longjmp,
    A: _emscripten_memcpy_big,
    B: _emscripten_resize_heap,
    E: _environ_get,
    F: _environ_sizes_get,
    c: _exit,
    g: _fd_close,
    q: _fd_fdstat_get,
    z: _fd_pread,
    Q: _fd_read,
    y: _fd_seek,
    l: _fd_write,
    f: _getTempRet0,
    C: _getentropy,
    ia: _getpwuid,
    t: invoke_ii,
    ma: invoke_vi,
    x: invoke_vii,
    o: invoke_viii,
    da: _localtime_r,
    ga: _posix_spawn,
    ea: _pthread_create,
    n: _raise,
    e: _setTempRet0,
    b: _sigaction,
    la: _sigaddset,
    d: _sigemptyset,
    w: _sigfillset,
    k: _sigprocmask,
    ca: _strftime,
    D: _strftime_l,
    m: _time,
    fa: _wait4,
  }
  var asm = createWasm()
  var ___wasm_call_ctors = (Module['___wasm_call_ctors'] = function () {
    return (___wasm_call_ctors = Module['___wasm_call_ctors'] =
      Module['asm']['oa']).apply(null, arguments)
  })
  var _free = (Module['_free'] = function () {
    return (_free = Module['_free'] = Module['asm']['pa']).apply(
      null,
      arguments
    )
  })
  var _main = (Module['_main'] = function () {
    return (_main = Module['_main'] = Module['asm']['qa']).apply(
      null,
      arguments
    )
  })
  var _memset = (Module['_memset'] = function () {
    return (_memset = Module['_memset'] = Module['asm']['ra']).apply(
      null,
      arguments
    )
  })
  var _malloc = (Module['_malloc'] = function () {
    return (_malloc = Module['_malloc'] = Module['asm']['ta']).apply(
      null,
      arguments
    )
  })
  var _testSetjmp = (Module['_testSetjmp'] = function () {
    return (_testSetjmp = Module['_testSetjmp'] = Module['asm']['ua']).apply(
      null,
      arguments
    )
  })
  var _saveSetjmp = (Module['_saveSetjmp'] = function () {
    return (_saveSetjmp = Module['_saveSetjmp'] = Module['asm']['va']).apply(
      null,
      arguments
    )
  })
  var _realloc = (Module['_realloc'] = function () {
    return (_realloc = Module['_realloc'] = Module['asm']['wa']).apply(
      null,
      arguments
    )
  })
  var ___errno_location = (Module['___errno_location'] = function () {
    return (___errno_location = Module['___errno_location'] =
      Module['asm']['xa']).apply(null, arguments)
  })
  var __get_tzname = (Module['__get_tzname'] = function () {
    return (__get_tzname = Module['__get_tzname'] = Module['asm']['ya']).apply(
      null,
      arguments
    )
  })
  var __get_daylight = (Module['__get_daylight'] = function () {
    return (__get_daylight = Module['__get_daylight'] =
      Module['asm']['za']).apply(null, arguments)
  })
  var __get_timezone = (Module['__get_timezone'] = function () {
    return (__get_timezone = Module['__get_timezone'] =
      Module['asm']['Aa']).apply(null, arguments)
  })
  var _emscripten_main_thread_process_queued_calls = (Module[
    '_emscripten_main_thread_process_queued_calls'
  ] = function () {
    return (_emscripten_main_thread_process_queued_calls = Module[
      '_emscripten_main_thread_process_queued_calls'
    ] = Module['asm']['Ba']).apply(null, arguments)
  })
  var stackSave = (Module['stackSave'] = function () {
    return (stackSave = Module['stackSave'] = Module['asm']['Ca']).apply(
      null,
      arguments
    )
  })
  var stackRestore = (Module['stackRestore'] = function () {
    return (stackRestore = Module['stackRestore'] = Module['asm']['Da']).apply(
      null,
      arguments
    )
  })
  var stackAlloc = (Module['stackAlloc'] = function () {
    return (stackAlloc = Module['stackAlloc'] = Module['asm']['Ea']).apply(
      null,
      arguments
    )
  })
  var _setThrew = (Module['_setThrew'] = function () {
    return (_setThrew = Module['_setThrew'] = Module['asm']['Fa']).apply(
      null,
      arguments
    )
  })
  var _memalign = (Module['_memalign'] = function () {
    return (_memalign = Module['_memalign'] = Module['asm']['Ga']).apply(
      null,
      arguments
    )
  })
  var dynCall_viiijii = (Module['dynCall_viiijii'] = function () {
    return (dynCall_viiijii = Module['dynCall_viiijii'] =
      Module['asm']['Ha']).apply(null, arguments)
  })
  var dynCall_ji = (Module['dynCall_ji'] = function () {
    return (dynCall_ji = Module['dynCall_ji'] = Module['asm']['Ia']).apply(
      null,
      arguments
    )
  })
  var dynCall_viiij = (Module['dynCall_viiij'] = function () {
    return (dynCall_viiij = Module['dynCall_viiij'] =
      Module['asm']['Ja']).apply(null, arguments)
  })
  var dynCall_viiji = (Module['dynCall_viiji'] = function () {
    return (dynCall_viiji = Module['dynCall_viiji'] =
      Module['asm']['Ka']).apply(null, arguments)
  })
  var dynCall_jjjjjj = (Module['dynCall_jjjjjj'] = function () {
    return (dynCall_jjjjjj = Module['dynCall_jjjjjj'] =
      Module['asm']['La']).apply(null, arguments)
  })
  var dynCall_jiii = (Module['dynCall_jiii'] = function () {
    return (dynCall_jiii = Module['dynCall_jiii'] = Module['asm']['Ma']).apply(
      null,
      arguments
    )
  })
  var dynCall_viij = (Module['dynCall_viij'] = function () {
    return (dynCall_viij = Module['dynCall_viij'] = Module['asm']['Na']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiiijij = (Module['dynCall_iiiiijij'] = function () {
    return (dynCall_iiiiijij = Module['dynCall_iiiiijij'] =
      Module['asm']['Oa']).apply(null, arguments)
  })
  var dynCall_iiijj = (Module['dynCall_iiijj'] = function () {
    return (dynCall_iiijj = Module['dynCall_iiijj'] =
      Module['asm']['Pa']).apply(null, arguments)
  })
  var dynCall_iiiji = (Module['dynCall_iiiji'] = function () {
    return (dynCall_iiiji = Module['dynCall_iiiji'] =
      Module['asm']['Qa']).apply(null, arguments)
  })
  var dynCall_j = (Module['dynCall_j'] = function () {
    return (dynCall_j = Module['dynCall_j'] = Module['asm']['Ra']).apply(
      null,
      arguments
    )
  })
  var dynCall_jiiii = (Module['dynCall_jiiii'] = function () {
    return (dynCall_jiiii = Module['dynCall_jiiii'] =
      Module['asm']['Sa']).apply(null, arguments)
  })
  var dynCall_viiijj = (Module['dynCall_viiijj'] = function () {
    return (dynCall_viiijj = Module['dynCall_viiijj'] =
      Module['asm']['Ta']).apply(null, arguments)
  })
  var dynCall_viiiiijiiiiii = (Module['dynCall_viiiiijiiiiii'] = function () {
    return (dynCall_viiiiijiiiiii = Module['dynCall_viiiiijiiiiii'] =
      Module['asm']['Ua']).apply(null, arguments)
  })
  var dynCall_viiiiiijiiiiiii = (Module[
    'dynCall_viiiiiijiiiiiii'
  ] = function () {
    return (dynCall_viiiiiijiiiiiii = Module['dynCall_viiiiiijiiiiiii'] =
      Module['asm']['Va']).apply(null, arguments)
  })
  var dynCall_viiiiiji = (Module['dynCall_viiiiiji'] = function () {
    return (dynCall_viiiiiji = Module['dynCall_viiiiiji'] =
      Module['asm']['Wa']).apply(null, arguments)
  })
  var dynCall_viijiiiii = (Module['dynCall_viijiiiii'] = function () {
    return (dynCall_viijiiiii = Module['dynCall_viijiiiii'] =
      Module['asm']['Xa']).apply(null, arguments)
  })
  var dynCall_viiiijij = (Module['dynCall_viiiijij'] = function () {
    return (dynCall_viiiijij = Module['dynCall_viiiijij'] =
      Module['asm']['Ya']).apply(null, arguments)
  })
  var dynCall_vij = (Module['dynCall_vij'] = function () {
    return (dynCall_vij = Module['dynCall_vij'] = Module['asm']['Za']).apply(
      null,
      arguments
    )
  })
  var dynCall_jii = (Module['dynCall_jii'] = function () {
    return (dynCall_jii = Module['dynCall_jii'] = Module['asm']['_a']).apply(
      null,
      arguments
    )
  })
  var dynCall_viiiiij = (Module['dynCall_viiiiij'] = function () {
    return (dynCall_viiiiij = Module['dynCall_viiiiij'] =
      Module['asm']['$a']).apply(null, arguments)
  })
  var dynCall_iij = (Module['dynCall_iij'] = function () {
    return (dynCall_iij = Module['dynCall_iij'] = Module['asm']['ab']).apply(
      null,
      arguments
    )
  })
  var dynCall_iijii = (Module['dynCall_iijii'] = function () {
    return (dynCall_iijii = Module['dynCall_iijii'] =
      Module['asm']['bb']).apply(null, arguments)
  })
  var dynCall_iiij = (Module['dynCall_iiij'] = function () {
    return (dynCall_iiij = Module['dynCall_iiij'] = Module['asm']['cb']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiiiji = (Module['dynCall_iiiiiji'] = function () {
    return (dynCall_iiiiiji = Module['dynCall_iiiiiji'] =
      Module['asm']['db']).apply(null, arguments)
  })
  var dynCall_iiiijji = (Module['dynCall_iiiijji'] = function () {
    return (dynCall_iiiijji = Module['dynCall_iiiijji'] =
      Module['asm']['eb']).apply(null, arguments)
  })
  var dynCall_viiiij = (Module['dynCall_viiiij'] = function () {
    return (dynCall_viiiij = Module['dynCall_viiiij'] =
      Module['asm']['fb']).apply(null, arguments)
  })
  var dynCall_jiij = (Module['dynCall_jiij'] = function () {
    return (dynCall_jiij = Module['dynCall_jiij'] = Module['asm']['gb']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiij = (Module['dynCall_iiiij'] = function () {
    return (dynCall_iiiij = Module['dynCall_iiiij'] =
      Module['asm']['hb']).apply(null, arguments)
  })
  var dynCall_iiiiiiij = (Module['dynCall_iiiiiiij'] = function () {
    return (dynCall_iiiiiiij = Module['dynCall_iiiiiiij'] =
      Module['asm']['ib']).apply(null, arguments)
  })
  var dynCall_iiiiij = (Module['dynCall_iiiiij'] = function () {
    return (dynCall_iiiiij = Module['dynCall_iiiiij'] =
      Module['asm']['jb']).apply(null, arguments)
  })
  var dynCall_iiijjii = (Module['dynCall_iiijjii'] = function () {
    return (dynCall_iiijjii = Module['dynCall_iiijjii'] =
      Module['asm']['kb']).apply(null, arguments)
  })
  var dynCall_iiiijijii = (Module['dynCall_iiiijijii'] = function () {
    return (dynCall_iiiijijii = Module['dynCall_iiiijijii'] =
      Module['asm']['lb']).apply(null, arguments)
  })
  var dynCall_iiiijiji = (Module['dynCall_iiiijiji'] = function () {
    return (dynCall_iiiijiji = Module['dynCall_iiiijiji'] =
      Module['asm']['mb']).apply(null, arguments)
  })
  var dynCall_iiiiijii = (Module['dynCall_iiiiijii'] = function () {
    return (dynCall_iiiiijii = Module['dynCall_iiiiijii'] =
      Module['asm']['nb']).apply(null, arguments)
  })
  var dynCall_viji = (Module['dynCall_viji'] = function () {
    return (dynCall_viji = Module['dynCall_viji'] = Module['asm']['ob']).apply(
      null,
      arguments
    )
  })
  var dynCall_vijii = (Module['dynCall_vijii'] = function () {
    return (dynCall_vijii = Module['dynCall_vijii'] =
      Module['asm']['pb']).apply(null, arguments)
  })
  var dynCall_viiiji = (Module['dynCall_viiiji'] = function () {
    return (dynCall_viiiji = Module['dynCall_viiiji'] =
      Module['asm']['qb']).apply(null, arguments)
  })
  var dynCall_viijiii = (Module['dynCall_viijiii'] = function () {
    return (dynCall_viijiii = Module['dynCall_viijiii'] =
      Module['asm']['rb']).apply(null, arguments)
  })
  var dynCall_viiiiijii = (Module['dynCall_viiiiijii'] = function () {
    return (dynCall_viiiiijii = Module['dynCall_viiiiijii'] =
      Module['asm']['sb']).apply(null, arguments)
  })
  var dynCall_iiiijiii = (Module['dynCall_iiiijiii'] = function () {
    return (dynCall_iiiijiii = Module['dynCall_iiiijiii'] =
      Module['asm']['tb']).apply(null, arguments)
  })
  var dynCall_iiijii = (Module['dynCall_iiijii'] = function () {
    return (dynCall_iiijii = Module['dynCall_iiijii'] =
      Module['asm']['ub']).apply(null, arguments)
  })
  var dynCall_iiji = (Module['dynCall_iiji'] = function () {
    return (dynCall_iiji = Module['dynCall_iiji'] = Module['asm']['vb']).apply(
      null,
      arguments
    )
  })
  var dynCall_viijii = (Module['dynCall_viijii'] = function () {
    return (dynCall_viijii = Module['dynCall_viijii'] =
      Module['asm']['wb']).apply(null, arguments)
  })
  var dynCall_viijji = (Module['dynCall_viijji'] = function () {
    return (dynCall_viijji = Module['dynCall_viijji'] =
      Module['asm']['xb']).apply(null, arguments)
  })
  var dynCall_vijji = (Module['dynCall_vijji'] = function () {
    return (dynCall_vijji = Module['dynCall_vijji'] =
      Module['asm']['yb']).apply(null, arguments)
  })
  var dynCall_vijj = (Module['dynCall_vijj'] = function () {
    return (dynCall_vijj = Module['dynCall_vijj'] = Module['asm']['zb']).apply(
      null,
      arguments
    )
  })
  var dynCall_vijjjji = (Module['dynCall_vijjjji'] = function () {
    return (dynCall_vijjjji = Module['dynCall_vijjjji'] =
      Module['asm']['Ab']).apply(null, arguments)
  })
  var dynCall_ij = (Module['dynCall_ij'] = function () {
    return (dynCall_ij = Module['dynCall_ij'] = Module['asm']['Bb']).apply(
      null,
      arguments
    )
  })
  var dynCall_jiji = (Module['dynCall_jiji'] = function () {
    return (dynCall_jiji = Module['dynCall_jiji'] = Module['asm']['Cb']).apply(
      null,
      arguments
    )
  })
  var dynCall_iiiiijj = (Module['dynCall_iiiiijj'] = function () {
    return (dynCall_iiiiijj = Module['dynCall_iiiiijj'] =
      Module['asm']['Db']).apply(null, arguments)
  })
  var dynCall_iiiiiijj = (Module['dynCall_iiiiiijj'] = function () {
    return (dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] =
      Module['asm']['Eb']).apply(null, arguments)
  })
  function invoke_ii(index, a1) {
    var sp = stackSave()
    try {
      return wasmTable.get(index)(a1)
    } catch (e) {
      stackRestore(sp)
      if (e !== e + 0 && e !== 'longjmp') throw e
      _setThrew(1, 0)
    }
  }
  function invoke_viii(index, a1, a2, a3) {
    var sp = stackSave()
    try {
      wasmTable.get(index)(a1, a2, a3)
    } catch (e) {
      stackRestore(sp)
      if (e !== e + 0 && e !== 'longjmp') throw e
      _setThrew(1, 0)
    }
  }
  function invoke_vii(index, a1, a2) {
    var sp = stackSave()
    try {
      wasmTable.get(index)(a1, a2)
    } catch (e) {
      stackRestore(sp)
      if (e !== e + 0 && e !== 'longjmp') throw e
      _setThrew(1, 0)
    }
  }
  function invoke_vi(index, a1) {
    var sp = stackSave()
    try {
      wasmTable.get(index)(a1)
    } catch (e) {
      stackRestore(sp)
      if (e !== e + 0 && e !== 'longjmp') throw e
      _setThrew(1, 0)
    }
  }
  var calledRun
  function ExitStatus(status) {
    this.name = 'ExitStatus'
    this.message = 'Program terminated with exit(' + status + ')'
    this.status = status
  }
  var calledMain = false
  dependenciesFulfilled = function runCaller() {
    if (!calledRun) run()
    if (!calledRun) dependenciesFulfilled = runCaller
  }
  function callMain(args) {
    console.log('callMain')
    //console.log(sysroot)
    //console.log(wasi)
    //console.log(wasmfs)
    var entryFunction = Module['_main']
    args = args || []
    var argc = args.length + 1
    var argv = stackAlloc((argc + 1) * 4)
    HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram)
    for (var i = 1; i < argc; i++) {
      HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
    }
    HEAP32[(argv >> 2) + argc] = 0
    try {
      var ret = entryFunction(argc, argv)
      exit(ret, true)
    } catch (e) {
      if (e instanceof ExitStatus) {
        return
      } else if (e == 'unwind') {
        noExitRuntime = true
        return
      } else {
        var toLog = e
        if (e && typeof e === 'object' && e.stack) {
          toLog = [e, e.stack]
        }
        err('exception thrown: ' + toLog)
        quit_(1, e)
      }
    } finally {
      calledMain = true
    }
  }
  function run(args) {
    args = args || arguments_
    if (runDependencies > 0) {
      return
    }
    preRun()
    if (runDependencies > 0) {
      return
    }
    function doRun() {
      if (calledRun) return
      calledRun = true
      Module['calledRun'] = true
      if (ABORT) return
      initRuntime()
      preMain()
      if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
      if (shouldRunNow) callMain(args)
      postRun()
    }
    if (Module['setStatus']) {
      Module['setStatus']('Running...')
      setTimeout(function () {
        setTimeout(function () {
          Module['setStatus']('')
        }, 1)
        doRun()
      }, 1)
    } else {
      doRun()
    }
  }
  Module['run'] = run
  function exit(status, implicit) {
    if (implicit && noExitRuntime && status === 0) {
      return
    }
    if (noExitRuntime) {
    } else {
      EXITSTATUS = status
      exitRuntime()
      if (Module['onExit']) Module['onExit'](status)
      ABORT = true
    }
    quit_(status, new ExitStatus(status))
  }
  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function')
      Module['preInit'] = [Module['preInit']]
    while (Module['preInit'].length > 0) {
      Module['preInit'].pop()()
    }
  }
  var shouldRunNow = true
  if (Module['noInitialRun']) shouldRunNow = false

  run()
}
exports.run = run


/***/ }),

/***/ 526:
/***/ ((module, exports, __nested_webpack_require_394745__) => {

/* module decorator */ module = __nested_webpack_require_394745__.nmd(module);
const run = __nested_webpack_require_394745__(869).run
const util = __nested_webpack_require_394745__(891)

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
      arguments: ['-march=wasm32', 'a.ll', '-filetype=obj', '-o', './a.o'],
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


/***/ }),

/***/ 542:
/***/ ((module, exports, __nested_webpack_require_396519__) => {

/* module decorator */ module = __nested_webpack_require_396519__.nmd(module);
const run = __nested_webpack_require_396519__(242).run
const util = __nested_webpack_require_396519__(891)
let sysroot
function runLLD(code, staticPath) {
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
        // 'localhost:8000/assets/static/' + 'llc.wasm'
        return staticPath + path
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
    fetch(staticPath + 'sysroot.tar')
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


/***/ }),

/***/ 816:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_401327__) => {

const util = __nested_webpack_require_401327__(891)
const WASI = __nested_webpack_require_401327__(664)/* .WASI */ .xP
const WasmFs = __nested_webpack_require_401327__(325)/* .WasmFs */ .Y
const browserBindings = __nested_webpack_require_401327__(417)/* .default */ .Z

function runWasm(code) {
  return new Promise(async (resolve, reject) => {
    wasm = util.HexToUint8Array(code)
    let module = await WebAssembly.compile(wasm)
    let wasmFs = new WasmFs()
    let wasi = new WASI({
      bindings: {
        ...browserBindings,
        fs: wasmFs.fs,
      },
    })

    let instance = await WebAssembly.instantiate(module, {
      ...wasi.getImports(module),
    })

    wasi.start(instance)
    let stdout = await wasmFs.getStdOut()
    resolve(stdout)
  })
}

exports.runWasm = runWasm

function hello_world_wasm() {
  return (
    '0061736d010000000192818080001660037f7f7f017f60017f017f6000017f60017f0060000060027f7f017f60037f7e7f017e60027f7f0060047f7e7e7f0060057f7f7f7f7f017f60067f7c7f7f7f7f017f60027e7f017f60037f7f7f0060047f7f7f7f0060057f7f7f7f7f0060047f7f7f7f017f60077f7f7f7f7f7f7f017f60037e7f7f017f60017c017e60047f7f7e7f017e60027e7e017c60027c7f017c02d1808080000316776173695f736e617073686f745f70726576696577310866645f7772697465000f03656e7615656d736372697074656e5f6d656d6370795f626967000003656e760b73657454656d7052657430000303b3808080003204050201000106000100020005150808140303020401000009100c010d110b0b0e000a0712050103040202020301010113090485808080000170010606058680808000010180028002069380808000037f0141a098c0020b7f0141000b7f0141000b07e3818080000d066d656d6f72790200115f5f7761736d5f63616c6c5f63746f72730003046d61696e0004105f5f6572726e6f5f6c6f636174696f6e00050666666c757368003109737461636b53617665002e0c737461636b526573746f7265002f0a737461636b416c6c6f63003015656d736372697074656e5f737461636b5f696e6974002b19656d736372697074656e5f737461636b5f6765745f66726565002c18656d736372697074656e5f737461636b5f6765745f656e64002d195f5f696e6469726563745f66756e6374696f6e5f7461626c6501000c64796e43616c6c5f6a696a690034098b80808000010041010b0508070925260aafcf808000320400102b0b67010a7f2300210241102103200220036b210420042400410021052004200536020c200420003602082004200136020420042802042106200628020421072004200736020041800821082008200410281a410021094110210a2004200a6a210b200b240020090f0b050041b00f0b1500024020000d0041000f0b10052000360200417f0bd60201077f230041206b220324002003200028021c2204360210200028021421052003200236021c200320013602182003200520046b2201360214200120026a210641022107200341106a21010240024002400240200028023c200341106a41022003410c6a100010060d0003402006200328020c2204460d022004417f4c0d0320012004200128020422084b22054103746a2209200928020020042008410020051b6b22086a3602002001410c410420051b6a2209200928020020086b360200200620046b2106200028023c200141086a200120051b2201200720056b22072003410c6a10001006450d000b0b2006417f470d010b2000200028022c220136021c200020013602142000200120002802306a360210200221040c010b410021042000410036021c200042003703102000200028020041207236020020074102460d00200220012802046b21040b200341206a240020040b040041000b040042000bf20202037f017e02402002450d00200220006a2203417f6a20013a0000200020013a000020024103490d002003417e6a20013a0000200020013a00012003417d6a20013a0000200020013a000220024107490d002003417c6a20013a0000200020013a000320024109490d002000410020006b41037122046a2203200141ff017141818284086c22013602002003200220046b417c7122046a2202417c6a200136020020044109490d002003200136020820032001360204200241786a2001360200200241746a200136020020044119490d002003200136021820032001360214200320013602102003200136020c200241706a20013602002002416c6a2001360200200241686a2001360200200241646a20013602002004200341047141187222056b22024120490d002001ad4281808080107e2106200320056a2101034020012006370318200120063703102001200637030820012006370300200141206a2101200241606a2202411f4b0d000b0b20000b0a00200041506a410a490be70101027f200241004721030240024002402002450d002000410371450d00200141ff01712104034020002d00002004460d02200041016a21002002417f6a220241004721032002450d0120004103710d000b0b2003450d010b024020002d0000200141ff0171460d0020024104490d00200141ff017141818284086c2104034020002802002004732203417f73200341fffdfb776a71418081828478710d01200041046a21002002417c6a220241034b0d000b0b2002450d00200141ff017121030340024020002d00002003470d0020000f0b200041016a21002002417f6a22020d000b0b41000b050041cc0d0ba10201017f41012103024002402000450d00200141ff004d0d0102400240100d2802ac012802000d00200141807f714180bf03460d03100541193602000c010b0240200141ff0f4b0d0020002001413f71418001723a00012000200141067641c001723a000041020f0b0240024020014180b003490d002001418040714180c003470d010b20002001413f71418001723a000220002001410c7641e001723a000020002001410676413f71418001723a000141030f0b024020014180807c6a41ffff3f4b0d0020002001413f71418001723a00032000200141127641f001723a000020002001410676413f71418001723a000220002001410c76413f71418001723a000141040f0b100541193602000b417f21030b20030f0b200020013a000041010b1400024020000d0041000f0b200020014100100e0b8e0102017f017e02402000bd2203423488a741ff0f71220241ff0f460d00024020020d00024002402000440000000000000000620d00410021020c010b200044000000000000f043a2200110102100200128020041406a21020b2001200236020020000f0b200120024182786a360200200342ffffffffffffff87807f834280808080808080f03f84bf21000b20000b5301017e02400240200341c00071450d002001200341406aad862102420021010c010b2003450d00200141c00020036bad8820022003ad220486842102200120048621010b20002001370300200020023703080b5301017e02400240200341c00071450d002002200341406aad882101420021020c010b2003450d00200241c00020036bad8620012003ad220488842101200220048821020b20002001370300200020023703080be80302027f027e230041206b2202240002400240200142ffffffffffffffffff0083220442808080808080c0ff437c200442808080808080c080bc7f7c5a0d002000423c8820014204868421040240200042ffffffffffffffff0f83220042818080808080808008540d002004428180808080808080c0007c21050c020b2004428080808080808080c0007c2105200042808080808080808008854200520d01200520044201837c21050c010b0240200050200442808080808080c0ffff0054200442808080808080c0ffff00511b0d002000423c8820014204868442ffffffffffffff03834280808080808080fcff008421050c010b4280808080808080f8ff002105200442ffffffffffffbfffc300560d00420021052004423088a722034191f700490d00200241106a2000200142ffffffffffff3f8342808080808080c000842204200341ff887f6a10112002200020044181f80020036b101220022903002204423c88200241086a2903004204868421050240200442ffffffffffffffff0f832002290310200241106a41086a29030084420052ad84220442818080808080808008540d00200542017c21050c010b200442808080808080808008854200520d00200542018320057c21050b200241206a240020052001428080808080808080807f8384bf0b02000b02000b0a0041881810144190180b070041881810150b5c01017f200020002d004a2201417f6a2001723a004a024020002802002201410871450d0020002001412072360200417f0f0b200042003702042000200028022c220136021c200020013602142000200120002802306a36021041000b910401037f02402002418004490d0020002001200210011a20000f0b200020026a21030240024020012000734103710d0002400240200241014e0d00200021020c010b024020004103710d00200021020c010b200021020340200220012d00003a0000200141016a2101200241016a220220034f0d0120024103710d000b0b02402003417c71220441c000490d002002200441406a22054b0d0003402002200128020036020020022001280204360204200220012802083602082002200128020c36020c2002200128021036021020022001280214360214200220012802183602182002200128021c36021c2002200128022036022020022001280224360224200220012802283602282002200128022c36022c2002200128023036023020022001280234360234200220012802383602382002200128023c36023c200141c0006a2101200241c0006a220220054d0d000b0b200220044f0d01034020022001280200360200200141046a2101200241046a22022004490d000c020b000b0240200341044f0d00200021020c010b02402003417c6a220420004f0d00200021020c010b200021020340200220012d00003a0000200220012d00013a0001200220012d00023a0002200220012d00033a0003200141046a2101200241046a220220044d0d000b0b0240200220034f0d000340200220012d00003a0000200141016a2101200241016a22022003470d000b0b20000bcc0101037f02400240200228021022030d0041002104200210180d01200228021021030b02402003200228021422056b20014f0d0020022000200120022802241100000f0b0240024020022c004b41004e0d00410021030c010b2001210403400240200422030d00410021030c020b20002003417f6a22046a2d0000410a470d000b200220002003200228022411000022042003490d01200020036a2100200120036b2101200228021421050b20052000200110191a2002200228021420016a360214200320016a21040b20040b880301037f230041d0016b22052400200520023602cc0141002102200541a0016a41004128100a1a200520052802cc013602c8010240024041002001200541c8016a200541d0006a200541a0016a20032004101c41004e0d00417f21010c010b0240200028024c4100480d002000102921020b20002802002106024020002c004a41004a0d0020002006415f713602000b20064120712106024002402000280230450d0020002001200541c8016a200541d0006a200541a0016a20032004101c21010c010b200041d0003602302000200541d0006a3602102000200536021c20002005360214200028022c21072000200536022c20002001200541c8016a200541d0006a200541a0016a20032004101c21012007450d0020004100410020002802241100001a200041003602302000200736022c2000410036021c2000410036021020002802142103200041003602142001417f20031b21010b200020002802002203200672360200417f200120034120711b21012002450d002000102a0b200541d0016a240020010b8b12020f7f017e230041d0006b220724002007200136024c200741376a2108200741386a21094100210a4100210b41002101024003400240200b4100480d000240200141ffffffff07200b6b4c0d001005413d360200417f210b0c010b2001200b6a210b0b200728024c220c210102400240024002400240200c2d0000220d450d000340024002400240200d41ff0171220d0d002001210d0c010b200d4125470d012001210d034020012d00014125470d012007200141026a220e36024c200d41016a210d20012d0002210f200e2101200f4125460d000b0b200d200c6b210102402000450d002000200c2001101d0b20010d07200728024c2c0001100b2101200728024c210d024002402001450d00200d2d00024124470d00200d41036a2101200d2c000141506a21104101210a0c010b200d41016a2101417f21100b2007200136024c410021110240024020012c0000220f41606a220e411f4d0d002001210d0c010b410021112001210d4101200e74220e4189d10471450d0003402007200141016a220d36024c200e201172211120012c0001220f41606a220e41204f0d01200d21014101200e74220e4189d104710d000b0b02400240200f412a470d0002400240200d2c0001100b450d00200728024c220d2d00024124470d00200d2c000141027420046a41c07e6a410a360200200d41036a2101200d2c000141037420036a41807d6a28020021124101210a0c010b200a0d064100210a4100211202402000450d0020022002280200220141046a360200200128020021120b200728024c41016a21010b2007200136024c2012417f4a0d01410020126b211220114180c0007221110c010b200741cc006a101e22124100480d04200728024c21010b417f2113024020012d0000412e470d00024020012d0001412a470d00024020012c0002100b450d00200728024c22012d00034124470d0020012c000241027420046a41c07e6a410a36020020012c000241037420036a41807d6a28020021132007200141046a220136024c0c020b200a0d050240024020000d00410021130c010b20022002280200220141046a360200200128020021130b2007200728024c41026a220136024c0c010b2007200141016a36024c200741cc006a101e2113200728024c21010b4100210d0340200d210e417f211420012c000041bf7f6a41394b0d092007200141016a220f36024c20012c0000210d200f2101200d200e413a6c6a41ef076a2d0000220d417f' +
    '6a4108490d000b024002400240200d4113460d00200d450d0b024020104100480d00200420104102746a200d3602002007200320104103746a2903003703400c020b2000450d09200741c0006a200d20022006101f200728024c210f0c020b417f21142010417f4a0d0a0b410021012000450d080b201141ffff7b712215201120114180c000711b210d410021144190082110200921110240024002400240024002400240024002400240024002400240024002400240200f417f6a2c00002201415f7120012001410f714103461b2001200e1b220141a87f6a0e210415151515151515150e150f060e0e0e1506151515150205031515091501151504000b200921110240200141bf7f6a0e070e150b150e0e0e000b200141d300460d090c130b410021144190082110200729034021160c050b410021010240024002400240024002400240200e41ff01710e0800010203041b05061b0b2007280240200b3602000c1a0b2007280240200b3602000c190b2007280240200bac3703000c180b2007280240200b3b01000c170b2007280240200b3a00000c160b2007280240200b3602000c150b2007280240200bac3703000c140b20134108201341084b1b2113200d410872210d41f80021010b4100211441900821102007290340200920014120711020210c200d410871450d032007290340500d0320014104764190086a2110410221140c030b410021144190082110200729034020091021210c200d410871450d0220132009200c6b220141016a201320014a1b21130c020b024020072903402216427f550d002007420020167d22163703404101211441900821100c010b0240200d41801071450d004101211441910821100c010b419208419008200d41017122141b21100b201620091022210c0b200d41ffff7b71200d2013417f4a1b210d20072903402116024020130d00201650450d00410021132009210c0c0c0b20132009200c6b2016506a2201201320014a1b21130c0b0b4100211420072802402201419a0820011b220c41002013100c2201200c20136a20011b21112015210d2001200c6b201320011b21130c0b0b02402013450d002007280240210e0c020b410021012000412020124100200d10230c020b2007410036020c200720072903403e02082007200741086a360240417f2113200741086a210e0b4100210102400340200e280200220f450d010240200741046a200f100f220f410048220c0d00200f201320016b4b0d00200e41046a210e2013200f20016a22014b0d010c020b0b417f2114200c0d0c0b2000412020122001200d1023024020010d00410021010c010b4100210e2007280240210f0340200f280200220c450d01200741046a200c100f220c200e6a220e20014a0d012000200741046a200c101d200f41046a210f200e2001490d000b0b2000412020122001200d4180c00073102320122001201220014a1b21010c090b200020072b034020122013200d20012005110a0021010c080b200720072903403c0037410121132008210c200921112015210d0c050b2007200141016a220e36024c20012d0001210d200e21010c000b000b200b211420000d05200a450d034101210102400340200420014102746a280200220d450d01200320014103746a200d20022006101f41012114200141016a2201410a470d000c070b000b410121142001410a4f0d050340200420014102746a2802000d0141012114200141016a2201410a460d060c000b000b417f21140c040b200921110b2000412020142011200c6b220f20132013200f481b22116a220e20122012200e481b2201200e200d1023200020102014101d200041302001200e200d41808004731023200041302011200f410010232000200c200f101d200041202001200e200d4180c0007310230c010b0b410021140b200741d0006a240020140b1800024020002d00004120710d00200120022000101a1a0b0b4901037f41002101024020002802002c0000100b450d000340200028020022022c000021032000200241016a36020020032001410a6c6a41506a210120022c0001100b0d000b0b20010bbb02000240200141144b0d000240024002400240024002400240024002400240200141776a0e0a000102030405060708090a0b20022002280200220141046a360200200020012802003602000f0b20022002280200220141046a360200200020013402003703000f0b20022002280200220141046a360200200020013502003703000f0b2002200228020041076a417871220141086a360200200020012903003703000f0b20022002280200220141046a360200200020013201003703000f0b20022002280200220141046a360200200020013301003703000f0b20022002280200220141046a360200200020013000003703000f0b20022002280200220141046a360200200020013100003703000f0b2002200228020041076a417871220141086a360200200020012b03003903000f0b2000200220031107000b0b350002402000500d0003402001417f6a22012000a7410f7141800c6a2d00002002723a0000200042048822004200520d000b0b20010b2e0002402000500d0003402001417f6a22012000a74107714130723a0000200042038822004200520d000b0b20010b880102037f017e0240024020004280808080105a0d00200021050c010b03402001417f6a220120002000420a802205420a7e7da74130723a0000200042ffffffff9f015621022005210020020d000b0b02402005a72202450d0003402001417f6a220120022002410a6e2203410a6c6b4130723a0000200241094b21042003210220040d000b0b20010b7001017f23004180026b220524000240200220034c0d0020044180c004710d002005200141ff0171200220036b220241800220024180024922031b100a1a024020030d00034020002005418002101d200241807e6a220241ff014b0d000b0b200020052002101d0b20054180026a24000b0e0020002001200241044105101b0b8a1803127f027e017c230041b0046b22062400410021072006410036022c02400240200110272218427f550d004101210841900c210920019a2201102721180c010b410121080240200441801071450d0041930c21090c010b41960c210920044101710d00410021084101210741910c21090b0240024020184280808080808080f8ff00834280808080808080f8ff00520d00200041202002200841036a220a200441ffff7b711023200020092008101d200041ab0c41af0c2005412071220b1b41a30c41a70c200b1b20012001621b4103101d200041202002200a20044180c0007310230c010b200641106a210c024002400240024020012006412c6a101022012001a02201440000000000000000610d002006200628022c220b417f6a36022c2005412072220d41e100470d010c030b2005412072220d41e100460d024106200320034100481b210e200628022c210f0c010b2006200b41636a220f36022c4106200320034100481b210e200144000000000000b041a221010b200641306a200641d0026a200f4100481b22102111034002400240200144000000000000f0416320014400000000000000006671450d002001ab210b0c010b4100210b0b2011200b360200201141046a21112001200bb8a1440000000065cdcd41a22201440000000000000000620d000b02400240200f41014e0d00200f21032011210b201021120c010b20102112200f210303402003411d2003411d481b210302402011417c6a220b2012490d002003ad2119420021180340200b200b350200201986201842ffffffff0f837c22182018428094ebdc03802218428094ebdc037e7d3e0200200b417c6a220b20124f0d000b2018a7220b450d002012417c6a2212200b3602000b024003402011220b20124d0d01200b417c6a2211280200450d000b0b2006200628022c20036b220336022c200b2111200341004a0d000b0b02402003417f4a0d00200e41196a41096d41016a2113200d41e60046211403404109410020036b20034177481b210a024002402012200b490d002012201241046a20122802001b21120c010b418094ebdc03200a762115417f200a74417f73211641002103201221110340201120112802002217200a7620036a360200201720167120156c2103201141046a2211200b490d000b2012201241046a20122802001b21122003450d00200b2003360200200b41046a210b0b2006200628022c200a6a220336022c2010201220141b221120134102746a200b200b20116b41027520134a1b210b20034100480d000b0b4100211102402012200b4f0d00201020126b41027541096c2111410a210320122802002217410a490d000340201141016a211120172003410a6c22034f0d000b0b0240200e41002011200d41e600461b6b200e410047200d41e70046716b2203200b20106b41027541096c41776a4e0d0020034180c8006a221741096d2215410274200641306a410472200641d4026a200f4100481b6a4180606a210a410a210302402017201541096c6b221741074a0d0003402003410a6c2103201741016a22174108470d000b0b200a2802002215201520036e221620036c6b211702400240200a41046a2213200b470d002017450d010b44000000000000e03f44000000000000f03f44000000000000f83f201720034101762214461b44000000000000f83f2013200b461b20172014491b211a44010000000000404344000000000000404320164101711b2101024020070d0020092d0000412d470d00201a9a211a20019a21010b200a201520176b22173602002001201aa02001610d00200a201720036a221136020002402011418094ebdc03490d000340200a41003602000240200a417c6a220a20124f0d002012417c6a221241003602000b200a200a28020041016a2211360200201141ff93ebdc034b0d000b0b201020126b41027541096c2111410a210320122802002217410a490d000340201141016a211120172003410a6c22034f0d000b0b200a41046a2203200b200b20034b1b210b0b02400340200b220320124d22170d012003417c6a220b280200450d000b0b02400240200d41e700460d00200441087121160c010b2011417f73417f200e4101200e1b220b20114a2011417b4a71220a1b200b6a210e417f417e200a1b20056a2105200441087122160d004177210b024020170d002003417c6a280200220a450d00410a21174100210b200a410a700d000340200b221541016a210b200a2017410a6c221770450d000b2015417f73210b0b200320106b41027541096c211702402005415f7141c600470d0041002116200e2017200b6a41776a220b4100200b41004a1b220b200e200b481b210e0c010b41002116200e201120176a200b6a41776a220b4100200b41004a1b220b200e200b481b210e0b200e20167222144100472117024002402005415f71221541c600470d0020114100201141004a1b210b0c010b0240200c20112011411f75220b6a200b73ad200c1022220b6b41014a0d000340200b417f6a220b41303a0000200c200b6b4102480d000b0b200b417e6a221320053a0000200b417f6a412d412b20114100481b3a0000200c20136b210b0b2000412020022008200e6a20176a200b6a41016a220a20041023200020092008101d200041302002200a2004418080047310230240024002400240201541c600470d00200641106a4108722115200641106a410972211120102012201220104b1b221721120340201235020020111022210b0240024020122017460d00200b200641106a4d0d010340200b417f6a220b41303a0000200b200641106a4b0d000c020b000b200b2011470d00200641303a00182015210b0b2000200b2011200b6b101d201241046a221220104d0d000b02402014450d00200041b30c4101101d0b201220034f0d01200e4101480d0103400240201235020020111022220b200641106a4d0d000340200b417f6a220b41303a0000200b200641106a4b0d000b0b2000200b200e4109200e4109481b101d200e41776a210b201241046a221220034f0d03200e41094a2117200b210e20170d000c030b000b0240200e4100480d002003201241046a200320124b1b2115200641106a4108722110200641106a41097221032012211103400240201135020020031022220b2003470d00200641303a00182010210b0b0240024020112012460d00200b200641106a4d0d010340200b417f6a220b41303a0000200b200641106a4b0d000c020b000b2000200b4101101d200b41016a210b024020160d00200e4101480d010b200041b30c4101101d0b2000200b2003200b6b2217200e200e20174a1b101d200e20176b210e201141046a221120154f0d01200e417f4a0d000b0b20004130200e41126a41124100102320002013200c20136b101d0c020b200e210b0b20004130200b41096a4109410010230b200041202002200a20044180c0007310230c010b200941096a2009200541207122111b210e02402003410b4b0d00410c20036b220b450d00440000000000002040211a0340201a440000000000003040a2211a200b417f6a220b0d000b0240200e2d0000412d470d00201a20019a201aa1a09a21010c010b2001201aa0201aa121010b0240200628022c220b200b411f75220b6a200b73ad200c1022220b200c470d00200641303a000f2006410f6a210b0b20084102722116200628022c2112200b417e6a22152005410f6a3a0000200b417f6a412d412b20124100481b3a000020044108712117200641106a211203402012210b0240024020019944000000000000e04163450d002001aa21120c010b41808080807821120b200b201241800c6a2d00002011723a000020012012' +
    'b7a1440000000000003040a221010240200b41016a2212200641106a6b4101470d00024020170d00200341004a0d002001440000000000000000610d010b200b412e3a0001200b41026a21120b2001440000000000000000620d000b024002402003450d002012200641106a6b417e6a20034e0d002003200c6a20156b41026a210b0c010b200c200641106a6b20156b20126a210b0b200041202002200b20166a220a200410232000200e2016101d200041302002200a2004418080047310232000200641106a2012200641106a6b2212101d20004130200b2012200c20156b22116a6b410041001023200020152011101d200041202002200a20044180c0007310230b200641b0046a24002002200a200a2002481b0b2a01017f20012001280200410f6a417071220241106a36020020002002290300200229030810133903000b05002000bd0b2b01017f230041106b220224002002200136020c410028028c082000200110242101200241106a240020010b040041010b02000b140041a098c0022402419418410f6a41707124010b0700230023016b0b040023010b040023000b0600200024000b1201027f230020006b4170712201240020010bac0101027f024002402000450d000240200028024c417f4a0d00200010320f0b2000102921012000103221022001450d012000102a20020f0b41002102024041002802c80d450d0041002802c80d103121020b024010162802002200450d000340410021010240200028024c4100480d002000102921010b02402000280214200028021c4d0d002000103220027221020b02402001450d002000102a0b200028023822000d000b0b10170b20020b6b01027f02402000280214200028021c4d0d0020004100410020002802241100001a20002802140d00417f0f0b024020002802042201200028020822024f0d002000200120026bac410120002802281106001a0b2000410036021c200042003703102000420037020441000b0d0020012002200320001106000b2301017e200020012002ad2003ad422086842004103321052005422088a710022005a70b0bbc8780800002004180080bb50448656c6c6f2c202573210a00380600002d2b2020203058307800286e756c6c290000000000000000000000000000000011000a00111111000000000500000000000009000000000b000000000000000011000f0a111111030a07000100090b0b000009060b00000b000611000000111111000000000000000000000000000000000b000000000000000011000a0a111111000a00000200090b00000009000b00000b000000000000000000000000000000000000000000000000000c00000000000000000000000c000000000c00000000090c00000000000c00000c000000000000000000000000000000000000000000000000000e00000000000000000000000d000000040d00000000090e00000000000e00000e000000000000000000000000000000000000000000000000001000000000000000000000000f000000000f00000000091000000000001000001000001200000012121200000000000000000000000000000000000000000000000000120000001212120000000000000900000000000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000a000000000a00000000090b00000000000b00000b000000000000000000000000000000000000000000000000000c00000000000000000000000c000000000c00000000090c00000000000c00000c0000303132333435363738394142434445462d30582b30582030582d30782b307820307800696e6600494e46006e616e004e414e002e000041b80c0bf8020500000000000000000000000100000000000000000000000000000000000000000000000200000003000000c80700000004000000000000000000000100000000000000000000000000000affffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003806000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f00b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  )
}


/***/ }),

/***/ 891:
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_425703__) => {

"use strict";
__nested_webpack_require_425703__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_425703__.d(__webpack_exports__, {
/* harmony export */   "Uint8ArrayToBase64": () => (/* binding */ Uint8ArrayToBase64),
/* harmony export */   "Base64ToUint8Array": () => (/* binding */ Base64ToUint8Array),
/* harmony export */   "Base64ToArrayBuffer": () => (/* binding */ Base64ToArrayBuffer),
/* harmony export */   "saveBlob": () => (/* binding */ saveBlob),
/* harmony export */   "Uint8ArrayToHex": () => (/* binding */ Uint8ArrayToHex),
/* harmony export */   "HexToUint8Array": () => (/* binding */ HexToUint8Array)
/* harmony export */ });
function Uint8ArrayToBase64(u8) {
  const utf8decoder = new TextDecoder()
  return btoa(utf8decoder.decode(u8))
}

function Base64ToUint8Array(str) {
  return new Uint8Array(
    atob(str)
      .split('')
      .map(function (c) {
        return c.charCodeAt(0)
      })
  )
}

function Base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

var saveBlob = (function () {
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  return function (blob, fileName) {
    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
})()

function Uint8ArrayToHex(uint8arr) {
  if (!uint8arr) {
    return ''
  }

  var hexStr = ''
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16)
    hex = hex.length === 1 ? '0' + hex : hex
    hexStr += hex
  }

  return hexStr.toUpperCase()
}

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


/***/ }),

/***/ 664:
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_427807__) => {

"use strict";
/* harmony export */ __nested_webpack_require_427807__.d(__webpack_exports__, {
/* harmony export */   "xP": () => (/* binding */ dc)
/* harmony export */ });
/* unused harmony exports WASIError, WASIExitError, WASIKillError */
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
      : 'undefined' !== typeof __nested_webpack_require_427807__.g
      ? __nested_webpack_require_427807__.g
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
    'undefined' !== typeof __nested_webpack_require_427807__.g
      ? __nested_webpack_require_427807__.g
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
      : 'undefined' !== typeof __nested_webpack_require_427807__.g
      ? __nested_webpack_require_427807__.g
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
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (0)));



/***/ }),

/***/ 325:
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_506004__) => {

"use strict";
/* harmony export */ __nested_webpack_require_506004__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ sf)
/* harmony export */ });
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
**************************************************************************** https://mths.be/punycode v1.4.1 by @mathias */
function ba(a, b, c, d) {
  return new (c || (c = Promise))(function (e, f) {
    function g(a) {
      try {
        k(d.next(a))
      } catch (n) {
        f(n)
      }
    }
    function h(a) {
      try {
        k(d['throw'](a))
      } catch (n) {
        f(n)
      }
    }
    function k(a) {
      a.done
        ? e(a.value)
        : new c(function (b) {
            b(a.value)
          }).then(g, h)
    }
    k((d = d.apply(a, b || [])).next())
  })
}
function ca(a, b) {
  function c(a) {
    return function (b) {
      return d([a, b])
    }
  }
  function d(c) {
    if (f) throw new TypeError('Generator is already executing.')
    for (; e; )
      try {
        if (
          ((f = 1),
          g &&
            (h =
              c[0] & 2
                ? g['return']
                : c[0]
                ? g['throw'] || ((h = g['return']) && h.call(g), 0)
                : g.next) &&
            !(h = h.call(g, c[1])).done)
        )
          return h
        if (((g = 0), h)) c = [c[0] & 2, h.value]
        switch (c[0]) {
          case 0:
          case 1:
            h = c
            break
          case 4:
            return e.label++, { value: c[1], done: !1 }
          case 5:
            e.label++
            g = c[1]
            c = [0]
            continue
          case 7:
            c = e.ops.pop()
            e.trys.pop()
            continue
          default:
            if (
              !((h = e.trys), (h = 0 < h.length && h[h.length - 1])) &&
              (6 === c[0] || 2 === c[0])
            ) {
              e = 0
              continue
            }
            if (3 === c[0] && (!h || (c[1] > h[0] && c[1] < h[3])))
              e.label = c[1]
            else if (6 === c[0] && e.label < h[1]) (e.label = h[1]), (h = c)
            else if (h && e.label < h[2]) (e.label = h[2]), e.ops.push(c)
            else {
              h[2] && e.ops.pop()
              e.trys.pop()
              continue
            }
        }
        c = b.call(a, e)
      } catch (n) {
        ;(c = [6, n]), (g = 0)
      } finally {
        f = h = 0
      }
    if (c[0] & 5) throw c[1]
    return { value: c[0] ? c[1] : void 0, done: !0 }
  }
  var e = {
      label: 0,
      sent: function () {
        if (h[0] & 1) throw h[1]
        return h[1]
      },
      trys: [],
      ops: [],
    },
    f,
    g,
    h,
    k
  return (
    (k = { next: c(0), throw: c(1), return: c(2) }),
    'function' === typeof Symbol &&
      (k[Symbol.iterator] = function () {
        return this
      }),
    k
  )
}
function da(a) {
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
function ea(a, b) {
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
function ia() {
  for (var a = [], b = 0; b < arguments.length; b++)
    a = a.concat(ea(arguments[b]))
  return a
}
var l =
  'undefined' !== typeof globalThis
    ? globalThis
    : 'undefined' !== typeof window
    ? window
    : 'undefined' !== typeof __nested_webpack_require_506004__.g
    ? __nested_webpack_require_506004__.g
    : 'undefined' !== typeof self
    ? self
    : {}
function t(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, 'default')
    ? a['default']
    : a
}
function u(a, b) {
  return (b = { exports: {} }), a(b, b.exports), b.exports
}
var w = u(function (a, b) {
  Object.defineProperty(b, '__esModule', { value: !0 })
  b.constants = {
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 64,
    O_EXCL: 128,
    O_NOCTTY: 256,
    O_TRUNC: 512,
    O_APPEND: 1024,
    O_DIRECTORY: 65536,
    O_NOATIME: 262144,
    O_NOFOLLOW: 131072,
    O_SYNC: 1052672,
    O_DIRECT: 16384,
    O_NONBLOCK: 2048,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    UV_FS_COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_EXCL: 1,
    COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE_FORCE: 4,
  }
})
t(w)
var ja = u(function (a, b) {
    b.default =
      'function' === typeof BigInt
        ? BigInt
        : function () {
            throw Error('BigInt is not supported in this environment.')
          }
  }),
  ka = u(function (a, b) {
    Object.defineProperty(b, '__esModule', { value: !0 })
    var c = w.constants.S_IFMT,
      d = w.constants.S_IFDIR,
      e = w.constants.S_IFREG,
      f = w.constants.S_IFBLK,
      g = w.constants.S_IFCHR,
      h = w.constants.S_IFLNK,
      k = w.constants.S_IFIFO,
      p = w.constants.S_IFSOCK
    a = (function () {
      function a() {}
      a.build = function (b, c) {
        void 0 === c && (c = !1)
        var d = new a(),
          e = b.gid,
          f = b.atime,
          g = b.mtime,
          h = b.ctime
        c = c
          ? ja.default
          : function (a) {
              return a
            }
        d.uid = c(b.uid)
        d.gid = c(e)
        d.rdev = c(0)
        d.blksize = c(4096)
        d.ino = c(b.ino)
        d.size = c(b.getSize())
        d.blocks = c(1)
        d.atime = f
        d.mtime = g
        d.ctime = h
        d.birthtime = h
        d.atimeMs = c(f.getTime())
        d.mtimeMs = c(g.getTime())
        e = c(h.getTime())
        d.ctimeMs = e
        d.birthtimeMs = e
        d.dev = c(0)
        d.mode = c(b.mode)
        d.nlink = c(b.nlink)
        return d
      }
      a.prototype._checkModeProperty = function (a) {
        return (Number(this.mode) & c) === a
      }
      a.prototype.isDirectory = function () {
        return this._checkModeProperty(d)
      }
      a.prototype.isFile = function () {
        return this._checkModeProperty(e)
      }
      a.prototype.isBlockDevice = function () {
        return this._checkModeProperty(f)
      }
      a.prototype.isCharacterDevice = function () {
        return this._checkModeProperty(g)
      }
      a.prototype.isSymbolicLink = function () {
        return this._checkModeProperty(h)
      }
      a.prototype.isFIFO = function () {
        return this._checkModeProperty(k)
      }
      a.prototype.isSocket = function () {
        return this._checkModeProperty(p)
      }
      return a
    })()
    b.Stats = a
    b.default = a
  })
t(ka)
var la =
    'undefined' !== typeof __nested_webpack_require_506004__.g
      ? __nested_webpack_require_506004__.g
      : 'undefined' !== typeof self
      ? self
      : 'undefined' !== typeof window
      ? window
      : {},
  x = [],
  y = [],
  ma = 'undefined' !== typeof Uint8Array ? Uint8Array : Array,
  oa = !1
function pa() {
  oa = !0
  for (var a = 0; 64 > a; ++a)
    (x[a] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[
      a
    ]),
      (y[
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charCodeAt(
          a
        )
      ] = a)
  y[45] = 62
  y[95] = 63
}
function qa(a, b, c) {
  for (var d = [], e = b; e < c; e += 3)
    (b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2]),
      d.push(
        x[(b >> 18) & 63] + x[(b >> 12) & 63] + x[(b >> 6) & 63] + x[b & 63]
      )
  return d.join('')
}
function ra(a) {
  oa || pa()
  for (
    var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c;
    f < g;
    f += 16383
  )
    e.push(qa(a, f, f + 16383 > g ? g : f + 16383))
  1 === c
    ? ((a = a[b - 1]), (d += x[a >> 2]), (d += x[(a << 4) & 63]), (d += '=='))
    : 2 === c &&
      ((a = (a[b - 2] << 8) + a[b - 1]),
      (d += x[a >> 10]),
      (d += x[(a >> 4) & 63]),
      (d += x[(a << 2) & 63]),
      (d += '='))
  e.push(d)
  return e.join('')
}
function sa(a, b, c, d, e) {
  var f = 8 * e - d - 1
  var g = (1 << f) - 1,
    h = g >> 1,
    k = -7
  e = c ? e - 1 : 0
  var p = c ? -1 : 1,
    n = a[b + e]
  e += p
  c = n & ((1 << -k) - 1)
  n >>= -k
  for (k += f; 0 < k; c = 256 * c + a[b + e], e += p, k -= 8);
  f = c & ((1 << -k) - 1)
  c >>= -k
  for (k += d; 0 < k; f = 256 * f + a[b + e], e += p, k -= 8);
  if (0 === c) c = 1 - h
  else {
    if (c === g) return f ? NaN : Infinity * (n ? -1 : 1)
    f += Math.pow(2, d)
    c -= h
  }
  return (n ? -1 : 1) * f * Math.pow(2, c - d)
}
function ta(a, b, c, d, e, f) {
  var g,
    h = 8 * f - e - 1,
    k = (1 << h) - 1,
    p = k >> 1,
    n = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0
  f = d ? 0 : f - 1
  var q = d ? 1 : -1,
    B = 0 > b || (0 === b && 0 > 1 / b) ? 1 : 0
  b = Math.abs(b)
  isNaN(b) || Infinity === b
    ? ((b = isNaN(b) ? 1 : 0), (d = k))
    : ((d = Math.floor(Math.log(b) / Math.LN2)),
      1 > b * (g = Math.pow(2, -d)) && (d--, (g *= 2)),
      (b = 1 <= d + p ? b + n / g : b + n * Math.pow(2, 1 - p)),
      2 <= b * g && (d++, (g /= 2)),
      d + p >= k
        ? ((b = 0), (d = k))
        : 1 <= d + p
        ? ((b = (b * g - 1) * Math.pow(2, e)), (d += p))
        : ((b = b * Math.pow(2, p - 1) * Math.pow(2, e)), (d = 0)))
  for (; 8 <= e; a[c + f] = b & 255, f += q, b /= 256, e -= 8);
  d = (d << e) | b
  for (h += e; 0 < h; a[c + f] = d & 255, f += q, d /= 256, h -= 8);
  a[c + f - q] |= 128 * B
}
var wa = {}.toString,
  ya =
    Array.isArray ||
    function (a) {
      return '[object Array]' == wa.call(a)
    }
z.TYPED_ARRAY_SUPPORT =
  void 0 !== la.TYPED_ARRAY_SUPPORT ? la.TYPED_ARRAY_SUPPORT : !0
var za = z.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
function Aa(a, b) {
  if ((z.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
    throw new RangeError('Invalid typed array length')
  z.TYPED_ARRAY_SUPPORT
    ? ((a = new Uint8Array(b)), (a.__proto__ = z.prototype))
    : (null === a && (a = new z(b)), (a.length = b))
  return a
}
function z(a, b, c) {
  if (!(z.TYPED_ARRAY_SUPPORT || this instanceof z)) return new z(a, b, c)
  if ('number' === typeof a) {
    if ('string' === typeof b)
      throw Error(
        'If encoding is specified then the first argument must be a string'
      )
    return Ba(this, a)
  }
  return Ca(this, a, b, c)
}
z.poolSize = 8192
z._augment = function (a) {
  a.__proto__ = z.prototype
  return a
}
function Ca(a, b, c, d) {
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
    z.TYPED_ARRAY_SUPPORT
      ? ((a = b), (a.__proto__ = z.prototype))
      : (a = Da(a, b))
    return a
  }
  if ('string' === typeof b) {
    d = a
    a = c
    if ('string' !== typeof a || '' === a) a = 'utf8'
    if (!z.isEncoding(a))
      throw new TypeError('"encoding" must be a valid string encoding')
    c = Ea(b, a) | 0
    d = Aa(d, c)
    b = d.write(b, a)
    b !== c && (d = d.slice(0, b))
    return d
  }
  return Fa(a, b)
}
z.from = function (a, b, c) {
  return Ca(null, a, b, c)
}
z.TYPED_ARRAY_SUPPORT &&
  ((z.prototype.__proto__ = Uint8Array.prototype), (z.__proto__ = Uint8Array))
function Ga(a) {
  if ('number' !== typeof a)
    throw new TypeError('"size" argument must be a number')
  if (0 > a) throw new RangeError('"size" argument must not be negative')
}
z.alloc = function (a, b, c) {
  Ga(a)
  a =
    0 >= a
      ? Aa(null, a)
      : void 0 !== b
      ? 'string' === typeof c
        ? Aa(null, a).fill(b, c)
        : Aa(null, a).fill(b)
      : Aa(null, a)
  return a
}
function Ba(a, b) {
  Ga(b)
  a = Aa(a, 0 > b ? 0 : Ma(b) | 0)
  if (!z.TYPED_ARRAY_SUPPORT) for (var c = 0; c < b; ++c) a[c] = 0
  return a
}
z.allocUnsafe = function (a) {
  return Ba(null, a)
}
z.allocUnsafeSlow = function (a) {
  return Ba(null, a)
}
function Da(a, b) {
  var c = 0 > b.length ? 0 : Ma(b.length) | 0
  a = Aa(a, c)
  for (var d = 0; d < c; d += 1) a[d] = b[d] & 255
  return a
}
function Fa(a, b) {
  if (A(b)) {
    var c = Ma(b.length) | 0
    a = Aa(a, c)
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
        c ? Aa(a, 0) : Da(a, b)
      )
    if ('Buffer' === b.type && ya(b.data)) return Da(a, b.data)
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
  )
}
function Ma(a) {
  if (a >= (z.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        (z.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
        ' bytes'
    )
  return a | 0
}
z.isBuffer = Na
function A(a) {
  return !(null == a || !a._isBuffer)
}
z.compare = function (a, b) {
  if (!A(a) || !A(b)) throw new TypeError('Arguments must be Buffers')
  if (a === b) return 0
  for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
    if (a[e] !== b[e]) {
      c = a[e]
      d = b[e]
      break
    }
  return c < d ? -1 : d < c ? 1 : 0
}
z.isEncoding = function (a) {
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
z.concat = function (a, b) {
  if (!ya(a)) throw new TypeError('"list" argument must be an Array of Buffers')
  if (0 === a.length) return z.alloc(0)
  var c
  if (void 0 === b) for (c = b = 0; c < a.length; ++c) b += a[c].length
  b = z.allocUnsafe(b)
  var d = 0
  for (c = 0; c < a.length; ++c) {
    var e = a[c]
    if (!A(e))
      throw new TypeError('"list" argument must be an Array of Buffers')
    e.copy(b, d)
    d += e.length
  }
  return b
}
function Ea(a, b) {
  if (A(a)) return a.length
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
        return Oa(a).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 2 * c
      case 'hex':
        return c >>> 1
      case 'base64':
        return Pa(a).length
      default:
        if (d) return Oa(a).length
        b = ('' + b).toLowerCase()
        d = !0
    }
}
z.byteLength = Ea
function Qa(a, b, c) {
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
        return Ra(this, b, c)
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
          (b = 0 === b && c === this.length ? ra(this) : ra(this.slice(b, c))),
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
z.prototype._isBuffer = !0
function Sa(a, b, c) {
  var d = a[b]
  a[b] = a[c]
  a[c] = d
}
z.prototype.swap16 = function () {
  var a = this.length
  if (0 !== a % 2)
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  for (var b = 0; b < a; b += 2) Sa(this, b, b + 1)
  return this
}
z.prototype.swap32 = function () {
  var a = this.length
  if (0 !== a % 4)
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  for (var b = 0; b < a; b += 4) Sa(this, b, b + 3), Sa(this, b + 1, b + 2)
  return this
}
z.prototype.swap64 = function () {
  var a = this.length
  if (0 !== a % 8)
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  for (var b = 0; b < a; b += 8)
    Sa(this, b, b + 7),
      Sa(this, b + 1, b + 6),
      Sa(this, b + 2, b + 5),
      Sa(this, b + 3, b + 4)
  return this
}
z.prototype.toString = function () {
  var a = this.length | 0
  return 0 === a
    ? ''
    : 0 === arguments.length
    ? Ra(this, 0, a)
    : Qa.apply(this, arguments)
}
z.prototype.equals = function (a) {
  if (!A(a)) throw new TypeError('Argument must be a Buffer')
  return this === a ? !0 : 0 === z.compare(this, a)
}
z.prototype.inspect = function () {
  var a = ''
  0 < this.length &&
    ((a = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
    50 < this.length && (a += ' ... '))
  return '<Buffer ' + a + '>'
}
z.prototype.compare = function (a, b, c, d, e) {
  if (!A(a)) throw new TypeError('Argument must be a Buffer')
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
function Ta(a, b, c, d, e) {
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
  'string' === typeof b && (b = z.from(b, d))
  if (A(b)) return 0 === b.length ? -1 : Ua(a, b, c, d, e)
  if ('number' === typeof b)
    return (
      (b &= 255),
      z.TYPED_ARRAY_SUPPORT &&
      'function' === typeof Uint8Array.prototype.indexOf
        ? e
          ? Uint8Array.prototype.indexOf.call(a, b, c)
          : Uint8Array.prototype.lastIndexOf.call(a, b, c)
        : Ua(a, [b], c, d, e)
    )
  throw new TypeError('val must be string, number or Buffer')
}
function Ua(a, b, c, d, e) {
  function f(a, b) {
    return 1 === g ? a[b] : a.readUInt16BE(b * g)
  }
  var g = 1,
    h = a.length,
    k = b.length
  if (
    void 0 !== d &&
    ((d = String(d).toLowerCase()),
    'ucs2' === d || 'ucs-2' === d || 'utf16le' === d || 'utf-16le' === d)
  ) {
    if (2 > a.length || 2 > b.length) return -1
    g = 2
    h /= 2
    k /= 2
    c /= 2
  }
  if (e)
    for (d = -1; c < h; c++)
      if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
        if ((-1 === d && (d = c), c - d + 1 === k)) return d * g
      } else -1 !== d && (c -= c - d), (d = -1)
  else
    for (c + k > h && (c = h - k); 0 <= c; c--) {
      h = !0
      for (d = 0; d < k; d++)
        if (f(a, c + d) !== f(b, d)) {
          h = !1
          break
        }
      if (h) return c
    }
  return -1
}
z.prototype.includes = function (a, b, c) {
  return -1 !== this.indexOf(a, b, c)
}
z.prototype.indexOf = function (a, b, c) {
  return Ta(this, a, b, c, !0)
}
z.prototype.lastIndexOf = function (a, b, c) {
  return Ta(this, a, b, c, !1)
}
z.prototype.write = function (a, b, c, d) {
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
        return Va(Oa(a, this.length - b), this, b, c)
      case 'ascii':
        return Va(Wa(a), this, b, c)
      case 'latin1':
      case 'binary':
        return Va(Wa(a), this, b, c)
      case 'base64':
        return Va(Pa(a), this, b, c)
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
        return Va(f, this, b, c)
      default:
        if (e) throw new TypeError('Unknown encoding: ' + d)
        d = ('' + d).toLowerCase()
        e = !0
    }
}
z.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0),
  }
}
function Ra(a, b, c) {
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
          var k = a[b + 2]
          128 === (h & 192) &&
            128 === (k & 192) &&
            ((e = ((e & 15) << 12) | ((h & 63) << 6) | (k & 63)),
            2047 < e && (55296 > e || 57343 < e) && (f = e))
          break
        case 4:
          h = a[b + 1]
          k = a[b + 2]
          var p = a[b + 3]
          128 === (h & 192) &&
            128 === (k & 192) &&
            128 === (p & 192) &&
            ((e =
              ((e & 15) << 18) | ((h & 63) << 12) | ((k & 63) << 6) | (p & 63)),
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
  if (a <= ab) d = String.fromCharCode.apply(String, d)
  else {
    c = ''
    for (b = 0; b < a; )
      c += String.fromCharCode.apply(String, d.slice(b, (b += ab)))
    d = c
  }
  return d
}
var ab = 4096
z.prototype.slice = function (a, b) {
  var c = this.length
  a = ~~a
  b = void 0 === b ? c : ~~b
  0 > a ? ((a += c), 0 > a && (a = 0)) : a > c && (a = c)
  0 > b ? ((b += c), 0 > b && (b = 0)) : b > c && (b = c)
  b < a && (b = a)
  if (z.TYPED_ARRAY_SUPPORT)
    (b = this.subarray(a, b)), (b.__proto__ = z.prototype)
  else {
    c = b - a
    b = new z(c, void 0)
    for (var d = 0; d < c; ++d) b[d] = this[d + a]
  }
  return b
}
function C(a, b, c) {
  if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint')
  if (a + b > c) throw new RangeError('Trying to access beyond buffer length')
}
z.prototype.readUIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  return c
}
z.prototype.readUIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a + --b]
  for (var d = 1; 0 < b && (d *= 256); ) c += this[a + --b] * d
  return c
}
z.prototype.readUInt8 = function (a, b) {
  b || C(a, 1, this.length)
  return this[a]
}
z.prototype.readUInt16LE = function (a, b) {
  b || C(a, 2, this.length)
  return this[a] | (this[a + 1] << 8)
}
z.prototype.readUInt16BE = function (a, b) {
  b || C(a, 2, this.length)
  return (this[a] << 8) | this[a + 1]
}
z.prototype.readUInt32LE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    (this[a] | (this[a + 1] << 8) | (this[a + 2] << 16)) +
    16777216 * this[a + 3]
  )
}
z.prototype.readUInt32BE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    16777216 * this[a] +
    ((this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3])
  )
}
z.prototype.readIntLE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = this[a]
  for (var d = 1, e = 0; ++e < b && (d *= 256); ) c += this[a + e] * d
  c >= 128 * d && (c -= Math.pow(2, 8 * b))
  return c
}
z.prototype.readIntBE = function (a, b, c) {
  a |= 0
  b |= 0
  c || C(a, b, this.length)
  c = b
  for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256); )
    e += this[a + --c] * d
  e >= 128 * d && (e -= Math.pow(2, 8 * b))
  return e
}
z.prototype.readInt8 = function (a, b) {
  b || C(a, 1, this.length)
  return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
}
z.prototype.readInt16LE = function (a, b) {
  b || C(a, 2, this.length)
  a = this[a] | (this[a + 1] << 8)
  return a & 32768 ? a | 4294901760 : a
}
z.prototype.readInt16BE = function (a, b) {
  b || C(a, 2, this.length)
  a = this[a + 1] | (this[a] << 8)
  return a & 32768 ? a | 4294901760 : a
}
z.prototype.readInt32LE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    this[a] | (this[a + 1] << 8) | (this[a + 2] << 16) | (this[a + 3] << 24)
  )
}
z.prototype.readInt32BE = function (a, b) {
  b || C(a, 4, this.length)
  return (
    (this[a] << 24) | (this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3]
  )
}
z.prototype.readFloatLE = function (a, b) {
  b || C(a, 4, this.length)
  return sa(this, a, !0, 23, 4)
}
z.prototype.readFloatBE = function (a, b) {
  b || C(a, 4, this.length)
  return sa(this, a, !1, 23, 4)
}
z.prototype.readDoubleLE = function (a, b) {
  b || C(a, 8, this.length)
  return sa(this, a, !0, 52, 8)
}
z.prototype.readDoubleBE = function (a, b) {
  b || C(a, 8, this.length)
  return sa(this, a, !1, 52, 8)
}
function E(a, b, c, d, e, f) {
  if (!A(a)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (b > e || b < f) throw new RangeError('"value" argument is out of bounds')
  if (c + d > a.length) throw new RangeError('Index out of range')
}
z.prototype.writeUIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || E(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = 1
  var e = 0
  for (this[b] = a & 255; ++e < c && (d *= 256); ) this[b + e] = (a / d) & 255
  return b + c
}
z.prototype.writeUIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  c |= 0
  d || E(this, a, b, c, Math.pow(2, 8 * c) - 1, 0)
  d = c - 1
  var e = 1
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    this[b + d] = (a / e) & 255
  return b + c
}
z.prototype.writeUInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 1, 255, 0)
  z.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  this[b] = a & 255
  return b + 1
}
function bb(a, b, c, d) {
  0 > b && (b = 65535 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
    a[c + e] = (b & (255 << (8 * (d ? e : 1 - e)))) >>> (8 * (d ? e : 1 - e))
}
z.prototype.writeUInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 2, 65535, 0)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : bb(this, a, b, !0)
  return b + 2
}
z.prototype.writeUInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 2, 65535, 0)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : bb(this, a, b, !1)
  return b + 2
}
function cb(a, b, c, d) {
  0 > b && (b = 4294967295 + b + 1)
  for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
    a[c + e] = (b >>> (8 * (d ? e : 3 - e))) & 255
}
z.prototype.writeUInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 4, 4294967295, 0)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b + 3] = a >>> 24),
      (this[b + 2] = a >>> 16),
      (this[b + 1] = a >>> 8),
      (this[b] = a & 255))
    : cb(this, a, b, !0)
  return b + 4
}
z.prototype.writeUInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 4, 4294967295, 0)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : cb(this, a, b, !1)
  return b + 4
}
z.prototype.writeIntLE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), E(this, a, b, c, d - 1, -d))
  d = 0
  var e = 1,
    f = 0
  for (this[b] = a & 255; ++d < c && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
z.prototype.writeIntBE = function (a, b, c, d) {
  a = +a
  b |= 0
  d || ((d = Math.pow(2, 8 * c - 1)), E(this, a, b, c, d - 1, -d))
  d = c - 1
  var e = 1,
    f = 0
  for (this[b + d] = a & 255; 0 <= --d && (e *= 256); )
    0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
      (this[b + d] = (((a / e) >> 0) - f) & 255)
  return b + c
}
z.prototype.writeInt8 = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 1, 127, -128)
  z.TYPED_ARRAY_SUPPORT || (a = Math.floor(a))
  0 > a && (a = 255 + a + 1)
  this[b] = a & 255
  return b + 1
}
z.prototype.writeInt16LE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 2, 32767, -32768)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255), (this[b + 1] = a >>> 8))
    : bb(this, a, b, !0)
  return b + 2
}
z.prototype.writeInt16BE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 2, 32767, -32768)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 8), (this[b + 1] = a & 255))
    : bb(this, a, b, !1)
  return b + 2
}
z.prototype.writeInt32LE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 4, 2147483647, -2147483648)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a & 255),
      (this[b + 1] = a >>> 8),
      (this[b + 2] = a >>> 16),
      (this[b + 3] = a >>> 24))
    : cb(this, a, b, !0)
  return b + 4
}
z.prototype.writeInt32BE = function (a, b, c) {
  a = +a
  b |= 0
  c || E(this, a, b, 4, 2147483647, -2147483648)
  0 > a && (a = 4294967295 + a + 1)
  z.TYPED_ARRAY_SUPPORT
    ? ((this[b] = a >>> 24),
      (this[b + 1] = a >>> 16),
      (this[b + 2] = a >>> 8),
      (this[b + 3] = a & 255))
    : cb(this, a, b, !1)
  return b + 4
}
function db(a, b, c, d) {
  if (c + d > a.length) throw new RangeError('Index out of range')
  if (0 > c) throw new RangeError('Index out of range')
}
z.prototype.writeFloatLE = function (a, b, c) {
  c || db(this, a, b, 4)
  ta(this, a, b, !0, 23, 4)
  return b + 4
}
z.prototype.writeFloatBE = function (a, b, c) {
  c || db(this, a, b, 4)
  ta(this, a, b, !1, 23, 4)
  return b + 4
}
z.prototype.writeDoubleLE = function (a, b, c) {
  c || db(this, a, b, 8)
  ta(this, a, b, !0, 52, 8)
  return b + 8
}
z.prototype.writeDoubleBE = function (a, b, c) {
  c || db(this, a, b, 8)
  ta(this, a, b, !1, 52, 8)
  return b + 8
}
z.prototype.copy = function (a, b, c, d) {
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
  else if (1e3 > e || !z.TYPED_ARRAY_SUPPORT)
    for (d = 0; d < e; ++d) a[d + b] = this[d + c]
  else Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b)
  return e
}
z.prototype.fill = function (a, b, c, d) {
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
    if ('string' === typeof d && !z.isEncoding(d))
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
      a = A(a) ? a : Oa(new z(a, d).toString()), e = a.length, d = 0;
      d < c - b;
      ++d
    )
      this[d + b] = a[d % e]
  return this
}
var eb = /[^+\/0-9A-Za-z-_]/g
function Oa(a, b) {
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
function Wa(a) {
  for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255)
  return b
}
function Pa(a) {
  a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(eb, '')
  if (2 > a.length) a = ''
  else for (; 0 !== a.length % 4; ) a += '='
  oa || pa()
  var b = a.length
  if (0 < b % 4) throw Error('Invalid string. Length must be a multiple of 4')
  var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0
  var d = new ma((3 * b) / 4 - c)
  var e = 0 < c ? b - 4 : b
  var f = 0
  for (b = 0; b < e; b += 4) {
    var g =
      (y[a.charCodeAt(b)] << 18) |
      (y[a.charCodeAt(b + 1)] << 12) |
      (y[a.charCodeAt(b + 2)] << 6) |
      y[a.charCodeAt(b + 3)]
    d[f++] = (g >> 16) & 255
    d[f++] = (g >> 8) & 255
    d[f++] = g & 255
  }
  2 === c
    ? ((g = (y[a.charCodeAt(b)] << 2) | (y[a.charCodeAt(b + 1)] >> 4)),
      (d[f++] = g & 255))
    : 1 === c &&
      ((g =
        (y[a.charCodeAt(b)] << 10) |
        (y[a.charCodeAt(b + 1)] << 4) |
        (y[a.charCodeAt(b + 2)] >> 2)),
      (d[f++] = (g >> 8) & 255),
      (d[f++] = g & 255))
  return d
}
function Va(a, b, c, d) {
  for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
    b[e + c] = a[e]
  return e
}
function Na(a) {
  return (
    null != a &&
    (!!a._isBuffer ||
      fb(a) ||
      ('function' === typeof a.readFloatLE &&
        'function' === typeof a.slice &&
        fb(a.slice(0, 0))))
  )
}
function fb(a) {
  return (
    !!a.constructor &&
    'function' === typeof a.constructor.isBuffer &&
    a.constructor.isBuffer(a)
  )
}
var gb = Object.freeze({
    __proto__: null,
    INSPECT_MAX_BYTES: 50,
    kMaxLength: za,
    Buffer: z,
    SlowBuffer: function (a) {
      ;+a != a && (a = 0)
      return z.alloc(+a)
    },
    isBuffer: Na,
  }),
  F = u(function (a, b) {
    function c(a) {
      for (var b = [], c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
      return new (gb.Buffer.bind.apply(gb.Buffer, d([void 0, a], b)))()
    }
    var d =
      (l && l.__spreadArrays) ||
      function () {
        for (var a = 0, b = 0, c = arguments.length; b < c; b++)
          a += arguments[b].length
        a = Array(a)
        var d = 0
        for (b = 0; b < c; b++)
          for (var k = arguments[b], p = 0, n = k.length; p < n; p++, d++)
            a[d] = k[p]
        return a
      }
    Object.defineProperty(b, '__esModule', { value: !0 })
    b.Buffer = gb.Buffer
    b.bufferAllocUnsafe = gb.Buffer.allocUnsafe || c
    b.bufferFrom = gb.Buffer.from || c
  })
t(F)
function hb() {
  throw Error('setTimeout has not been defined')
}
function ib() {
  throw Error('clearTimeout has not been defined')
}
var jb = hb,
  kb = ib
'function' === typeof la.setTimeout && (jb = setTimeout)
'function' === typeof la.clearTimeout && (kb = clearTimeout)
function pb(a) {
  if (jb === setTimeout) return setTimeout(a, 0)
  if ((jb === hb || !jb) && setTimeout)
    return (jb = setTimeout), setTimeout(a, 0)
  try {
    return jb(a, 0)
  } catch (b) {
    try {
      return jb.call(null, a, 0)
    } catch (c) {
      return jb.call(this, a, 0)
    }
  }
}
function rb(a) {
  if (kb === clearTimeout) return clearTimeout(a)
  if ((kb === ib || !kb) && clearTimeout)
    return (kb = clearTimeout), clearTimeout(a)
  try {
    return kb(a)
  } catch (b) {
    try {
      return kb.call(null, a)
    } catch (c) {
      return kb.call(this, a)
    }
  }
}
var sb = [],
  tb = !1,
  ub,
  vb = -1
function wb() {
  tb &&
    ub &&
    ((tb = !1), ub.length ? (sb = ub.concat(sb)) : (vb = -1), sb.length && xb())
}
function xb() {
  if (!tb) {
    var a = pb(wb)
    tb = !0
    for (var b = sb.length; b; ) {
      ub = sb
      for (sb = []; ++vb < b; ) ub && ub[vb].run()
      vb = -1
      b = sb.length
    }
    ub = null
    tb = !1
    rb(a)
  }
}
function G(a) {
  var b = Array(arguments.length - 1)
  if (1 < arguments.length)
    for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
  sb.push(new yb(a, b))
  1 !== sb.length || tb || pb(xb)
}
function yb(a, b) {
  this.fun = a
  this.array = b
}
yb.prototype.run = function () {
  this.fun.apply(null, this.array)
}
function zb() {}
var performance = la.performance || {},
  Ab =
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    function () {
      return new Date().getTime()
    },
  Bb = new Date(),
  Cb = {
    nextTick: G,
    title: 'browser',
    browser: !0,
    env: {},
    argv: [],
    version: '',
    versions: {},
    on: zb,
    addListener: zb,
    once: zb,
    off: zb,
    removeListener: zb,
    removeAllListeners: zb,
    emit: zb,
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
      var b = 0.001 * Ab.call(performance),
        c = Math.floor(b)
      b = Math.floor((b % 1) * 1e9)
      a && ((c -= a[0]), (b -= a[1]), 0 > b && (c--, (b += 1e9)))
      return [c, b]
    },
    platform: 'browser',
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - Bb) / 1e3
    },
  },
  Db =
    'function' === typeof Object.create
      ? function (a, b) {
          a.super_ = b
          a.prototype = Object.create(b.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })
        }
      : function (a, b) {
          function c() {}
          a.super_ = b
          c.prototype = b.prototype
          a.prototype = new c()
          a.prototype.constructor = a
        },
  Eb = /%[sdj%]/g
function Fb(a) {
  if (!Gb(a)) {
    for (var b = [], c = 0; c < arguments.length; c++) b.push(H(arguments[c]))
    return b.join(' ')
  }
  c = 1
  var d = arguments,
    e = d.length
  b = String(a).replace(Eb, function (a) {
    if ('%%' === a) return '%'
    if (c >= e) return a
    switch (a) {
      case '%s':
        return String(d[c++])
      case '%d':
        return Number(d[c++])
      case '%j':
        try {
          return JSON.stringify(d[c++])
        } catch (h) {
          return '[Circular]'
        }
      default:
        return a
    }
  })
  for (var f = d[c]; c < e; f = d[++c])
    b = null !== f && Hb(f) ? b + (' ' + H(f)) : b + (' ' + f)
  return b
}
function Ib(a, b) {
  if (Jb(la.process))
    return function () {
      return Ib(a, b).apply(this, arguments)
    }
  if (!0 === Cb.noDeprecation) return a
  var c = !1
  return function () {
    if (!c) {
      if (Cb.throwDeprecation) throw Error(b)
      Cb.traceDeprecation ? console.trace(b) : console.error(b)
      c = !0
    }
    return a.apply(this, arguments)
  }
}
var Kb = {},
  Lb
function Mb(a) {
  Jb(Lb) && (Lb = Cb.env.NODE_DEBUG || '')
  a = a.toUpperCase()
  Kb[a] ||
    (new RegExp('\\b' + a + '\\b', 'i').test(Lb)
      ? (Kb[a] = function () {
          var b = Fb.apply(null, arguments)
          console.error('%s %d: %s', a, 0, b)
        })
      : (Kb[a] = function () {}))
  return Kb[a]
}
function H(a, b) {
  var c = { seen: [], stylize: Nb }
  3 <= arguments.length && (c.depth = arguments[2])
  4 <= arguments.length && (c.colors = arguments[3])
  Ob(b) ? (c.showHidden = b) : b && Pb(c, b)
  Jb(c.showHidden) && (c.showHidden = !1)
  Jb(c.depth) && (c.depth = 2)
  Jb(c.colors) && (c.colors = !1)
  Jb(c.customInspect) && (c.customInspect = !0)
  c.colors && (c.stylize = Qb)
  return Rb(c, a, c.depth)
}
H.colors = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
}
H.styles = {
  special: 'cyan',
  number: 'yellow',
  boolean: 'yellow',
  undefined: 'grey',
  null: 'bold',
  string: 'green',
  date: 'magenta',
  regexp: 'red',
}
function Qb(a, b) {
  return (b = H.styles[b])
    ? '\u001b[' + H.colors[b][0] + 'm' + a + '\u001b[' + H.colors[b][1] + 'm'
    : a
}
function Nb(a) {
  return a
}
function Sb(a) {
  var b = {}
  a.forEach(function (a) {
    b[a] = !0
  })
  return b
}
function Rb(a, b, c) {
  if (
    a.customInspect &&
    b &&
    Tb(b.inspect) &&
    b.inspect !== H &&
    (!b.constructor || b.constructor.prototype !== b)
  ) {
    var d = b.inspect(c, a)
    Gb(d) || (d = Rb(a, d, c))
    return d
  }
  if ((d = Ub(a, b))) return d
  var e = Object.keys(b),
    f = Sb(e)
  a.showHidden && (e = Object.getOwnPropertyNames(b))
  if (Vb(b) && (0 <= e.indexOf('message') || 0 <= e.indexOf('description')))
    return Zb(b)
  if (0 === e.length) {
    if (Tb(b))
      return a.stylize(
        '[Function' + (b.name ? ': ' + b.name : '') + ']',
        'special'
      )
    if (ac(b)) return a.stylize(RegExp.prototype.toString.call(b), 'regexp')
    if (bc(b)) return a.stylize(Date.prototype.toString.call(b), 'date')
    if (Vb(b)) return Zb(b)
  }
  d = ''
  var g = !1,
    h = ['{', '}']
  cc(b) && ((g = !0), (h = ['[', ']']))
  Tb(b) && (d = ' [Function' + (b.name ? ': ' + b.name : '') + ']')
  ac(b) && (d = ' ' + RegExp.prototype.toString.call(b))
  bc(b) && (d = ' ' + Date.prototype.toUTCString.call(b))
  Vb(b) && (d = ' ' + Zb(b))
  if (0 === e.length && (!g || 0 == b.length)) return h[0] + d + h[1]
  if (0 > c)
    return ac(b)
      ? a.stylize(RegExp.prototype.toString.call(b), 'regexp')
      : a.stylize('[Object]', 'special')
  a.seen.push(b)
  e = g
    ? dc(a, b, c, f, e)
    : e.map(function (d) {
        return ec(a, b, c, f, d, g)
      })
  a.seen.pop()
  return fc(e, d, h)
}
function Ub(a, b) {
  if (Jb(b)) return a.stylize('undefined', 'undefined')
  if (Gb(b))
    return (
      (b =
        "'" +
        JSON.stringify(b)
          .replace(/^"|"$/g, '')
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"') +
        "'"),
      a.stylize(b, 'string')
    )
  if (gc(b)) return a.stylize('' + b, 'number')
  if (Ob(b)) return a.stylize('' + b, 'boolean')
  if (null === b) return a.stylize('null', 'null')
}
function Zb(a) {
  return '[' + Error.prototype.toString.call(a) + ']'
}
function dc(a, b, c, d, e) {
  for (var f = [], g = 0, h = b.length; g < h; ++g)
    Object.prototype.hasOwnProperty.call(b, String(g))
      ? f.push(ec(a, b, c, d, String(g), !0))
      : f.push('')
  e.forEach(function (e) {
    e.match(/^\d+$/) || f.push(ec(a, b, c, d, e, !0))
  })
  return f
}
function ec(a, b, c, d, e, f) {
  var g, h
  b = Object.getOwnPropertyDescriptor(b, e) || { value: b[e] }
  b.get
    ? (h = b.set
        ? a.stylize('[Getter/Setter]', 'special')
        : a.stylize('[Getter]', 'special'))
    : b.set && (h = a.stylize('[Setter]', 'special'))
  Object.prototype.hasOwnProperty.call(d, e) || (g = '[' + e + ']')
  h ||
    (0 > a.seen.indexOf(b.value)
      ? ((h = null === c ? Rb(a, b.value, null) : Rb(a, b.value, c - 1)),
        -1 < h.indexOf('\n') &&
          (h = f
            ? h
                .split('\n')
                .map(function (a) {
                  return '  ' + a
                })
                .join('\n')
                .substr(2)
            : '\n' +
              h
                .split('\n')
                .map(function (a) {
                  return '   ' + a
                })
                .join('\n')))
      : (h = a.stylize('[Circular]', 'special')))
  if (Jb(g)) {
    if (f && e.match(/^\d+$/)) return h
    g = JSON.stringify('' + e)
    g.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
      ? ((g = g.substr(1, g.length - 2)), (g = a.stylize(g, 'name')))
      : ((g = g
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"')
          .replace(/(^"|"$)/g, "'")),
        (g = a.stylize(g, 'string')))
  }
  return g + ': ' + h
}
function fc(a, b, c) {
  return 60 <
    a.reduce(function (a, b) {
      b.indexOf('\n')
      return a + b.replace(/\u001b\[\d\d?m/g, '').length + 1
    }, 0)
    ? c[0] + ('' === b ? '' : b + '\n ') + ' ' + a.join(',\n  ') + ' ' + c[1]
    : c[0] + b + ' ' + a.join(', ') + ' ' + c[1]
}
function cc(a) {
  return Array.isArray(a)
}
function Ob(a) {
  return 'boolean' === typeof a
}
function gc(a) {
  return 'number' === typeof a
}
function Gb(a) {
  return 'string' === typeof a
}
function Jb(a) {
  return void 0 === a
}
function ac(a) {
  return Hb(a) && '[object RegExp]' === Object.prototype.toString.call(a)
}
function Hb(a) {
  return 'object' === typeof a && null !== a
}
function bc(a) {
  return Hb(a) && '[object Date]' === Object.prototype.toString.call(a)
}
function Vb(a) {
  return (
    Hb(a) &&
    ('[object Error]' === Object.prototype.toString.call(a) ||
      a instanceof Error)
  )
}
function Tb(a) {
  return 'function' === typeof a
}
function hc(a) {
  return (
    null === a ||
    'boolean' === typeof a ||
    'number' === typeof a ||
    'string' === typeof a ||
    'symbol' === typeof a ||
    'undefined' === typeof a
  )
}
function ic(a) {
  return 10 > a ? '0' + a.toString(10) : a.toString(10)
}
var jc = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')
function kc() {
  var a = new Date(),
    b = [ic(a.getHours()), ic(a.getMinutes()), ic(a.getSeconds())].join(':')
  return [a.getDate(), jc[a.getMonth()], b].join(' ')
}
function Pb(a, b) {
  if (!b || !Hb(b)) return a
  for (var c = Object.keys(b), d = c.length; d--; ) a[c[d]] = b[c[d]]
  return a
}
var lc = {
  inherits: Db,
  _extend: Pb,
  log: function () {
    console.log('%s - %s', kc(), Fb.apply(null, arguments))
  },
  isBuffer: function (a) {
    return Na(a)
  },
  isPrimitive: hc,
  isFunction: Tb,
  isError: Vb,
  isDate: bc,
  isObject: Hb,
  isRegExp: ac,
  isUndefined: Jb,
  isSymbol: function (a) {
    return 'symbol' === typeof a
  },
  isString: Gb,
  isNumber: gc,
  isNullOrUndefined: function (a) {
    return null == a
  },
  isNull: function (a) {
    return null === a
  },
  isBoolean: Ob,
  isArray: cc,
  inspect: H,
  deprecate: Ib,
  format: Fb,
  debuglog: Mb,
}
function mc(a, b) {
  if (a === b) return 0
  for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
    if (a[e] !== b[e]) {
      c = a[e]
      d = b[e]
      break
    }
  return c < d ? -1 : d < c ? 1 : 0
}
var nc = Object.prototype.hasOwnProperty,
  oc =
    Object.keys ||
    function (a) {
      var b = [],
        c
      for (c in a) nc.call(a, c) && b.push(c)
      return b
    },
  pc = Array.prototype.slice,
  qc
function rc() {
  return 'undefined' !== typeof qc
    ? qc
    : (qc = (function () {
        return 'foo' === function () {}.name
      })())
}
function sc(a) {
  return Na(a) || 'function' !== typeof la.ArrayBuffer
    ? !1
    : 'function' === typeof ArrayBuffer.isView
    ? ArrayBuffer.isView(a)
    : a
    ? a instanceof DataView || (a.buffer && a.buffer instanceof ArrayBuffer)
      ? !0
      : !1
    : !1
}
function I(a, b) {
  a || J(a, !0, b, '==', tc)
}
var uc = /\s*function\s+([^\(\s]*)\s*/
function vc(a) {
  if (Tb(a)) return rc() ? a.name : (a = a.toString().match(uc)) && a[1]
}
I.AssertionError = wc
function wc(a) {
  this.name = 'AssertionError'
  this.actual = a.actual
  this.expected = a.expected
  this.operator = a.operator
  a.message
    ? ((this.message = a.message), (this.generatedMessage = !1))
    : ((this.message =
        xc(yc(this.actual), 128) +
        ' ' +
        this.operator +
        ' ' +
        xc(yc(this.expected), 128)),
      (this.generatedMessage = !0))
  var b = a.stackStartFunction || J
  Error.captureStackTrace
    ? Error.captureStackTrace(this, b)
    : ((a = Error()),
      a.stack &&
        ((a = a.stack),
        (b = vc(b)),
        (b = a.indexOf('\n' + b)),
        0 <= b && ((b = a.indexOf('\n', b + 1)), (a = a.substring(b + 1))),
        (this.stack = a)))
}
Db(wc, Error)
function xc(a, b) {
  return 'string' === typeof a ? (a.length < b ? a : a.slice(0, b)) : a
}
function yc(a) {
  if (rc() || !Tb(a)) return H(a)
  a = vc(a)
  return '[Function' + (a ? ': ' + a : '') + ']'
}
function J(a, b, c, d, e) {
  throw new wc({
    message: c,
    actual: a,
    expected: b,
    operator: d,
    stackStartFunction: e,
  })
}
I.fail = J
function tc(a, b) {
  a || J(a, !0, b, '==', tc)
}
I.ok = tc
I.equal = zc
function zc(a, b, c) {
  a != b && J(a, b, c, '==', zc)
}
I.notEqual = Ac
function Ac(a, b, c) {
  a == b && J(a, b, c, '!=', Ac)
}
I.deepEqual = Bc
function Bc(a, b, c) {
  Cc(a, b, !1) || J(a, b, c, 'deepEqual', Bc)
}
I.deepStrictEqual = Dc
function Dc(a, b, c) {
  Cc(a, b, !0) || J(a, b, c, 'deepStrictEqual', Dc)
}
function Cc(a, b, c, d) {
  if (a === b) return !0
  if (Na(a) && Na(b)) return 0 === mc(a, b)
  if (bc(a) && bc(b)) return a.getTime() === b.getTime()
  if (ac(a) && ac(b))
    return (
      a.source === b.source &&
      a.global === b.global &&
      a.multiline === b.multiline &&
      a.lastIndex === b.lastIndex &&
      a.ignoreCase === b.ignoreCase
    )
  if (
    (null !== a && 'object' === typeof a) ||
    (null !== b && 'object' === typeof b)
  ) {
    if (
      !sc(a) ||
      !sc(b) ||
      Object.prototype.toString.call(a) !== Object.prototype.toString.call(b) ||
      a instanceof Float32Array ||
      a instanceof Float64Array
    ) {
      if (Na(a) !== Na(b)) return !1
      d = d || { actual: [], expected: [] }
      var e = d.actual.indexOf(a)
      if (-1 !== e && e === d.expected.indexOf(b)) return !0
      d.actual.push(a)
      d.expected.push(b)
      return Ec(a, b, c, d)
    }
    return 0 === mc(new Uint8Array(a.buffer), new Uint8Array(b.buffer))
  }
  return c ? a === b : a == b
}
function Fc(a) {
  return '[object Arguments]' == Object.prototype.toString.call(a)
}
function Ec(a, b, c, d) {
  if (null === a || void 0 === a || null === b || void 0 === b) return !1
  if (hc(a) || hc(b)) return a === b
  if (c && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return !1
  var e = Fc(a),
    f = Fc(b)
  if ((e && !f) || (!e && f)) return !1
  if (e) return (a = pc.call(a)), (b = pc.call(b)), Cc(a, b, c)
  e = oc(a)
  var g = oc(b)
  if (e.length !== g.length) return !1
  e.sort()
  g.sort()
  for (f = e.length - 1; 0 <= f; f--) if (e[f] !== g[f]) return !1
  for (f = e.length - 1; 0 <= f; f--)
    if (((g = e[f]), !Cc(a[g], b[g], c, d))) return !1
  return !0
}
I.notDeepEqual = Gc
function Gc(a, b, c) {
  Cc(a, b, !1) && J(a, b, c, 'notDeepEqual', Gc)
}
I.notDeepStrictEqual = Hc
function Hc(a, b, c) {
  Cc(a, b, !0) && J(a, b, c, 'notDeepStrictEqual', Hc)
}
I.strictEqual = Ic
function Ic(a, b, c) {
  a !== b && J(a, b, c, '===', Ic)
}
I.notStrictEqual = Jc
function Jc(a, b, c) {
  a === b && J(a, b, c, '!==', Jc)
}
function Kc(a, b) {
  if (!a || !b) return !1
  if ('[object RegExp]' == Object.prototype.toString.call(b)) return b.test(a)
  try {
    if (a instanceof b) return !0
  } catch (c) {}
  return Error.isPrototypeOf(b) ? !1 : !0 === b.call({}, a)
}
function Lc(a, b, c, d) {
  if ('function' !== typeof b)
    throw new TypeError('"block" argument must be a function')
  'string' === typeof c && ((d = c), (c = null))
  try {
    b()
  } catch (h) {
    var e = h
  }
  b = e
  d = (c && c.name ? ' (' + c.name + ').' : '.') + (d ? ' ' + d : '.')
  a && !b && J(b, c, 'Missing expected exception' + d)
  e = 'string' === typeof d
  var f = !a && Vb(b),
    g = !a && b && !c
  ;((f && e && Kc(b, c)) || g) && J(b, c, 'Got unwanted exception' + d)
  if ((a && b && c && !Kc(b, c)) || (!a && b)) throw b
}
I.throws = Mc
function Mc(a, b, c) {
  Lc(!0, a, b, c)
}
I.doesNotThrow = Nc
function Nc(a, b, c) {
  Lc(!1, a, b, c)
}
I.ifError = Oc
function Oc(a) {
  if (a) throw a
}
var Pc = u(function (a, b) {
  function c(a) {
    return (function (a) {
      function b(b) {
        for (var c = [], e = 1; e < arguments.length; e++)
          c[e - 1] = arguments[e]
        c = a.call(this, d(b, c)) || this
        c.code = b
        c[h] = b
        c.name = a.prototype.name + ' [' + c[h] + ']'
        return c
      }
      g(b, a)
      return b
    })(a)
  }
  function d(a, b) {
    I.strictEqual(typeof a, 'string')
    var c = k[a]
    I(c, 'An invalid error message key was used: ' + a + '.')
    if ('function' === typeof c) a = c
    else {
      a = lc.format
      if (void 0 === b || 0 === b.length) return c
      b.unshift(c)
    }
    return String(a.apply(null, b))
  }
  function e(a, b) {
    k[a] = 'function' === typeof b ? b : String(b)
  }
  function f(a, b) {
    I(a, 'expected is required')
    I('string' === typeof b, 'thing is required')
    if (Array.isArray(a)) {
      var c = a.length
      I(0 < c, 'At least one expected value needs to be specified')
      a = a.map(function (a) {
        return String(a)
      })
      return 2 < c
        ? 'one of ' +
            b +
            ' ' +
            a.slice(0, c - 1).join(', ') +
            ', or ' +
            a[c - 1]
        : 2 === c
        ? 'one of ' + b + ' ' + a[0] + ' or ' + a[1]
        : 'of ' + b + ' ' + a[0]
    }
    return 'of ' + b + ' ' + String(a)
  }
  var g =
    (l && l.__extends) ||
    (function () {
      function a(b, c) {
        a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, b) {
              a.__proto__ = b
            }) ||
          function (a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
          }
        return a(b, c)
      }
      return function (b, c) {
        function d() {
          this.constructor = b
        }
        a(b, c)
        b.prototype =
          null === c ? Object.create(c) : ((d.prototype = c.prototype), new d())
      }
    })()
  Object.defineProperty(b, '__esModule', { value: !0 })
  var h = 'undefined' === typeof Symbol ? '_kCode' : Symbol('code'),
    k = {}
  a = (function (a) {
    function c(c) {
      if ('object' !== typeof c || null === c)
        throw new b.TypeError('ERR_INVALID_ARG_TYPE', 'options', 'object')
      var d = c.message
        ? a.call(this, c.message) || this
        : a.call(
            this,
            lc.inspect(c.actual).slice(0, 128) +
              ' ' +
              (c.operator + ' ' + lc.inspect(c.expected).slice(0, 128))
          ) || this
      d.generatedMessage = !c.message
      d.name = 'AssertionError [ERR_ASSERTION]'
      d.code = 'ERR_ASSERTION'
      d.actual = c.actual
      d.expected = c.expected
      d.operator = c.operator
      b.Error.captureStackTrace(d, c.stackStartFunction)
      return d
    }
    g(c, a)
    return c
  })(l.Error)
  b.AssertionError = a
  b.message = d
  b.E = e
  b.Error = c(l.Error)
  b.TypeError = c(l.TypeError)
  b.RangeError = c(l.RangeError)
  e('ERR_ARG_NOT_ITERABLE', '%s must be iterable')
  e('ERR_ASSERTION', '%s')
  e('ERR_BUFFER_OUT_OF_BOUNDS', function (a, b) {
    return b
      ? 'Attempt to write outside buffer bounds'
      : '"' + a + '" is outside of buffer bounds'
  })
  e('ERR_CHILD_CLOSED_BEFORE_REPLY', 'Child closed before reply received')
  e(
    'ERR_CONSOLE_WRITABLE_STREAM',
    'Console expects a writable stream instance for %s'
  )
  e('ERR_CPU_USAGE', 'Unable to obtain cpu usage %s')
  e('ERR_DNS_SET_SERVERS_FAILED', function (a, b) {
    return 'c-ares failed to set servers: "' + a + '" [' + b + ']'
  })
  e('ERR_FALSY_VALUE_REJECTION', 'Promise was rejected with falsy value')
  e('ERR_ENCODING_NOT_SUPPORTED', function (a) {
    return 'The "' + a + '" encoding is not supported'
  })
  e('ERR_ENCODING_INVALID_ENCODED_DATA', function (a) {
    return 'The encoded data was not valid for encoding ' + a
  })
  e(
    'ERR_HTTP_HEADERS_SENT',
    'Cannot render headers after they are sent to the client'
  )
  e('ERR_HTTP_INVALID_STATUS_CODE', 'Invalid status code: %s')
  e(
    'ERR_HTTP_TRAILER_INVALID',
    'Trailers are invalid with this transfer encoding'
  )
  e('ERR_INDEX_OUT_OF_RANGE', 'Index out of range')
  e('ERR_INVALID_ARG_TYPE', function (a, b, c) {
    I(a, 'name is required')
    if (b.includes('not ')) {
      var d = 'must not be'
      b = b.split('not ')[1]
    } else d = 'must be'
    if (Array.isArray(a))
      d =
        'The ' +
        a
          .map(function (a) {
            return '"' + a + '"'
          })
          .join(', ') +
        ' arguments ' +
        d +
        ' ' +
        f(b, 'type')
    else if (a.includes(' argument'))
      d = 'The ' + a + ' ' + d + ' ' + f(b, 'type')
    else {
      var e = a.includes('.') ? 'property' : 'argument'
      d = 'The "' + a + '" ' + e + ' ' + d + ' ' + f(b, 'type')
    }
    3 <= arguments.length &&
      (d += '. Received type ' + (null !== c ? typeof c : 'null'))
    return d
  })
  e('ERR_INVALID_ARRAY_LENGTH', function (a, b, c) {
    I.strictEqual(typeof c, 'number')
    return (
      'The array "' + a + '" (length ' + c + ') must be of length ' + b + '.'
    )
  })
  e('ERR_INVALID_BUFFER_SIZE', 'Buffer size must be a multiple of %s')
  e('ERR_INVALID_CALLBACK', 'Callback must be a function')
  e('ERR_INVALID_CHAR', 'Invalid character in %s')
  e(
    'ERR_INVALID_CURSOR_POS',
    'Cannot set cursor row without setting its column'
  )
  e('ERR_INVALID_FD', '"fd" must be a positive integer: %s')
  e(
    'ERR_INVALID_FILE_URL_HOST',
    'File URL host must be "localhost" or empty on %s'
  )
  e('ERR_INVALID_FILE_URL_PATH', 'File URL path %s')
  e('ERR_INVALID_HANDLE_TYPE', 'This handle type cannot be sent')
  e('ERR_INVALID_IP_ADDRESS', 'Invalid IP address: %s')
  e('ERR_INVALID_OPT_VALUE', function (a, b) {
    return 'The value "' + String(b) + '" is invalid for option "' + a + '"'
  })
  e('ERR_INVALID_OPT_VALUE_ENCODING', function (a) {
    return 'The value "' + String(a) + '" is invalid for option "encoding"'
  })
  e(
    'ERR_INVALID_REPL_EVAL_CONFIG',
    'Cannot specify both "breakEvalOnSigint" and "eval" for REPL'
  )
  e(
    'ERR_INVALID_SYNC_FORK_INPUT',
    'Asynchronous forks do not support Buffer, Uint8Array or string input: %s'
  )
  e('ERR_INVALID_THIS', 'Value of "this" must be of type %s')
  e('ERR_INVALID_TUPLE', '%s must be an iterable %s tuple')
  e('ERR_INVALID_URL', 'Invalid URL: %s')
  e('ERR_INVALID_URL_SCHEME', function (a) {
    return 'The URL must be ' + f(a, 'scheme')
  })
  e('ERR_IPC_CHANNEL_CLOSED', 'Channel closed')
  e('ERR_IPC_DISCONNECTED', 'IPC channel is already disconnected')
  e('ERR_IPC_ONE_PIPE', 'Child process can have only one IPC pipe')
  e('ERR_IPC_SYNC_FORK', 'IPC cannot be used with synchronous forks')
  e('ERR_MISSING_ARGS', function () {
    for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b]
    I(0 < a.length, 'At least one arg needs to be specified')
    b = 'The '
    var c = a.length
    a = a.map(function (a) {
      return '"' + a + '"'
    })
    switch (c) {
      case 1:
        b += a[0] + ' argument'
        break
      case 2:
        b += a[0] + ' and ' + a[1] + ' arguments'
        break
      default:
        ;(b += a.slice(0, c - 1).join(', ')),
          (b += ', and ' + a[c - 1] + ' arguments')
    }
    return b + ' must be specified'
  })
  e('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times')
  e('ERR_NAPI_CONS_FUNCTION', 'Constructor must be a function')
  e('ERR_NAPI_CONS_PROTOTYPE_OBJECT', 'Constructor.prototype must be an object')
  e('ERR_NO_CRYPTO', 'Node.js is not compiled with OpenSSL crypto support')
  e('ERR_NO_LONGER_SUPPORTED', '%s is no longer supported')
  e('ERR_PARSE_HISTORY_DATA', 'Could not parse history data in %s')
  e('ERR_SOCKET_ALREADY_BOUND', 'Socket is already bound')
  e('ERR_SOCKET_BAD_PORT', 'Port should be > 0 and < 65536')
  e(
    'ERR_SOCKET_BAD_TYPE',
    'Bad socket type specified. Valid types are: udp4, udp6'
  )
  e('ERR_SOCKET_CANNOT_SEND', 'Unable to send data')
  e('ERR_SOCKET_CLOSED', 'Socket is closed')
  e('ERR_SOCKET_DGRAM_NOT_RUNNING', 'Not running')
  e('ERR_STDERR_CLOSE', 'process.stderr cannot be closed')
  e('ERR_STDOUT_CLOSE', 'process.stdout cannot be closed')
  e('ERR_STREAM_WRAP', 'Stream has StringDecoder set or is in objectMode')
  e(
    'ERR_TLS_CERT_ALTNAME_INVALID',
    "Hostname/IP does not match certificate's altnames: %s"
  )
  e('ERR_TLS_DH_PARAM_SIZE', function (a) {
    return 'DH parameter size ' + a + ' is less than 2048'
  })
  e('ERR_TLS_HANDSHAKE_TIMEOUT', 'TLS handshake timeout')
  e('ERR_TLS_RENEGOTIATION_FAILED', 'Failed to renegotiate')
  e(
    'ERR_TLS_REQUIRED_SERVER_NAME',
    '"servername" is required parameter for Server.addContext'
  )
  e('ERR_TLS_SESSION_ATTACK', 'TSL session renegotiation attack detected')
  e(
    'ERR_TRANSFORM_ALREADY_TRANSFORMING',
    'Calling transform done when still transforming'
  )
  e(
    'ERR_TRANSFORM_WITH_LENGTH_0',
    'Calling transform done when writableState.length != 0'
  )
  e('ERR_UNKNOWN_ENCODING', 'Unknown encoding: %s')
  e('ERR_UNKNOWN_SIGNAL', 'Unknown signal: %s')
  e('ERR_UNKNOWN_STDIN_TYPE', 'Unknown stdin file type')
  e('ERR_UNKNOWN_STREAM_TYPE', 'Unknown stream file type')
  e(
    'ERR_V8BREAKITERATOR',
    'Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl'
  )
})
t(Pc)
var K = u(function (a, b) {
  Object.defineProperty(b, '__esModule', { value: !0 })
  b.ENCODING_UTF8 = 'utf8'
  b.assertEncoding = function (a) {
    if (a && !F.Buffer.isEncoding(a))
      throw new Pc.TypeError('ERR_INVALID_OPT_VALUE_ENCODING', a)
  }
  b.strToEncoding = function (a, d) {
    return d && d !== b.ENCODING_UTF8
      ? 'buffer' === d
        ? new F.Buffer(a)
        : new F.Buffer(a).toString(d)
      : a
  }
})
t(K)
var Qc = u(function (a, b) {
  Object.defineProperty(b, '__esModule', { value: !0 })
  var c = w.constants.S_IFMT,
    d = w.constants.S_IFDIR,
    e = w.constants.S_IFREG,
    f = w.constants.S_IFBLK,
    g = w.constants.S_IFCHR,
    h = w.constants.S_IFLNK,
    k = w.constants.S_IFIFO,
    p = w.constants.S_IFSOCK
  a = (function () {
    function a() {
      this.name = ''
      this.mode = 0
    }
    a.build = function (b, c) {
      var d = new a(),
        e = b.getNode().mode
      d.name = K.strToEncoding(b.getName(), c)
      d.mode = e
      return d
    }
    a.prototype._checkModeProperty = function (a) {
      return (this.mode & c) === a
    }
    a.prototype.isDirectory = function () {
      return this._checkModeProperty(d)
    }
    a.prototype.isFile = function () {
      return this._checkModeProperty(e)
    }
    a.prototype.isBlockDevice = function () {
      return this._checkModeProperty(f)
    }
    a.prototype.isCharacterDevice = function () {
      return this._checkModeProperty(g)
    }
    a.prototype.isSymbolicLink = function () {
      return this._checkModeProperty(h)
    }
    a.prototype.isFIFO = function () {
      return this._checkModeProperty(k)
    }
    a.prototype.isSocket = function () {
      return this._checkModeProperty(p)
    }
    return a
  })()
  b.Dirent = a
  b.default = a
})
t(Qc)
function Rc(a, b) {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d]
    '.' === e
      ? a.splice(d, 1)
      : '..' === e
      ? (a.splice(d, 1), c++)
      : c && (a.splice(d, 1), c--)
  }
  if (b) for (; c--; c) a.unshift('..')
  return a
}
var Sc = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
function Tc() {
  for (var a = '', b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    var d = 0 <= c ? arguments[c] : '/'
    if ('string' !== typeof d)
      throw new TypeError('Arguments to path.resolve must be strings')
    d && ((a = d + '/' + a), (b = '/' === d.charAt(0)))
  }
  a = Rc(
    Uc(a.split('/'), function (a) {
      return !!a
    }),
    !b
  ).join('/')
  return (b ? '/' : '') + a || '.'
}
function Vc(a) {
  var b = Wc(a),
    c = '/' === Xc(a, -1)
  ;(a = Rc(
    Uc(a.split('/'), function (a) {
      return !!a
    }),
    !b
  ).join('/')) ||
    b ||
    (a = '.')
  a && c && (a += '/')
  return (b ? '/' : '') + a
}
function Wc(a) {
  return '/' === a.charAt(0)
}
function Yc(a, b) {
  function c(a) {
    for (var b = 0; b < a.length && '' === a[b]; b++);
    for (var c = a.length - 1; 0 <= c && '' === a[c]; c--);
    return b > c ? [] : a.slice(b, c - b + 1)
  }
  a = Tc(a).substr(1)
  b = Tc(b).substr(1)
  a = c(a.split('/'))
  b = c(b.split('/'))
  for (var d = Math.min(a.length, b.length), e = d, f = 0; f < d; f++)
    if (a[f] !== b[f]) {
      e = f
      break
    }
  d = []
  for (f = e; f < a.length; f++) d.push('..')
  d = d.concat(b.slice(e))
  return d.join('/')
}
var Zc = {
  extname: function (a) {
    return Sc.exec(a).slice(1)[3]
  },
  basename: function (a, b) {
    a = Sc.exec(a).slice(1)[2]
    b && a.substr(-1 * b.length) === b && (a = a.substr(0, a.length - b.length))
    return a
  },
  dirname: function (a) {
    var b = Sc.exec(a).slice(1)
    a = b[0]
    b = b[1]
    if (!a && !b) return '.'
    b && (b = b.substr(0, b.length - 1))
    return a + b
  },
  sep: '/',
  delimiter: ':',
  relative: Yc,
  join: function () {
    var a = Array.prototype.slice.call(arguments, 0)
    return Vc(
      Uc(a, function (a) {
        if ('string' !== typeof a)
          throw new TypeError('Arguments to path.join must be strings')
        return a
      }).join('/')
    )
  },
  isAbsolute: Wc,
  normalize: Vc,
  resolve: Tc,
}
function Uc(a, b) {
  if (a.filter) return a.filter(b)
  for (var c = [], d = 0; d < a.length; d++) b(a[d], d, a) && c.push(a[d])
  return c
}
var Xc =
      true
      ? function (a, b, c) {
          return a.substr(b, c)
        }
      : 0,
  $c = u(function (a, b) {
    Object.defineProperty(b, '__esModule', { value: !0 })
    a =
      'function' === typeof setImmediate
        ? setImmediate.bind(l)
        : setTimeout.bind(l)
    b.default = a
  })
t($c)
var L = u(function (a, b) {
  function c() {
    var a = Cb || {}
    a.getuid ||
      (a.getuid = function () {
        return 0
      })
    a.getgid ||
      (a.getgid = function () {
        return 0
      })
    a.cwd ||
      (a.cwd = function () {
        return '/'
      })
    a.nextTick || (a.nextTick = $c.default)
    a.emitWarning ||
      (a.emitWarning = function (a, b) {
        console.warn('' + b + (b ? ': ' : '') + a)
      })
    a.env || (a.env = {})
    return a
  }
  Object.defineProperty(b, '__esModule', { value: !0 })
  b.createProcess = c
  b.default = c()
})
t(L)
function ad() {}
ad.prototype = Object.create(null)
function O() {
  O.init.call(this)
}
O.EventEmitter = O
O.usingDomains = !1
O.prototype.domain = void 0
O.prototype._events = void 0
O.prototype._maxListeners = void 0
O.defaultMaxListeners = 10
O.init = function () {
  this.domain = null
  ;(this._events && this._events !== Object.getPrototypeOf(this)._events) ||
    ((this._events = new ad()), (this._eventsCount = 0))
  this._maxListeners = this._maxListeners || void 0
}
O.prototype.setMaxListeners = function (a) {
  if ('number' !== typeof a || 0 > a || isNaN(a))
    throw new TypeError('"n" argument must be a positive number')
  this._maxListeners = a
  return this
}
O.prototype.getMaxListeners = function () {
  return void 0 === this._maxListeners
    ? O.defaultMaxListeners
    : this._maxListeners
}
O.prototype.emit = function (a) {
  var b, c
  var d = 'error' === a
  if ((b = this._events)) d = d && null == b.error
  else if (!d) return !1
  var e = this.domain
  if (d) {
    b = arguments[1]
    if (e)
      b || (b = Error('Uncaught, unspecified "error" event')),
        (b.domainEmitter = this),
        (b.domain = e),
        (b.domainThrown = !1),
        e.emit('error', b)
    else {
      if (b instanceof Error) throw b
      e = Error('Uncaught, unspecified "error" event. (' + b + ')')
      e.context = b
      throw e
    }
    return !1
  }
  e = b[a]
  if (!e) return !1
  b = 'function' === typeof e
  var f = arguments.length
  switch (f) {
    case 1:
      if (b) e.call(this)
      else for (b = e.length, e = bd(e, b), d = 0; d < b; ++d) e[d].call(this)
      break
    case 2:
      d = arguments[1]
      if (b) e.call(this, d)
      else
        for (b = e.length, e = bd(e, b), f = 0; f < b; ++f) e[f].call(this, d)
      break
    case 3:
      d = arguments[1]
      f = arguments[2]
      if (b) e.call(this, d, f)
      else
        for (b = e.length, e = bd(e, b), c = 0; c < b; ++c)
          e[c].call(this, d, f)
      break
    case 4:
      d = arguments[1]
      f = arguments[2]
      c = arguments[3]
      if (b) e.call(this, d, f, c)
      else {
        b = e.length
        e = bd(e, b)
        for (var g = 0; g < b; ++g) e[g].call(this, d, f, c)
      }
      break
    default:
      d = Array(f - 1)
      for (c = 1; c < f; c++) d[c - 1] = arguments[c]
      if (b) e.apply(this, d)
      else
        for (b = e.length, e = bd(e, b), f = 0; f < b; ++f) e[f].apply(this, d)
  }
  return !0
}
function cd(a, b, c, d) {
  var e
  if ('function' !== typeof c)
    throw new TypeError('"listener" argument must be a function')
  if ((e = a._events)) {
    e.newListener &&
      (a.emit('newListener', b, c.listener ? c.listener : c), (e = a._events))
    var f = e[b]
  } else (e = a._events = new ad()), (a._eventsCount = 0)
  f
    ? ('function' === typeof f
        ? (f = e[b] = d ? [c, f] : [f, c])
        : d
        ? f.unshift(c)
        : f.push(c),
      f.warned ||
        ((c =
          void 0 === a._maxListeners
            ? O.defaultMaxListeners
            : a._maxListeners) &&
          0 < c &&
          f.length > c &&
          ((f.warned = !0),
          (c = Error(
            'Possible EventEmitter memory leak detected. ' +
              f.length +
              ' ' +
              b +
              ' listeners added. Use emitter.setMaxListeners() to increase limit'
          )),
          (c.name = 'MaxListenersExceededWarning'),
          (c.emitter = a),
          (c.type = b),
          (c.count = f.length),
          'function' === typeof console.warn
            ? console.warn(c)
            : console.log(c))))
    : ((e[b] = c), ++a._eventsCount)
  return a
}
O.prototype.addListener = function (a, b) {
  return cd(this, a, b, !1)
}
O.prototype.on = O.prototype.addListener
O.prototype.prependListener = function (a, b) {
  return cd(this, a, b, !0)
}
function dd(a, b, c) {
  function d() {
    a.removeListener(b, d)
    e || ((e = !0), c.apply(a, arguments))
  }
  var e = !1
  d.listener = c
  return d
}
O.prototype.once = function (a, b) {
  if ('function' !== typeof b)
    throw new TypeError('"listener" argument must be a function')
  this.on(a, dd(this, a, b))
  return this
}
O.prototype.prependOnceListener = function (a, b) {
  if ('function' !== typeof b)
    throw new TypeError('"listener" argument must be a function')
  this.prependListener(a, dd(this, a, b))
  return this
}
O.prototype.removeListener = function (a, b) {
  var c
  if ('function' !== typeof b)
    throw new TypeError('"listener" argument must be a function')
  var d = this._events
  if (!d) return this
  var e = d[a]
  if (!e) return this
  if (e === b || (e.listener && e.listener === b))
    0 === --this._eventsCount
      ? (this._events = new ad())
      : (delete d[a],
        d.removeListener && this.emit('removeListener', a, e.listener || b))
  else if ('function' !== typeof e) {
    var f = -1
    for (c = e.length; 0 < c--; )
      if (e[c] === b || (e[c].listener && e[c].listener === b)) {
        var g = e[c].listener
        f = c
        break
      }
    if (0 > f) return this
    if (1 === e.length) {
      e[0] = void 0
      if (0 === --this._eventsCount) return (this._events = new ad()), this
      delete d[a]
    } else {
      c = f + 1
      for (var h = e.length; c < h; f += 1, c += 1) e[f] = e[c]
      e.pop()
    }
    d.removeListener && this.emit('removeListener', a, g || b)
  }
  return this
}
O.prototype.removeAllListeners = function (a) {
  var b = this._events
  if (!b) return this
  if (!b.removeListener)
    return (
      0 === arguments.length
        ? ((this._events = new ad()), (this._eventsCount = 0))
        : b[a] &&
          (0 === --this._eventsCount ? (this._events = new ad()) : delete b[a]),
      this
    )
  if (0 === arguments.length) {
    b = Object.keys(b)
    for (var c = 0, d; c < b.length; ++c)
      (d = b[c]), 'removeListener' !== d && this.removeAllListeners(d)
    this.removeAllListeners('removeListener')
    this._events = new ad()
    this._eventsCount = 0
    return this
  }
  b = b[a]
  if ('function' === typeof b) this.removeListener(a, b)
  else if (b) {
    do this.removeListener(a, b[b.length - 1])
    while (b[0])
  }
  return this
}
O.prototype.listeners = function (a) {
  var b = this._events
  if (b)
    if ((a = b[a]))
      if ('function' === typeof a) a = [a.listener || a]
      else {
        b = Array(a.length)
        for (var c = 0; c < b.length; ++c) b[c] = a[c].listener || a[c]
        a = b
      }
    else a = []
  else a = []
  return a
}
O.listenerCount = function (a, b) {
  return 'function' === typeof a.listenerCount
    ? a.listenerCount(b)
    : ed.call(a, b)
}
O.prototype.listenerCount = ed
function ed(a) {
  var b = this._events
  if (b) {
    a = b[a]
    if ('function' === typeof a) return 1
    if (a) return a.length
  }
  return 0
}
O.prototype.eventNames = function () {
  return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
}
function bd(a, b) {
  for (var c = Array(b); b--; ) c[b] = a[b]
  return c
}
var fd = u(function (a, b) {
  var c =
    (l && l.__extends) ||
    (function () {
      function a(b, c) {
        a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, b) {
              a.__proto__ = b
            }) ||
          function (a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
          }
        return a(b, c)
      }
      return function (b, c) {
        function d() {
          this.constructor = b
        }
        a(b, c)
        b.prototype =
          null === c ? Object.create(c) : ((d.prototype = c.prototype), new d())
      }
    })()
  Object.defineProperty(b, '__esModule', { value: !0 })
  var d = w.constants.S_IFMT,
    e = w.constants.S_IFDIR,
    f = w.constants.S_IFREG,
    g = w.constants.S_IFLNK,
    h = w.constants.O_APPEND
  b.SEP = '/'
  a = (function (a) {
    function b(b, c) {
      void 0 === c && (c = 438)
      var d = a.call(this) || this
      d.uid = L.default.getuid()
      d.gid = L.default.getgid()
      d.atime = new Date()
      d.mtime = new Date()
      d.ctime = new Date()
      d.perm = 438
      d.mode = f
      d.nlink = 1
      d.perm = c
      d.mode |= c
      d.ino = b
      return d
    }
    c(b, a)
    b.prototype.getString = function (a) {
      void 0 === a && (a = 'utf8')
      return this.getBuffer().toString(a)
    }
    b.prototype.setString = function (a) {
      this.buf = F.bufferFrom(a, 'utf8')
      this.touch()
    }
    b.prototype.getBuffer = function () {
      this.buf || this.setBuffer(F.bufferAllocUnsafe(0))
      return F.bufferFrom(this.buf)
    }
    b.prototype.setBuffer = function (a) {
      this.buf = F.bufferFrom(a)
      this.touch()
    }
    b.prototype.getSize = function () {
      return this.buf ? this.buf.length : 0
    }
    b.prototype.setModeProperty = function (a) {
      this.mode = (this.mode & ~d) | a
    }
    b.prototype.setIsFile = function () {
      this.setModeProperty(f)
    }
    b.prototype.setIsDirectory = function () {
      this.setModeProperty(e)
    }
    b.prototype.setIsSymlink = function () {
      this.setModeProperty(g)
    }
    b.prototype.isFile = function () {
      return (this.mode & d) === f
    }
    b.prototype.isDirectory = function () {
      return (this.mode & d) === e
    }
    b.prototype.isSymlink = function () {
      return (this.mode & d) === g
    }
    b.prototype.makeSymlink = function (a) {
      this.symlink = a
      this.setIsSymlink()
    }
    b.prototype.write = function (a, b, c, d) {
      void 0 === b && (b = 0)
      void 0 === c && (c = a.length)
      void 0 === d && (d = 0)
      this.buf || (this.buf = F.bufferAllocUnsafe(0))
      if (d + c > this.buf.length) {
        var e = F.bufferAllocUnsafe(d + c)
        this.buf.copy(e, 0, 0, this.buf.length)
        this.buf = e
      }
      a.copy(this.buf, d, b, b + c)
      this.touch()
      return c
    }
    b.prototype.read = function (a, b, c, d) {
      void 0 === b && (b = 0)
      void 0 === c && (c = a.byteLength)
      void 0 === d && (d = 0)
      this.buf || (this.buf = F.bufferAllocUnsafe(0))
      c > a.byteLength && (c = a.byteLength)
      c + d > this.buf.length && (c = this.buf.length - d)
      this.buf.copy(a, b, d, d + c)
      return c
    }
    b.prototype.truncate = function (a) {
      void 0 === a && (a = 0)
      if (a)
        if (
          (this.buf || (this.buf = F.bufferAllocUnsafe(0)),
          a <= this.buf.length)
        )
          this.buf = this.buf.slice(0, a)
        else {
          var b = F.bufferAllocUnsafe(0)
          this.buf.copy(b)
          b.fill(0, a)
        }
      else this.buf = F.bufferAllocUnsafe(0)
      this.touch()
    }
    b.prototype.chmod = function (a) {
      this.perm = a
      this.mode = (this.mode & -512) | a
      this.touch()
    }
    b.prototype.chown = function (a, b) {
      this.uid = a
      this.gid = b
      this.touch()
    }
    b.prototype.touch = function () {
      this.mtime = new Date()
      this.emit('change', this)
    }
    b.prototype.canRead = function (a, b) {
      void 0 === a && (a = L.default.getuid())
      void 0 === b && (b = L.default.getgid())
      return this.perm & 4 ||
        (b === this.gid && this.perm & 32) ||
        (a === this.uid && this.perm & 256)
        ? !0
        : !1
    }
    b.prototype.canWrite = function (a, b) {
      void 0 === a && (a = L.default.getuid())
      void 0 === b && (b = L.default.getgid())
      return this.perm & 2 ||
        (b === this.gid && this.perm & 16) ||
        (a === this.uid && this.perm & 128)
        ? !0
        : !1
    }
    b.prototype.del = function () {
      this.emit('delete', this)
    }
    b.prototype.toJSON = function () {
      return {
        ino: this.ino,
        uid: this.uid,
        gid: this.gid,
        atime: this.atime.getTime(),
        mtime: this.mtime.getTime(),
        ctime: this.ctime.getTime(),
        perm: this.perm,
        mode: this.mode,
        nlink: this.nlink,
        symlink: this.symlink,
        data: this.getString(),
      }
    }
    return b
  })(O.EventEmitter)
  b.Node = a
  a = (function (a) {
    function d(b, c, d) {
      var e = a.call(this) || this
      e.children = {}
      e.steps = []
      e.ino = 0
      e.length = 0
      e.vol = b
      e.parent = c
      e.steps = c ? c.steps.concat([d]) : [d]
      return e
    }
    c(d, a)
    d.prototype.setNode = function (a) {
      this.node = a
      this.ino = a.ino
    }
    d.prototype.getNode = function () {
      return this.node
    }
    d.prototype.createChild = function (a, b) {
      void 0 === b && (b = this.vol.createNode())
      var c = new d(this.vol, this, a)
      c.setNode(b)
      b.isDirectory()
      this.setChild(a, c)
      return c
    }
    d.prototype.setChild = function (a, b) {
      void 0 === b && (b = new d(this.vol, this, a))
      this.children[a] = b
      b.parent = this
      this.length++
      this.emit('child:add', b, this)
      return b
    }
    d.prototype.deleteChild = function (a) {
      delete this.children[a.getName()]
      this.length--
      this.emit('child:delete', a, this)
    }
    d.prototype.getChild = function (a) {
      if (Object.hasOwnProperty.call(this.children, a)) return this.children[a]
    }
    d.prototype.getPath = function () {
      return this.steps.join(b.SEP)
    }
    d.prototype.getName = function () {
      return this.steps[this.steps.length - 1]
    }
    d.prototype.walk = function (a, b, c) {
      void 0 === b && (b = a.length)
      void 0 === c && (c = 0)
      if (c >= a.length || c >= b) return this
      var d = this.getChild(a[c])
      return d ? d.walk(a, b, c + 1) : null
    }
    d.prototype.toJSON = function () {
      return {
        steps: this.steps,
        ino: this.ino,
        children: Object.keys(this.children),
      }
    }
    return d
  })(O.EventEmitter)
  b.Link = a
  a = (function () {
    function a(a, b, c, d) {
      this.position = 0
      this.link = a
      this.node = b
      this.flags = c
      this.fd = d
    }
    a.prototype.getString = function () {
      return this.node.getString()
    }
    a.prototype.setString = function (a) {
      this.node.setString(a)
    }
    a.prototype.getBuffer = function () {
      return this.node.getBuffer()
    }
    a.prototype.setBuffer = function (a) {
      this.node.setBuffer(a)
    }
    a.prototype.getSize = function () {
      return this.node.getSize()
    }
    a.prototype.truncate = function (a) {
      this.node.truncate(a)
    }
    a.prototype.seekTo = function (a) {
      this.position = a
    }
    a.prototype.stats = function () {
      return ka.default.build(this.node)
    }
    a.prototype.write = function (a, b, c, d) {
      void 0 === b && (b = 0)
      void 0 === c && (c = a.length)
      'number' !== typeof d && (d = this.position)
      this.flags & h && (d = this.getSize())
      a = this.node.write(a, b, c, d)
      this.position = d + a
      return a
    }
    a.prototype.read = function (a, b, c, d) {
      void 0 === b && (b = 0)
      void 0 === c && (c = a.byteLength)
      'number' !== typeof d && (d = this.position)
      a = this.node.read(a, b, c, d)
      this.position = d + a
      return a
    }
    a.prototype.chmod = function (a) {
      this.node.chmod(a)
    }
    a.prototype.chown = function (a, b) {
      this.node.chown(a, b)
    }
    return a
  })()
  b.File = a
})
t(fd)
var gd = fd.Node,
  hd = u(function (a, b) {
    Object.defineProperty(b, '__esModule', { value: !0 })
    b.default = function (a, b, e) {
      var c = setTimeout.apply(null, arguments)
      c && 'object' === typeof c && 'function' === typeof c.unref && c.unref()
      return c
    }
  })
t(hd)
function id() {
  this.tail = this.head = null
  this.length = 0
}
id.prototype.push = function (a) {
  a = { data: a, next: null }
  0 < this.length ? (this.tail.next = a) : (this.head = a)
  this.tail = a
  ++this.length
}
id.prototype.unshift = function (a) {
  a = { data: a, next: this.head }
  0 === this.length && (this.tail = a)
  this.head = a
  ++this.length
}
id.prototype.shift = function () {
  if (0 !== this.length) {
    var a = this.head.data
    this.head = 1 === this.length ? (this.tail = null) : this.head.next
    --this.length
    return a
  }
}
id.prototype.clear = function () {
  this.head = this.tail = null
  this.length = 0
}
id.prototype.join = function (a) {
  if (0 === this.length) return ''
  for (var b = this.head, c = '' + b.data; (b = b.next); ) c += a + b.data
  return c
}
id.prototype.concat = function (a) {
  if (0 === this.length) return z.alloc(0)
  if (1 === this.length) return this.head.data
  a = z.allocUnsafe(a >>> 0)
  for (var b = this.head, c = 0; b; )
    b.data.copy(a, c), (c += b.data.length), (b = b.next)
  return a
}
var jd =
  z.isEncoding ||
  function (a) {
    switch (a && a.toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
      case 'raw':
        return !0
      default:
        return !1
    }
  }
function kd(a) {
  this.encoding = (a || 'utf8').toLowerCase().replace(/[-_]/, '')
  if (a && !jd(a)) throw Error('Unknown encoding: ' + a)
  switch (this.encoding) {
    case 'utf8':
      this.surrogateSize = 3
      break
    case 'ucs2':
    case 'utf16le':
      this.surrogateSize = 2
      this.detectIncompleteChar = ld
      break
    case 'base64':
      this.surrogateSize = 3
      this.detectIncompleteChar = md
      break
    default:
      this.write = nd
      return
  }
  this.charBuffer = new z(6)
  this.charLength = this.charReceived = 0
}
kd.prototype.write = function (a) {
  for (var b = ''; this.charLength; ) {
    b =
      a.length >= this.charLength - this.charReceived
        ? this.charLength - this.charReceived
        : a.length
    a.copy(this.charBuffer, this.charReceived, 0, b)
    this.charReceived += b
    if (this.charReceived < this.charLength) return ''
    a = a.slice(b, a.length)
    b = this.charBuffer.slice(0, this.charLength).toString(this.encoding)
    var c = b.charCodeAt(b.length - 1)
    if (55296 <= c && 56319 >= c)
      (this.charLength += this.surrogateSize), (b = '')
    else {
      this.charReceived = this.charLength = 0
      if (0 === a.length) return b
      break
    }
  }
  this.detectIncompleteChar(a)
  var d = a.length
  this.charLength &&
    (a.copy(this.charBuffer, 0, a.length - this.charReceived, d),
    (d -= this.charReceived))
  b += a.toString(this.encoding, 0, d)
  d = b.length - 1
  c = b.charCodeAt(d)
  return 55296 <= c && 56319 >= c
    ? ((c = this.surrogateSize),
      (this.charLength += c),
      (this.charReceived += c),
      this.charBuffer.copy(this.charBuffer, c, 0, c),
      a.copy(this.charBuffer, 0, 0, c),
      b.substring(0, d))
    : b
}
kd.prototype.detectIncompleteChar = function (a) {
  for (var b = 3 <= a.length ? 3 : a.length; 0 < b; b--) {
    var c = a[a.length - b]
    if (1 == b && 6 == c >> 5) {
      this.charLength = 2
      break
    }
    if (2 >= b && 14 == c >> 4) {
      this.charLength = 3
      break
    }
    if (3 >= b && 30 == c >> 3) {
      this.charLength = 4
      break
    }
  }
  this.charReceived = b
}
kd.prototype.end = function (a) {
  var b = ''
  a && a.length && (b = this.write(a))
  this.charReceived &&
    ((a = this.encoding),
    (b += this.charBuffer.slice(0, this.charReceived).toString(a)))
  return b
}
function nd(a) {
  return a.toString(this.encoding)
}
function ld(a) {
  this.charLength = (this.charReceived = a.length % 2) ? 2 : 0
}
function md(a) {
  this.charLength = (this.charReceived = a.length % 3) ? 3 : 0
}
P.ReadableState = od
var Q = Mb('stream')
Db(P, O)
function pd(a, b, c) {
  if ('function' === typeof a.prependListener) return a.prependListener(b, c)
  if (a._events && a._events[b])
    Array.isArray(a._events[b])
      ? a._events[b].unshift(c)
      : (a._events[b] = [c, a._events[b]])
  else a.on(b, c)
}
function od(a, b) {
  a = a || {}
  this.objectMode = !!a.objectMode
  b instanceof V &&
    (this.objectMode = this.objectMode || !!a.readableObjectMode)
  b = a.highWaterMark
  var c = this.objectMode ? 16 : 16384
  this.highWaterMark = b || 0 === b ? b : c
  this.highWaterMark = ~~this.highWaterMark
  this.buffer = new id()
  this.length = 0
  this.pipes = null
  this.pipesCount = 0
  this.flowing = null
  this.reading = this.endEmitted = this.ended = !1
  this.sync = !0
  this.resumeScheduled = this.readableListening = this.emittedReadable = this.needReadable = !1
  this.defaultEncoding = a.defaultEncoding || 'utf8'
  this.ranOut = !1
  this.awaitDrain = 0
  this.readingMore = !1
  this.encoding = this.decoder = null
  a.encoding &&
    ((this.decoder = new kd(a.encoding)), (this.encoding = a.encoding))
}
function P(a) {
  if (!(this instanceof P)) return new P(a)
  this._readableState = new od(a, this)
  this.readable = !0
  a && 'function' === typeof a.read && (this._read = a.read)
  O.call(this)
}
P.prototype.push = function (a, b) {
  var c = this._readableState
  c.objectMode ||
    'string' !== typeof a ||
    ((b = b || c.defaultEncoding),
    b !== c.encoding && ((a = z.from(a, b)), (b = '')))
  return qd(this, c, a, b, !1)
}
P.prototype.unshift = function (a) {
  return qd(this, this._readableState, a, '', !0)
}
P.prototype.isPaused = function () {
  return !1 === this._readableState.flowing
}
function qd(a, b, c, d, e) {
  var f = c
  var g = null
  Na(f) ||
    'string' === typeof f ||
    null === f ||
    void 0 === f ||
    b.objectMode ||
    (g = new TypeError('Invalid non-string/buffer chunk'))
  if ((f = g)) a.emit('error', f)
  else if (null === c)
    (b.reading = !1),
      b.ended ||
        (b.decoder &&
          (c = b.decoder.end()) &&
          c.length &&
          (b.buffer.push(c), (b.length += b.objectMode ? 1 : c.length)),
        (b.ended = !0),
        rd(a))
  else if (b.objectMode || (c && 0 < c.length))
    if (b.ended && !e) a.emit('error', Error('stream.push() after EOF'))
    else if (b.endEmitted && e)
      a.emit('error', Error('stream.unshift() after end event'))
    else {
      if (b.decoder && !e && !d) {
        c = b.decoder.write(c)
        var h = !b.objectMode && 0 === c.length
      }
      e || (b.reading = !1)
      h ||
        (b.flowing && 0 === b.length && !b.sync
          ? (a.emit('data', c), a.read(0))
          : ((b.length += b.objectMode ? 1 : c.length),
            e ? b.buffer.unshift(c) : b.buffer.push(c),
            b.needReadable && rd(a)))
      b.readingMore || ((b.readingMore = !0), G(sd, a, b))
    }
  else e || (b.reading = !1)
  return (
    !b.ended && (b.needReadable || b.length < b.highWaterMark || 0 === b.length)
  )
}
P.prototype.setEncoding = function (a) {
  this._readableState.decoder = new kd(a)
  this._readableState.encoding = a
  return this
}
function td(a, b) {
  if (0 >= a || (0 === b.length && b.ended)) return 0
  if (b.objectMode) return 1
  if (a !== a)
    return b.flowing && b.length ? b.buffer.head.data.length : b.length
  if (a > b.highWaterMark) {
    var c = a
    8388608 <= c
      ? (c = 8388608)
      : (c--,
        (c |= c >>> 1),
        (c |= c >>> 2),
        (c |= c >>> 4),
        (c |= c >>> 8),
        (c |= c >>> 16),
        c++)
    b.highWaterMark = c
  }
  return a <= b.length ? a : b.ended ? b.length : ((b.needReadable = !0), 0)
}
P.prototype.read = function (a) {
  Q('read', a)
  a = parseInt(a, 10)
  var b = this._readableState,
    c = a
  0 !== a && (b.emittedReadable = !1)
  if (0 === a && b.needReadable && (b.length >= b.highWaterMark || b.ended))
    return (
      Q('read: emitReadable', b.length, b.ended),
      0 === b.length && b.ended ? Jd(this) : rd(this),
      null
    )
  a = td(a, b)
  if (0 === a && b.ended) return 0 === b.length && Jd(this), null
  var d = b.needReadable
  Q('need readable', d)
  if (0 === b.length || b.length - a < b.highWaterMark)
    (d = !0), Q('length less than watermark', d)
  b.ended || b.reading
    ? Q('reading or ended', !1)
    : d &&
      (Q('do read'),
      (b.reading = !0),
      (b.sync = !0),
      0 === b.length && (b.needReadable = !0),
      this._read(b.highWaterMark),
      (b.sync = !1),
      b.reading || (a = td(c, b)))
  d = 0 < a ? Kd(a, b) : null
  null === d ? ((b.needReadable = !0), (a = 0)) : (b.length -= a)
  0 === b.length &&
    (b.ended || (b.needReadable = !0), c !== a && b.ended && Jd(this))
  null !== d && this.emit('data', d)
  return d
}
function rd(a) {
  var b = a._readableState
  b.needReadable = !1
  b.emittedReadable ||
    (Q('emitReadable', b.flowing),
    (b.emittedReadable = !0),
    b.sync ? G(Ld, a) : Ld(a))
}
function Ld(a) {
  Q('emit readable')
  a.emit('readable')
  Md(a)
}
function sd(a, b) {
  for (
    var c = b.length;
    !b.reading &&
    !b.flowing &&
    !b.ended &&
    b.length < b.highWaterMark &&
    (Q('maybeReadMore read 0'), a.read(0), c !== b.length);

  )
    c = b.length
  b.readingMore = !1
}
P.prototype._read = function () {
  this.emit('error', Error('not implemented'))
}
P.prototype.pipe = function (a, b) {
  function c(a) {
    Q('onunpipe')
    a === n && e()
  }
  function d() {
    Q('onend')
    a.end()
  }
  function e() {
    Q('cleanup')
    a.removeListener('close', h)
    a.removeListener('finish', k)
    a.removeListener('drain', B)
    a.removeListener('error', g)
    a.removeListener('unpipe', c)
    n.removeListener('end', d)
    n.removeListener('end', e)
    n.removeListener('data', f)
    m = !0
    !q.awaitDrain || (a._writableState && !a._writableState.needDrain) || B()
  }
  function f(b) {
    Q('ondata')
    v = !1
    !1 !== a.write(b) ||
      v ||
      (((1 === q.pipesCount && q.pipes === a) ||
        (1 < q.pipesCount && -1 !== Nd(q.pipes, a))) &&
        !m &&
        (Q('false write response, pause', n._readableState.awaitDrain),
        n._readableState.awaitDrain++,
        (v = !0)),
      n.pause())
  }
  function g(b) {
    Q('onerror', b)
    p()
    a.removeListener('error', g)
    0 === a.listeners('error').length && a.emit('error', b)
  }
  function h() {
    a.removeListener('finish', k)
    p()
  }
  function k() {
    Q('onfinish')
    a.removeListener('close', h)
    p()
  }
  function p() {
    Q('unpipe')
    n.unpipe(a)
  }
  var n = this,
    q = this._readableState
  switch (q.pipesCount) {
    case 0:
      q.pipes = a
      break
    case 1:
      q.pipes = [q.pipes, a]
      break
    default:
      q.pipes.push(a)
  }
  q.pipesCount += 1
  Q('pipe count=%d opts=%j', q.pipesCount, b)
  b = b && !1 === b.end ? e : d
  if (q.endEmitted) G(b)
  else n.once('end', b)
  a.on('unpipe', c)
  var B = Od(n)
  a.on('drain', B)
  var m = !1,
    v = !1
  n.on('data', f)
  pd(a, 'error', g)
  a.once('close', h)
  a.once('finish', k)
  a.emit('pipe', n)
  q.flowing || (Q('pipe resume'), n.resume())
  return a
}
function Od(a) {
  return function () {
    var b = a._readableState
    Q('pipeOnDrain', b.awaitDrain)
    b.awaitDrain && b.awaitDrain--
    0 === b.awaitDrain &&
      a.listeners('data').length &&
      ((b.flowing = !0), Md(a))
  }
}
P.prototype.unpipe = function (a) {
  var b = this._readableState
  if (0 === b.pipesCount) return this
  if (1 === b.pipesCount) {
    if (a && a !== b.pipes) return this
    a || (a = b.pipes)
    b.pipes = null
    b.pipesCount = 0
    b.flowing = !1
    a && a.emit('unpipe', this)
    return this
  }
  if (!a) {
    a = b.pipes
    var c = b.pipesCount
    b.pipes = null
    b.pipesCount = 0
    b.flowing = !1
    for (b = 0; b < c; b++) a[b].emit('unpipe', this)
    return this
  }
  c = Nd(b.pipes, a)
  if (-1 === c) return this
  b.pipes.splice(c, 1)
  --b.pipesCount
  1 === b.pipesCount && (b.pipes = b.pipes[0])
  a.emit('unpipe', this)
  return this
}
P.prototype.on = function (a, b) {
  b = O.prototype.on.call(this, a, b)
  'data' === a
    ? !1 !== this._readableState.flowing && this.resume()
    : 'readable' === a &&
      ((a = this._readableState),
      a.endEmitted ||
        a.readableListening ||
        ((a.readableListening = a.needReadable = !0),
        (a.emittedReadable = !1),
        a.reading ? a.length && rd(this) : G(Pd, this)))
  return b
}
P.prototype.addListener = P.prototype.on
function Pd(a) {
  Q('readable nexttick read 0')
  a.read(0)
}
P.prototype.resume = function () {
  var a = this._readableState
  a.flowing ||
    (Q('resume'),
    (a.flowing = !0),
    a.resumeScheduled || ((a.resumeScheduled = !0), G(Qd, this, a)))
  return this
}
function Qd(a, b) {
  b.reading || (Q('resume read 0'), a.read(0))
  b.resumeScheduled = !1
  b.awaitDrain = 0
  a.emit('resume')
  Md(a)
  b.flowing && !b.reading && a.read(0)
}
P.prototype.pause = function () {
  Q('call pause flowing=%j', this._readableState.flowing)
  !1 !== this._readableState.flowing &&
    (Q('pause'), (this._readableState.flowing = !1), this.emit('pause'))
  return this
}
function Md(a) {
  var b = a._readableState
  for (Q('flow', b.flowing); b.flowing && null !== a.read(); );
}
P.prototype.wrap = function (a) {
  var b = this._readableState,
    c = !1,
    d = this
  a.on('end', function () {
    Q('wrapped end')
    if (b.decoder && !b.ended) {
      var a = b.decoder.end()
      a && a.length && d.push(a)
    }
    d.push(null)
  })
  a.on('data', function (e) {
    Q('wrapped data')
    b.decoder && (e = b.decoder.write(e))
    ;(b.objectMode && (null === e || void 0 === e)) ||
      !(b.objectMode || (e && e.length)) ||
      d.push(e) ||
      ((c = !0), a.pause())
  })
  for (var e in a)
    void 0 === this[e] &&
      'function' === typeof a[e] &&
      (this[e] = (function (b) {
        return function () {
          return a[b].apply(a, arguments)
        }
      })(e))
  Rd(['error', 'close', 'destroy', 'pause', 'resume'], function (b) {
    a.on(b, d.emit.bind(d, b))
  })
  d._read = function (b) {
    Q('wrapped _read', b)
    c && ((c = !1), a.resume())
  }
  return d
}
P._fromList = Kd
function Kd(a, b) {
  if (0 === b.length) return null
  if (b.objectMode) var c = b.buffer.shift()
  else if (!a || a >= b.length)
    (c = b.decoder
      ? b.buffer.join('')
      : 1 === b.buffer.length
      ? b.buffer.head.data
      : b.buffer.concat(b.length)),
      b.buffer.clear()
  else {
    c = b.buffer
    b = b.decoder
    if (a < c.head.data.length)
      (b = c.head.data.slice(0, a)), (c.head.data = c.head.data.slice(a))
    else {
      if (a === c.head.data.length) c = c.shift()
      else if (b) {
        b = c.head
        var d = 1,
          e = b.data
        for (a -= e.length; (b = b.next); ) {
          var f = b.data,
            g = a > f.length ? f.length : a
          e = g === f.length ? e + f : e + f.slice(0, a)
          a -= g
          if (0 === a) {
            g === f.length
              ? (++d, (c.head = b.next ? b.next : (c.tail = null)))
              : ((c.head = b), (b.data = f.slice(g)))
            break
          }
          ++d
        }
        c.length -= d
        c = e
      } else {
        b = z.allocUnsafe(a)
        d = c.head
        e = 1
        d.data.copy(b)
        for (a -= d.data.length; (d = d.next); ) {
          f = d.data
          g = a > f.length ? f.length : a
          f.copy(b, b.length - a, 0, g)
          a -= g
          if (0 === a) {
            g === f.length
              ? (++e, (c.head = d.next ? d.next : (c.tail = null)))
              : ((c.head = d), (d.data = f.slice(g)))
            break
          }
          ++e
        }
        c.length -= e
        c = b
      }
      b = c
    }
    c = b
  }
  return c
}
function Jd(a) {
  var b = a._readableState
  if (0 < b.length) throw Error('"endReadable()" called on non-empty stream')
  b.endEmitted || ((b.ended = !0), G(Sd, b, a))
}
function Sd(a, b) {
  a.endEmitted ||
    0 !== a.length ||
    ((a.endEmitted = !0), (b.readable = !1), b.emit('end'))
}
function Rd(a, b) {
  for (var c = 0, d = a.length; c < d; c++) b(a[c], c)
}
function Nd(a, b) {
  for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c
  return -1
}
W.WritableState = Td
Db(W, O)
function Ud() {}
function Vd(a, b, c) {
  this.chunk = a
  this.encoding = b
  this.callback = c
  this.next = null
}
function Td(a, b) {
  Object.defineProperty(this, 'buffer', {
    get: Ib(function () {
      return this.getBuffer()
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.'),
  })
  a = a || {}
  this.objectMode = !!a.objectMode
  b instanceof V &&
    (this.objectMode = this.objectMode || !!a.writableObjectMode)
  var c = a.highWaterMark,
    d = this.objectMode ? 16 : 16384
  this.highWaterMark = c || 0 === c ? c : d
  this.highWaterMark = ~~this.highWaterMark
  this.finished = this.ended = this.ending = this.needDrain = !1
  this.decodeStrings = !1 !== a.decodeStrings
  this.defaultEncoding = a.defaultEncoding || 'utf8'
  this.length = 0
  this.writing = !1
  this.corked = 0
  this.sync = !0
  this.bufferProcessing = !1
  this.onwrite = function (a) {
    var c = b._writableState,
      d = c.sync,
      e = c.writecb
    c.writing = !1
    c.writecb = null
    c.length -= c.writelen
    c.writelen = 0
    a
      ? (--c.pendingcb,
        d ? G(e, a) : e(a),
        (b._writableState.errorEmitted = !0),
        b.emit('error', a))
      : ((a = Wd(c)) ||
          c.corked ||
          c.bufferProcessing ||
          !c.bufferedRequest ||
          Xd(b, c),
        d ? G(Yd, b, c, a, e) : Yd(b, c, a, e))
  }
  this.writecb = null
  this.writelen = 0
  this.lastBufferedRequest = this.bufferedRequest = null
  this.pendingcb = 0
  this.errorEmitted = this.prefinished = !1
  this.bufferedRequestCount = 0
  this.corkedRequestsFree = new Zd(this)
}
Td.prototype.getBuffer = function () {
  for (var a = this.bufferedRequest, b = []; a; ) b.push(a), (a = a.next)
  return b
}
function W(a) {
  if (!(this instanceof W || this instanceof V)) return new W(a)
  this._writableState = new Td(a, this)
  this.writable = !0
  a &&
    ('function' === typeof a.write && (this._write = a.write),
    'function' === typeof a.writev && (this._writev = a.writev))
  O.call(this)
}
W.prototype.pipe = function () {
  this.emit('error', Error('Cannot pipe, not readable'))
}
W.prototype.write = function (a, b, c) {
  var d = this._writableState,
    e = !1
  'function' === typeof b && ((c = b), (b = null))
  z.isBuffer(a) ? (b = 'buffer') : b || (b = d.defaultEncoding)
  'function' !== typeof c && (c = Ud)
  if (d.ended)
    (d = c), (a = Error('write after end')), this.emit('error', a), G(d, a)
  else {
    var f = c,
      g = !0,
      h = !1
    null === a
      ? (h = new TypeError('May not write null values to stream'))
      : z.isBuffer(a) ||
        'string' === typeof a ||
        void 0 === a ||
        d.objectMode ||
        (h = new TypeError('Invalid non-string/buffer chunk'))
    h && (this.emit('error', h), G(f, h), (g = !1))
    g &&
      (d.pendingcb++,
      (e = b),
      d.objectMode ||
        !1 === d.decodeStrings ||
        'string' !== typeof a ||
        (a = z.from(a, e)),
      z.isBuffer(a) && (e = 'buffer'),
      (f = d.objectMode ? 1 : a.length),
      (d.length += f),
      (b = d.length < d.highWaterMark),
      b || (d.needDrain = !0),
      d.writing || d.corked
        ? ((f = d.lastBufferedRequest),
          (d.lastBufferedRequest = new Vd(a, e, c)),
          f
            ? (f.next = d.lastBufferedRequest)
            : (d.bufferedRequest = d.lastBufferedRequest),
          (d.bufferedRequestCount += 1))
        : $d(this, d, !1, f, a, e, c),
      (e = b))
  }
  return e
}
W.prototype.cork = function () {
  this._writableState.corked++
}
W.prototype.uncork = function () {
  var a = this._writableState
  a.corked &&
    (a.corked--,
    a.writing ||
      a.corked ||
      a.finished ||
      a.bufferProcessing ||
      !a.bufferedRequest ||
      Xd(this, a))
}
W.prototype.setDefaultEncoding = function (a) {
  'string' === typeof a && (a = a.toLowerCase())
  if (
    !(
      -1 <
      'hex utf8 utf-8 ascii binary base64 ucs2 ucs-2 utf16le utf-16le raw'
        .split(' ')
        .indexOf((a + '').toLowerCase())
    )
  )
    throw new TypeError('Unknown encoding: ' + a)
  this._writableState.defaultEncoding = a
  return this
}
function $d(a, b, c, d, e, f, g) {
  b.writelen = d
  b.writecb = g
  b.writing = !0
  b.sync = !0
  c ? a._writev(e, b.onwrite) : a._write(e, f, b.onwrite)
  b.sync = !1
}
function Yd(a, b, c, d) {
  !c && 0 === b.length && b.needDrain && ((b.needDrain = !1), a.emit('drain'))
  b.pendingcb--
  d()
  ae(a, b)
}
function Xd(a, b) {
  b.bufferProcessing = !0
  var c = b.bufferedRequest
  if (a._writev && c && c.next) {
    var d = Array(b.bufferedRequestCount),
      e = b.corkedRequestsFree
    e.entry = c
    for (var f = 0; c; ) (d[f] = c), (c = c.next), (f += 1)
    $d(a, b, !0, b.length, d, '', e.finish)
    b.pendingcb++
    b.lastBufferedRequest = null
    e.next
      ? ((b.corkedRequestsFree = e.next), (e.next = null))
      : (b.corkedRequestsFree = new Zd(b))
  } else {
    for (
      ;
      c &&
      ((d = c.chunk),
      $d(a, b, !1, b.objectMode ? 1 : d.length, d, c.encoding, c.callback),
      (c = c.next),
      !b.writing);

    );
    null === c && (b.lastBufferedRequest = null)
  }
  b.bufferedRequestCount = 0
  b.bufferedRequest = c
  b.bufferProcessing = !1
}
W.prototype._write = function (a, b, c) {
  c(Error('not implemented'))
}
W.prototype._writev = null
W.prototype.end = function (a, b, c) {
  var d = this._writableState
  'function' === typeof a
    ? ((c = a), (b = a = null))
    : 'function' === typeof b && ((c = b), (b = null))
  null !== a && void 0 !== a && this.write(a, b)
  d.corked && ((d.corked = 1), this.uncork())
  if (!d.ending && !d.finished) {
    a = c
    d.ending = !0
    ae(this, d)
    if (a)
      if (d.finished) G(a)
      else this.once('finish', a)
    d.ended = !0
    this.writable = !1
  }
}
function Wd(a) {
  return (
    a.ending &&
    0 === a.length &&
    null === a.bufferedRequest &&
    !a.finished &&
    !a.writing
  )
}
function ae(a, b) {
  var c = Wd(b)
  c &&
    (0 === b.pendingcb
      ? (b.prefinished || ((b.prefinished = !0), a.emit('prefinish')),
        (b.finished = !0),
        a.emit('finish'))
      : b.prefinished || ((b.prefinished = !0), a.emit('prefinish')))
  return c
}
function Zd(a) {
  var b = this
  this.entry = this.next = null
  this.finish = function (c) {
    var d = b.entry
    for (b.entry = null; d; ) {
      var e = d.callback
      a.pendingcb--
      e(c)
      d = d.next
    }
    a.corkedRequestsFree
      ? (a.corkedRequestsFree.next = b)
      : (a.corkedRequestsFree = b)
  }
}
Db(V, P)
for (var be = Object.keys(W.prototype), ce = 0; ce < be.length; ce++) {
  var de = be[ce]
  V.prototype[de] || (V.prototype[de] = W.prototype[de])
}
function V(a) {
  if (!(this instanceof V)) return new V(a)
  P.call(this, a)
  W.call(this, a)
  a && !1 === a.readable && (this.readable = !1)
  a && !1 === a.writable && (this.writable = !1)
  this.allowHalfOpen = !0
  a && !1 === a.allowHalfOpen && (this.allowHalfOpen = !1)
  this.once('end', ee)
}
function ee() {
  this.allowHalfOpen || this._writableState.ended || G(fe, this)
}
function fe(a) {
  a.end()
}
Db(X, V)
function ge(a) {
  this.afterTransform = function (b, c) {
    var d = a._transformState
    d.transforming = !1
    var e = d.writecb
    e
      ? ((d.writechunk = null),
        (d.writecb = null),
        null !== c && void 0 !== c && a.push(c),
        e(b),
        (b = a._readableState),
        (b.reading = !1),
        (b.needReadable || b.length < b.highWaterMark) &&
          a._read(b.highWaterMark),
        (b = void 0))
      : (b = a.emit('error', Error('no writecb in Transform class')))
    return b
  }
  this.transforming = this.needTransform = !1
  this.writeencoding = this.writechunk = this.writecb = null
}
function X(a) {
  if (!(this instanceof X)) return new X(a)
  V.call(this, a)
  this._transformState = new ge(this)
  var b = this
  this._readableState.needReadable = !0
  this._readableState.sync = !1
  a &&
    ('function' === typeof a.transform && (this._transform = a.transform),
    'function' === typeof a.flush && (this._flush = a.flush))
  this.once('prefinish', function () {
    'function' === typeof this._flush
      ? this._flush(function (a) {
          he(b, a)
        })
      : he(b)
  })
}
X.prototype.push = function (a, b) {
  this._transformState.needTransform = !1
  return V.prototype.push.call(this, a, b)
}
X.prototype._transform = function () {
  throw Error('Not implemented')
}
X.prototype._write = function (a, b, c) {
  var d = this._transformState
  d.writecb = c
  d.writechunk = a
  d.writeencoding = b
  d.transforming ||
    ((a = this._readableState),
    (d.needTransform || a.needReadable || a.length < a.highWaterMark) &&
      this._read(a.highWaterMark))
}
X.prototype._read = function () {
  var a = this._transformState
  null !== a.writechunk && a.writecb && !a.transforming
    ? ((a.transforming = !0),
      this._transform(a.writechunk, a.writeencoding, a.afterTransform))
    : (a.needTransform = !0)
}
function he(a, b) {
  if (b) return a.emit('error', b)
  b = a._transformState
  if (a._writableState.length)
    throw Error('Calling transform done when ws.length != 0')
  if (b.transforming)
    throw Error('Calling transform done when still transforming')
  return a.push(null)
}
Db(ie, X)
function ie(a) {
  if (!(this instanceof ie)) return new ie(a)
  X.call(this, a)
}
ie.prototype._transform = function (a, b, c) {
  c(null, a)
}
Db(Y, O)
Y.Readable = P
Y.Writable = W
Y.Duplex = V
Y.Transform = X
Y.PassThrough = ie
Y.Stream = Y
function Y() {
  O.call(this)
}
Y.prototype.pipe = function (a, b) {
  function c(b) {
    a.writable && !1 === a.write(b) && k.pause && k.pause()
  }
  function d() {
    k.readable && k.resume && k.resume()
  }
  function e() {
    p || ((p = !0), a.end())
  }
  function f() {
    p || ((p = !0), 'function' === typeof a.destroy && a.destroy())
  }
  function g(a) {
    h()
    if (0 === O.listenerCount(this, 'error')) throw a
  }
  function h() {
    k.removeListener('data', c)
    a.removeListener('drain', d)
    k.removeListener('end', e)
    k.removeListener('close', f)
    k.removeListener('error', g)
    a.removeListener('error', g)
    k.removeListener('end', h)
    k.removeListener('close', h)
    a.removeListener('close', h)
  }
  var k = this
  k.on('data', c)
  a.on('drain', d)
  a._isStdio || (b && !1 === b.end) || (k.on('end', e), k.on('close', f))
  var p = !1
  k.on('error', g)
  a.on('error', g)
  k.on('end', h)
  k.on('close', h)
  a.on('close', h)
  a.emit('pipe', k)
  return a
}
var je = Array.prototype.slice,
  le = {
    extend: function ke(a, b) {
      for (var d in b) a[d] = b[d]
      return 3 > arguments.length
        ? a
        : ke.apply(null, [a].concat(je.call(arguments, 2)))
    },
  },
  me = u(function (a, b) {
    function c(a, b, c) {
      void 0 === c &&
        (c = function (a) {
          return a
        })
      return function () {
        for (var e = [], f = 0; f < arguments.length; f++) e[f] = arguments[f]
        return new Promise(function (f, g) {
          a[b].bind(a).apply(
            void 0,
            d(e, [
              function (a, b) {
                return a ? g(a) : f(c(b))
              },
            ])
          )
        })
      }
    }
    var d =
      (l && l.__spreadArrays) ||
      function () {
        for (var a = 0, b = 0, c = arguments.length; b < c; b++)
          a += arguments[b].length
        a = Array(a)
        var d = 0
        for (b = 0; b < c; b++)
          for (var e = arguments[b], n = 0, q = e.length; n < q; n++, d++)
            a[d] = e[n]
        return a
      }
    Object.defineProperty(b, '__esModule', { value: !0 })
    var e = (function () {
      function a(a, b) {
        this.vol = a
        this.fd = b
      }
      a.prototype.appendFile = function (a, b) {
        return c(this.vol, 'appendFile')(this.fd, a, b)
      }
      a.prototype.chmod = function (a) {
        return c(this.vol, 'fchmod')(this.fd, a)
      }
      a.prototype.chown = function (a, b) {
        return c(this.vol, 'fchown')(this.fd, a, b)
      }
      a.prototype.close = function () {
        return c(this.vol, 'close')(this.fd)
      }
      a.prototype.datasync = function () {
        return c(this.vol, 'fdatasync')(this.fd)
      }
      a.prototype.read = function (a, b, d, e) {
        return c(this.vol, 'read', function (b) {
          return { bytesRead: b, buffer: a }
        })(this.fd, a, b, d, e)
      }
      a.prototype.readFile = function (a) {
        return c(this.vol, 'readFile')(this.fd, a)
      }
      a.prototype.stat = function (a) {
        return c(this.vol, 'fstat')(this.fd, a)
      }
      a.prototype.sync = function () {
        return c(this.vol, 'fsync')(this.fd)
      }
      a.prototype.truncate = function (a) {
        return c(this.vol, 'ftruncate')(this.fd, a)
      }
      a.prototype.utimes = function (a, b) {
        return c(this.vol, 'futimes')(this.fd, a, b)
      }
      a.prototype.write = function (a, b, d, e) {
        return c(this.vol, 'write', function (b) {
          return { bytesWritten: b, buffer: a }
        })(this.fd, a, b, d, e)
      }
      a.prototype.writeFile = function (a, b) {
        return c(this.vol, 'writeFile')(this.fd, a, b)
      }
      return a
    })()
    b.FileHandle = e
    b.default = function (a) {
      return 'undefined' === typeof Promise
        ? null
        : {
            FileHandle: e,
            access: function (b, d) {
              return c(a, 'access')(b, d)
            },
            appendFile: function (b, d, f) {
              return c(a, 'appendFile')(b instanceof e ? b.fd : b, d, f)
            },
            chmod: function (b, d) {
              return c(a, 'chmod')(b, d)
            },
            chown: function (b, d, e) {
              return c(a, 'chown')(b, d, e)
            },
            copyFile: function (b, d, e) {
              return c(a, 'copyFile')(b, d, e)
            },
            lchmod: function (b, d) {
              return c(a, 'lchmod')(b, d)
            },
            lchown: function (b, d, e) {
              return c(a, 'lchown')(b, d, e)
            },
            link: function (b, d) {
              return c(a, 'link')(b, d)
            },
            lstat: function (b, d) {
              return c(a, 'lstat')(b, d)
            },
            mkdir: function (b, d) {
              return c(a, 'mkdir')(b, d)
            },
            mkdtemp: function (b, d) {
              return c(a, 'mkdtemp')(b, d)
            },
            open: function (b, d, f) {
              return c(a, 'open', function (b) {
                return new e(a, b)
              })(b, d, f)
            },
            readdir: function (b, d) {
              return c(a, 'readdir')(b, d)
            },
            readFile: function (b, d) {
              return c(a, 'readFile')(b instanceof e ? b.fd : b, d)
            },
            readlink: function (b, d) {
              return c(a, 'readlink')(b, d)
            },
            realpath: function (b, d) {
              return c(a, 'realpath')(b, d)
            },
            rename: function (b, d) {
              return c(a, 'rename')(b, d)
            },
            rmdir: function (b) {
              return c(a, 'rmdir')(b)
            },
            stat: function (b, d) {
              return c(a, 'stat')(b, d)
            },
            symlink: function (b, d, e) {
              return c(a, 'symlink')(b, d, e)
            },
            truncate: function (b, d) {
              return c(a, 'truncate')(b, d)
            },
            unlink: function (b) {
              return c(a, 'unlink')(b)
            },
            utimes: function (b, d, e) {
              return c(a, 'utimes')(b, d, e)
            },
            writeFile: function (b, d, f) {
              return c(a, 'writeFile')(b instanceof e ? b.fd : b, d, f)
            },
          }
    }
  })
t(me)
var ne = /[^\x20-\x7E]/,
  oe = /[\x2E\u3002\uFF0E\uFF61]/g,
  pe = {
    overflow: 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input',
  },
  qe = Math.floor,
  re = String.fromCharCode
function se(a, b) {
  var c = a.split('@'),
    d = ''
  1 < c.length && ((d = c[0] + '@'), (a = c[1]))
  a = a.replace(oe, '.')
  a = a.split('.')
  c = a.length
  for (var e = []; c--; ) e[c] = b(a[c])
  b = e.join('.')
  return d + b
}
function te(a, b) {
  return a + 22 + 75 * (26 > a) - ((0 != b) << 5)
}
function ue(a) {
  return se(a, function (a) {
    if (ne.test(a)) {
      var b
      var d = []
      var e = []
      var f = 0
      for (b = a.length; f < b; ) {
        var g = a.charCodeAt(f++)
        if (55296 <= g && 56319 >= g && f < b) {
          var h = a.charCodeAt(f++)
          56320 == (h & 64512)
            ? e.push(((g & 1023) << 10) + (h & 1023) + 65536)
            : (e.push(g), f--)
        } else e.push(g)
      }
      a = e
      h = a.length
      e = 128
      var k = 0
      var p = 72
      for (g = 0; g < h; ++g) {
        var n = a[g]
        128 > n && d.push(re(n))
      }
      for ((f = b = d.length) && d.push('-'); f < h; ) {
        var q = 2147483647
        for (g = 0; g < h; ++g) (n = a[g]), n >= e && n < q && (q = n)
        var B = f + 1
        if (q - e > qe((2147483647 - k) / B)) throw new RangeError(pe.overflow)
        k += (q - e) * B
        e = q
        for (g = 0; g < h; ++g) {
          n = a[g]
          if (n < e && 2147483647 < ++k) throw new RangeError(pe.overflow)
          if (n == e) {
            var m = k
            for (q = 36; ; q += 36) {
              n = q <= p ? 1 : q >= p + 26 ? 26 : q - p
              if (m < n) break
              var v = m - n
              m = 36 - n
              d.push(re(te(n + (v % m), 0)))
              m = qe(v / m)
            }
            d.push(re(te(m, 0)))
            p = B
            q = 0
            k = f == b ? qe(k / 700) : k >> 1
            for (k += qe(k / p); 455 < k; q += 36) k = qe(k / 35)
            p = qe(q + (36 * k) / (k + 38))
            k = 0
            ++f
          }
        }
        ++k
        ++e
      }
      d = 'xn--' + d.join('')
    } else d = a
    return d
  })
}
var ve =
  Array.isArray ||
  function (a) {
    return '[object Array]' === Object.prototype.toString.call(a)
  }
function we(a) {
  switch (typeof a) {
    case 'string':
      return a
    case 'boolean':
      return a ? 'true' : 'false'
    case 'number':
      return isFinite(a) ? a : ''
    default:
      return ''
  }
}
function xe(a, b, c, d) {
  b = b || '&'
  c = c || '='
  null === a && (a = void 0)
  return 'object' === typeof a
    ? ye(ze(a), function (d) {
        var e = encodeURIComponent(we(d)) + c
        return ve(a[d])
          ? ye(a[d], function (a) {
              return e + encodeURIComponent(we(a))
            }).join(b)
          : e + encodeURIComponent(we(a[d]))
      }).join(b)
    : d
    ? encodeURIComponent(we(d)) + c + encodeURIComponent(we(a))
    : ''
}
function ye(a, b) {
  if (a.map) return a.map(b)
  for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d], d))
  return c
}
var ze =
  Object.keys ||
  function (a) {
    var b = [],
      c
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c)
    return b
  }
function Ae(a, b, c, d) {
  c = c || '='
  var e = {}
  if ('string' !== typeof a || 0 === a.length) return e
  var f = /\+/g
  a = a.split(b || '&')
  b = 1e3
  d && 'number' === typeof d.maxKeys && (b = d.maxKeys)
  d = a.length
  0 < b && d > b && (d = b)
  for (b = 0; b < d; ++b) {
    var g = a[b].replace(f, '%20'),
      h = g.indexOf(c)
    if (0 <= h) {
      var k = g.substr(0, h)
      g = g.substr(h + 1)
    } else (k = g), (g = '')
    k = decodeURIComponent(k)
    g = decodeURIComponent(g)
    Object.prototype.hasOwnProperty.call(e, k)
      ? ve(e[k])
        ? e[k].push(g)
        : (e[k] = [e[k], g])
      : (e[k] = g)
  }
  return e
}
var Fe = { parse: Be, resolve: Ce, resolveObject: De, format: Ee, Url: Z }
function Z() {
  this.href = this.path = this.pathname = this.query = this.search = this.hash = this.hostname = this.port = this.host = this.auth = this.slashes = this.protocol = null
}
var Ge = /^([a-z0-9.+-]+:)/i,
  He = /:[0-9]*$/,
  Ie = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  Je = '{}|\\^`'.split('').concat('<>"` \r\n\t'.split('')),
  Ke = ["'"].concat(Je),
  Le = ['%', '/', '?', ';', '#'].concat(Ke),
  Me = ['/', '?', '#'],
  Ne = 255,
  Oe = /^[+a-z0-9A-Z_-]{0,63}$/,
  Pe = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  Qe = { javascript: !0, 'javascript:': !0 },
  Re = { javascript: !0, 'javascript:': !0 },
  Se = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    'http:': !0,
    'https:': !0,
    'ftp:': !0,
    'gopher:': !0,
    'file:': !0,
  }
function Be(a, b, c) {
  if (a && Hb(a) && a instanceof Z) return a
  var d = new Z()
  d.parse(a, b, c)
  return d
}
Z.prototype.parse = function (a, b, c) {
  return Te(this, a, b, c)
}
function Te(a, b, c, d) {
  if (!Gb(b))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof b)
  var e = b.indexOf('?')
  e = -1 !== e && e < b.indexOf('#') ? '?' : '#'
  b = b.split(e)
  b[0] = b[0].replace(/\\/g, '/')
  b = b.join(e)
  e = b.trim()
  if (!d && 1 === b.split('#').length && (b = Ie.exec(e)))
    return (
      (a.path = e),
      (a.href = e),
      (a.pathname = b[1]),
      b[2]
        ? ((a.search = b[2]),
          (a.query = c ? Ae(a.search.substr(1)) : a.search.substr(1)))
        : c && ((a.search = ''), (a.query = {})),
      a
    )
  if ((b = Ge.exec(e))) {
    b = b[0]
    var f = b.toLowerCase()
    a.protocol = f
    e = e.substr(b.length)
  }
  if (d || b || e.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var g = '//' === e.substr(0, 2)
    !g || (b && Re[b]) || ((e = e.substr(2)), (a.slashes = !0))
  }
  if (!Re[b] && (g || (b && !Se[b]))) {
    b = -1
    for (d = 0; d < Me.length; d++)
      (g = e.indexOf(Me[d])), -1 !== g && (-1 === b || g < b) && (b = g)
    g = -1 === b ? e.lastIndexOf('@') : e.lastIndexOf('@', b)
    ;-1 !== g &&
      ((d = e.slice(0, g)),
      (e = e.slice(g + 1)),
      (a.auth = decodeURIComponent(d)))
    b = -1
    for (d = 0; d < Le.length; d++)
      (g = e.indexOf(Le[d])), -1 !== g && (-1 === b || g < b) && (b = g)
    ;-1 === b && (b = e.length)
    a.host = e.slice(0, b)
    e = e.slice(b)
    Ue(a)
    a.hostname = a.hostname || ''
    g = '[' === a.hostname[0] && ']' === a.hostname[a.hostname.length - 1]
    if (!g) {
      var h = a.hostname.split(/\./)
      d = 0
      for (b = h.length; d < b; d++) {
        var k = h[d]
        if (k && !k.match(Oe)) {
          for (var p = '', n = 0, q = k.length; n < q; n++)
            p = 127 < k.charCodeAt(n) ? p + 'x' : p + k[n]
          if (!p.match(Oe)) {
            b = h.slice(0, d)
            d = h.slice(d + 1)
            if ((k = k.match(Pe))) b.push(k[1]), d.unshift(k[2])
            d.length && (e = '/' + d.join('.') + e)
            a.hostname = b.join('.')
            break
          }
        }
      }
    }
    a.hostname = a.hostname.length > Ne ? '' : a.hostname.toLowerCase()
    g || (a.hostname = ue(a.hostname))
    d = a.port ? ':' + a.port : ''
    a.host = (a.hostname || '') + d
    a.href += a.host
    g &&
      ((a.hostname = a.hostname.substr(1, a.hostname.length - 2)),
      '/' !== e[0] && (e = '/' + e))
  }
  if (!Qe[f])
    for (d = 0, b = Ke.length; d < b; d++)
      (g = Ke[d]),
        -1 !== e.indexOf(g) &&
          ((k = encodeURIComponent(g)),
          k === g && (k = escape(g)),
          (e = e.split(g).join(k)))
  d = e.indexOf('#')
  ;-1 !== d && ((a.hash = e.substr(d)), (e = e.slice(0, d)))
  d = e.indexOf('?')
  ;-1 !== d
    ? ((a.search = e.substr(d)),
      (a.query = e.substr(d + 1)),
      c && (a.query = Ae(a.query)),
      (e = e.slice(0, d)))
    : c && ((a.search = ''), (a.query = {}))
  e && (a.pathname = e)
  Se[f] && a.hostname && !a.pathname && (a.pathname = '/')
  if (a.pathname || a.search)
    (d = a.pathname || ''), (a.path = d + (a.search || ''))
  a.href = Ve(a)
  return a
}
function Ee(a) {
  Gb(a) && (a = Te({}, a))
  return Ve(a)
}
function Ve(a) {
  var b = a.auth || ''
  b && ((b = encodeURIComponent(b)), (b = b.replace(/%3A/i, ':')), (b += '@'))
  var c = a.protocol || '',
    d = a.pathname || '',
    e = a.hash || '',
    f = !1,
    g = ''
  a.host
    ? (f = b + a.host)
    : a.hostname &&
      ((f =
        b +
        (-1 === a.hostname.indexOf(':')
          ? a.hostname
          : '[' + this.hostname + ']')),
      a.port && (f += ':' + a.port))
  a.query && Hb(a.query) && Object.keys(a.query).length && (g = xe(a.query))
  b = a.search || (g && '?' + g) || ''
  c && ':' !== c.substr(-1) && (c += ':')
  a.slashes || ((!c || Se[c]) && !1 !== f)
    ? ((f = '//' + (f || '')), d && '/' !== d.charAt(0) && (d = '/' + d))
    : f || (f = '')
  e && '#' !== e.charAt(0) && (e = '#' + e)
  b && '?' !== b.charAt(0) && (b = '?' + b)
  d = d.replace(/[?#]/g, function (a) {
    return encodeURIComponent(a)
  })
  b = b.replace('#', '%23')
  return c + f + d + b + e
}
Z.prototype.format = function () {
  return Ve(this)
}
function Ce(a, b) {
  return Be(a, !1, !0).resolve(b)
}
Z.prototype.resolve = function (a) {
  return this.resolveObject(Be(a, !1, !0)).format()
}
function De(a, b) {
  return a ? Be(a, !1, !0).resolveObject(b) : b
}
Z.prototype.resolveObject = function (a) {
  if (Gb(a)) {
    var b = new Z()
    b.parse(a, !1, !0)
    a = b
  }
  b = new Z()
  for (var c = Object.keys(this), d = 0; d < c.length; d++) {
    var e = c[d]
    b[e] = this[e]
  }
  b.hash = a.hash
  if ('' === a.href) return (b.href = b.format()), b
  if (a.slashes && !a.protocol) {
    c = Object.keys(a)
    for (d = 0; d < c.length; d++) (e = c[d]), 'protocol' !== e && (b[e] = a[e])
    Se[b.protocol] && b.hostname && !b.pathname && (b.path = b.pathname = '/')
    b.href = b.format()
    return b
  }
  var f
  if (a.protocol && a.protocol !== b.protocol) {
    if (!Se[a.protocol]) {
      c = Object.keys(a)
      for (d = 0; d < c.length; d++) (e = c[d]), (b[e] = a[e])
      b.href = b.format()
      return b
    }
    b.protocol = a.protocol
    if (a.host || Re[a.protocol]) b.pathname = a.pathname
    else {
      for (
        f = (a.pathname || '').split('/');
        f.length && !(a.host = f.shift());

      );
      a.host || (a.host = '')
      a.hostname || (a.hostname = '')
      '' !== f[0] && f.unshift('')
      2 > f.length && f.unshift('')
      b.pathname = f.join('/')
    }
    b.search = a.search
    b.query = a.query
    b.host = a.host || ''
    b.auth = a.auth
    b.hostname = a.hostname || a.host
    b.port = a.port
    if (b.pathname || b.search) b.path = (b.pathname || '') + (b.search || '')
    b.slashes = b.slashes || a.slashes
    b.href = b.format()
    return b
  }
  c = b.pathname && '/' === b.pathname.charAt(0)
  var g = a.host || (a.pathname && '/' === a.pathname.charAt(0)),
    h = (c = g || c || (b.host && a.pathname))
  d = (b.pathname && b.pathname.split('/')) || []
  e = b.protocol && !Se[b.protocol]
  f = (a.pathname && a.pathname.split('/')) || []
  e &&
    ((b.hostname = ''),
    (b.port = null),
    b.host && ('' === d[0] ? (d[0] = b.host) : d.unshift(b.host)),
    (b.host = ''),
    a.protocol &&
      ((a.hostname = null),
      (a.port = null),
      a.host && ('' === f[0] ? (f[0] = a.host) : f.unshift(a.host)),
      (a.host = null)),
    (c = c && ('' === f[0] || '' === d[0])))
  if (g)
    (b.host = a.host || '' === a.host ? a.host : b.host),
      (b.hostname = a.hostname || '' === a.hostname ? a.hostname : b.hostname),
      (b.search = a.search),
      (b.query = a.query),
      (d = f)
  else if (f.length)
    d || (d = []),
      d.pop(),
      (d = d.concat(f)),
      (b.search = a.search),
      (b.query = a.query)
  else if (null != a.search) {
    e &&
      ((b.hostname = b.host = d.shift()),
      (e = b.host && 0 < b.host.indexOf('@') ? b.host.split('@') : !1)) &&
      ((b.auth = e.shift()), (b.host = b.hostname = e.shift()))
    b.search = a.search
    b.query = a.query
    if (null !== b.pathname || null !== b.search)
      b.path = (b.pathname ? b.pathname : '') + (b.search ? b.search : '')
    b.href = b.format()
    return b
  }
  if (!d.length)
    return (
      (b.pathname = null),
      (b.path = b.search ? '/' + b.search : null),
      (b.href = b.format()),
      b
    )
  g = d.slice(-1)[0]
  f =
    ((b.host || a.host || 1 < d.length) && ('.' === g || '..' === g)) ||
    '' === g
  for (var k = 0, p = d.length; 0 <= p; p--)
    (g = d[p]),
      '.' === g
        ? d.splice(p, 1)
        : '..' === g
        ? (d.splice(p, 1), k++)
        : k && (d.splice(p, 1), k--)
  if (!c && !h) for (; k--; k) d.unshift('..')
  !c || '' === d[0] || (d[0] && '/' === d[0].charAt(0)) || d.unshift('')
  f && '/' !== d.join('/').substr(-1) && d.push('')
  h = '' === d[0] || (d[0] && '/' === d[0].charAt(0))
  e &&
    ((b.hostname = b.host = h ? '' : d.length ? d.shift() : ''),
    (e = b.host && 0 < b.host.indexOf('@') ? b.host.split('@') : !1)) &&
    ((b.auth = e.shift()), (b.host = b.hostname = e.shift()))
  ;(c = c || (b.host && d.length)) && !h && d.unshift('')
  d.length ? (b.pathname = d.join('/')) : ((b.pathname = null), (b.path = null))
  if (null !== b.pathname || null !== b.search)
    b.path = (b.pathname ? b.pathname : '') + (b.search ? b.search : '')
  b.auth = a.auth || b.auth
  b.slashes = b.slashes || a.slashes
  b.href = b.format()
  return b
}
Z.prototype.parseHost = function () {
  return Ue(this)
}
function Ue(a) {
  var b = a.host,
    c = He.exec(b)
  c &&
    ((c = c[0]),
    ':' !== c && (a.port = c.substr(1)),
    (b = b.substr(0, b.length - c.length)))
  b && (a.hostname = b)
}
var We = u(function (a, b) {
  function c(a, b) {
    a = a[b]
    return 0 < b && ('/' === a || (e && '\\' === a))
  }
  function d(a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !0
    if (e) {
      var d = a
      if ('string' !== typeof d) throw new TypeError('expected a string')
      d = d.replace(/[\\\/]+/g, '/')
      if (!1 !== b)
        if (((b = d), (d = b.length - 1), 2 > d)) d = b
        else {
          for (; c(b, d); ) d--
          d = b.substr(0, d + 1)
        }
      return d.replace(/^([a-zA-Z]+:|\.\/)/, '')
    }
    return a
  }
  Object.defineProperty(b, '__esModule', { value: !0 })
  b.unixify = d
  b.correctPath = function (a) {
    return d(a.replace(/^\\\\\?\\.:\\/, '\\'))
  }
  var e = 'win32' === Cb.platform
})
t(We)
var Xe = u(function (a, b) {
  function c(a, b) {
    void 0 === b && (b = L.default.cwd())
    return cf(b, a)
  }
  function d(a, b) {
    return 'function' === typeof a ? [e(), a] : [e(a), q(b)]
  }
  function e(a) {
    void 0 === a && (a = {})
    return aa({}, df, a)
  }
  function f(a) {
    return 'number' === typeof a ? aa({}, ud, { mode: a }) : aa({}, ud, a)
  }
  function g(a, b, c, d) {
    void 0 === b && (b = '')
    void 0 === c && (c = '')
    void 0 === d && (d = '')
    var e = ''
    c && (e = " '" + c + "'")
    d && (e += " -> '" + d + "'")
    switch (a) {
      case 'ENOENT':
        return 'ENOENT: no such file or directory, ' + b + e
      case 'EBADF':
        return 'EBADF: bad file descriptor, ' + b + e
      case 'EINVAL':
        return 'EINVAL: invalid argument, ' + b + e
      case 'EPERM':
        return 'EPERM: operation not permitted, ' + b + e
      case 'EPROTO':
        return 'EPROTO: protocol error, ' + b + e
      case 'EEXIST':
        return 'EEXIST: file already exists, ' + b + e
      case 'ENOTDIR':
        return 'ENOTDIR: not a directory, ' + b + e
      case 'EISDIR':
        return 'EISDIR: illegal operation on a directory, ' + b + e
      case 'EACCES':
        return 'EACCES: permission denied, ' + b + e
      case 'ENOTEMPTY':
        return 'ENOTEMPTY: directory not empty, ' + b + e
      case 'EMFILE':
        return 'EMFILE: too many open files, ' + b + e
      case 'ENOSYS':
        return 'ENOSYS: function not implemented, ' + b + e
      default:
        return a + ': error occurred, ' + b + e
    }
  }
  function h(a, b, c, d, e) {
    void 0 === b && (b = '')
    void 0 === c && (c = '')
    void 0 === d && (d = '')
    void 0 === e && (e = Error)
    b = new e(g(a, b, c, d))
    b.code = a
    return b
  }
  function k(a) {
    if ('number' === typeof a) return a
    if ('string' === typeof a) {
      var b = ua[a]
      if ('undefined' !== typeof b) return b
    }
    throw new Pc.TypeError('ERR_INVALID_OPT_VALUE', 'flags', a)
  }
  function p(a, b) {
    if (b) {
      var c = typeof b
      switch (c) {
        case 'string':
          a = aa({}, a, { encoding: b })
          break
        case 'object':
          a = aa({}, a, b)
          break
        default:
          throw TypeError(
            'Expected options to be either an object or a string, but got ' +
              c +
              ' instead'
          )
      }
    } else return a
    'buffer' !== a.encoding && K.assertEncoding(a.encoding)
    return a
  }
  function n(a) {
    return function (b) {
      return p(a, b)
    }
  }
  function q(a) {
    if ('function' !== typeof a) throw TypeError(fa.CB)
    return a
  }
  function B(a) {
    return function (b, c) {
      return 'function' === typeof b ? [a(), b] : [a(b), q(c)]
    }
  }
  function m(a) {
    if ('string' !== typeof a && !F.Buffer.isBuffer(a)) {
      try {
        if (!(a instanceof Fe.URL)) throw new TypeError(fa.PATH_STR)
      } catch (Xa) {
        throw new TypeError(fa.PATH_STR)
      }
      if ('' !== a.hostname)
        throw new Pc.TypeError('ERR_INVALID_FILE_URL_HOST', L.default.platform)
      a = a.pathname
      for (var b = 0; b < a.length; b++)
        if ('%' === a[b]) {
          var c = a.codePointAt(b + 2) | 32
          if ('2' === a[b + 1] && 102 === c)
            throw new Pc.TypeError(
              'ERR_INVALID_FILE_URL_PATH',
              'must not include encoded / characters'
            )
        }
      a = decodeURIComponent(a)
    }
    a = String(a)
    qb(a)
    return a
  }
  function v(a, b) {
    return (a = c(a, b).substr(1)) ? a.split(S) : []
  }
  function xa(a) {
    return v(m(a))
  }
  function La(a, b) {
    void 0 === b && (b = K.ENCODING_UTF8)
    return F.Buffer.isBuffer(a)
      ? a
      : a instanceof Uint8Array
      ? F.bufferFrom(a)
      : F.bufferFrom(String(a), b)
  }
  function $b(a, b) {
    return b && 'buffer' !== b ? a.toString(b) : a
  }
  function qb(a, b) {
    if (-1 !== ('' + a).indexOf('\x00')) {
      a = Error('Path must be a string without null bytes')
      a.code = 'ENOENT'
      if ('function' !== typeof b) throw a
      L.default.nextTick(b, a)
      return !1
    }
    return !0
  }
  function M(a, b) {
    a =
      'number' === typeof a
        ? a
        : 'string' === typeof a
        ? parseInt(a, 8)
        : b
        ? M(b)
        : void 0
    if ('number' !== typeof a || isNaN(a)) throw new TypeError(fa.MODE_INT)
    return a
  }
  function Ya(a) {
    if (a >>> 0 !== a) throw TypeError(fa.FD)
  }
  function ha(a) {
    if ('string' === typeof a && +a == a) return +a
    if (a instanceof Date) return a.getTime() / 1e3
    if (isFinite(a)) return 0 > a ? Date.now() / 1e3 : a
    throw Error('Cannot parse time: ' + a)
  }
  function Ha(a) {
    if ('number' !== typeof a) throw TypeError(fa.UID)
  }
  function Ia(a) {
    if ('number' !== typeof a) throw TypeError(fa.GID)
  }
  function ef(a) {
    a.emit('stop')
  }
  function T(a, b, c) {
    if (!(this instanceof T)) return new T(a, b, c)
    this._vol = a
    c = aa({}, p(c, {}))
    void 0 === c.highWaterMark && (c.highWaterMark = 65536)
    Y.Readable.call(this, c)
    this.path = m(b)
    this.fd = void 0 === c.fd ? null : c.fd
    this.flags = void 0 === c.flags ? 'r' : c.flags
    this.mode = void 0 === c.mode ? 438 : c.mode
    this.start = c.start
    this.end = c.end
    this.autoClose = void 0 === c.autoClose ? !0 : c.autoClose
    this.pos = void 0
    this.bytesRead = 0
    if (void 0 !== this.start) {
      if ('number' !== typeof this.start)
        throw new TypeError('"start" option must be a Number')
      if (void 0 === this.end) this.end = Infinity
      else if ('number' !== typeof this.end)
        throw new TypeError('"end" option must be a Number')
      if (this.start > this.end)
        throw Error('"start" option must be <= "end" option')
      this.pos = this.start
    }
    'number' !== typeof this.fd && this.open()
    this.on('end', function () {
      this.autoClose && this.destroy && this.destroy()
    })
  }
  function ff() {
    this.close()
  }
  function R(a, b, c) {
    if (!(this instanceof R)) return new R(a, b, c)
    this._vol = a
    c = aa({}, p(c, {}))
    Y.Writable.call(this, c)
    this.path = m(b)
    this.fd = void 0 === c.fd ? null : c.fd
    this.flags = void 0 === c.flags ? 'w' : c.flags
    this.mode = void 0 === c.mode ? 438 : c.mode
    this.start = c.start
    this.autoClose = void 0 === c.autoClose ? !0 : !!c.autoClose
    this.pos = void 0
    this.bytesWritten = 0
    if (void 0 !== this.start) {
      if ('number' !== typeof this.start)
        throw new TypeError('"start" option must be a Number')
      if (0 > this.start) throw Error('"start" must be >= zero')
      this.pos = this.start
    }
    c.encoding && this.setDefaultEncoding(c.encoding)
    'number' !== typeof this.fd && this.open()
    this.once('finish', function () {
      this.autoClose && this.close()
    })
  }
  var Ja =
      (l && l.__extends) ||
      (function () {
        function a(b, c) {
          a =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (a, b) {
                a.__proto__ = b
              }) ||
            function (a, b) {
              for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
            }
          return a(b, c)
        }
        return function (b, c) {
          function d() {
            this.constructor = b
          }
          a(b, c)
          b.prototype =
            null === c
              ? Object.create(c)
              : ((d.prototype = c.prototype), new d())
        }
      })(),
    Xb =
      (l && l.__spreadArrays) ||
      function () {
        for (var a = 0, b = 0, c = arguments.length; b < c; b++)
          a += arguments[b].length
        a = Array(a)
        var d = 0
        for (b = 0; b < c; b++)
          for (var e = arguments[b], f = 0, g = e.length; f < g; f++, d++)
            a[d] = e[f]
        return a
      }
  Object.defineProperty(b, '__esModule', { value: !0 })
  var aa = le.extend,
    cf = Zc.resolve,
    mb = w.constants.O_RDONLY,
    Ka = w.constants.O_WRONLY,
    na = w.constants.O_RDWR,
    U = w.constants.O_CREAT,
    nb = w.constants.O_EXCL,
    Za = w.constants.O_TRUNC,
    $a = w.constants.O_APPEND,
    vd = w.constants.O_SYNC,
    gf = w.constants.O_DIRECTORY,
    wd = w.constants.F_OK,
    hf = w.constants.COPYFILE_EXCL,
    jf = w.constants.COPYFILE_FICLONE_FORCE
  var S = Zc.sep
  var xd = Zc.relative
  var Yb = 'win32' === L.default.platform,
    fa = {
      PATH_STR: 'path must be a string or Buffer',
      FD: 'fd must be a file descriptor',
      MODE_INT: 'mode must be an int',
      CB: 'callback must be a function',
      UID: 'uid must be an unsigned int',
      GID: 'gid must be an unsigned int',
      LEN: 'len must be an integer',
      ATIME: 'atime must be an integer',
      MTIME: 'mtime must be an integer',
      PREFIX: 'filename prefix is required',
      BUFFER: 'buffer must be an instance of Buffer or StaticBuffer',
      OFFSET: 'offset must be an integer',
      LENGTH: 'length must be an integer',
      POSITION: 'position must be an integer',
    },
    ua
  ;(function (a) {
    a[(a.r = mb)] = 'r'
    a[(a['r+'] = na)] = 'r+'
    a[(a.rs = mb | vd)] = 'rs'
    a[(a.sr = a.rs)] = 'sr'
    a[(a['rs+'] = na | vd)] = 'rs+'
    a[(a['sr+'] = a['rs+'])] = 'sr+'
    a[(a.w = Ka | U | Za)] = 'w'
    a[(a.wx = Ka | U | Za | nb)] = 'wx'
    a[(a.xw = a.wx)] = 'xw'
    a[(a['w+'] = na | U | Za)] = 'w+'
    a[(a['wx+'] = na | U | Za | nb)] = 'wx+'
    a[(a['xw+'] = a['wx+'])] = 'xw+'
    a[(a.a = Ka | $a | U)] = 'a'
    a[(a.ax = Ka | $a | U | nb)] = 'ax'
    a[(a.xa = a.ax)] = 'xa'
    a[(a['a+'] = na | $a | U)] = 'a+'
    a[(a['ax+'] = na | $a | U | nb)] = 'ax+'
    a[(a['xa+'] = a['ax+'])] = 'xa+'
  })((ua = b.FLAGS || (b.FLAGS = {})))
  b.flagsToNumber = k
  a = { encoding: 'utf8' }
  var ob = n(a),
    yd = B(ob),
    zd = n({ flag: 'r' }),
    Ad = { encoding: 'utf8', mode: 438, flag: ua[ua.w] },
    Bd = n(Ad),
    Cd = { encoding: 'utf8', mode: 438, flag: ua[ua.a] },
    Dd = n(Cd),
    kf = B(Dd),
    Ed = n(a),
    lf = B(Ed),
    ud = { mode: 511, recursive: !1 },
    Fd = { recursive: !1 },
    Gd = n({ encoding: 'utf8', withFileTypes: !1 }),
    mf = B(Gd),
    df = { bigint: !1 }
  b.pathToFilename = m
  if (Yb) {
    var nf = c,
      of = We.unixify
    c = function (a, b) {
      return of(nf(a, b))
    }
  }
  b.filenameToSteps = v
  b.pathToSteps = xa
  b.dataToStr = function (a, b) {
    void 0 === b && (b = K.ENCODING_UTF8)
    return F.Buffer.isBuffer(a)
      ? a.toString(b)
      : a instanceof Uint8Array
      ? F.bufferFrom(a).toString(b)
      : String(a)
  }
  b.dataToBuffer = La
  b.bufferToEncoding = $b
  b.toUnixTimestamp = ha
  a = (function () {
    function a(a) {
      void 0 === a && (a = {})
      this.ino = 0
      this.inodes = {}
      this.releasedInos = []
      this.fds = {}
      this.releasedFds = []
      this.maxFiles = 1e4
      this.openFiles = 0
      this.promisesApi = me.default(this)
      this.statWatchers = {}
      this.props = aa({ Node: fd.Node, Link: fd.Link, File: fd.File }, a)
      a = this.createLink()
      a.setNode(this.createNode(!0))
      var b = this
      this.StatWatcher = (function (a) {
        function c() {
          return a.call(this, b) || this
        }
        Ja(c, a)
        return c
      })(Hd)
      this.ReadStream = (function (a) {
        function c() {
          for (var c = [], d = 0; d < arguments.length; d++) c[d] = arguments[d]
          return a.apply(this, Xb([b], c)) || this
        }
        Ja(c, a)
        return c
      })(T)
      this.WriteStream = (function (a) {
        function c() {
          for (var c = [], d = 0; d < arguments.length; d++) c[d] = arguments[d]
          return a.apply(this, Xb([b], c)) || this
        }
        Ja(c, a)
        return c
      })(R)
      this.FSWatcher = (function (a) {
        function c() {
          return a.call(this, b) || this
        }
        Ja(c, a)
        return c
      })(Id)
      this.root = a
    }
    a.fromJSON = function (b, c) {
      var d = new a()
      d.fromJSON(b, c)
      return d
    }
    Object.defineProperty(a.prototype, 'promises', {
      get: function () {
        if (null === this.promisesApi)
          throw Error('Promise is not supported in this environment.')
        return this.promisesApi
      },
      enumerable: !0,
      configurable: !0,
    })
    a.prototype.createLink = function (a, b, c, d) {
      void 0 === c && (c = !1)
      if (!a) return new this.props.Link(this, null, '')
      if (!b) throw Error('createLink: name cannot be empty')
      return a.createChild(b, this.createNode(c, d))
    }
    a.prototype.deleteLink = function (a) {
      var b = a.parent
      return b ? (b.deleteChild(a), !0) : !1
    }
    a.prototype.newInoNumber = function () {
      var a = this.releasedInos.pop()
      return a ? a : (this.ino = (this.ino + 1) % 4294967295)
    }
    a.prototype.newFdNumber = function () {
      var b = this.releasedFds.pop()
      return 'number' === typeof b ? b : a.fd--
    }
    a.prototype.createNode = function (a, b) {
      void 0 === a && (a = !1)
      b = new this.props.Node(this.newInoNumber(), b)
      a && b.setIsDirectory()
      return (this.inodes[b.ino] = b)
    }
    a.prototype.getNode = function (a) {
      return this.inodes[a]
    }
    a.prototype.deleteNode = function (a) {
      a.del()
      delete this.inodes[a.ino]
      this.releasedInos.push(a.ino)
    }
    a.prototype.genRndStr = function () {
      var a = (Math.random() + 1).toString(36).substr(2, 6)
      return 6 === a.length ? a : this.genRndStr()
    }
    a.prototype.getLink = function (a) {
      return this.root.walk(a)
    }
    a.prototype.getLinkOrThrow = function (a, b) {
      var c = v(a)
      c = this.getLink(c)
      if (!c) throw h('ENOENT', b, a)
      return c
    }
    a.prototype.getResolvedLink = function (a) {
      a = 'string' === typeof a ? v(a) : a
      for (var b = this.root, c = 0; c < a.length; ) {
        b = b.getChild(a[c])
        if (!b) return null
        var d = b.getNode()
        d.isSymlink()
          ? ((a = d.symlink.concat(a.slice(c + 1))), (b = this.root), (c = 0))
          : c++
      }
      return b
    }
    a.prototype.getResolvedLinkOrThrow = function (a, b) {
      var c = this.getResolvedLink(a)
      if (!c) throw h('ENOENT', b, a)
      return c
    }
    a.prototype.resolveSymlinks = function (a) {
      return this.getResolvedLink(a.steps.slice(1))
    }
    a.prototype.getLinkAsDirOrThrow = function (a, b) {
      var c = this.getLinkOrThrow(a, b)
      if (!c.getNode().isDirectory()) throw h('ENOTDIR', b, a)
      return c
    }
    a.prototype.getLinkParent = function (a) {
      return this.root.walk(a, a.length - 1)
    }
    a.prototype.getLinkParentAsDirOrThrow = function (a, b) {
      a = a instanceof Array ? a : v(a)
      var c = this.getLinkParent(a)
      if (!c) throw h('ENOENT', b, S + a.join(S))
      if (!c.getNode().isDirectory()) throw h('ENOTDIR', b, S + a.join(S))
      return c
    }
    a.prototype.getFileByFd = function (a) {
      return this.fds[String(a)]
    }
    a.prototype.getFileByFdOrThrow = function (a, b) {
      if (a >>> 0 !== a) throw TypeError(fa.FD)
      a = this.getFileByFd(a)
      if (!a) throw h('EBADF', b)
      return a
    }
    a.prototype.getNodeByIdOrCreate = function (a, b, c) {
      if ('number' === typeof a) {
        a = this.getFileByFd(a)
        if (!a) throw Error('File nto found')
        return a.node
      }
      var d = xa(a),
        e = this.getLink(d)
      if (e) return e.getNode()
      if (b & U && (b = this.getLinkParent(d)))
        return (e = this.createLink(b, d[d.length - 1], !1, c)), e.getNode()
      throw h('ENOENT', 'getNodeByIdOrCreate', m(a))
    }
    a.prototype.wrapAsync = function (a, b, c) {
      var d = this
      q(c)
      $c.default(function () {
        try {
          c(null, a.apply(d, b))
        } catch (va) {
          c(va)
        }
      })
    }
    a.prototype._toJSON = function (a, b, c) {
      var d
      void 0 === a && (a = this.root)
      void 0 === b && (b = {})
      var e = !0,
        r = a.children
      a.getNode().isFile() &&
        ((r = ((d = {}), (d[a.getName()] = a.parent.getChild(a.getName())), d)),
        (a = a.parent))
      for (var D in r) {
        e = !1
        r = a.getChild(D)
        if (!r) throw Error('_toJSON: unexpected undefined')
        d = r.getNode()
        d.isFile()
          ? ((r = r.getPath()), c && (r = xd(c, r)), (b[r] = d.getString()))
          : d.isDirectory() && this._toJSON(r, b, c)
      }
      a = a.getPath()
      c && (a = xd(c, a))
      a && e && (b[a] = null)
      return b
    }
    a.prototype.toJSON = function (a, b, c) {
      void 0 === b && (b = {})
      void 0 === c && (c = !1)
      var d = []
      if (a) {
        a instanceof Array || (a = [a])
        for (var e = 0; e < a.length; e++) {
          var r = m(a[e])
          ;(r = this.getResolvedLink(r)) && d.push(r)
        }
      } else d.push(this.root)
      if (!d.length) return b
      for (e = 0; e < d.length; e++)
        (r = d[e]), this._toJSON(r, b, c ? r.getPath() : '')
      return b
    }
    a.prototype.fromJSON = function (a, b) {
      void 0 === b && (b = L.default.cwd())
      for (var d in a) {
        var e = a[d]
        if ('string' === typeof e) {
          d = c(d, b)
          var r = v(d)
          1 < r.length &&
            ((r = S + r.slice(0, r.length - 1).join(S)),
            this.mkdirpBase(r, 511))
          this.writeFileSync(d, e)
        } else this.mkdirpBase(d, 511)
      }
    }
    a.prototype.reset = function () {
      this.ino = 0
      this.inodes = {}
      this.releasedInos = []
      this.fds = {}
      this.releasedFds = []
      this.openFiles = 0
      this.root = this.createLink()
      this.root.setNode(this.createNode(!0))
    }
    a.prototype.mountSync = function (a, b) {
      this.fromJSON(b, a)
    }
    a.prototype.openLink = function (a, b, c) {
      void 0 === c && (c = !0)
      if (this.openFiles >= this.maxFiles)
        throw h('EMFILE', 'open', a.getPath())
      var d = a
      c && (d = this.resolveSymlinks(a))
      if (!d) throw h('ENOENT', 'open', a.getPath())
      c = d.getNode()
      if (c.isDirectory()) {
        if ((b & (mb | na | Ka)) !== mb) throw h('EISDIR', 'open', a.getPath())
      } else if (b & gf) throw h('ENOTDIR', 'open', a.getPath())
      if (!(b & Ka || c.canRead())) throw h('EACCES', 'open', a.getPath())
      a = new this.props.File(a, c, b, this.newFdNumber())
      this.fds[a.fd] = a
      this.openFiles++
      b & Za && a.truncate()
      return a
    }
    a.prototype.openFile = function (a, b, c, d) {
      void 0 === d && (d = !0)
      var e = v(a),
        r = d ? this.getResolvedLink(e) : this.getLink(e)
      if (!r && b & U) {
        var D = this.getResolvedLink(e.slice(0, e.length - 1))
        if (!D) throw h('ENOENT', 'open', S + e.join(S))
        b & U &&
          'number' === typeof c &&
          (r = this.createLink(D, e[e.length - 1], !1, c))
      }
      if (r) return this.openLink(r, b, d)
      throw h('ENOENT', 'open', a)
    }
    a.prototype.openBase = function (a, b, c, d) {
      void 0 === d && (d = !0)
      b = this.openFile(a, b, c, d)
      if (!b) throw h('ENOENT', 'open', a)
      return b.fd
    }
    a.prototype.openSync = function (a, b, c) {
      void 0 === c && (c = 438)
      c = M(c)
      a = m(a)
      b = k(b)
      return this.openBase(a, b, c)
    }
    a.prototype.open = function (a, b, c, d) {
      var e = c
      'function' === typeof c && ((e = 438), (d = c))
      c = M(e || 438)
      a = m(a)
      b = k(b)
      this.wrapAsync(this.openBase, [a, b, c], d)
    }
    a.prototype.closeFile = function (a) {
      this.fds[a.fd] &&
        (this.openFiles--, delete this.fds[a.fd], this.releasedFds.push(a.fd))
    }
    a.prototype.closeSync = function (a) {
      Ya(a)
      a = this.getFileByFdOrThrow(a, 'close')
      this.closeFile(a)
    }
    a.prototype.close = function (a, b) {
      Ya(a)
      this.wrapAsync(this.closeSync, [a], b)
    }
    a.prototype.openFileOrGetById = function (a, b, c) {
      if ('number' === typeof a) {
        a = this.fds[a]
        if (!a) throw h('ENOENT')
        return a
      }
      return this.openFile(m(a), b, c)
    }
    a.prototype.readBase = function (a, b, c, d, e) {
      return this.getFileByFdOrThrow(a).read(b, Number(c), Number(d), e)
    }
    a.prototype.readSync = function (a, b, c, d, e) {
      Ya(a)
      return this.readBase(a, b, c, d, e)
    }
    a.prototype.read = function (a, b, c, d, e, f) {
      var r = this
      q(f)
      if (0 === d)
        return L.default.nextTick(function () {
          f && f(null, 0, b)
        })
      $c.default(function () {
        try {
          var D = r.readBase(a, b, c, d, e)
          f(null, D, b)
        } catch (pf) {
          f(pf)
        }
      })
    }
    a.prototype.readFileBase = function (a, b, c) {
      var d = 'number' === typeof a && a >>> 0 === a
      if (!d) {
        var e = m(a)
        e = v(e)
        if ((e = this.getResolvedLink(e)) && e.getNode().isDirectory())
          throw h('EISDIR', 'open', e.getPath())
        a = this.openSync(a, b)
      }
      try {
        var r = $b(this.getFileByFdOrThrow(a).getBuffer(), c)
      } finally {
        d || this.closeSync(a)
      }
      return r
    }
    a.prototype.readFileSync = function (a, b) {
      b = zd(b)
      var c = k(b.flag)
      return this.readFileBase(a, c, b.encoding)
    }
    a.prototype.readFile = function (a, b, c) {
      c = B(zd)(b, c)
      b = c[0]
      c = c[1]
      var d = k(b.flag)
      this.wrapAsync(this.readFileBase, [a, d, b.encoding], c)
    }
    a.prototype.writeBase = function (a, b, c, d, e) {
      return this.getFileByFdOrThrow(a, 'write').write(b, c, d, e)
    }
    a.prototype.writeSync = function (a, b, c, d, e) {
      Ya(a)
      var r = 'string' !== typeof b
      if (r) {
        var D = (c || 0) | 0
        var f = d
        c = e
      } else var Xa = d
      b = La(b, Xa)
      r ? 'undefined' === typeof f && (f = b.length) : ((D = 0), (f = b.length))
      return this.writeBase(a, b, D, f, c)
    }
    a.prototype.write = function (a, b, c, d, e, f) {
      var r = this
      Ya(a)
      var D = typeof b,
        Xa = typeof c,
        g = typeof d,
        h = typeof e
      if ('string' !== D)
        if ('function' === Xa) var k = c
        else if ('function' === g) {
          var lb = c | 0
          k = d
        } else if ('function' === h) {
          lb = c | 0
          var m = d
          k = e
        } else {
          lb = c | 0
          m = d
          var n = e
          k = f
        }
      else if ('function' === Xa) k = c
      else if ('function' === g) (n = c), (k = d)
      else if ('function' === h) {
        n = c
        var va = d
        k = e
      }
      var p = La(b, va)
      'string' !== D
        ? 'undefined' === typeof m && (m = p.length)
        : ((lb = 0), (m = p.length))
      var v = q(k)
      $c.default(function () {
        try {
          var c = r.writeBase(a, p, lb, m, n)
          'string' !== D ? v(null, c, p) : v(null, c, b)
        } catch (qf) {
          v(qf)
        }
      })
    }
    a.prototype.writeFileBase = function (a, b, c, d) {
      var e = 'number' === typeof a
      a = e ? a : this.openBase(m(a), c, d)
      d = 0
      var r = b.length
      c = c & $a ? void 0 : 0
      try {
        for (; 0 < r; ) {
          var D = this.writeSync(a, b, d, r, c)
          d += D
          r -= D
          void 0 !== c && (c += D)
        }
      } finally {
        e || this.closeSync(a)
      }
    }
    a.prototype.writeFileSync = function (a, b, c) {
      var d = Bd(c)
      c = k(d.flag)
      var e = M(d.mode)
      b = La(b, d.encoding)
      this.writeFileBase(a, b, c, e)
    }
    a.prototype.writeFile = function (a, b, c, d) {
      var e = c
      'function' === typeof c && ((e = Ad), (d = c))
      c = q(d)
      var r = Bd(e)
      e = k(r.flag)
      d = M(r.mode)
      b = La(b, r.encoding)
      this.wrapAsync(this.writeFileBase, [a, b, e, d], c)
    }
    a.prototype.linkBase = function (a, b) {
      var c = v(a),
        d = this.getLink(c)
      if (!d) throw h('ENOENT', 'link', a, b)
      var e = v(b)
      c = this.getLinkParent(e)
      if (!c) throw h('ENOENT', 'link', a, b)
      e = e[e.length - 1]
      if (c.getChild(e)) throw h('EEXIST', 'link', a, b)
      a = d.getNode()
      a.nlink++
      c.createChild(e, a)
    }
    a.prototype.copyFileBase = function (a, b, c) {
      var d = this.readFileSync(a)
      if (c & hf && this.existsSync(b)) throw h('EEXIST', 'copyFile', a, b)
      if (c & jf) throw h('ENOSYS', 'copyFile', a, b)
      this.writeFileBase(b, d, ua.w, 438)
    }
    a.prototype.copyFileSync = function (a, b, c) {
      a = m(a)
      b = m(b)
      return this.copyFileBase(a, b, (c || 0) | 0)
    }
    a.prototype.copyFile = function (a, b, c, d) {
      a = m(a)
      b = m(b)
      if ('function' === typeof c) var e = 0
      else (e = c), (c = d)
      q(c)
      this.wrapAsync(this.copyFileBase, [a, b, e], c)
    }
    a.prototype.linkSync = function (a, b) {
      a = m(a)
      b = m(b)
      this.linkBase(a, b)
    }
    a.prototype.link = function (a, b, c) {
      a = m(a)
      b = m(b)
      this.wrapAsync(this.linkBase, [a, b], c)
    }
    a.prototype.unlinkBase = function (a) {
      var b = v(a)
      b = this.getLink(b)
      if (!b) throw h('ENOENT', 'unlink', a)
      if (b.length) throw Error('Dir not empty...')
      this.deleteLink(b)
      a = b.getNode()
      a.nlink--
      0 >= a.nlink && this.deleteNode(a)
    }
    a.prototype.unlinkSync = function (a) {
      a = m(a)
      this.unlinkBase(a)
    }
    a.prototype.unlink = function (a, b) {
      a = m(a)
      this.wrapAsync(this.unlinkBase, [a], b)
    }
    a.prototype.symlinkBase = function (a, b) {
      var c = v(b),
        d = this.getLinkParent(c)
      if (!d) throw h('ENOENT', 'symlink', a, b)
      c = c[c.length - 1]
      if (d.getChild(c)) throw h('EEXIST', 'symlink', a, b)
      b = d.createChild(c)
      b.getNode().makeSymlink(v(a))
      return b
    }
    a.prototype.symlinkSync = function (a, b) {
      a = m(a)
      b = m(b)
      this.symlinkBase(a, b)
    }
    a.prototype.symlink = function (a, b, c, d) {
      c = q('function' === typeof c ? c : d)
      a = m(a)
      b = m(b)
      this.wrapAsync(this.symlinkBase, [a, b], c)
    }
    a.prototype.realpathBase = function (a, b) {
      var c = v(a)
      c = this.getResolvedLink(c)
      if (!c) throw h('ENOENT', 'realpath', a)
      return K.strToEncoding(c.getPath(), b)
    }
    a.prototype.realpathSync = function (a, b) {
      return this.realpathBase(m(a), Ed(b).encoding)
    }
    a.prototype.realpath = function (a, b, c) {
      c = lf(b, c)
      b = c[0]
      c = c[1]
      a = m(a)
      this.wrapAsync(this.realpathBase, [a, b.encoding], c)
    }
    a.prototype.lstatBase = function (a, b) {
      void 0 === b && (b = !1)
      var c = this.getLink(v(a))
      if (!c) throw h('ENOENT', 'lstat', a)
      return ka.default.build(c.getNode(), b)
    }
    a.prototype.lstatSync = function (a, b) {
      return this.lstatBase(m(a), e(b).bigint)
    }
    a.prototype.lstat = function (a, b, c) {
      c = d(b, c)
      b = c[0]
      c = c[1]
      this.wrapAsync(this.lstatBase, [m(a), b.bigint], c)
    }
    a.prototype.statBase = function (a, b) {
      void 0 === b && (b = !1)
      var c = this.getResolvedLink(v(a))
      if (!c) throw h('ENOENT', 'stat', a)
      return ka.default.build(c.getNode(), b)
    }
    a.prototype.statSync = function (a, b) {
      return this.statBase(m(a), e(b).bigint)
    }
    a.prototype.stat = function (a, b, c) {
      c = d(b, c)
      b = c[0]
      c = c[1]
      this.wrapAsync(this.statBase, [m(a), b.bigint], c)
    }
    a.prototype.fstatBase = function (a, b) {
      void 0 === b && (b = !1)
      a = this.getFileByFd(a)
      if (!a) throw h('EBADF', 'fstat')
      return ka.default.build(a.node, b)
    }
    a.prototype.fstatSync = function (a, b) {
      return this.fstatBase(a, e(b).bigint)
    }
    a.prototype.fstat = function (a, b, c) {
      b = d(b, c)
      this.wrapAsync(this.fstatBase, [a, b[0].bigint], b[1])
    }
    a.prototype.renameBase = function (a, b) {
      var c = this.getLink(v(a))
      if (!c) throw h('ENOENT', 'rename', a, b)
      var d = v(b),
        e = this.getLinkParent(d)
      if (!e) throw h('ENOENT', 'rename', a, b)
      ;(a = c.parent) && a.deleteChild(c)
      c.steps = Xb(e.steps, [d[d.length - 1]])
      e.setChild(c.getName(), c)
    }
    a.prototype.renameSync = function (a, b) {
      a = m(a)
      b = m(b)
      this.renameBase(a, b)
    }
    a.prototype.rename = function (a, b, c) {
      a = m(a)
      b = m(b)
      this.wrapAsync(this.renameBase, [a, b], c)
    }
    a.prototype.existsBase = function (a) {
      return !!this.statBase(a)
    }
    a.prototype.existsSync = function (a) {
      try {
        return this.existsBase(m(a))
      } catch (D) {
        return !1
      }
    }
    a.prototype.exists = function (a, b) {
      var c = this,
        d = m(a)
      if ('function' !== typeof b) throw Error(fa.CB)
      $c.default(function () {
        try {
          b(c.existsBase(d))
        } catch (va) {
          b(!1)
        }
      })
    }
    a.prototype.accessBase = function (a) {
      this.getLinkOrThrow(a, 'access')
    }
    a.prototype.accessSync = function (a, b) {
      void 0 === b && (b = wd)
      a = m(a)
      this.accessBase(a, b | 0)
    }
    a.prototype.access = function (a, b, c) {
      var d = wd
      'function' !== typeof b && ((d = b | 0), (b = q(c)))
      a = m(a)
      this.wrapAsync(this.accessBase, [a, d], b)
    }
    a.prototype.appendFileSync = function (a, b, c) {
      void 0 === c && (c = Cd)
      c = Dd(c)
      ;(c.flag && a >>> 0 !== a) || (c.flag = 'a')
      this.writeFileSync(a, b, c)
    }
    a.prototype.appendFile = function (a, b, c, d) {
      d = kf(c, d)
      c = d[0]
      d = d[1]
      ;(c.flag && a >>> 0 !== a) || (c.flag = 'a')
      this.writeFile(a, b, c, d)
    }
    a.prototype.readdirBase = function (a, b) {
      var c = v(a)
      c = this.getResolvedLink(c)
      if (!c) throw h('ENOENT', 'readdir', a)
      if (!c.getNode().isDirectory()) throw h('ENOTDIR', 'scandir', a)
      if (b.withFileTypes) {
        var d = []
        for (e in c.children)
          (a = c.getChild(e)) && d.push(Qc.default.build(a, b.encoding))
        Yb ||
          'buffer' === b.encoding ||
          d.sort(function (a, b) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          })
        return d
      }
      var e = []
      for (d in c.children) e.push(K.strToEncoding(d, b.encoding))
      Yb || 'buffer' === b.encoding || e.sort()
      return e
    }
    a.prototype.readdirSync = function (a, b) {
      b = Gd(b)
      a = m(a)
      return this.readdirBase(a, b)
    }
    a.prototype.readdir = function (a, b, c) {
      c = mf(b, c)
      b = c[0]
      c = c[1]
      a = m(a)
      this.wrapAsync(this.readdirBase, [a, b], c)
    }
    a.prototype.readlinkBase = function (a, b) {
      var c = this.getLinkOrThrow(a, 'readlink').getNode()
      if (!c.isSymlink()) throw h('EINVAL', 'readlink', a)
      a = S + c.symlink.join(S)
      return K.strToEncoding(a, b)
    }
    a.prototype.readlinkSync = function (a, b) {
      b = ob(b)
      a = m(a)
      return this.readlinkBase(a, b.encoding)
    }
    a.prototype.readlink = function (a, b, c) {
      c = yd(b, c)
      b = c[0]
      c = c[1]
      a = m(a)
      this.wrapAsync(this.readlinkBase, [a, b.encoding], c)
    }
    a.prototype.fsyncBase = function (a) {
      this.getFileByFdOrThrow(a, 'fsync')
    }
    a.prototype.fsyncSync = function (a) {
      this.fsyncBase(a)
    }
    a.prototype.fsync = function (a, b) {
      this.wrapAsync(this.fsyncBase, [a], b)
    }
    a.prototype.fdatasyncBase = function (a) {
      this.getFileByFdOrThrow(a, 'fdatasync')
    }
    a.prototype.fdatasyncSync = function (a) {
      this.fdatasyncBase(a)
    }
    a.prototype.fdatasync = function (a, b) {
      this.wrapAsync(this.fdatasyncBase, [a], b)
    }
    a.prototype.ftruncateBase = function (a, b) {
      this.getFileByFdOrThrow(a, 'ftruncate').truncate(b)
    }
    a.prototype.ftruncateSync = function (a, b) {
      this.ftruncateBase(a, b)
    }
    a.prototype.ftruncate = function (a, b, c) {
      var d = 'number' === typeof b ? b : 0
      b = q('number' === typeof b ? c : b)
      this.wrapAsync(this.ftruncateBase, [a, d], b)
    }
    a.prototype.truncateBase = function (a, b) {
      a = this.openSync(a, 'r+')
      try {
        this.ftruncateSync(a, b)
      } finally {
        this.closeSync(a)
      }
    }
    a.prototype.truncateSync = function (a, b) {
      if (a >>> 0 === a) return this.ftruncateSync(a, b)
      this.truncateBase(a, b)
    }
    a.prototype.truncate = function (a, b, c) {
      var d = 'number' === typeof b ? b : 0
      b = q('number' === typeof b ? c : b)
      if (a >>> 0 === a) return this.ftruncate(a, d, b)
      this.wrapAsync(this.truncateBase, [a, d], b)
    }
    a.prototype.futimesBase = function (a, b, c) {
      a = this.getFileByFdOrThrow(a, 'futimes').node
      a.atime = new Date(1e3 * b)
      a.mtime = new Date(1e3 * c)
    }
    a.prototype.futimesSync = function (a, b, c) {
      this.futimesBase(a, ha(b), ha(c))
    }
    a.prototype.futimes = function (a, b, c, d) {
      this.wrapAsync(this.futimesBase, [a, ha(b), ha(c)], d)
    }
    a.prototype.utimesBase = function (a, b, c) {
      a = this.openSync(a, 'r+')
      try {
        this.futimesBase(a, b, c)
      } finally {
        this.closeSync(a)
      }
    }
    a.prototype.utimesSync = function (a, b, c) {
      this.utimesBase(m(a), ha(b), ha(c))
    }
    a.prototype.utimes = function (a, b, c, d) {
      this.wrapAsync(this.utimesBase, [m(a), ha(b), ha(c)], d)
    }
    a.prototype.mkdirBase = function (a, b) {
      var c = v(a)
      if (!c.length) throw h('EISDIR', 'mkdir', a)
      var d = this.getLinkParentAsDirOrThrow(a, 'mkdir')
      c = c[c.length - 1]
      if (d.getChild(c)) throw h('EEXIST', 'mkdir', a)
      d.createChild(c, this.createNode(!0, b))
    }
    a.prototype.mkdirpBase = function (a, b) {
      a = v(a)
      for (var c = this.root, d = 0; d < a.length; d++) {
        var e = a[d]
        if (!c.getNode().isDirectory()) throw h('ENOTDIR', 'mkdir', c.getPath())
        var f = c.getChild(e)
        if (f)
          if (f.getNode().isDirectory()) c = f
          else throw h('ENOTDIR', 'mkdir', f.getPath())
        else c = c.createChild(e, this.createNode(!0, b))
      }
    }
    a.prototype.mkdirSync = function (a, b) {
      b = f(b)
      var c = M(b.mode, 511)
      a = m(a)
      b.recursive ? this.mkdirpBase(a, c) : this.mkdirBase(a, c)
    }
    a.prototype.mkdir = function (a, b, c) {
      var d = f(b)
      b = q('function' === typeof b ? b : c)
      c = M(d.mode, 511)
      a = m(a)
      d.recursive
        ? this.wrapAsync(this.mkdirpBase, [a, c], b)
        : this.wrapAsync(this.mkdirBase, [a, c], b)
    }
    a.prototype.mkdirpSync = function (a, b) {
      this.mkdirSync(a, { mode: b, recursive: !0 })
    }
    a.prototype.mkdirp = function (a, b, c) {
      var d = 'function' === typeof b ? void 0 : b
      b = q('function' === typeof b ? b : c)
      this.mkdir(a, { mode: d, recursive: !0 }, b)
    }
    a.prototype.mkdtempBase = function (a, b, c) {
      void 0 === c && (c = 5)
      var d = a + this.genRndStr()
      try {
        return this.mkdirBase(d, 511), K.strToEncoding(d, b)
      } catch (va) {
        if ('EEXIST' === va.code) {
          if (1 < c) return this.mkdtempBase(a, b, c - 1)
          throw Error('Could not create temp dir.')
        }
        throw va
      }
    }
    a.prototype.mkdtempSync = function (a, b) {
      b = ob(b).encoding
      if (!a || 'string' !== typeof a)
        throw new TypeError('filename prefix is required')
      qb(a)
      return this.mkdtempBase(a, b)
    }
    a.prototype.mkdtemp = function (a, b, c) {
      c = yd(b, c)
      b = c[0].encoding
      c = c[1]
      if (!a || 'string' !== typeof a)
        throw new TypeError('filename prefix is required')
      qb(a) && this.wrapAsync(this.mkdtempBase, [a, b], c)
    }
    a.prototype.rmdirBase = function (a, b) {
      b = aa({}, Fd, b)
      var c = this.getLinkAsDirOrThrow(a, 'rmdir')
      if (c.length && !b.recursive) throw h('ENOTEMPTY', 'rmdir', a)
      this.deleteLink(c)
    }
    a.prototype.rmdirSync = function (a, b) {
      this.rmdirBase(m(a), b)
    }
    a.prototype.rmdir = function (a, b, c) {
      var d = aa({}, Fd, b)
      b = q('function' === typeof b ? b : c)
      this.wrapAsync(this.rmdirBase, [m(a), d], b)
    }
    a.prototype.fchmodBase = function (a, b) {
      this.getFileByFdOrThrow(a, 'fchmod').chmod(b)
    }
    a.prototype.fchmodSync = function (a, b) {
      this.fchmodBase(a, M(b))
    }
    a.prototype.fchmod = function (a, b, c) {
      this.wrapAsync(this.fchmodBase, [a, M(b)], c)
    }
    a.prototype.chmodBase = function (a, b) {
      a = this.openSync(a, 'r+')
      try {
        this.fchmodBase(a, b)
      } finally {
        this.closeSync(a)
      }
    }
    a.prototype.chmodSync = function (a, b) {
      b = M(b)
      a = m(a)
      this.chmodBase(a, b)
    }
    a.prototype.chmod = function (a, b, c) {
      b = M(b)
      a = m(a)
      this.wrapAsync(this.chmodBase, [a, b], c)
    }
    a.prototype.lchmodBase = function (a, b) {
      a = this.openBase(a, na, 0, !1)
      try {
        this.fchmodBase(a, b)
      } finally {
        this.closeSync(a)
      }
    }
    a.prototype.lchmodSync = function (a, b) {
      b = M(b)
      a = m(a)
      this.lchmodBase(a, b)
    }
    a.prototype.lchmod = function (a, b, c) {
      b = M(b)
      a = m(a)
      this.wrapAsync(this.lchmodBase, [a, b], c)
    }
    a.prototype.fchownBase = function (a, b, c) {
      this.getFileByFdOrThrow(a, 'fchown').chown(b, c)
    }
    a.prototype.fchownSync = function (a, b, c) {
      Ha(b)
      Ia(c)
      this.fchownBase(a, b, c)
    }
    a.prototype.fchown = function (a, b, c, d) {
      Ha(b)
      Ia(c)
      this.wrapAsync(this.fchownBase, [a, b, c], d)
    }
    a.prototype.chownBase = function (a, b, c) {
      this.getResolvedLinkOrThrow(a, 'chown').getNode().chown(b, c)
    }
    a.prototype.chownSync = function (a, b, c) {
      Ha(b)
      Ia(c)
      this.chownBase(m(a), b, c)
    }
    a.prototype.chown = function (a, b, c, d) {
      Ha(b)
      Ia(c)
      this.wrapAsync(this.chownBase, [m(a), b, c], d)
    }
    a.prototype.lchownBase = function (a, b, c) {
      this.getLinkOrThrow(a, 'lchown').getNode().chown(b, c)
    }
    a.prototype.lchownSync = function (a, b, c) {
      Ha(b)
      Ia(c)
      this.lchownBase(m(a), b, c)
    }
    a.prototype.lchown = function (a, b, c, d) {
      Ha(b)
      Ia(c)
      this.wrapAsync(this.lchownBase, [m(a), b, c], d)
    }
    a.prototype.watchFile = function (a, b, c) {
      a = m(a)
      var d = b
      'function' === typeof d && ((c = b), (d = null))
      if ('function' !== typeof c)
        throw Error('"watchFile()" requires a listener function')
      b = 5007
      var e = !0
      d &&
        'object' === typeof d &&
        ('number' === typeof d.interval && (b = d.interval),
        'boolean' === typeof d.persistent && (e = d.persistent))
      d = this.statWatchers[a]
      d ||
        ((d = new this.StatWatcher()),
        d.start(a, e, b),
        (this.statWatchers[a] = d))
      d.addListener('change', c)
      return d
    }
    a.prototype.unwatchFile = function (a, b) {
      a = m(a)
      var c = this.statWatchers[a]
      c &&
        ('function' === typeof b
          ? c.removeListener('change', b)
          : c.removeAllListeners('change'),
        0 === c.listenerCount('change') &&
          (c.stop(), delete this.statWatchers[a]))
    }
    a.prototype.createReadStream = function (a, b) {
      return new this.ReadStream(a, b)
    }
    a.prototype.createWriteStream = function (a, b) {
      return new this.WriteStream(a, b)
    }
    a.prototype.watch = function (a, b, c) {
      a = m(a)
      var d = b
      'function' === typeof b && ((c = b), (d = null))
      var e = ob(d)
      b = e.persistent
      d = e.recursive
      e = e.encoding
      void 0 === b && (b = !0)
      void 0 === d && (d = !1)
      var f = new this.FSWatcher()
      f.start(a, b, d, e)
      c && f.addListener('change', c)
      return f
    }
    a.fd = 2147483647
    return a
  })()
  b.Volume = a
  var Hd = (function (a) {
    function b(b) {
      var c = a.call(this) || this
      c.onInterval = function () {
        try {
          var a = c.vol.statSync(c.filename)
          c.hasChanged(a) && (c.emit('change', a, c.prev), (c.prev = a))
        } finally {
          c.loop()
        }
      }
      c.vol = b
      return c
    }
    Ja(b, a)
    b.prototype.loop = function () {
      this.timeoutRef = this.setTimeout(this.onInterval, this.interval)
    }
    b.prototype.hasChanged = function (a) {
      return a.mtimeMs > this.prev.mtimeMs || a.nlink !== this.prev.nlink
        ? !0
        : !1
    }
    b.prototype.start = function (a, b, c) {
      void 0 === b && (b = !0)
      void 0 === c && (c = 5007)
      this.filename = m(a)
      this.setTimeout = b ? setTimeout : hd.default
      this.interval = c
      this.prev = this.vol.statSync(this.filename)
      this.loop()
    }
    b.prototype.stop = function () {
      clearTimeout(this.timeoutRef)
      L.default.nextTick(ef, this)
    }
    return b
  })(O.EventEmitter)
  b.StatWatcher = Hd
  var N
  lc.inherits(T, Y.Readable)
  b.ReadStream = T
  T.prototype.open = function () {
    var a = this
    this._vol.open(this.path, this.flags, this.mode, function (b, c) {
      b
        ? (a.autoClose && a.destroy && a.destroy(), a.emit('error', b))
        : ((a.fd = c), a.emit('open', c), a.read())
    })
  }
  T.prototype._read = function (a) {
    if ('number' !== typeof this.fd)
      return this.once('open', function () {
        this._read(a)
      })
    if (!this.destroyed) {
      if (!N || 128 > N.length - N.used)
        (N = F.bufferAllocUnsafe(this._readableState.highWaterMark)),
          (N.used = 0)
      var b = N,
        c = Math.min(N.length - N.used, a),
        d = N.used
      void 0 !== this.pos && (c = Math.min(this.end - this.pos + 1, c))
      if (0 >= c) return this.push(null)
      var e = this
      this._vol.read(this.fd, N, N.used, c, this.pos, function (a, c) {
        a
          ? (e.autoClose && e.destroy && e.destroy(), e.emit('error', a))
          : ((a = null),
            0 < c && ((e.bytesRead += c), (a = b.slice(d, d + c))),
            e.push(a))
      })
      void 0 !== this.pos && (this.pos += c)
      N.used += c
    }
  }
  T.prototype._destroy = function (a, b) {
    this.close(function (c) {
      b(a || c)
    })
  }
  T.prototype.close = function (a) {
    var b = this
    if (a) this.once('close', a)
    if (this.closed || 'number' !== typeof this.fd) {
      if ('number' !== typeof this.fd) {
        this.once('open', ff)
        return
      }
      return L.default.nextTick(function () {
        return b.emit('close')
      })
    }
    this.closed = !0
    this._vol.close(this.fd, function (a) {
      a ? b.emit('error', a) : b.emit('close')
    })
    this.fd = null
  }
  lc.inherits(R, Y.Writable)
  b.WriteStream = R
  R.prototype.open = function () {
    this._vol.open(
      this.path,
      this.flags,
      this.mode,
      function (a, b) {
        a
          ? (this.autoClose && this.destroy && this.destroy(),
            this.emit('error', a))
          : ((this.fd = b), this.emit('open', b))
      }.bind(this)
    )
  }
  R.prototype._write = function (a, b, c) {
    if (!(a instanceof F.Buffer))
      return this.emit('error', Error('Invalid data'))
    if ('number' !== typeof this.fd)
      return this.once('open', function () {
        this._write(a, b, c)
      })
    var d = this
    this._vol.write(this.fd, a, 0, a.length, this.pos, function (a, b) {
      if (a) return d.autoClose && d.destroy && d.destroy(), c(a)
      d.bytesWritten += b
      c()
    })
    void 0 !== this.pos && (this.pos += a.length)
  }
  R.prototype._writev = function (a, b) {
    if ('number' !== typeof this.fd)
      return this.once('open', function () {
        this._writev(a, b)
      })
    for (var c = this, d = a.length, e = Array(d), f = 0, g = 0; g < d; g++) {
      var h = a[g].chunk
      e[g] = h
      f += h.length
    }
    d = F.Buffer.concat(e)
    this._vol.write(this.fd, d, 0, d.length, this.pos, function (a, d) {
      if (a) return c.destroy && c.destroy(), b(a)
      c.bytesWritten += d
      b()
    })
    void 0 !== this.pos && (this.pos += f)
  }
  R.prototype._destroy = T.prototype._destroy
  R.prototype.close = T.prototype.close
  R.prototype.destroySoon = R.prototype.end
  var Id = (function (a) {
    function b(b) {
      var c = a.call(this) || this
      c._filename = ''
      c._filenameEncoded = ''
      c._recursive = !1
      c._encoding = K.ENCODING_UTF8
      c._onNodeChange = function () {
        c._emit('change')
      }
      c._onParentChild = function (a) {
        a.getName() === c._getName() && c._emit('rename')
      }
      c._emit = function (a) {
        c.emit('change', a, c._filenameEncoded)
      }
      c._persist = function () {
        c._timer = setTimeout(c._persist, 1e6)
      }
      c._vol = b
      return c
    }
    Ja(b, a)
    b.prototype._getName = function () {
      return this._steps[this._steps.length - 1]
    }
    b.prototype.start = function (a, b, c, d) {
      void 0 === b && (b = !0)
      void 0 === c && (c = !1)
      void 0 === d && (d = K.ENCODING_UTF8)
      this._filename = m(a)
      this._steps = v(this._filename)
      this._filenameEncoded = K.strToEncoding(this._filename)
      this._recursive = c
      this._encoding = d
      try {
        this._link = this._vol.getLinkOrThrow(this._filename, 'FSWatcher')
      } catch (Wb) {
        throw (
          ((b = Error('watch ' + this._filename + ' ' + Wb.code)),
          (b.code = Wb.code),
          (b.errno = Wb.code),
          b)
        )
      }
      this._link.getNode().on('change', this._onNodeChange)
      this._link.on('child:add', this._onNodeChange)
      this._link.on('child:delete', this._onNodeChange)
      if ((a = this._link.parent))
        a.setMaxListeners(a.getMaxListeners() + 1),
          a.on('child:delete', this._onParentChild)
      b && this._persist()
    }
    b.prototype.close = function () {
      clearTimeout(this._timer)
      this._link.getNode().removeListener('change', this._onNodeChange)
      var a = this._link.parent
      a && a.removeListener('child:delete', this._onParentChild)
    }
    return b
  })(O.EventEmitter)
  b.FSWatcher = Id
})
t(Xe)
var Ye = Xe.pathToFilename,
  Ze = Xe.filenameToSteps,
  $e = Xe.Volume,
  af = u(function (a, b) {
    Object.defineProperty(b, '__esModule', { value: !0 })
    b.fsProps = 'constants F_OK R_OK W_OK X_OK Stats'.split(' ')
    b.fsSyncMethods = 'renameSync ftruncateSync truncateSync chownSync fchownSync lchownSync chmodSync fchmodSync lchmodSync statSync lstatSync fstatSync linkSync symlinkSync readlinkSync realpathSync unlinkSync rmdirSync mkdirSync mkdirpSync readdirSync closeSync openSync utimesSync futimesSync fsyncSync writeSync readSync readFileSync writeFileSync appendFileSync existsSync accessSync fdatasyncSync mkdtempSync copyFileSync createReadStream createWriteStream'.split(
      ' '
    )
    b.fsAsyncMethods = 'rename ftruncate truncate chown fchown lchown chmod fchmod lchmod stat lstat fstat link symlink readlink realpath unlink rmdir mkdir mkdirp readdir close open utimes futimes fsync write read readFile writeFile appendFile exists access fdatasync mkdtemp copyFile watchFile unwatchFile watch'.split(
      ' '
    )
  })
t(af)
var bf = u(function (a, b) {
  function c(a) {
    for (
      var b = {
          F_OK: g,
          R_OK: h,
          W_OK: k,
          X_OK: p,
          constants: w.constants,
          Stats: ka.default,
          Dirent: Qc.default,
        },
        c = 0,
        d = e;
      c < d.length;
      c++
    ) {
      var n = d[c]
      'function' === typeof a[n] && (b[n] = a[n].bind(a))
    }
    c = 0
    for (d = f; c < d.length; c++)
      (n = d[c]), 'function' === typeof a[n] && (b[n] = a[n].bind(a))
    b.StatWatcher = a.StatWatcher
    b.FSWatcher = a.FSWatcher
    b.WriteStream = a.WriteStream
    b.ReadStream = a.ReadStream
    b.promises = a.promises
    b._toUnixTimestamp = Xe.toUnixTimestamp
    return b
  }
  var d =
    (l && l.__assign) ||
    function () {
      d =
        Object.assign ||
        function (a) {
          for (var b, c = 1, d = arguments.length; c < d; c++) {
            b = arguments[c]
            for (var e in b)
              Object.prototype.hasOwnProperty.call(b, e) && (a[e] = b[e])
          }
          return a
        }
      return d.apply(this, arguments)
    }
  Object.defineProperty(b, '__esModule', { value: !0 })
  var e = af.fsSyncMethods,
    f = af.fsAsyncMethods,
    g = w.constants.F_OK,
    h = w.constants.R_OK,
    k = w.constants.W_OK,
    p = w.constants.X_OK
  b.Volume = Xe.Volume
  b.vol = new Xe.Volume()
  b.createFsFromVolume = c
  b.fs = c(b.vol)
  a.exports = d(d({}, a.exports), b.fs)
  a.exports.semantic = !0
})
t(bf)
var rf = bf.createFsFromVolume
gd.prototype.emit = function (a) {
  for (var b, c, d = [], e = 1; e < arguments.length; e++)
    d[e - 1] = arguments[e]
  e = this.listeners(a)
  try {
    for (var f = da(e), g = f.next(); !g.done; g = f.next()) {
      var h = g.value
      try {
        h.apply(void 0, ia(d))
      } catch (k) {
        console.error(k)
      }
    }
  } catch (k) {
    b = { error: k }
  } finally {
    try {
      g && !g.done && (c = f.return) && c.call(f)
    } finally {
      if (b) throw b.error
    }
  }
  return 0 < e.length
}
var sf = (function () {
  function a() {
    this.volume = new $e()
    this.fs = rf(this.volume)
    this.fromJSON({ '/dev/stdin': '', '/dev/stdout': '', '/dev/stderr': '' })
  }
  a.prototype._toJSON = function (a, c, d) {
    void 0 === c && (c = {})
    var b = !0,
      f
    for (f in a.children) {
      b = !1
      var g = a.getChild(f)
      if (g) {
        var h = g.getNode()
        h && h.isFile()
          ? ((g = g.getPath()), d && (g = Yc(d, g)), (c[g] = h.getBuffer()))
          : h && h.isDirectory() && this._toJSON(g, c, d)
      }
    }
    a = a.getPath()
    d && (a = Yc(d, a))
    a && b && (c[a] = null)
    return c
  }
  a.prototype.toJSON = function (a, c, d) {
    var b, f
    void 0 === c && (c = {})
    void 0 === d && (d = !1)
    var g = []
    if (a) {
      a instanceof Array || (a = [a])
      try {
        for (var h = da(a), k = h.next(); !k.done; k = h.next()) {
          var p = Ye(k.value),
            n = this.volume.getResolvedLink(p)
          n && g.push(n)
        }
      } catch (xa) {
        var q = { error: xa }
      } finally {
        try {
          k && !k.done && (b = h.return) && b.call(h)
        } finally {
          if (q) throw q.error
        }
      }
    } else g.push(this.volume.root)
    if (!g.length) return c
    try {
      for (var B = da(g), m = B.next(); !m.done; m = B.next())
        (n = m.value), this._toJSON(n, c, d ? n.getPath() : '')
    } catch (xa) {
      var v = { error: xa }
    } finally {
      try {
        m && !m.done && (f = B.return) && f.call(B)
      } finally {
        if (v) throw v.error
      }
    }
    return c
  }
  a.prototype.fromJSONFixed = function (a, c) {
    for (var b in c) {
      var e = c[b]
      if (e ? null !== Object.getPrototypeOf(e) : null !== e) {
        var f = Ze(b)
        1 < f.length &&
          ((f = '/' + f.slice(0, f.length - 1).join('/')), a.mkdirpBase(f, 511))
        a.writeFileSync(b, e || '')
      } else a.mkdirpBase(b, 511)
    }
  }
  a.prototype.fromJSON = function (a) {
    this.volume = new $e()
    this.fromJSONFixed(this.volume, a)
    this.fs = rf(this.volume)
    this.volume.releasedFds = [0, 1, 2]
    a = this.volume.openSync('/dev/stderr', 'w')
    var b = this.volume.openSync('/dev/stdout', 'w'),
      d = this.volume.openSync('/dev/stdin', 'r')
    if (2 !== a) throw Error('invalid handle for stderr: ' + a)
    if (1 !== b) throw Error('invalid handle for stdout: ' + b)
    if (0 !== d) throw Error('invalid handle for stdin: ' + d)
  }
  a.prototype.getStdOut = function () {
    return ba(this, void 0, void 0, function () {
      var a,
        c = this
      return ca(this, function () {
        a = new Promise(function (a) {
          a(c.fs.readFileSync('/dev/stdout', 'utf8'))
        })
        return [2, a]
      })
    })
  }
  return a
})()
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (0)));



/***/ }),

/***/ 85:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 351:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_694591__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_694591__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_694591__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_694591__.o(definition, key) && !__nested_webpack_require_694591__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__nested_webpack_require_694591__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_694591__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_694591__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nested_webpack_require_694591__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
const runLLC = __nested_webpack_require_694591__(526)
const runLLD = __nested_webpack_require_694591__(542)
const runWasm = __nested_webpack_require_694591__(816)

/**
 * Compiles LLVM IR to an object file with llvm/llc.
 *
 * @param {string} ir - LLVM IR
 * @return {Promise<string>} obj - Compiled object file in hex
 */
const compile = runLLC.runLLC

/**
 * Links an object file against libc, libc++ etc. with llvm/lld.
 *
 * @param {string} obj - Object file in hex
 * @return {Promise<string>} wasm - Runnable WASM binary in hex
 */
const link = runLLD.runLLD

/**
 * Runs a WASM binary.
 *
 * @param {string} wasm - Runnable WASM binary in hex
 * @return {Promise<string>} stdout - output
 */
const run = runWasm.runWasm

/**
 * Compiles, links and runs LLVM IR.
 *
 * @param {string} ir - LLVM IR
 * @return {Promise<string>} stdout - output
 */
const compileLinkRun = (code) =>
  compile(code)
    .then((obj) => link(obj))
    .then((wasm) => run(wasm))

exports.compile = compile
exports.link = link
exports.run = run
exports.compileLinkRun = compileLinkRun

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const webscripten = __webpack_require__(440)

// Sample LLVM IR
const codeBox = document.getElementById("code");
codeBox.value = `; ModuleID = 'hello_world.c'
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

// Example of adding compileLinkRun to a button
const compileButton = document.getElementById("llcCompile");
compileButton.addEventListener("click", function () {
  webscripten.compileLinkRun(codeBox.value, 'static/').then(
    (resolved) => {
      console.log(resolved);
    },
    (rejected) => {
      console.error(rejected);
    }
  );
});

})();

/******/ })()
;