const path = require('path')
module.exports = {
    devServer: {
        port: 8088
    },
    outputDir: 'lib',
    pages: {
        index: {
        entry: 'examples/main.js',
        template: 'public/index.html',
        filename: 'index.html'
        }
    },
    pluginOptions: {}, // 第三方插件配置
    configureWebpack: {
        resolve: {
            alias: {
              '@': path.join(__dirname, '/'),
            },
        },
        module: {
            rules: [ // 可在package.json 配置顶层 sideEffects: false
                // {
                //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                //     use:[
                //             {
                //                 loader: "file-loader",
                //                 options: {
                //                     name: 'img/[name].[ext]?[hash]'
                //                 }
                //             },
                //             // {
                //             //     loader: 'url-loader',
                //             //     options: {
                //             //         limit: 10000,
                //             //         name: 'img/[name].[ext]?[hash]'
                //             //     }
                //             // }
                //     ]
                // },
            ]
        }
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.module
        .rule('js')
        .include.add(path.resolve(__dirname, 'packages')).end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
            // 修改它的选项...
            return options
        })
    }
}
