const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Components = require('./components.json');
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
});
module.exports = {
    mode: "production",
    entry: Components, // 打包入口
    output: { // 出口文件
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: 'components/[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '/'),
          },
        modules: ['node_modules']
    },
    externals: externals,
    module: {
        rules: [
          {
            test: /\.(jsx?|babel|es6)$/,
            include: process.cwd(),
            exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
            loader: 'babel-loader'
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: [
                'style-loader', // 将 JS 字符串生成为 style 节点
                'css-loader', // 将 CSS 转化成 CommonJS 模块
                'sass-loader'// 将 Sass 编译成 CSS
            ]
          },
          {
            test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            }
          }
        ]
      },
    plugins: [
        new VueLoaderPlugin()
        // new CleanWebpackPlugin(), // 每次打包都先删除打包目录
    ],
}