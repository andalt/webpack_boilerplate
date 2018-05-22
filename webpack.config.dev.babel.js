import merge from 'webpack-merge';
import path from 'path';
import autoPreFixer from 'autoprefixer';
// import webpack from 'webpack';

import common from './webpack.config.babel.common';

const config = {
    devtool: 'eval-source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
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
            }
        ]
    },

    devServer: {
        compress: true,
        port: 1111,
        inline: true,
        host: '0.0.0.0',
        // hot: true,
        contentBase: path.resolve(__dirname, './build')
        // hotOnly: true,
        // historyApiFallback: true
    }

    /* plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ] */
};

module.exports = merge(common, config);
