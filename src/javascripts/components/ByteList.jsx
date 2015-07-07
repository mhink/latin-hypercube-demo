/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var Reflux = require("reflux");
var d3 = require("d3");
var RandomByteStore = require("../stores/RandomByteStore");

var ByteList = module.exports = React.createClass({
  displayName: "ByteList",
  mixins: [Reflux.listenTo(RandomByteStore, "onByteProvided")],

  statics: {
    datapointKey: function(d) {
      return d.key;
    },

    datapointString: function(d) {
      return "0x" + ((d.val < 0x10) ? "0" : "" ) + d.val.toString(16);
    },

    datapointPos: function(width, n) {
      return function(d, i) {
        return ((n - i) * width);
      };
    },

    datapointEntryPos: function(width, n) {
      return function(d, i) {
        return 0;
      };
    },

    datapointExitPos: function(width, n) {
      return function(d, i) {
        return (ByteList.datapointPos(width, n)(d, i) + width);
      };
    },

  },

  getDefaultProps: function() {
    return {
      height:                       50,
      byteCount:                    12,
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

  onByteProvided: function(_byte) {
    var newState = React.addons.update(this.state, {
      bytes: { $push : [_byte] }
    });

    if(newState.bytes.length > this.props.byteCount) {
      newState.bytes.shift();
    }

    this.setState(newState);
  },

  componentDidMount: function() {
    var  dom = this.getDOMNode(),
        $dom = $(dom);

    d3.select(dom)
      .append("svg")
        .attr("width", $dom.width())
        .attr("height", this.props.height)
      .append("g");
  },

  componentDidUpdate: function(prevProps, prevState) {
    var btw       = this.props.byteTextWidth,
        tlen      = this.props.transitionLength,
        tease     = this.props.transitionEase,
        svg       = d3.select(this.getDOMNode())
                    .select("svg")
                    .select("g"),
        numBytes  = this.state.bytes.length,
        keyFn     = ByteList.datapointKey,
        entryFn   = ByteList.datapointEntryPos(btw, numBytes),
        posFn     = ByteList.datapointPos(btw, numBytes),
        exitFn    = ByteList.datapointExitPos(btw, numBytes)
        strFn     = ByteList.datapointString;

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
