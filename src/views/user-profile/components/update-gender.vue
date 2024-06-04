<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      loaclGender: this.value
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserProfile({
          gender: this.loaclGender
        })
        this.$emit('input', this.loaclGender)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.loaclGender = index
    }
  },
  created () { },
  mounted () { }
};
</script>
<style lang="less" scoped>
</style>
