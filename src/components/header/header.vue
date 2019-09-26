<template>
  <div>
    <div class="header">
      <div class="content">
        <a href="http://www.entanmo.com/#/" class="logo"><img src="../../assets/img/logo.png"/></a>
        <div class="navkey d-n">
          <img src="../../assets/img/header-icon1.png" :class="[navkeyshow?'':'d-n']" @click="navshow"/>
          <img src="../../assets/img/header-icon2.png" :class="[navkeyshow?'d-n':'']" @click="navshow"/>
        </div>
        <div class="header-nav">
          <a-dropdown :trigger="['hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_know')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/0">{{$t('header_introduc')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/1">{{$t('header_shd')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/2">{{$t('header_transfer')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_consensus')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="http://www.entanmo.com/#/consensus/0">{{$t('header_torovich')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/consensus/1">{{$t('header_descrip')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_zoology')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/0">{{$t('header_chains')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/1">{{$t('header_protocol')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/2">{{$t('header_adaptor')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/3">{{$t('header_contract')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/4">{{$t('header_mall')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown>
            <a class="ant-dropdown-link" href="http://www.entanmo.com/#/moore">{{$t('header_economics')}}</a>
          </a-dropdown>
          <a-dropdown>
            <a class="ant-dropdown-link" href="http://developer.entanmo.com/">{{$t('header_developer')}}</a>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_news')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="http://www.entanmo.com/#/articleList">{{$t('header_upcoming')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/articleListTwo">{{$t('header_current')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/articleListThree">{{$t('header_sound')}}</a></a-menu-item>
              <a-menu-item><a href="http://forum.entanmo.io/">{{$t('header_forum')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_apply')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="https://wallet.entanmo.com/">{{$t('header_wallet')}}</a></a-menu-item>
              <a-menu-item><a href="http://explorer.entanmo.io">{{$t('header_explorer')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;">{{$t('header_datum')}}</a>
            <a-menu slot="overlay">
              <a-menu-item><a href="http://www.entanmo.com/docs/ETM%20Science_zh-CN.pdf">{{$t('header_white')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/docs/ETM%20interpretation_Science_zh-CN.pdf">{{$t('header_yellow')}}</a></a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click','hover']">
            <a class="ant-dropdown-link" href="javascript:;" v-if="lang == 'zh_CN'">{{$t('zh_CN')}}</a>
            <a class="ant-dropdown-link" href="javascript:;" v-if="lang == 'en_GB'">{{$t('en_GB')}}</a>
            <a-menu slot="overlay" @click='changeLocale'>
              <a-menu-item key="zh_CN"><p>简体中文</p></a-menu-item>
              <a-menu-item key="en_GB"><p>English</p></a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="c-b"></div>
        
        <div class="header-min" :class="[navkeyshow?'d-n':'']">
          <a-menu 
          mode="inline"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          >
            <a-sub-menu key="sub1">
              <span slot="title">{{$t('header_know')}}</span>
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/0">{{$t('header_introduc')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/1">{{$t('header_shd')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/knownledge/2">{{$t('header_transfer')}}</a></a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title">{{$t('header_consensus')}}</span>
              <a-menu-item><a href="http://www.entanmo.com/#/consensus/0">{{$t('header_torovich')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/consensus/1">{{$t('header_descrip')}}</a></a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title">{{$t('header_zoology')}}</span>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/0">{{$t('header_chains')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/1">{{$t('header_protocol')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/2">{{$t('header_adaptor')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/3">{{$t('header_contract')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/ecosystem/4">{{$t('header_mall')}}</a></a-menu-item>
            </a-sub-menu>
            <a-menu-item key="sub4"><span><a href="http://www.entanmo.com/#/moore">{{$t('header_economics')}}</a></span></a-menu-item>
            <a-menu-item key="sub5"><span><a href="http://developer.entanmo.com/">{{$t('header_developer')}}</a></span></a-menu-item>
            <a-sub-menu key="sub6">
              <span slot="title">{{$t('header_news')}}</span>
              <a-menu-item><a href="http://www.entanmo.com/#/articleList">{{$t('header_upcoming')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/articleListTwo">{{$t('header_current')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/#/articleListThree">{{$t('header_sound')}}</a></a-menu-item>
              <a-menu-item><a href="http://forum.entanmo.io/">{{$t('header_forum')}}</a></a-menu-item>
            </a-sub-menu>
			<a-sub-menu key="sub7">
			  <span slot="title">{{$t('header_apply')}}</span>
			  <a-menu-item><a href="https://wallet.entanmo.com/">{{$t('header_wallet')}}</a></a-menu-item>
			  <a-menu-item><a href="http://explorer.entanmo.io">{{$t('header_explorer')}}</a></a-menu-item>
			</a-sub-menu>
            <!-- <a-menu-item key="sub7"><span><a href="https://wallet.entanmo.com/">{{$t('header_wallet')}}</a></span></a-menu-item> -->
            <a-sub-menu key="sub8">
              <span slot="title">{{$t('header_datum')}}</span>
              <a-menu-item><a href="http://www.entanmo.com/docs/ETM%20Science_zh-CN.pdf">{{$t('header_white')}}</a></a-menu-item>
              <a-menu-item><a href="http://www.entanmo.com/docs/ETM%20interpretation_Science_zh-CN.pdf">{{$t('header_yellow')}}</a></a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub9" @click='changeLocale'>
              <span slot="title" v-if="lang == 'zh_CN'">{{$t('zh_CN')}}</span>
              <span slot="title" v-if="lang == 'en_GB'">{{$t('en_GB')}}</span>
              <a-menu-item key="zh_CN"><p>简体中文</p></a-menu-item>
              <a-menu-item key="en_GB"><p>English</p></a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setup} from '@/lang'
  
  export default {
    name:'Header',
    data () {
      return {
        lang: '', // 语言
        navkeyshow: true,
        rootSubmenuKeys: ['sub1','sub2','sub3','sub6','sub8','sub9'],
        openKeys: [],
      }
    },
    created () {
      this.lang = sessionStorage.getItem('localeLanguage') || 'zh_CN'
    },
    inject:["reload"],
    methods: {
      navshow(){
        this.navkeyshow = !this.navkeyshow
      },
      onOpenChange (openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      },
      //切换语言
      changeLocale (data) {
        setup(data.key)
        this.lang = data.key
        this.reload();
      }
    },
 
  };

</script>
<style scoped>
  .header{height: 64px;background: #000506;color: #fff;position: relative;}
  .header .logo{display: inline-block;float: left;}
  .header .logo img{width: 170px;height: 36px;margin: 14px 0 0 0;}
  .header-nav{display: inline-block;float: right;}
  .nav .nav-list{height: 32px;line-height: 32px;margin: 16px 0 0 20px;text-align: center;display: inline-block;}
  .navkey{margin: 15px 15px 0 0;float: right;}
  .navkey img{width: 30px;height: 30px;}
  
  .header-min{width: 100%;height: auto;position: absolute;top: 64px;left: 0;padding: 0 0 20px 0;margin: 0;background: rgba(0,0,0,0.8);z-index: 99999;}
  .header-min span{display: block;color: #fff !important;}
  .header-min a{display: block;color: #fff !important;}
  
  @media screen and (max-width: 1200px) {
    .header .logo{margin-left: 10px;}
  	.header-nav{margin-right: 10px;}
    .ant-dropdown-link{margin: 20px 0 0 10px;}
  }
  @media screen and (max-width: 800px) {
    .navkey{display: inline-block;}
    .header .header-nav{display: none;}
  }
</style>
