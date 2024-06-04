<template>
  <div class="article-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 顶部导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading vertical color="#3296fa">加载中...</van-loading>
      </div>
      <!-- 加载中 -->
      <!-- 加载完成-文章详情 -->
      <div v-else-if="result.title" class="article-detail">
        <h1 class="article-title">{{ result.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="result.aut_photo"
          />
          <div slot="title" class="user-name">{{ result.aut_name }}</div>
          <div slot="label" class="publish-data">
            {{ result.pubdate | relativeTime }}
          </div>
          <!-- 模板中的$event是事件参数 -->
          <follow-user
            :is-followed="result.is_followed"
            :user-id="result.aut_id"
            @update-is_followed="result.is_followed = $event"
          />
          <!-- <van-button
            v-if="result.is_followed"
            class="follow-btn"
            size="small"
            round
            @click="onFollow"
            :loading="followLoading"
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
            :loading="followLoading"
            >关注</van-button
          > -->
        </van-cell>
        <!-- 用户信息 -->
        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="result.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment-list
          :source="result.art_id"
          :list="commentlist"
          @onload-success="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        />
        <!-- 文章内容 -->
        <!-- 底部 -->
        <div class="article-bottom">
          <van-button
            @click="isPostShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <collect-article
            class="btn-item"
            v-model="result.is_collected"
            :article-id="result.art_id"
          />
          <like-article
            class="btn-item"
            v-model="result.attitude"
            :article-id="result.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- 底部 -->
        <!-- 发布评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post :target="result.art_id" @post-success="onPost" />
        </van-popup>
        <!-- 发布评论弹出层 -->
      </div>
      <!-- 加载完成-文章详情 -->
      <!-- 加载失败404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除</p>
      </div>
      <!-- 加载失败404 -->
      <!-- 加载失败-未知错误 -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">加载内容失败</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- 加载失败-未知错误 -->
    </div>
    <!-- 回复评论弹出层  v-if控制内容的销毁-->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- 回复评论弹出层 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/acticle';
import { ImagePreview } from 'vant';
import FollowUser from '@/components/follow-user';
import CollectArticle from '@/components/collect-article';
import LikeArticle from '@/components/like-article';
import CommentList from './components/comment-list.vue';
import CommentPost from './components/comment-post.vue';
import CommentReply from './components/comment-reply.vue';
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      result: {},
      loading: true, // 加载中的状态
      arrStatus: 0, // 失败状态码
      // followLoading: false,
      totalCommentCount: 0,
      isPostShow: false, // 控制评论弹出层的显隐
      commentlist: [],
      isReplyShow: false, // 控制回复弹层的显示状态
      currentComment: {} // 当前点击的评论回复项
    };
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadArticle () {
      try {
        this.loading = true;
        const { data } = await getArticleById(this.articleId);
        // 模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse("jhsbsdbvjkdsnvjkh");
        // }

        this.result = data.data;

        // 初始化图片点击预览

        setTimeout(() => {
          this.previewImage();
        }, 0);
        // console.log(this.result);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
        console.log('获取数据失败', err);
      }
      this.loading = false;
    },
    previewImage () {
      // console.log(this.$refs["article-content"]);
      const articleContent = this.$refs['article-content']; // 获取到容器节点
      const imgs = articleContent.querySelectorAll('img');
      const images = []; // 存储图片地址
      imgs.forEach((img, ind) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: ind
          });
        };
      });
    },
    onPost (data) {
      // 关闭弹层
      this.isReplayShow = false
      // 显示在列表数据
      // console.log(data);
      this.commentlist.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      // 显示评论回复弹出层
      this.isReplyShow = true
      this.currentComment = comment
    }
  },
  created () {
    // 调用方法
    this.loadArticle();
  },
  mounted () { }
};

</script>
<style lang="less" scoped>
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    padding: 0 8px;
    overflow-y: scroll;
    background-color: #fff;
    .loading-wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }
      .user-info {
        .avatar {
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .user-name {
          font-size: 24px;
          color: #3a3a3a;
        }
        .publish-data {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }
    }
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      /deep/.van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        color: #666666;
      }
    }
  }
  .article-bottom {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .btn-item {
      border: 0;
      padding: 0;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
