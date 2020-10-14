const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSSPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports =
{
    devtool: false,
    entry: {
        "app": "./src/app/index.tsx"
    },
    output: {
        filename: "[contenthash].js",
        chunkFilename: "[contenthash].js",
        path: path.join(__dirname, "/dist/app")
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                libraries: {
                    test: /node_modules|\/src\/libraries/,
                    chunks: 'initial',
                    name: 'libraries',
                    enforce: true
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({ template: "./src/index.htm", filename: "../index.htm" }),
        new ExtractCSSPlugin({ filename: "[hash].css" })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: ExtractCSSPlugin.loader },
                    "css-loader",
                    "sass-loader"]
            },
            {
                test: /\.ts(x)$/,
                use: ["ts-loader"], exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
                use: [{ loader: "url-loader", options: { name: "assets/[name].[ext]" } }]
            }
        ]
    }
}