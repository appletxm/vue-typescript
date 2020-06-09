var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = function (envKeyWord, publicPath) {
  return {
    entry: {
      vendor: ['axios', path.join(__dirname, '../src/js/utils/compatiable-ie-console.js')]
    },
    output: {
      filename: (envKeyWord === 'development' || envKeyWord === 'mock') ? 'js/[name].js' : 'js/[name].min.[hash:7].js',
      path: path.resolve('./dist'),
      publicPath: publicPath
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
        // },
        
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: 'client',
            name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
            outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/images/',
            publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '../' : '../'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: 'client',
            name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/fonts/[name].[hash:7].[ext]',
            outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/fonts/',
            publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '../' : '../'
          }
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader', {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [autoprefixer()]
                }
              },
              'less-loader'
            ]
          })
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          include: [path.join(__dirname, '..', 'src')]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.less', '.css', '.html', '.json'],
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        'vue': 'vue/dist/vue.min.js',
        '@': path.join(__dirname, '../src/'),
        'env.cfg': '',
        'pages': path.join(__dirname, '../src/js/pages/'),
        'components': path.join(__dirname, '../src/js/components/'),
        'assets': path.join(__dirname, '../src/assets/'),
        'common': path.join(__dirname, '../src/js/common/'),
        'utils': path.join(__dirname, '../src/js/utils/'),
        'store': path.join(__dirname, '../src/js/store')
      }
    },
    plugins: []
  }
}
