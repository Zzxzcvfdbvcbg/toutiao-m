<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDelShow">
        <span @click="SearchHistories.splice(0)">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDelShow = true" />
    </van-cell>
    <van-cell
      v-for="(val, ind) in SearchHistories"
      :key="ind"
      :title="val"
      @click="onSearchClick(val, ind)"
    >
      <van-icon v-show="isDelShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSearchClick (val, ind) {
      if (this.isDelShow) {
        // 删除状态
        this.SearchHistories.splice(ind, 1);
      } else {
        // 点击搜索
        this.$emit('search', val);
      }
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="less" scoped>
</style>
