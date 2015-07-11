/** @jsx React.DOM **/

var React = require("react/addons");
var _     = require("underscore");
var d3 = require("d3");

var ByteConsumer = require("../mixins/ByteConsumer");
var ByteHelper = require("../utils/ByteHelper");

var ByteList = module.exports = React.createClass({
  displayName: "ByteList",
  mixins: [ByteConsumer],

  getDefaultProps: function() {
    return {
      period:                     1000,
      bytesPerTick:                  1,
      byteCount:                    12,

      height:                       50,
      byteTextWidth:                48,
      transitionLength:            250,
      transitionEase:   "cubic-in-out",
    };
  },

  getInitialState: function() {
    return {
      bytes: [], 
    };
  },

  onBytesConsumed: function(bytes) {
    var newState = React.addons.update(this.state, {
      bytes: { $push : bytes }
    });

    if(newState.bytes.length > this.props.byteCount) {
      newState.bytes.shift();
    }

    this.setState(newState);
  },

  componentDidMount: function() {
    var self = this,
         dom = this.getDOMNode(),
        $dom = $(dom);

    d3.select(dom)
      .append("svg")
        .attr("width", $dom.width())
        .attr("height", this.props.height)
      .append("g");

    this.setState({ byteConsumerActive: true });
  },

  componentDidUpdate: function(prevProps, prevState) {
    var btw       = this.props.byteTextWidth,
        tlen      = this.props.transitionLength,
        tease     = this.props.transitionEase,
        svg       = d3.select(this.getDOMNode())
                    .select("svg")
                    .select("g"),
        numBytes  = this.state.bytes.length,
        keyFn     = function(d) {
                      return d.key;
                    },
        strFn     = ByteHelper.byteString,
        posFn     = function(d, i) {
                      return ((numBytes - i) * btw);
                    },
        entryFn   = function(d, i) {
                      return 0;
                    },
        exitFn    = function(d, i) {
                      return (posFn(d, i) + btw);
                    };

    var text = svg.selectAll("text")
                  .data(this.state.bytes, keyFn);

    text.attr("class", "update")
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", posFn);

    text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", 20)
      .attr("x", entryFn)
      .style("fill-opacity", 0)
      .text(strFn)
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", posFn)
        .style("fill-opacity", 1);

    text.exit().attr("class", "exit")
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", exitFn)
        .style("fill-opacity", 0)
      .remove();
  },

  render: function() {
    return (
      <div id="byte-sequence" />
    );
  },
});
