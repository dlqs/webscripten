
function Uint8ArrayToBase64(u8) {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(u8);
}

function Base64ToUint8Array(str) {
  return new Uint8Array(
    atob(str)
      .split("")
      .map(function (c) {
        return c.charCodeAt(0);
      })
  );
}

function Base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

var saveBlob = (function () {
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
