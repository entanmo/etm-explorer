<template>
  <div>
    <div class="noFound">
      <img class="noFound-img" src="../assets/img/404.svg" alt="">
      <ul class="noFound-box">
        <li class="title">404</li>
        <li class="des">页面失踪了~</li>
        <router-link class="btn" tag="li" to="/">点击跳转首页</router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: '404',
  data () {
    return {

    }
  }
}
</script>
<style scoped>
  .noFound{width: 100%;height: 100%;text-align: center;}
  .noFound .noFound-img{width: 300px;height: auto;margin: 50px 0 10px 0;}
  .noFound-box .title{color: #4A515D;font-size: 40px;line-height: 200%;font-weight: bold;}
  .noFound .des {color: #8C8C8C;font-size: 22px;}
  .noFound .btn{padding: 4px 12px 5px 12px;color: #fff;background: #0091FF;border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    display: inline-block;
  }
  @media screen and (max-width: 380px) {
    .noFound .noFound-img{width: 240px;}
    .noFound-box .title{font-size: 34px;}
    .noFound .des {font-size: 20px;}
    .noFound .btn{font-size: 14px;
    }
  }

</style>
