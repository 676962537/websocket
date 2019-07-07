/**
 * Created by mahenan on 2017/10/20.
 */
// nodejs 中的path模块

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob")
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        "main":"./src/index.js"
    },
    // entry: ["./src/a/a.js","./src/b/b.js"],
    // 输出配置
    output: {
        // 输出路径是 mahenan/output
        path: path.resolve('dist'),
        // path: 'output/static/[name]/',

        // publicPath: 'mahenan',
        publicPath: '/',
        //上线时的使用  ex:可写http://cdn.com/取到的资源文件路径就是相对于这个地址的

        // filename: 'js/[name].[chunkhash].js',
        filename: '[name].js',
        // filename: 'js/mahenan.js',
        // chunkFilename: '[id].js'
    },
    resolve: {
        extensions: ['.css','.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@':path.join(__dirname, '../')
        }
    },
    module: {
        rules: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                //loader:'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                // 单独抽离出css
                // use: ExtractTextPlugin.extract({
                //     use: 'css-loader'
                // })
                // 使用style-loader和css-loader将其加载到js中
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jpg|\.png|\.jpeg/,
                use: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template:path.resolve('src/index.html'),
        data:new Date(),
        minify:{
            collapseWhitespace: false,
        }
    })]
};