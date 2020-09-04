'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const SpritesmithPlugin = require('webpack-spritesmith') // 主角，必须引入。要不然咋用

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // ??history模式下打包有问题, 只能使用'/' 不能是'./'否则静态资源会报错，要直接点访问只能使用hash模式('./')?? https://cli.vuejs.org/zh/config/#publicpath
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://119.27.160.97:8530',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/dfs': {
        target: 'http://119.27.160.97:8531',
        changeOrigin: true,
        pathRewrite: {}
      }
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    /*
   细节坑。文档里面写着 需要resolve，引入图片生成的位置，
   不加这行会报错。因为github，Readme里面有这句话
   resolve contains location of where generated image is
   （要把生成的地址resolve到modules里面。不写就错）
   一定要加，血的教训啊
   */
    config.resolve.modules = ['node_modules', './src/assets/images']
    // 定义一个插件数组。用来覆盖，在里面使用我们的主角
    const Plugins = [
      new SpritesmithPlugin({
        /*
        目标小图标，这里就是你需要整合的小图片的老巢。
        现在是一个个的散兵，把他们位置找到，合成一个
        */
        src: {
          cwd: path.resolve(__dirname, './src/icons/png'),
          glob: '*.png'
        },
        // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprite.png'),
          css: [
            [path.resolve(__dirname, './src/assets/css/sprite.scss'), {
              // 引用自己的模板
              format: 'function_based_template'
            }]
          ]
        },
        // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
        customTemplates: {
          'function_based_template': templateFunction
        },
        // 样式文件中调用雪碧图地址写法（Readme这么写的）
        apiOptions: {
          cssImageRef: '~sprite.png'
        },
        // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
        spritesmithOptions: {
          padding: 20
        }
      })
    ]
    // config里面，覆盖掉以前的，要不然不好使
    config.plugins = [...config.plugins, ...Plugins]

    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    return {
      name: name,
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

/* 这里是我们自己修改的模板样式，webpack，会自动生成一个sprite.css的样式，有时候生成的不满意，
我们可以在这里修改，可以自己打印一下 data里面的参数，看着就会大概明白（先看下面的配置，最后看这个模板）
*/
var templateFunction = function (data) {
  var shared = '.easy-icon { background-image: url(I);background-size: Wpx Hpx;display: inline-block;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width)
    .replace('H', data.spritesheet.height)

  var perSprite = data.sprites.map(function (sprite) {
    return '.easy-icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
  }).join('\n')

  return shared + '\n' + perSprite
}
