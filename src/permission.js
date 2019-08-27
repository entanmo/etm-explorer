import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to, from, next) => {     //全局前置守卫（在跳转之前执行的全局钩子函数）
  NProgress.start()
  next()
})

router.afterEach(() => {    //在跳转之后判断的全局钩子函数
  NProgress.done()
})
