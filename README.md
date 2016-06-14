### Usage

webpack.config.js

```
var GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
...

plugins: [
    new GhPagesWebpackPlugin({
        path: './public',
        options: {
            message: 'Update Home Page',
            user: {
                name: '年糕小豆汤',
                email: 'ooiss@qq.com'
            }
        }
    })
]

...

```

* `path` is the directory to be publish    
* `options` is the options for publish    
* see [gh-pages](https://www.npmjs.com/package/gh-pages) for more detail
