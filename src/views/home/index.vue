<template>
  <div class="home-container">
    <!-- 头部导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 自定义插槽：插入button -->
      <van-button
        slot="title"
        round
        type="info"
        class="search-btn"
        size="small"
        icon="search"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 右侧按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="isChannelShow = true">
        <i class="iconfont icon-gengduo1"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '80%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user';
import ArticleList from '@/views/home/components/article-list';
import ChannelEdit from '@/views/home/components/channel-edit';
import { mapState } from 'vuex';
import { getItem } from '@/utils/storage';
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    };
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    async loadChannels () {
      try {
        let channels = [];
        if (this.user) {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          const localChannels = getItem('TOUTIAO_CHANNEL');
          if (localChannels) {
            channels = localChannels;
          } else {
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }
        this.channels = channels;
      } catch (err) {
        this.$toast('获取频道列表失败');
        console.log(err.response.data);
      }
    },
    onUpdateActive (index, isChannelShow = true) {
      this.active = index;
      this.isChannelShow = isChannelShow;
    }
  },
  created () {
    this.loadChannels();
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
      .van-tab {
        min-width: 200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder {
      flex-shrink: 0; //不参与剩余空间的计算
      width: 66px;
      height: 82px;
    }
  }
}
</style>
