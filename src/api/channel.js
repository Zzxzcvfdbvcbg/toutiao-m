import request from '@/utils/request';
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 添加用户频道
export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道
export const delUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
