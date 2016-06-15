
var ghPages = require('gh-pages');
var path = require('path');

// added node .10
// http://stackoverflow.com/questions/21698906/how-to-check-if-a-path-is-absolute-or-relative/30714706#30714706
function isAbsolute(dir) {
  return path.normalize(dir + path.sep) === path.normalize(path.resolve(dir) + path.sep);
}

function GhPagesWebpackPlugin(options) {
    // must has path params in options
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

    // after the data has been created then publish
    compiler.plugin('after-emit', function(complation, callback) {

        // continue the webpack progress
        callback();

        // get absolute path if it's relative path
        if(!isAbsolute(dist)) {
            dist = path.join(this.options.context, dist);
        }

        console.log('\n' + dist + ' is being publish');

        // publish
        ghPages.publish(dist, _this.options.options, function(err) {
            if(err) {
                throw err;
            } else {
                console.log(dist + ' has been published');
            }

        });

    });
};

module.exports = GhPagesWebpackPlugin;

