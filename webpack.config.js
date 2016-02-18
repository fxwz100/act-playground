var path = require('path')

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: "./game",
    output: {
        path: __dirname,
        filename: "game.js"
    },
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    resolve: {
        extensions: ['js', '.coffee']
    }
};
