<template>
  <div class="search-advice">
    <van-cell
      v-for="(val, ind) in suggestions"
      :key="ind"
      icon="search"
      @click="$emit('search', val)"
    >
      <div slot="title" v-html="highlight(val)" v-if="val"></div>
    </van-cell>
  </div>
</template>

<script>
import { getAdvice } from '@/api/search';
// 按需加载
import { debounce } from 'lodash';
export default {
  name: 'SearchAdvice',
  components: {},
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    };
  },
  watch: {
    // 输入框发生变化，发起请求拿数据
    searchValue: {
      //   handler(newVal) {
      //     this.loadAdvice(newVal);
      //   },
      //   debounce函数：参数1-一个函数；参数2-延迟时间；返回值：防抖后的函数
      handler: debounce(function (newVal) {
        this.loadAdvice(newVal);
      }, 200),
      immediate: true
    }
  },
  computed: {},
  methods: {
    async loadAdvice (q) {
      try {
        const { data } = await getAdvice(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast('fail');
      }
    },
    highlight (val) {
      // 如果想要全文替换，使用正则表达式
      // g 全局
      // i 忽略大小写
      const highlightStr = `<span style="color:red">${this.searchValue}</span>`;
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchValue, 'gi');

      //   需要注意的是，replace 方法的字符串匹配只能替换第1个满足的字符,因此使用正则。
      return val.replace(reg, highlightStr);
      //   replace不会修改原始字符串，返回新的字符串
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
</style>
