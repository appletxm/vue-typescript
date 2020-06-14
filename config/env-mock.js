module.exports = {
  port: 8019, // 本地服务端口号
  api: '', // 应用侧服务端接口前缀
  get publicPath() {
    return 'dist/'
  },
  distPath: './dist',
  sourcePath: './src',
  isMock: true,
  outputCfg: { // 应用侧可配置项，可自行扩展，打包后里边所有配置项将作为window.appInfo下面的内容输出，可方便应用读取使用
    apiHost: 'http://{{ipAddress}}:8019/', // 应用侧服务端接口host, {{ipAddress}}会回填ipAddress
    withCredentials: false
  }
}
