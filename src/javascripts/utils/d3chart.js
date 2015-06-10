var d3 = require('d3');

// d3Chart.js

// TODO: dedupe with DistributionStore
var DOMAIN = { min: 0, max: 100 };

var d3Chart = module.exports = {
  create: function(el, chartProps) {
    var scales = this._scales(el, chartProps.domain);

    var xAxis = d3.svg.axis()
      .scale(scales.i)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(scales.pi)
      .orient("left");

    var line = d3.svg.line()
      .x(function(d, i) {
        return scales.i(d.i);
      })
      .y(function(d, i) {
        return scales.pi(d.pi * 20);
      });

    var margin = { top: 20, right: 0, bottom: 30, left: 50 },
        width  = (el.offsetWidth - margin.left - margin.right),
        height = (el.offsetHeight - margin.top  - margin.bottom);


    this.svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width',  width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    this.svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    this.svg.append('g')
        .attr('class', 'd3-points')
        .attr('width',  width)
        .attr('height', height)
        .attr("transform", "translate(0," + (-margin.top - margin.bottom)+ ")")
      .append("svg:path").attr("d", line(data));
  },

  update: function(el, chartProps) {
    this.svg.selectAll('path').data(chartProps.data);
  },

  _scales: function(el, domain) {
    if (!domain) {
      return null;
    }

    var width   = el.offsetWidth;
    var height  = el.offsetHeight;

    var i = d3.scale.linear()
      .range([0, width])
      .domain(domain.i);

    var pi = d3.scale.linear()
      .range([height, 0])
      .domain(domain.pi);

    return {i: i, pi: pi};
  },
};
