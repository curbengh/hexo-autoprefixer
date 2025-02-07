'use strict';

var autoprefixer = require('autoprefixer');
var micromatch = require('micromatch');
var postcss = require('postcss');

module.exports = async function(str, data) {
  var options = this.config.autoprefixer;
  var path = data.path;
  var exclude = options.exclude;
  if (exclude && !Array.isArray(exclude)) exclude = [exclude];

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  const result = await postcss([autoprefixer(options)]).process(str, {from: path});
  return result.css;
};
