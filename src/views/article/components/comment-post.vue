<template>
  <div class="comment-post">
    <van-field
      class="replay-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      @click="onPost()"
      class="post-btn"
      type="default"
      :disabled="!message.length"
      >发表</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  // inject: ['articleId'],
  inject: {
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, Object, String],
      required: true
    }

  },
  data () {
    return {
      message: ''
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // console.log(data);

        // 关闭弹窗-交给父组件
        // 显示页面上-交给父组件

        // 清空文本框
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败，请重新发布')
      }
    }
  },
  created () { },
  mounted () { }
};
</script>
<style lang="less" scoped>
.comment-post {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 32px 0 32px 32px;
  .replay-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    border: none;
    width: 150px;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
