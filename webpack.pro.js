const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log(__dirname)
module.exports = {
    mode: 'production',
    entry: __dirname + "/examples/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js", // 打包后的文件命名
        publicPath: '/'
    },
    devServer: {
        contentBase: "../dist", // 本地服务器所加载的页面所在的目录
        publicPath: '/', // 公共路径 打包后资源可以访问的路径
        historyApiFallback: true, // 找不到界面默认返回首页
        disableHostCheck: true, // 检查主机host 开发环境下可建议禁止
        inline: true, //实时刷新
        host: '0.0.0.0',
        port: 8088,
        open: false
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 重定向代理
           "@": path.resolve(__dirname + "/examples/") // 设置模块基路径
        }
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use:'css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader', // 将 CSS 转化成 CommonJS 模块
                    'sass-loader' // 将 Sass 编译成 CSS
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /node_modules/
            }
        ]
    },
    plugins: [
        // v5.12以上的版本要添加patterns
        new copyWebpackPlugin({
            patterns: [
                {
                    from:path.resolve(__dirname+'/static'),// 打包的静态资源目录地址 不经过 webpack，需要通过绝对路径来引用
                    to:'static' // 打包到dist下面的static
                }
            ]
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(), // 每次打包都先删除打包目录
        new HtmlWebpackPlugin({
            title: 'webpack',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html', // 输出的模板名字
            template: './public/index.html' // 模板路径
        })
    ]
}