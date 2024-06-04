import Vue from 'vue'
import dayjs from 'dayjs';
// 加载中文语言包
import 'dayjs/locale/zh-cn' // 全局使用

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn')
// 配置插件
dayjs.extend(relativeTime)
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
