<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleItem } from '@/api/acticle';
import ArticleItem from '@/components/article-item';
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: ''
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticleItem({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now() // 当前时间戳
        });

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse("shsbhbj");
        // }
        // 模拟随机失败的情况

        // console.log(data);
        const { results } = data.data;
        // console.log(results);
        this.list.push(...results); // 数组展开操作符
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },

    async onRefresh () {
      try {
        const { data } = await getArticleItem({
          channel_id: this.channel.id,
          timestamp: Date.now() // 当前时间戳
        });
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse("shsbhbj");
        // }
        // 模拟随机失败的情况

        const { results } = data.data;
        this.list.unshift(...results);
        this.isLoading = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        this.isLoading = false;
        this.refreshSuccessText = '刷新失败';
      }
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
.article-list {
  position: relative;
  top: 76px;
  height: 85vh;
  overflow-y: auto;
}
</style>
