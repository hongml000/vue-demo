
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HttpWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 获取用户输入的环境变量
const env = process.env.NODE_ENV

// 将之前设置的配置，用一个变量存储起来
const config= {
  // 要先设置一个入口文件，这个路径往往为绝对路径，这样能保证不出错
  entry: path.join(__dirname, 'src/index.js'),
  // 输出文件
  // output: path.join(__dirname, 'dist')
  // 报错说output必须是一个对象，那么改一下
  output: {
    path: path.join(__dirname, 'dist'), 
    filename: 'index.js'
  },
  // 配置loaders
  module: {
    rules: [
      {
        test: /.vue$/,  // test是一个正则，用来匹配哪些文件要处理的
        loader: "vue-loader" // loader是说明用哪些模块来处理
      },
      // 注意，style-loader和css-loader位置不能写反，否则报CssSyntaxError错误
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // 注意这里不能写.style，否则会检测到.css文件
        test: /.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /.(jpg|gif|jpeg|png|svg)/,
        // 当需要对引用的loader做进一步配置时，需要使用use列表，在options里添加对应配置
        use: [
          // url-loader可以将图片转换成base代码，limit判断当文件大小小于1024时，就会将图片转换成base64
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'  // name是图片本身文件名，ext是文件的扩展名
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    // v15版的vue-loader配置需要加个VueLoaderPlugin
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: env === "development" ? '"development"' : '"production"'
      }
    }),
    // 用于生成html模板
    new HttpWebpackPlugin()
  ]
}

// 判断是不是开发环境，如果是，则额外添加开发环境配置
if(env === "development") {
  // devServer是在webpack2之后加入的配置，webpack1是没有的
   config.devServer = {
    port: '8000',
    host: '0.0.0.0',  // 设置成0.0.0.0,可以使用ip访问，设置成localhost的话则不行
    overlay: {
      erorrs: true    // 将错误显示在页面上
    },
    open: true, //启动时自动打开浏览器
   }
}
module.exports = config