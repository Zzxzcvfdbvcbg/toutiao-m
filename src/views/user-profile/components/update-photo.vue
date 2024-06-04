<template>
  <div class="update-photo">
    <img class="img" :src="img" alt="" ref="img" />
    <div class="toolbar">
      <div @click="$emit('close')">取消</div>
      <div @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updatePhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 纯客户端裁切
        this.cropper.getCroppedCanvas().toBlob(async blob => {
          // 注意参数格式-multipart/form-data
          const formDate = new FormData()
          formDate.append('photo', blob)
          const { data } = await updatePhoto(formDate)
          this.$emit('close')
          this.$emit('photo-success', data.data.photo)
          this.$toast.success('更新成功')
        })
      } catch (err) {
        this.$toast.fail('失败')
      }
    }
  },
  created () { },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
    // 不能在这里调用 this.cropper.getCroppedCanvas() 方法！因为裁剪器还没初始化好！
  }
};
</script>
<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    height: 72px;
    width: 100%;
    position: fixed;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: #fff;
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
