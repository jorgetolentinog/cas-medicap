const stringify = require("fast-safe-stringify");

module.exports.handler = function (event) {
  console.log(stringify(event));
};
