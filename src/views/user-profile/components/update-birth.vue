<template>
  <div class="update-birth">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      show-toolbar
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user';
import dayjs from 'dayjs';
export default {
  name: 'UpdateBirth',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
        // 格式转化
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserProfile({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
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
</style>
