React         = require("react")
Root          = require("./components/Root")
Chart         = require("./components/Chart")
Distributions = require("./utils/distributions.js")
DistributionStore = require("./stores/DistributionStore")
$ = global.$ = require("jquery")

$(document).ready ->
  DistributionStore.init({
    mean:   80,
    stdev:  12,
  }, {
    mean:   31,
    stdev:  10
  })
  React.render(React.createElement(Chart),  $("#pdf-x")[0])
