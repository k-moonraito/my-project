const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
     rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader,'css-loader']
     }]
    },
    devServer: {
        contentBase:'./dist',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot:true
      },
    plugins: [
        new CopyWebpackPlugin([
            {
            from: './src/images',
            to: './images'
            }
        ]),
        new HtmlWebpackPlugin({
            // 模板文件
            template: 'src/index.html',
            // 打包后文件名称，会自动放到 output 指定的 dist 目录
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            　　filename: "[name].[chunkhash:8].css",
            　　 chunkFilename: "[id].css"
         　　 }),
        new CleanWebpackPlugin(
            [
              'dist/js',
              'dist/'
            ],
            {
              verbose: true,
              dry: false,
            }
          )
      ],
      mode: 'production'
}