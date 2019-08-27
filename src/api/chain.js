import http from '../utils/axios1'


/*获取区块链⾼高度*/
export const getHeight = () => {
  return http({
    url: '/api/blocks/getHeight',
    method: 'get'
  })
}

/*获取当前链上账户总个数*/
export const getCount = () => {
  return http({
    url: '/api/accounts/count',
    method: 'get'
  })
}

/*矿工数量*/
export const Miners = () => {
  return http({
    url: '/api/delegates/count',
    method: 'get'
  })
}

/*资产发行数量*/
export const assets = (params) => {
  return http({
    url: '/api/uia/assets',
    method: 'get',
    params: params
  })
}

/*资产发行数量*/
export const dapps = (params) => {
  return http({
    url: '/api/dapps',
    method: 'get',
    params: params
  })
}

/*本节点版本号*/
export const version = () => {
  return http({
    url: '/api/peers/version',
    method: 'get',
  })
}

/*获取区块数据*/
export const getBlocksList = (params) => {
  return http({
    url: '/api/blocks',
    method: 'get',
    params: params
  })
}

/*指定区块的详情*/
export const getBlocks = (params) => {
  return http({
    url: '/api/blocks/get',
    method: 'get',
    params: params
  })
}

/*获取交易信息*/
export const transacList = (params) => {
  return http({
    url: '/api/transactions',
    method: 'get',
    params: params
  })
}

/*查看交易详情*/
export const transacDetails = (params) => {
  return http({
    url: '/api/transactions/get',
    method: 'get',
    params: params
  })
}

/*获取账户信息 */
export const accounts = (params) => {
  return http({
    url: '/api/accounts',
    method: 'get',
    params: params
  })
}



