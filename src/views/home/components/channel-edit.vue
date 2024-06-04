<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10" class="recomm-grid">
      <van-grid-item
        v-for="(channel, ind) in recommChannels"
        :key="ind"
        :text="channel.name"
        icon="plus"
        class="grid-item"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, delUserChannel } from '@/api/channel';
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage';
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态下叉号图标的显示隐藏
      fiexChannels: [0] // 不能删除的频道
    };
  },
  watch: {},
  computed: {
    ...mapState(['user']),
    recommChannels () {
      const arr = [];
      this.allChannels.forEach((channel) => {
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
        if (!ret) {
          arr.push(channel);
        }
      });
      return arr;
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels();
        // console.log(data);
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast('数据获取失败');
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel);
      // 数据持久化
      if (this.user) {
        try {
          // 已登陆，存储在线上
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          });
        } catch (err) {
          this.$toast('存储失败');
        }
      } else {
        // 未登录，存储在本地
        setItem('TOUTIAO_CHANNEL', this.myChannels);
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态，删除我的频道
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        this.myChannels.splice(index, 1);
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true);
        }
        // 处理持久化
        this.deleteChannel(channel);
      } else {
        // 非编辑状态，切换频道
        // console.log(channel.id);
        this.$emit('update-active', index, false);
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        try {
          await delUserChannel(channel.id);
        } catch (err) {
          this.$toast('fail');
        }
      } else {
        setItem('TOUTIAO_CHANNEL', this.myChannels);
      }
    }
  },
  created () {
    this.loadAllChannels();
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.recomm-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-grid-item__content {
        position: relative;
        .van-icon-clear {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }
  }
}
</style>
