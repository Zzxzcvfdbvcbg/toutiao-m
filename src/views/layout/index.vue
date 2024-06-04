<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <span class="text">首页</span>
        <i slot="icon" class="iconfont icon-shouye"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <span class="text">问答</span>
        <i slot="icon" class="iconfont icon-wenda"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <span class="text">视频</span>
        <i slot="icon" class="iconfont icon-shipin"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span class="text">{{ $store.state.user ? "我的" : "未登录" }}</span>
        <i slot="icon" class="iconfont icon-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  data () {
    return {};
  }
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
.text {
  font-size: 20px;
}
</style>
