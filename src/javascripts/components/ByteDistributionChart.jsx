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
      bytesPerTick:   50,
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

  componentDidMount: function() {
    this.setState({width: $(this.getDOMNode()).width()});
  },

  reset: function() {
    this.setState(this.getInitialState());
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
        </div>
        <div>
          <button onClick={this.toggleConsumer }>
            { this.state.byteConsumerActive ? "Stop" : "Start" }
          </button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
});
