import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        index: 'js/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                loaders: ['file-loader?name=[name].html', 'pug-html-loader']

            },
            {
                test: /\.(eot|ttf|woff|woff2|jpe?g|png|gif|svg)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },

    resolve: {
        modules: ['./src', 'node_modules'],

        alias: {
            Styles: path.resolve(__dirname, './src/scss'),
            Js: path.resolve(__dirname, './src/js'),
            Pug: path.resolve(__dirname, './src/pug')
        }
    },

    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, './build')),

        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        }),

        new CopyWebpackPlugin([{
            from: 'public',
            to: path.resolve(__dirname, './build')
        }])
    ]
};

module.exports = config;
