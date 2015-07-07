/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var Reflux = require("reflux");
var d3 = require("d3");
var RandomByteStore = require("../stores/RandomByteStore");

var ByteDistributionChart = module.exports = React.createClass({
  displayName: "ByteDistributionChart",
  mixins: [Reflux.listenTo(RandomByteStore, "onByteProvided")],

  onByteProvided: function(b) {
  },

  render: function() {
    return (
      <div id="byte-distribution">
        <div id="canonical-distribution" />
        <div id="observed-distribution" />
      </div>
    );
  }
});
