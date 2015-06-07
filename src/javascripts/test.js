
MEAN  = -8;
STDEV = 2;
MIN   = 1;
MAX   = 12;

LAMBDA = 1.5;

var dist     = require('distributions');
var dist_ext = require('./utils/distributions-ext.js');

var norm       = dist.Normal(MEAN, STDEV);
var trunc_norm = dist_ext.Truncated(MIN, MAX, norm);
var exp        = dist_ext.Exponential(LAMBDA);
var trunc_exp  = dist_ext.Truncated(MIN, MAX, exp);

var sum  = 0;

INC = 0.01;
for(var x = -10; x < 10; x += INC) {
  var phi = trunc_exp.pdf(x);
  var Phi = trunc_exp.cdf(x);
  sum += (INC * phi);
  console.log( x.toFixed(5), phi.toFixed(5), Phi.toFixed(5));
}

console.log("SUM: ", sum);
