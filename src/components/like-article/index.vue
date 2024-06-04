<template>
  <!-- <van-button
  :icon="value === 1 ? 'good-job' : 'good-job-o'"
  :loading="loading"
  @click="onGood
  /> -->
  <van-button
    v-if="value === 1"
    icon="good-job"
    @click="onGood"
    :loading="loading"
    class="good"
  />
  <van-button v-else icon="good-job-o" @click="onGood" :loading="loading" />
</template>

<script>
import { addGood, delGood } from '@/api/user';
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
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
    async onGood () {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          await delGood(this.articleId);
        } else {
          await addGood(this.articleId);
          status = 1;
        }
        this.$emit('input', status);
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞');
      } catch (err) {
        this.$toast('操作失败');
      }
      this.loading = false;
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
.good {
  .van-icon {
    color: #e5645f;
  }
}
</style>
