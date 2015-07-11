exports.byteString = function(b) {
  return "0x" + ((b < 0x10) ? "0" : "") + b.val.toString(16);
};
