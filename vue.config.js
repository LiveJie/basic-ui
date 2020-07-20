const path = require('path')
module.exports = {
    devServer: {
        port: 8088,
        overlay: {
            warnings: false,
            errors: false
        },
    },
    publicPath: './',
    assetsDir: '',
    outputDir: 'lib',
    lintOnSave: false,
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    pluginOptions: {}, // 第三方插件配置
    configureWebpack: {
        output: { // 输出重构  打包编译后的 文件名称  
            filename: `[name].[hash].js`,
        },
        resolve: {
            alias: {
              '@': path.join(__dirname, '/'),
            },
        },
        // module: {
        //     rules: [ // 可在package.json 配置顶层 sideEffects: false
        //       {
        //         test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        //         loader: 'url-loader',
        //         query: {
        //           limit: 8196,
        //           name: path.posix.join('static', '[name].[hash:7].[ext]')
        //         }
        //       }
        //     ]
        // }
    },
}
