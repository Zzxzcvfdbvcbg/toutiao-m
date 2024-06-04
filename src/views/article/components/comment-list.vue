<template>
  <div class="comment-list">
    <!-- immediate-check是否在初始化时立即执行 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item
        v-for="(item, ind) in list"
        :key="ind"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment';
import CommentItem from './comment-item.vue';
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      vaildator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页
      limit: 10,
      error: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      try {
        //   请求获取数据
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(), // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data);
        // 将数据添加到列表中
        const { results } = data.data
        // console.log(results);
        this.list.push(...results)
        // 给父组件传值
        this.$emit('onload-success', data.data)
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true
        this.finished = true
      }
    }
  },
  created () {
    // 初始手动开启
    this.loading = true
    this.onLoad()
  },
  mounted () { }
};
</script>
<style lang="less" scoped>
</style>
