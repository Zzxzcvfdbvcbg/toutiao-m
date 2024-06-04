<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, ind) in list"
        :key="ind"
        :title="item.title"
        :to="{
          //根据路由名进行跳转
          name: 'article',
          //传递路由参数
          params: {
            articleId: item.art_id,
          },
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search';
import ArticleItem from '@/components/article-item'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchValue
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    }
  },
  created () { },
  mounted () { }
};
</script>
<style lang="less" scoped>
</style>
