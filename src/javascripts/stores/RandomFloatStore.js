var Reflux    = require("reflux");
var _         = require("underscore");
var RandomByteStore = require("./RandomByteStore");
var mathjs    = require("mathjs");

var RandomFloatStore = module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(RandomByteStore, this.onByteProvided);

    this._floatCounter   = 0;
    this._bufferIndex = 0;

    var bb = this._byteBuffer = new Uint8Array(4);
    this._dv= new DataView(bb.buffer);
  },

  onByteProvided: function(_byte) {
    this._byteBuffer.set([_byte.val], this._bufferIndex++)
    if(this._bufferIndex > 3) {
      this._bufferIndex = 0;
      this.trigger(this.provideFloat());
      this._byteBuffer.set([0,0,0,0], 0);
    }
  },

  provideFloat: function() {
    var uint32       = this._dv.getUint32(0),
        scaledFloat  = uint32 / Math.pow(2, 32);

    return {
      key:    this._floatCounter++,
      val:    scaledFloat,
      intVal: uint32,
    };
  },
});
