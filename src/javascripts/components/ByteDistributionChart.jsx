/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var ByteConsumer = require("../mixins/ByteConsumer");
var PmfChart = require("./PmfChart")

var ByteDistributionChart = module.exports = React.createClass({
  displayName: "ByteDistributionChart",
  mixins: [ByteConsumer],

  getDefaultProps: function() {
    return {
      period:         10,
      bytesPerTick:   20,
      height:        200,
      xPadding:       50,
      yPadding:       35,
    };
  },

  getInitialState: function() {
    return {
      canonicalData: _.map(_.range(256), function(i) {
        return { x: i, y: (1/256) };
      }),
      observedCount: 0,
      observedData: _.map(_.range(256), function(i) {
        return { x: i, y: 0, nx: 0 };
      }),
    };
  },

  onBytesConsumed: function(newBytes, newState) {
    this.setState(React.addons.update(newState, {
      observedData: { $apply: function(data) {

        // Update byte counts
        _.each(newBytes, function(d) {
          data[d.val].nx += 1;
        });

        // Update byte observation percentages
        _.each(data, function(d) {
          d.y = (d.nx / newState.bytesConsumed);
        });

        return data;
      }},
    }));
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  renderSamples: function() {
    if(this.state.bytesConsumed > 0) {
      return (<p>Bytes sampled: { this.state.bytesConsumed }</p>);
    }
    else {
      return (<p></p>);
    }
  },

  render: function() {
    return (
      <div id="byte-distributions">
        <div id="byte-charts">
          <PmfChart
            title="Canonical Distribution"
            data={this.state.canonicalData}
            />
          <PmfChart
            title="Observed Distribution"
            data={this.state.observedData}
            />
          <div>
            <button onClick={this.toggleConsumer }>
              { this.state.byteConsumerActive ? "Stop" : "Start" }
            </button>
            <button onClick={this.reset}>Reset</button>
            { this.renderSamples() }
          </div>
        </div>
      </div>
    );
  }
});
