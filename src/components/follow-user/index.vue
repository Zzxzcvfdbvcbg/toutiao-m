<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    size="small"
    round
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    size="small"
    icon="plus"
    round
    color="#3296fa"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from '@/api/user';

export default {
  name: 'FollowUser',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false // 在已关注和未关注之间添加过渡，防止一直点击
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onFollow () {
      this.loading = true;
      try {
        if (this.isFollowed) {
          // 已关注
          await delFollow(this.userId);
          // console.log(data);
        } else {
          await addFollow(this.userId);
          // console.log(data);
        }
        // 视图更新
        // this.isFollowed = !this.isFollowed;
        this.$emit('update-is_followed', !this.isFollowed);
      } catch (err) {
        let message = '操作失败。请重试';
        if (err.response && err.response.status === 400) {
          message = '不能关注自己';
        }
        this.$toast(message);
        // console.log(err.response.status);
      }
      this.loading = false;
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
</style>
