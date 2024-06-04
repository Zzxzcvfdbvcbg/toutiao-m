<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 ：触发搜索-->
    <search-result v-if="isResultShow" :search-value="searchValue" />
    <!-- /搜索结果 -->
    <!-- 联想建议 :输入框有内容-->
    <search-advice
      v-else-if="searchValue"
      :search-value="searchValue"
      @search="onSearch"
    />
    <!-- /联想建议 -->
    <!-- 历史记录 ：输入框无内容-->
    <search-history
      v-else
      :search-histories="SearchHistories"
      @search="onSearch"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchAdvice from './components/search-advice.vue';
import SearchResult from './components/search-result.vue';
import SearchHistory from './components/search-history.vue';
import { setItem, getItem } from '@/utils/storage';
export default {
  name: 'SearchPage',
  components: {
    SearchAdvice,
    SearchResult,
    SearchHistory
  },
  props: {},
  data () {
    return {
      searchValue: '',
      isResultShow: false,
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    };
  },
  watch: {
    SearchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val);
    }
  },
  computed: {},
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchValue = val;
      //   存储搜索历史记录
      //   要求：不要重复，最新的排在最前面
      //   indexOf查找与val相同值的索引，如果没有则返回-1
      const index = this.SearchHistories.indexOf(val);
      // 有相同的，删除后再追加到最新
      if (index !== -1) {
        this.SearchHistories.splice(index, 1);
      }
      this.SearchHistories.unshift(val);
      //   渲染搜索结果
      this.isResultShow = true;
    },
    onCancel () {
      this.$router.back(); //   从哪来回哪去
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
