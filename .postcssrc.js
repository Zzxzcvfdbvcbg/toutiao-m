module.exports = {
  plugins: {
    // vue-cli已经配置过
    // 'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    'postcss-pxtorem': {
      //
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      propList: ['*']
    }
  }
}
