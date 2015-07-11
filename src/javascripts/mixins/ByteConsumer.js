/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var Reflux = require("reflux");
var d3 = require("d3");
var RandomByteStore = require("../stores/RandomByteStore");

var ByteConsumer = module.exports = {
  propTypes: {
    period:       React.PropTypes.number.isRequired,
    bytesPerTick: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      byteConsumerActive: false,
      bytesConsumed:          0,
    };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.consumeBytes, this.props.period);
  },

  toggleConsumer: function() {
    this.setState({ byteConsumerActive: !this.state.byteConsumerActive });
  },

  consumeBytes: function() {
    if(this.state.byteConsumerActive) {
      var newBytes         = RandomByteStore.provideBytes(this.props.bytesPerTick);
      var newBytesConsumed = this.state.bytesConsumed + this.props.bytesPerTick;

      var newState = React.addons.update(this.state, {
        bytesConsumed: { $set: newBytesConsumed }
      });

      this.onBytesConsumed(newBytes, newState);
    }
  },

  componentWillUnmount: function() {
   clearInterval(this.interval);
  },
};
