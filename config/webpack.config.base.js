const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

module.exports = function (envKeyWord, env) {
  const isDev = envKeyWord === 'development' || envKeyWord === 'mock'
  const mode = envKeyWord === 'test' || envKeyWord === 'production' ? 'production' : 'development'

  return {
    mode: mode,
    performance: {
      hints: isDev ? false : 'warning'
    },
    entry: {
      vendor: ['axios', 'nprogress']
    },
    output: {
      filename: isDev ? 'js/[name].js' : 'js/[name].min.[chunkhash:7].js',
      path: path.resolve(env.distPath),
      publicPath: env.publicPath,
      pathinfo: isDev
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          // test: /\.(js|vue|ts|tsx)$/,
          test: /\.(js|ts|tsx)$/,
          loader: 'eslint-loader',
          options: {
            fix: true
          },
          exclude: /node_modules/
        },

        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
          include: [path.join(__dirname, '..', 'src/js')]
        },

        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            context: 'client',
            name: isDev ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
            outputPath: isDev ? '' : 'assets/images/',
            publicPath: isDev ? '../' : '../'
          }
        },
        
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            context: 'client',
            publicPath: '../'
          }
        },

        {
          test: /\.(le|c)ss$/,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [autoprefixer()]
              }
            },
            'less-loader'
          ]
        },

        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [path.join(__dirname, '..', 'src')]
        },
        
        {
          test: /\.html$/,
          loader: 'html-loader',
          include: [path.join(__dirname, '..', 'src')]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.less', '.css', '.html', '.json', '.ts', '.tsx'],
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        // 'vue': 'vue-next/packages/vue',
        '@': path.join(__dirname, '../src/'),
        'env.cfg': '',
        'pages': path.join(__dirname, '../src/js/pages/'),
        'components': path.join(__dirname, '../src/js/components/'),
        'assets': path.join(__dirname, '../src/assets/'),
        'common': path.join(__dirname, '../src/js/common/'),
        'utils': path.join(__dirname, '../src/js/utils/'),
        'store': path.join(__dirname, '../src/js/store'),
        'mixins': path.join(__dirname, '../src/js/mixins'),
        'filters': path.join(__dirname, '../src/js/filters')
      }
    },
    plugins: [],
    optimization: {},
    node: {
      buffer: false
    }
  }
}
