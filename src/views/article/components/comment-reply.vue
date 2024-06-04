<template>
  <div class="comment-reply">
    <van-nav-bar>
      <van-icon slot="left" name="cross" @click="$emit('close')" />
      <div slot="title">{{ comment.reply_count }}条回复</div>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- 全部评论回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :source="comment.com_id" type="c" :list="commentList" />
    </div>
    <!-- 写评论按钮 -->
    <van-button class="post-btn" @click="isPostShow = true">写评论</van-button>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import commentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import commentPost from './comment-post.vue';
export default {
  name: 'CommentReply',
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论回复列表
    };
  },
  watch: {},
  computed: {},
  methods: {
    onPostSuccess (data) {
      //
      // console.log(data)
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  },
  created () { },
  mounted () { }
};
</script>
<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-btn {
  position: fixed;
  bottom: 0;
  border: null;
  height: 88px;
  width: 100%;
  background-color: #fff;
}
</style>
