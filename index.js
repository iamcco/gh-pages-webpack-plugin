'use strict';

var ghPages = require('gh-pages');
var path = require('path');

// added node .10
// http://stackoverflow.com/questions/21698906/how-to-check-if-a-path-is-absolute-or-relative/30714706#30714706
function isAbsolute(dir) {
  return path.normalize(dir + path.sep) === path.normalize(path.resolve(dir) + path.sep);
}

function GhPagesWebpackPlugin(options) {
    this.options = options;
    if(!options.path) {
        throw new Error('gh-pages-webpack-plugin must pass the path params');
        return;
    }
    if(!options.options) {
        this.options.options = {};
    }
}

GhPagesWebpackPlugin.prototype.apply = function(compiler, callback) {
    var _this = this, dist = _this.options.path;

    compiler.plugin('after-emit', function(complation, callback) {

        if(!isAbsolute(dist)) {
            dist = path.join(this.options.context, dist);
        }

        ghPages.publish(dist, _this.options.options, function(err) {
            if(err) {
                throw err;
            }
        });

        callback();
    });
};

module.exports = GhPagesWebpackPlugin;

