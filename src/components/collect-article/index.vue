<template>
  <van-button
    v-if="isCollected"
    icon="star"
    @click="onStar"
    class="star"
    :loading="loading"
  />
  <van-button v-else icon="star-o" @click="onStar" :loading="loading" />
</template>

<script>
import { addCollect, delCollect } from '@/api/user';
export default {
  name: 'CollectArticle',
  components: {},
  model: {
    prop: 'isCollected',
    event: 'upadte-collect_article'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onStar () {
      this.loading = true;
      try {
        if (this.isCollected) {
          // 已收藏
          await delCollect(this.articleId);
        } else {
          // 未收藏
          await addCollect(this.articleId);
        }
        this.$emit('upadte-collect_article', !this.isCollected);
        this.$toast(!this.isCollected ? '已收藏' : '取消收藏');
      } catch (err) {
        this.$toast('收藏失败');
      }
      this.loading = false;
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
.star {
  .van-icon {
    color: #ffa500;
  }
}
</style>
