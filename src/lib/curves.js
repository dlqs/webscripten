exports.curves = (function () {
    'use strict';

    (function() {
        const env = {};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    /**
     * Common utilities
     * @module glMatrix
     */
    // Configuration Constants
    var EPSILON = 0.000001;
    var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
    if (!Math.hypot) Math.hypot = function () {
      var y = 0,
          i = arguments.length;

      while (i--) {
        y += arguments[i] * arguments[i];
      }

      return Math.sqrt(y);
    };

    /**
     * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
     * @module mat4
     */

    /**
     * Creates a new identity mat4
     *
     * @returns {mat4} a new 4x4 matrix
     */

    function create$1() {
      var out = new ARRAY_TYPE(16);

      if (ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }

      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    /**
     * Translate a mat4 by the given vector
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to translate
     * @param {ReadonlyVec3} v vector to translate by
     * @returns {mat4} out
     */

    function translate$1(out, a, v) {
      var x = v[0],
          y = v[1],
          z = v[2];
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;

      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }

      return out;
    }
    /**
     * Scales the mat4 by the dimensions in the given vec3 not using vectorization
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to scale
     * @param {ReadonlyVec3} v the vec3 to scale the matrix by
     * @returns {mat4} out
     **/

    function scale$1(out, a, v) {
      var x = v[0],
          y = v[1],
          z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Rotates a mat4 by the given angle around the given axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @param {ReadonlyVec3} axis the axis to rotate around
     * @returns {mat4} out
     */

    function rotate(out, a, rad, axis) {
      var x = axis[0],
          y = axis[1],
          z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      var b00, b01, b02;
      var b10, b11, b12;
      var b20, b21, b22;

      if (len < EPSILON) {
        return null;
      }

      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11]; // Construct the elements of the rotation matrix

      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;

      if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }

      return out;
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {number} fovy Vertical field of view in radians
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum, can be null or Infinity
     * @returns {mat4} out
     */

    function perspective(out, fovy, aspect, near, far) {
      var f = 1.0 / Math.tan(fovy / 2),
          nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;

      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }

      return out;
    }

    /**
     * 3 Dimensional Vector
     * @module vec3
     */

    /**
     * Creates a new, empty vec3
     *
     * @returns {vec3} a new 3D vector
     */

    function create() {
      var out = new ARRAY_TYPE(3);

      if (ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }

      return out;
    }
    /**
     * Creates a new vec3 initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @param {Number} z Z component
     * @returns {vec3} a new 3D vector
     */

    function fromValues(x, y, z) {
      var out = new ARRAY_TYPE(3);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    /**
     * Perform some operation over an array of vec3s.
     *
     * @param {Array} a the array of vectors to iterate over
     * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
     * @param {Number} offset Number of elements to skip at the beginning of the array
     * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
     * @param {Function} fn Function to call for each vector in the array
     * @param {Object} [arg] additional argument to pass to fn
     * @returns {Array} a
     * @function
     */

    (function () {
      var vec = create();
      return function (a, stride, offset, count, fn, arg) {
        var i, l;

        if (!stride) {
          stride = 3;
        }

        if (!offset) {
          offset = 0;
        }

        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }

        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }

        return a;
      };
    })();

    var canvasElement;
    var renderingContext;
    var cubeRotation = 0;
    var vsS = "\nattribute vec4 aFragColor;\nattribute vec4 aVertexPosition;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying lowp vec4 aColor;\n\nvoid main() {\n  gl_PointSize = 2.0;\n  aColor = aFragColor;\n  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n}";
    var fsS = "\nvarying lowp vec4 aColor;\nprecision mediump float;\nvoid main() {\n  gl_FragColor = aColor;\n}";

    function loadShader(gl, type, source) {
      var shader = gl.createShader(type);

      if (!shader) {
        throw new Error('WebGLShader not available.');
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    function initShaderProgram(gl, vsSource, fsSource) {
      var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
      var shaderProgram = gl.createProgram();

      if (!shaderProgram) {
        throw new Error('Unable to initialize the shader program.');
      }

      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      return shaderProgram;
    }

    function drawCurve(gl, buffers, programInfo, num, drawMode, space) {
      var itemSize = space === '3D' ? 3 : 2;
      gl.clearColor(1, 1, 1, 1);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      var transMat = create$1();
      var projMat = create$1();

      if (space === '3D') {
        var padding = Math.sqrt(1 / 3.1);
        scale$1(transMat, transMat, fromValues(padding, padding, padding));
        translate$1(transMat, transMat, [0, 0, -5]);
        rotate(transMat, transMat, -(Math.PI / 2), [1, 0, 0]);
        rotate(transMat, transMat, cubeRotation, [0, 0, 1]);
        var fieldOfView = 45 * Math.PI / 180;
        var aspect = gl.canvas.width / gl.canvas.height;
        var zNear = 0;
        var zFar = 50.0;
        perspective(projMat, fieldOfView, aspect, zNear, zFar);
      }

      gl.useProgram(programInfo.program);
      gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projMat);
      gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, transMat);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

      if (space === '3D') {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cubeBuffer);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        var colors = [];

        for (var i = 0; i < 16; i += 1) {
          colors.push(0.6, 0.6, 0.6, 1);
        }

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINE_STRIP, 0, 16);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.curveBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.curveColorBuffer);
      gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

      if (drawMode === 'lines') {
        gl.drawArrays(gl.LINE_STRIP, 0, num + 1);
      } else {
        gl.drawArrays(gl.POINTS, 0, num + 1);
      }

      if (space === '3D') {
        cubeRotation += 0.005;
        window.requestAnimationFrame(function () {
          return drawCurve(gl, buffers, programInfo, num, drawMode, space);
        });
      }
    }

    function generateCurve(scaleMode, drawMode, numPoints, func, space, isFullView) {
      var curvePosArray = [];
      var curveColorArray = [];
      var drawCubeArray = [];
      var min_x = Infinity;
      var max_x = -Infinity;
      var min_y = Infinity;
      var max_y = -Infinity;
      var min_z = Infinity;
      var max_z = -Infinity;

      function evaluator(num, cFunc) {
        curvePosArray = [];
        curveColorArray = [];

        for (var i = 0; i <= num; i += 1) {
          var point = cFunc(i / num);
          var x = point.x * 2 - 1;
          var y = point.y * 2 - 1;
          var z = point.z * 2 - 1;

          if (space === '2D') {
            curvePosArray.push(x, y);
          } else {
            curvePosArray.push(x, y, z);
          }

          var color_r = point.color[0];
          var color_g = point.color[1];
          var color_b = point.color[2];
          var color_a = point.color[3];
          curveColorArray.push(color_r, color_g, color_b, color_a);
          min_x = Math.min(min_x, x);
          max_x = Math.max(max_x, x);
          min_y = Math.min(min_y, y);
          max_y = Math.max(max_y, y);
          min_z = Math.min(min_z, z);
          max_z = Math.max(max_z, z);
        }
      }

      evaluator(numPoints, func);

      if (isFullView) {
        var horiz_padding = 0.05 * (max_x - min_x);
        min_x -= horiz_padding;
        max_x += horiz_padding;
        var vert_padding = 0.05 * (max_y - min_y);
        min_y -= vert_padding;
        max_y += vert_padding;
        var depth_padding = 0.05 * (max_z - min_z);
        min_z -= depth_padding;
        max_z += depth_padding;
      }

      if (space === '3D') {
        drawCubeArray.push(-1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1);
        drawCubeArray.push(1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1);
        drawCubeArray.push(1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1);
        drawCubeArray.push(-1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1);
      } else {
        min_z = 0;
        max_z = 0;
      }

      if (scaleMode === 'fit') {
        var center = [(min_x + max_x) / 2, (min_y + max_y) / 2, (min_z + max_z) / 2];
        var scale = Math.max(max_x - min_x, max_y - min_y, max_z - min_z);
        scale = scale === 0 ? 1 : scale;

        if (space === '3D') {
          for (var i = 0; i < curvePosArray.length; i += 1) {
            if (i % 3 === 0) {
              curvePosArray[i] -= center[0];
              curvePosArray[i] /= scale / 2;
            } else if (i % 3 === 1) {
              curvePosArray[i] -= center[1];
              curvePosArray[i] /= scale / 2;
            } else {
              curvePosArray[i] -= center[2];
              curvePosArray[i] /= scale / 2;
            }
          }
        } else {
          for (var i = 0; i < curvePosArray.length; i += 1) {
            if (i % 2 === 0) {
              curvePosArray[i] -= center[0];
              curvePosArray[i] /= scale / 2;
            } else {
              curvePosArray[i] -= center[1];
              curvePosArray[i] /= scale / 2;
            }
          }
        }
      } else if (scaleMode === 'stretch') {
        var center = [(min_x + max_x) / 2, (min_y + max_y) / 2, (min_z + max_z) / 2];
        var x_scale = max_x === min_x ? 1 : max_x - min_x;
        var y_scale = max_y === min_y ? 1 : max_y - min_y;
        var z_scale = max_z === min_z ? 1 : max_z - min_z;

        if (space === '3D') {
          for (var i = 0; i < curvePosArray.length; i += 1) {
            if (i % 3 === 0) {
              curvePosArray[i] -= center[0];
              curvePosArray[i] /= x_scale / 2;
            } else if (i % 3 === 1) {
              curvePosArray[i] -= center[1];
              curvePosArray[i] /= y_scale / 2;
            } else {
              curvePosArray[i] -= center[2];
              curvePosArray[i] /= z_scale / 2;
            }
          }
        } else {
          for (var i = 0; i < curvePosArray.length; i += 1) {
            if (i % 2 === 0) {
              curvePosArray[i] -= center[0];
              curvePosArray[i] /= x_scale / 2;
            } else {
              curvePosArray[i] -= center[1];
              curvePosArray[i] /= y_scale / 2;
            }
          }
        }
      }

      return {
        toReplString: function () {
          return '<ShapeDrawn>';
        },
        init: function (canvas) {
          canvasElement = canvas;
          renderingContext = canvasElement.getContext('webgl');

          if (!renderingContext) {
            return;
          }

          var cubeBuffer = renderingContext.createBuffer();
          renderingContext.bindBuffer(renderingContext.ARRAY_BUFFER, cubeBuffer);
          renderingContext.bufferData(renderingContext.ARRAY_BUFFER, new Float32Array(drawCubeArray), renderingContext.STATIC_DRAW);
          var curveBuffer = renderingContext.createBuffer();
          renderingContext.bindBuffer(renderingContext.ARRAY_BUFFER, curveBuffer);
          renderingContext.bufferData(renderingContext.ARRAY_BUFFER, new Float32Array(curvePosArray), renderingContext.STATIC_DRAW);
          var curveColorBuffer = renderingContext.createBuffer();
          renderingContext.bindBuffer(renderingContext.ARRAY_BUFFER, curveColorBuffer);
          renderingContext.bufferData(renderingContext.ARRAY_BUFFER, new Float32Array(curveColorArray), renderingContext.STATIC_DRAW);
          var shaderProgram = initShaderProgram(renderingContext, vsS, fsS);
          var programInfo = {
            program: shaderProgram,
            attribLocations: {
              vertexPosition: renderingContext.getAttribLocation(shaderProgram, 'aVertexPosition'),
              vertexColor: renderingContext.getAttribLocation(shaderProgram, 'aFragColor')
            },
            uniformLocations: {
              projectionMatrix: renderingContext.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
              modelViewMatrix: renderingContext.getUniformLocation(shaderProgram, 'uModelViewMatrix')
            }
          };
          var buffers = {
            cubeBuffer: cubeBuffer,
            curveBuffer: curveBuffer,
            curveColorBuffer: curveColorBuffer
          };
          drawCurve(renderingContext, buffers, programInfo, numPoints, drawMode, space);
        }
      };
    }

    function draw_connected(num) {
      return function (func) {
        return generateCurve('none', 'lines', num, func, '2D', false);
      };
    }

    function draw_connected_full_view(num) {
      return function (func) {
        return generateCurve('stretch', 'lines', num, func, '2D', true);
      };
    }

    function draw_connected_full_view_proportional(num) {
      return function (func) {
        return generateCurve('fit', 'lines', num, func, '2D', true);
      };
    }

    function draw_points_on(num) {
      return function (func) {
        return generateCurve('none', 'points', num, func, '2D', false);
      };
    }

    function draw_points_full_view_proportional(num) {
      return function (func) {
        return generateCurve('fit', 'points', num, func, '2D', true);
      };
    }

    function draw_3D_connected(num) {
      return function (func) {
        return generateCurve('none', 'lines', num, func, '3D', false);
      };
    }

    function draw_3D_connected_full_view(num) {
      return function (func) {
        return generateCurve('stretch', 'lines', num, func, '3D', false);
      };
    }

    function draw_3D_connected_full_view_proportional(num) {
      return function (func) {
        return generateCurve('fit', 'lines', num, func, '3D', false);
      };
    }

    function draw_3D_points_on(num) {
      return function (func) {
        return generateCurve('none', 'points', num, func, '3D', false);
      };
    }

    function draw_3D_points_full_view_proportional(num) {
      return function (func) {
        return generateCurve('fit', 'points', num, func, '3D', false);
      };
    }

    function make_point(x, y) {
      return {
        x: x,
        y: y,
        z: 0,
        color: [0, 0, 0, 1]
      };
    }

    function make_3D_point(x, y, z) {
      return {
        x: x,
        y: y,
        z: z,
        color: [0, 0, 0, 1]
      };
    }

    function make_color_point(x, y, r, g, b) {
      return {
        x: x,
        y: y,
        z: 0,
        color: [r / 255, g / 255, b / 255, 1]
      };
    }

    function make_3D_color_point(x, y, z, r, g, b) {
      return {
        x: x,
        y: y,
        z: z,
        color: [r / 255, g / 255, b / 255, 1]
      };
    }

    function x_of(pt) {
      return pt.x;
    }

    function y_of(pt) {
      return pt.y;
    }

    function z_of(pt) {
      return pt.z;
    }

    function r_of(pt) {
      return pt.color[0] * 255;
    }

    function g_of(pt) {
      return pt.color[1] * 255;
    }

    function b_of(pt) {
      return pt.color[2] * 255;
    }

    function invert(curve) {
      return function (t) {
        return curve(1 - t);
      };
    }

    function translate(x0, y0, z0) {
      return function (curve) {
        var transformation = function transformation(cf) {
          return function (t) {
            var a = x0 === undefined ? 0 : x0;
            var b = y0 === undefined ? 0 : y0;
            var c = z0 === undefined ? 0 : z0;
            var ct = cf(t);
            return make_3D_color_point(a + x_of(ct), b + y_of(ct), c + z_of(ct), r_of(ct), g_of(ct), b_of(ct));
          };
        };

        return transformation(curve);
      };
    }

    function rotate_around_origin(theta1, theta2, theta3) {
      if (theta3 === undefined && theta1 !== undefined && theta2 !== undefined) {
        throw new Error('Expected 1 or 3 arguments, but received 2');
      } else if (theta1 !== undefined && theta2 === undefined && theta3 === undefined) {
        var cth_1 = Math.cos(theta1);
        var sth_1 = Math.sin(theta1);
        return function (curve) {
          var transformation = function transformation(c) {
            return function (t) {
              var ct = c(t);
              var x = x_of(ct);
              var y = y_of(ct);
              var z = z_of(ct);
              return make_3D_color_point(cth_1 * x - sth_1 * y, sth_1 * x + cth_1 * y, z, r_of(ct), g_of(ct), b_of(ct));
            };
          };

          return transformation(curve);
        };
      } else {
        var cthx_1 = Math.cos(theta1);
        var sthx_1 = Math.sin(theta1);
        var cthy_1 = Math.cos(theta2);
        var sthy_1 = Math.sin(theta2);
        var cthz_1 = Math.cos(theta3);
        var sthz_1 = Math.sin(theta3);
        return function (curve) {
          var transformation = function transformation(c) {
            return function (t) {
              var ct = c(t);
              var coord = [x_of(ct), y_of(ct), z_of(ct)];
              var mat = [[cthz_1 * cthy_1, cthz_1 * sthy_1 * sthx_1 - sthz_1 * cthx_1, cthz_1 * sthy_1 * cthx_1 + sthz_1 * sthx_1], [sthz_1 * cthy_1, sthz_1 * sthy_1 * sthx_1 + cthz_1 * cthx_1, sthz_1 * sthy_1 * cthx_1 - cthz_1 * sthx_1], [-sthy_1, cthy_1 * sthx_1, cthy_1 * cthx_1]];
              var xf = 0;
              var yf = 0;
              var zf = 0;

              for (var i = 0; i < 3; i += 1) {
                xf += mat[0][i] * coord[i];
                yf += mat[1][i] * coord[i];
                zf += mat[2][i] * coord[i];
              }

              return make_3D_color_point(xf, yf, zf, r_of(ct), g_of(ct), b_of(ct));
            };
          };

          return transformation(curve);
        };
      }
    }

    function scale(a, b, c) {
      return function (curve) {
        var transformation = function transformation(cf) {
          return function (t) {
            var ct = cf(t);
            var a1 = a === undefined ? 1 : a;
            var b1 = b === undefined ? 1 : b;
            var c1 = c === undefined ? 1 : c;
            return make_3D_color_point(a1 * x_of(ct), b1 * y_of(ct), c1 * z_of(ct), r_of(ct), g_of(ct), b_of(ct));
          };
        };

        return transformation(curve);
      };
    }

    function scale_proportional(s) {
      return scale(s, s, s);
    }

    function put_in_standard_position(curve) {
      var start_point = curve(0);
      var curve_started_at_origin = translate(-x_of(start_point), -y_of(start_point), 0)(curve);
      var new_end_point = curve_started_at_origin(1);
      var theta = Math.atan2(y_of(new_end_point), x_of(new_end_point));
      var curve_ended_at_x_axis = rotate_around_origin(0, 0, -theta)(curve_started_at_origin);
      var end_point_on_x_axis = x_of(curve_ended_at_x_axis(1));
      return scale_proportional(1 / end_point_on_x_axis)(curve_ended_at_x_axis);
    }

    function connect_rigidly(curve1, curve2) {
      return function (t) {
        return t < 1 / 2 ? curve1(2 * t) : curve2(2 * t - 1);
      };
    }

    function connect_ends(curve1, curve2) {
      var start_point_of_curve2 = curve2(0);
      var end_point_of_curve1 = curve1(1);
      return connect_rigidly(curve1, translate(x_of(end_point_of_curve1) - x_of(start_point_of_curve2), y_of(end_point_of_curve1) - y_of(start_point_of_curve2), z_of(end_point_of_curve1) - z_of(start_point_of_curve2))(curve2));
    }

    function unit_circle(t) {
      return make_point(Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t));
    }

    function unit_line(t) {
      return make_point(t, 0);
    }

    function unit_line_at(t) {
      return function (a) {
        return make_point(a, t);
      };
    }

    function arc(t) {
      return make_point(Math.sin(Math.PI * t), Math.cos(Math.PI * t));
    }

    function curves() {
      return {
        make_point: make_point,
        make_3D_point: make_3D_point,
        make_color_point: make_color_point,
        make_3D_color_point: make_3D_color_point,
        draw_connected: draw_connected,
        draw_connected_full_view: draw_connected_full_view,
        draw_connected_full_view_proportional: draw_connected_full_view_proportional,
        draw_points_on: draw_points_on,
        draw_points_full_view_proportional: draw_points_full_view_proportional,
        draw_3D_connected: draw_3D_connected,
        draw_3D_connected_full_view: draw_3D_connected_full_view,
        draw_3D_connected_full_view_proportional: draw_3D_connected_full_view_proportional,
        draw_3D_points_on: draw_3D_points_on,
        draw_3D_points_full_view_proportional: draw_3D_points_full_view_proportional,
        x_of: x_of,
        y_of: y_of,
        z_of: z_of,
        r_of: r_of,
        g_of: g_of,
        b_of: b_of,
        unit_line: unit_line,
        unit_line_at: unit_line_at,
        unit_circle: unit_circle,
        connect_rigidly: connect_rigidly,
        connect_ends: connect_ends,
        put_in_standard_position: put_in_standard_position,
        translate: translate,
        scale_proportional: scale_proportional,
        scale: scale,
        rotate_around_origin: rotate_around_origin,
        arc: arc,
        invert: invert
      };
    }

    return curves;

}());
