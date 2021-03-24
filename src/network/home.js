import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 参数1 请求的类型， 参数 2 请求的页数
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}