<template>
  <div class="my-container">
    <!-- 头部区域 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="rigtht">
          <van-button round type="default" size="small" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">粉丝</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text">登录注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" clickable :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang1"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi1"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格导航 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell class="mb9" title="小智同学" is-link />
      <van-cell
        v-if="user"
        class="logout-cell"
        title="退出登录"
        clickable
        @click="onLogout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo } from '@/api/user.js';
export default {
  name: 'My',
  data () {
    return {
      userInfo: {} // 用户信息
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    onLogout () {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗',
          message: '弹窗内容'
        })
        .then(() => {
          // on confirm
          // 确认退出：清楚登陆状态（容器中的user和本地存储的user）
          this.$store.commit('setUser', null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo();
        console.log(data);
        this.userInfo = data.data;
      } catch (err) {
        this.$toast('获取失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center; //水平居中
  align-items: center; //垂直居中
  .login-btn {
    display: flex;
    flex-direction: column; //主轴方向
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-info {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.iconfont {
      font-size: 40px;
    }
    .icon-shoucang1 {
      color: #eb5253;
    }
    .icon-lishi1 {
      color: #ff9d1d;
    }
    sapn.text {
      font-size: 25px;
    }
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
.mb9 {
  margin-bottom: 9px;
}
</style>
