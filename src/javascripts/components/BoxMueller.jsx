/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var ByteConsumer = require("../mixins/ByteConsumer");

var BoxMueller = module.exports = React.createClass({
  displayName: "BoxMueller",
  mixins: [ByteConsumer],

  statics: {
    bytesToUniform: function(bytes) {
      var u0 = 0,
          u1 = 0;

      return [u0, u1];
    },

    boxMueller: function(u0, u1) {
      var tc = Math.cos(2 * Math.PI * u1),
          ts = Math.sin(2 * Math.PI * u1),
          r  = Math.sqrt(-2 * Math.log(u0)),
          n0 = r * tc,
          n1 = r * ts;
          
      return [n0, n1];
    },
  },

  getDefaultProps: function() {
    return {
      period:         1000,
      bytesPerTick:      4,
      height:          200,
      xPadding:         50,
      yPadding:         35,
    };
  },

  getInitialState: function() {
    return {
      currentData: [],
    };
  },

  onBytesConsumed: function(newBytes, newState) {
    this.setState(React.addons.update(newState, {
      currentData: { $apply: function(data) {
      }},
    }));
  },

  componentDidMount: function() {
    this.setState({width: $(this.getDOMNode()).width()});
  },

  render: function() {
    return (
      <div id="box-mueller" />
    );
  }
});
