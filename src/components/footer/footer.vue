<template>
  <div>
    <div class="footer">
      <div class="content">
        <div class="footer-box">
          <p class="footer-text">©2014-2019 En-Tan-Mo. All Rights Reserved.</p>
          <div class="footer-link d-ib f-l">
            <a href="https://twitter.com/entanmo1"><img src="../../assets/img/footer-icon1.png"/></a>
            <a href="https://github.com/entanmo"><img src="../../assets/img/footer-icon2.png"/></a>
            <a href="https://t.me/entanmo"><img src="../../assets/img/footer-icon3.png"/></a>
            <a href="javascript:;" class="wxbox p-r">
              <img src="../../assets/img/footer-icon4.png"/>
              <img src="../../assets/img/footer-wx.png" class="wx p-a"/>
            </a>
          </div>
          <div class="c-b"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name:'Footer',
    data () {
      return {
        
      }
    },
    methods: {

    }
  };

</script>
<style scoped>
  .footer{margin-top: 100px;height: 75px;background: #02212A;position: relative;color: #76868B;}
  .footer .footer-box .footer-text{margin: 28px 30px 0 0;display: inline-block;float: left;}
  .footer-box .footer-link{margin: 28px 0 0 0;}
  .footer-link a{display: inline-block;margin: 0 10px 0 0;padding: 0 10px;}
  .footer-link a img{width: 20px;height: 20px;}
  .footer-link a .wx{width: 100px;height: 100px;top: -55px;left: 40px;display: none;}
  .footer-link .wxbox:hover .wx{display: inline-block;}
  
  @media screen and (max-width: 1200px) {
  	.footer-box{margin-left: 10px;}
  }
  @media screen and (max-width: 660px) {
    .footer{height: 85px;}
    .footer-box{margin-left: 0;text-align: center;}
  	.footer .footer-box .footer-text{width: 100%;margin: 13px 0 0 0;}
    .footer-box .footer-link{width: 100%;margin: 10px 0 0 0;}
    .footer-link a .wx{top: -108px;left: -28px;}
  }
</style>
