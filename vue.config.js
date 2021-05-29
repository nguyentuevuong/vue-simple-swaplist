const path = require('path');
const webpack = require('webpack');
// const configureAPI = require('./srv');

module.exports = {
    devServer: {
        port: 8088
    },
    lintOnSave: true,
    chainWebpack: config => {
        config
            .entry('app')
            .add('bootstrap/dist/css/bootstrap.min.css');

        // lazy load
        config.plugins.delete('prefetch');
    }
};
