/** @jsx React.DOM **/

var _         = require("underscore");
var React     = require("react/addons");
var d3        = require("d3");

var PmfChart = module.exports = React.createClass({
  displayName: "PmfChart",

  getDefaultProps: function() {
    return {
      title:    "Untitled",
      domain:     [0, 255],
      height:          200,
      xPadding:         50,
      yPadding:         25,
      data:             [],
    };
  },

  getChartNode: function() {
    return $(this.getDOMNode()).find(".chart")[0];
  },

  xScale: function() {
    var p = this.props.xPadding,
        w = $(this.getChartNode()).width();

    return d3.scale.linear()
      .domain(this.props.domain)
      .range([p, w-p]);
  },

  yScale: function(yMax) {
    var p     = this.props.yPadding,
        h     = this.props.height;

    return d3.scale.linear()
      .nice()
      .domain([0, 0.01])
      .range([h-p, p]);
  },

  applyAxisX: function(applyTo) {
    var height = this.props.height,
       yPadding = this.props.yPadding,
           axis = d3.svg.axis()
                    .tickValues([0, 255])
                    .tickFormat(function(tv) {
                      return "0x" + ((tv < 0x10) ? "0" : "" ) + tv.toString(16);
                    })
                    .outerTickSize(0)
                    .orient("bottom")
                    .scale(this.xScale());

    return applyTo.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+(height-yPadding)+")")
      .call(axis);
  },

  applyAxisY: function(applyTo) {
    var xPadding = this.props.xPadding,
            yMax = d3.max(this.props.data, function(d) {
                     return d.y;
                   }),
          yScale = this.yScale(yMax),
            axis = d3.svg.axis()
                     .ticks(4)
                     .orient("left")
                     .scale(yScale)
                     .tickFormat(d3.format(".1%"));

    return applyTo.append("g")
       .attr("class", "axis")
       .attr("transform", "translate("+xPadding+",0)")
       .call(axis);
  },

  componentDidMount: function() {
    var   dom = this.getChartNode(),
         $dom = $(dom),
        width = $dom.width(),
       height = this.props.height,
       xScale = this.xScale(),
       yScale = this.yScale(),
          svg = d3.select(dom)
                  .append("svg")
                    .attr("width",  width)
                    .attr("height", height)
                  .append("g"),

    gCircles  = svg.append("g")
                   .attr("class", "circles"),
        keyFn = function(d) { return d.x; };

    this.applyAxisX(svg);
    this.applyAxisY(svg);
  },

  componentDidUpdate: function() {
    var      svg = d3.select(this.getChartNode())
                    .select("svg > g"),
        gCircles = svg.select("g.circles")
          xScale = this.xScale(),
          yScale = this.yScale(),
           keyFn = function(d) { return d.x; },
          points = gCircles.selectAll("circle")
                           .data(this.props.data, keyFn);

    // update
    points.attr("cx", function(d) { return xScale(d.x); })
          .attr("cy", function(d) { return yScale(d.y); });

    points.enter()
          .append("circle")
            .attr("r",  1);
  },

  render: function() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className="chart" />
      </div>
    );
  }
});
