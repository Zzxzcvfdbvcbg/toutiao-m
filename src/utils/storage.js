// 封装本地存储操作

// 存储数据
export const setItem = (key, value) => {
  // 数组、对象转为JSON格式字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
