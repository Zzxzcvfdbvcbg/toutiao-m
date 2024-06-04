import request from '@/utils/request'

// 获取文章列表
export const getArticleItem = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 获取文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
