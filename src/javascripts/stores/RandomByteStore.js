var Reflux    = require("reflux");
var _         = require("underscore");

var RandomByteStore = module.exports = Reflux.createStore({
  init: function() {
    var self = this;

    this._byteCounter   = 0;
    this._bufferIndex   = 0;
    this._buffer        = new Uint8Array(10);
    this._generateBuffer();

    this._interval = setInterval(function() {
      self.trigger(self.provideByte.apply(self));
    }, 1000);
  },
  
  provideByte: function() {
    return {
      key: this._byteCounter++,
      val: this._provideRandomByte()
    };
  },

  _provideCycleByte: function() {
    var cycle = [0x00, 0x01, 0x02, 0x03, 0x04];
    return cycle[this._byteCounter % 5];
  },

  _provideRandomByte: function() {
    if(this._bufferIndex == (this._buffer.length - 1)) {
      this._generateBuffer();
    }
    else {
      this._bufferIndex++;
    }

    return (this._buffer[this._bufferIndex]);
  },

  _generateBuffer : function() {
    window.crypto.getRandomValues(this._buffer);
    this._bufferIndex = 0;
  },
});
