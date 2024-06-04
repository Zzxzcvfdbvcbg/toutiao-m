 <template>
  <van-cell class="comment-item">
    <van-image
      round
      slot="icon"
      fit="cover"
      class="avatar"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :class="{ liked: comment.is_liking }"
        @click="onCommentLike"
        :loading="commentloading"
        >{{ comment.like_count || "赞" }}</van-button
      >
    </div>
    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="botton-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addZan, delZan } from '@/api/comment';
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentloading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onCommentLike () {
      this.commentloading = true
      try {
        if (this.comment.is_liking) {
          // 已点赞，点击取消点赞
          await delZan(this.comment.com_id)
          this.comment.like_count--
        } else {
          await addZan(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast('fail')
      }
      this.commentloading = false
    }
  },
  created () { },
  mounted () { }
};
</script>
 <style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liked {
    color: orange;
  }
}
</style>
