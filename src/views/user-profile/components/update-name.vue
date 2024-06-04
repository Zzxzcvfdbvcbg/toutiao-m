<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
        // 当后面toast.success或fail出现会自动关闭
      })
      try {
        const loaclName = this.message
        if (!loaclName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await editUserProfile({
          name: loaclName
        })
        // console.log(data);
        // 更新视图
        this.$emit('input', loaclName)
        // 关闭弹层
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    }
  },
  created () { },
  mounted () { }
};
</script>
<style lang="less" scoped>
.van-field {
  margin: 20px;
}
</style>
