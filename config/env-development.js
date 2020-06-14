module.exports = {
  port: 8019, // 本地服务端口号
  api: '', // 应用侧服务端接口前缀
  proxy: {
    needOpen: false, // 需不需要开启本地代理
    url: 'http://192.168.10.33:7030' // 代理应用侧服务端接口host, needOpen配置项为true时生效
  },
  get publicPath() {
    return 'dist/'
  },
  distPath: './dist',
  sourcePath: './src',
  outputCfg: { // 应用侧可配置项，可自行扩展，打包后里边所有配置项将作为window.appInfo下面的内容输出，可方便应用读取使用
    apiHost: 'http://192.168.10.33:7030', // 应用侧服务端接口host
    withCredentials: false
  }
}
