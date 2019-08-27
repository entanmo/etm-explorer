import http from '../utils/axios'

/*获取ETM当前币价*/
export const ticker = () => {
  return http({
    url: '/api/okex/ticker',
    method: 'get'
  })
}

/*获取发行量*/
export const tokens = () => {
  return http({
    url: '/api/token/count',
    method: 'get'
  })
}





