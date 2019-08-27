import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 定义(路由)组件
const HOME           = r => require.ensure([], () => r(require('@/views/home'))           , 'home');
const BLOCKS         = r => require.ensure([], () => r(require('@/views/blocks'))         , 'blocks');
const BLOCKDETAILS   = r => require.ensure([], () => r(require('@/views/blockdetails'))   , 'blockdetails');
const TRANSAC        = r => require.ensure([], () => r(require('@/views/transac'))        , 'transac');
const TRANSACDETAILS = r => require.ensure([], () => r(require('@/views/transacdetails')) , 'transacdetails');
const ADDRESS        = r => require.ensure([], () => r(require('@/views/address'))        , 'address');
const NOFOUND        = r => require.ensure([], () => r(require('@/views/404'))            , '404');

const routes = [
  { path:'/'               , name: 'home'           , component: HOME           , meta: {title: '首页'} },
  { path:'/blocks'         , name: 'blocks'         , component: BLOCKS         , meta: {title: '区块列表'} },
  { path:'/blockdetails'   , name: 'blockdetails'   , component: BLOCKDETAILS   , meta: {title: '区块详情'} },
  { path:'/transac'        , name: 'transac'        , component: TRANSAC        , meta: {title: '交易列表'} },
  { path:'/transacdetails' , name: 'transacdetails' , component: TRANSACDETAILS , meta: {title: '交易详情'} },
  { path:'/address'        , name: 'address'        , component: ADDRESS        , meta: {title: '地址详情'} },
  { path:'*'               , name: '404'            , component: NOFOUND        , meta: {title: '404'} }
]

// 创建router实例
export default new Router({
    routes,
    mode: 'hash',  //默认hash跳转
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

