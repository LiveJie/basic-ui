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
  // 修改打包后img文件名
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        return {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: `img/[name].[hash].[ext]`
            }
          }
        };
      })
  }
}
