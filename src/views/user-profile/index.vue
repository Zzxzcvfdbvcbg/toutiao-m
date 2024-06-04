<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" ref="file" hidden @change="onFileChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        slot="default"
        round
        fit="cover"
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="nameshow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender === 0 ? '男' : '女'"
      @click="gendershow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="birthshow = true"
    />

    <!-- 修改个人资料 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '100%' }">
      <!-- 封装组件 -->
      <update-name
        v-if="nameshow"
        @close="nameshow = false"
        v-model="userProfile.name"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="gendershow" position="bottom">
      <update-gender
        v-if="gendershow"
        v-model="userProfile.gender"
        @close="gendershow = false"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="birthshow" position="bottom">
      <update-birth
        v-if="birthshow"
        v-model="userProfile.birthday"
        @close="birthshow = false"
      />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="photoshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        :img="img"
        @close="photoshow = false"
        @photo-success="userProfile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user';
import UpdateName from './components/update-name.vue';
import UpdateGender from './components/update-gender.vue';
import UpdateBirth from './components/update-birth.vue';

import UpdatePhoto from './components/update-photo.vue';

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirth,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      userProfile: {}, // 用户个人信息
      nameshow: false, // 弹出层的显示隐藏
      gendershow: false,
      birthshow: false,
      photoshow: false,
      img: null // 预览图片
    };
  },
  watch: {},
  computed: {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data);
        this.userProfile = data.data
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于对象获取blob数据
      const data = window.URL.createObjectURL(file)
      this.img = data
      //   展示预览图片弹出层
      this.photoshow = true
      //   解决两次点击同一文件不会触发change事件
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () { }
};
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    height: 60px;
    width: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
