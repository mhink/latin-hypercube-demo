/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react");
var Reflux = require("reflux");
var DistributionStore = require("../stores/DistributionStore");
var $     = require("jquery");

var d3Chart = require('../utils/d3chart.js');

var Chart = module.exports = React.createClass({
  displayName: "Chart",
  mixins: [Reflux.listenTo(DistributionStore, "onDistributionChange")],

  getInitialState: function() {
    return {
      sliderVal:  DistributionStore.xMean,
      data:       DistributionStore.data().x,
      domain:     DistributionStore.domains().x,
    };
  },

  onDistributionChange: function(payload) {
    console.log(payload.data[300]);
    this.setState({
      sliderVal: payload.mean,
      data:      payload.data,
    });
  },

  componentDidMount: function() {
    d3Chart.create($(this.getDOMNode()).children(".d3Chart")[0], this.state);
  },
  componentDidUpdate: function() {
    d3Chart.update($(this.getDOMNode()).children(".d3Chart")[0], this.state);
  },
  componentWillUnmount: function() {
    d3Chart.destroy(this.getDOMNode());
  },

  render: function() {
    return (
      <div>
        <div className="d3Chart" style={{height: '300px'}}></div>
        <input style={{width: "100%" }} value={this.state.sliderVal} onChange={this.sliderWasMoved} type="range" min="0" max="100" step="1" />
      </div>
    );
  },

  sliderWasMoved: function(event) {
    DistributionStore.updateXMean(event.target.value);
  }
});
