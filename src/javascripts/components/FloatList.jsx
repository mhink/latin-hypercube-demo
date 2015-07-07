/** @jsx React.DOM **/

var _     = require("underscore");
var React = require("react/addons");
var Reflux = require("reflux");
var d3 = require("d3");
var RandomFloatStore = require("../stores/RandomFloatStore");

var FloatList = module.exports = React.createClass({
  displayName: "FloatList",
  mixins: [Reflux.listenTo(RandomFloatStore, "onFloatProvided")],

  getDefaultProps: function() {
    return {
      textWidth:               64,
      transitionLength:       250,
      transitionEase:    "linear",
    };
  },

  getInitialState: function() {
    return {
      current:       0,
      floats:       [], 
    };
  },

  onFloatProvided: function(_float) {
    var newState = React.addons.update(this.state, {
      floats:  { $push: [_float]        },
      current: { $set:   _float.intVal  },
    });

    if(newState.floats.length > 4) {
      newState.floats.shift();
    }

    this.setState(newState);
  },

  componentDidMount: function() {
    d3.select(this.getFloatSequenceNode())
      .append("svg")
        .attr("width", 800)
        .attr("height", 100)
      .append("g");
  },

  componentDidUpdate: function(prevProps, prevState) {
    var btw   = this.props.textWidth;
    var tlen  = this.props.transitionLength;
    var tease = this.props.transitionEase;
    var svg   = d3.select(this.getFloatSequenceNode())
                .select("svg")
                .select("g");

    var datapointKey = function(d) {
      return d.key;
    };

    var datapointPos = function(d, i) {
      return ((i+1) * btw);
    };

    var datapointEntryPos = function(d, i) {
      return (datapointPos(d, i) + btw);
    };

    var datapointExitPos = function(d, i) {
      return 0;
    };

    var stringForFloat = function(f) {
      return f.val.toPrecision(3);
    };

    var text = svg.selectAll("text")
                  .data(this.state.floats, datapointKey);

    text.attr("class", "update")
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", datapointPos);

    text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", 20)
      .attr("x", datapointEntryPos)
      .style("fill-opacity", 0)
      .text(stringForFloat)
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", datapointPos)
        .style("fill-opacity", 1);

    text.exit().attr("class", "exit")
      .transition()
        .duration(tlen)
        .ease(tease)
        .attr("x", datapointExitPos)
        .style("fill-opacity", 0)
      .remove();
  },

  render: function() {
    var bitstring = this.state.current.toString(2);
    var padding   = new Array(32 - bitstring.length + 1).join("0");

    return (
      <div>
        <div id="float-sequence" />
        <div id="current-float">
          { padding + bitstring }
        </div>
      </div>
    );
  },
  
  getFloatSequenceNode: function() {
    return $(this.getDOMNode()).find("#float-sequence")[0];
  },
});
