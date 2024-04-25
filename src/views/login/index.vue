<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录页面" />
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji1"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma1"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow === true"
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-mss"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js';
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      isCountDownShow: false
    };
  },
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user;
      // 表单验证

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      // 提交表单请求登录
      try {
        const { data } = await login(user);
        // console.log("登录成功", res);
        this.$store.commit('setUser', data.data);
        this.$toast.success('登录成功');
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机或验证码错误');
          this.$toast.fail('登录失败');
        } else {
          console.log('登陆失败');
          this.$toast.fail('登录失败');
        }
      }
    },

    async onSendSms () {
      //   console.log("onSend");
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile');
      } catch (err) {
        return console.log('验证失败', err);
      }
      // 验证通过，显示倒计时
      this.isCountDownShow = true;
      // 请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast('发送成功');
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast('发送太频繁');
        }
        this.$toast('发送失败，稍后重试');
      }
    }
    // 根据请求结果处理后续操作
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-mss {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #3296fa;
      border: none;
    }
  }
}
</style>
