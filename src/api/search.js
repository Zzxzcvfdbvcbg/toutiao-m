import request from '@/utils/request';

export const getAdvice = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params // 参数比较多，以对象
  })
}
