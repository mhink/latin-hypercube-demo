React                 = require("react")
ByteList              = require("./components/ByteList")
ByteDistributionChart = require("./components/ByteDistributionChart")
RandomByteStore       = require("./stores/RandomByteStore")
DistributionStore     = require("./stores/DistributionStore")

$ = global.$ = require("jquery")

$(document).ready ->
  React.render(React.createElement(ByteList),  $("#random-byte-samples")[0])
  React.render(React.createElement(ByteDistributionChart), $("#uniform-sample-rates")[0])
