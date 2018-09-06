var path = require('path');
var config = {
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
              test:  /\.tsx?$/,
              exclude: /node_modules/,
              use: ['ts-loader']
            }
        ]    
    }
};

module.exports = config;