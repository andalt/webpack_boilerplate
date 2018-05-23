import merge from 'webpack-merge';
import autoPreFixer from 'autoprefixer';
// import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import common from './webpack.config.babel.common';

const extractStyles = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: false
});

const config = {
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: extractStyles.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoPreFixer({
                                    browsers: ['last 2 versions']
                                })]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        extractStyles
    ]
};

module.exports = merge(common, config);
