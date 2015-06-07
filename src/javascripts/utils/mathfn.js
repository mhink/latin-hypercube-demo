var Erf = require("./functions/erf.js");
exports.erf = Erf.erf;
exports.erfc = Erf.erfc;
exports.invErfc = Erf.invErfc;
exports.invErf = Erf.invErf;

var Gamma = require("./functions/gamma.js");
exports.gamma = Gamma.gamma;
exports.logGamma = Gamma.logGamma;

var Beta = require("./functions/beta.js");
exports.beta = Beta.beta;
exports.logBeta = Beta.logBeta;
exports.incBeta = Beta.incBeta;
exports.invIncBeta = Beta.invIncBeta;

var Log = require("./functions/log.js");
exports.log1p = Log.log1p;
exports.logFactorial = Log.logFactorial;
