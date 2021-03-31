export function Uint8ArrayToBase64(u8) {
  const utf8decoder = new TextDecoder();
  return btoa(utf8decoder.decode(u8));
}

export function Base64ToUint8Array(str) {
  return new Uint8Array(
    atob(str)
      .split("")
      .map(function (c) {
        return c.charCodeAt(0);
      })
  );
}

export function Base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export var saveBlob = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (blob, fileName) {
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

export function Uint8ArrayToHex(uint8arr) {
  if (!uint8arr) {
    return "";
  }

  var hexStr = "";
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    hexStr += hex;
  }

  return hexStr.toUpperCase();
}

export function HexToUint8Array(str) {
  if (!str) {
    return new Uint8Array();
  }

  var a = [];
  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}
