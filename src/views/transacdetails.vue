<template>
  <div class="transacdetails">

    <v-header></v-header>
    
    <div class="transac-box">
        <div class="content">
          
          <v-search></v-search>
          
          <div class="headline p-r">
            <div class="headline-text fw-6">{{$t('transaction_details')}}</div>
            <div class="realtime p-a td-d" @click="backHome">{{$t('backhome')}}</div>
          </div>
          
          <div class="blockdetail-box">
            <div class="overview">{{$t('overview')}}</div>
            <div class="detail-list">
              <p class="detail-title">{{$t('txniD')}}:</p>
              <p class="detail-txnid mecism d-ib fw-6"><span id="txnId">{{transacData.id}}</span>
                <a-icon title="复制" type="copy" class="copy"  data-clipboard-target="#txnId" @click="copy" ></a-icon>
              </p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block')}}:</p>
              <p class="d-ib td-d" :data-id="transacData.height" @click="blockDetails">{{transacData.height}}</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('timestamp')}}:</p>
              <p class="d-ib">{{transacData.timestamp | preciseDate}}</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('from')}}:</p>
              <p class="mecism-address d-ib td-d" :data-id="transacData.senderId" id="fromId" @click="address">{{transacData.senderId}}</p>
              <a-icon title="复制" type="copy" class="copy"  data-clipboard-target="#fromId" @click="copy" ></a-icon>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('to')}}:</p>
              <p class="mecism-address d-ib td-d" v-if="transacData.recipientId" :data-id="transacData.recipientId" id="toId" @click="address">{{transacData.recipientId}}</p>
              <p class="mecism-address d-ib td-d" v-else> </p>
              <a-icon title="复制" type="copy" class="copy"  data-clipboard-target="#toId" @click="copy" v-if="transacData.recipientId"></a-icon>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('amount')}}:</p>
              <p class="d-ib">{{transacData.amount / 100000000}} ETM </p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('fee')}}:</p>
              <p class="d-ib">{{transacData.fee / 100000000}} ETM</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_id')}}:</p>
              <p class="mecism d-ib">{{transacData.blockId}}</p>
            </div>
          </div>
        </div>
    </div>
    
    <v-footer></v-footer>
  </div>
</template>
<script>
  import header from "@/components/header/header"
  import footer from "@/components/footer/footer"
  import search from "@/components/search/search"
  import Clipboard from 'clipboard'
  import {preciseDate} from '@/utils/utils'
  import {transacDetails} from '@/api/chain'
  
  export default {
    name: 'Transacdetails',
    data() {
      return {
        transacId: this.$route.query.transacId,
        transacData: {},
      };
    },
    created () {
      this._transacDetails()
    },
    methods: {
      // 查看交易详情
      async _transacDetails() {
        try {
          const params = {
            "id": this.transacId,
          }
          const result = await transacDetails(params)
          this.transacData = result.data.transaction
          console.log(result.data,'查看交易详情')
        } catch (err) {
          console.log(err)
        }
      },

      copy () {
        const clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          this.$message.success(i18n.t('tip.copy_success'))
          e.clearSelection()
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$message.error(i18n.t('tip.copy_error'))
          clipboard.destroy()
        })
      },
      
      backHome(){
        this.$router.push({path:'/'});
      },
      blockDetails(e){
        this.$router.push({path:'blockdetails',query:{blockHeight: e.srcElement.dataset.id}});
      },
      address(e){
        this.$router.push({path:'address',query:{addressId: e.srcElement.dataset.id}});
      },
    },
    components:{
      'v-header': header,
      'v-footer': footer,
      'v-search': search
    },
    filters: {   //过滤器
      preciseDate
    },
  };

</script>
<style scoped>
  .transac-box{padding: 20px 0 0 0;}
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{line-height: 24px;top: 28px;right: 0;font-size: 12px;}
  
  .blockdetail-box{padding-bottom: 55px;border-radius: 5px;box-shadow: 0 0 10px #E5E8ED;background: #fff;}
  .overview{font-size: 18px;height: 52px;line-height: 52px;text-indent: 15px;border-bottom: 1px solid #e5e5e5;font-weight: 600;}
  .detail-list{padding:18px 0;;font-size: 14px;margin: 0 14px;color: #808080;border-bottom: 1px solid #e5e5e5;}
  .detail-list .detail-title{width: 200px;display: inline-block;color: #505050;}
  .detail-txnid span{color: #0283ff;}
  .detail-list .td-d{line-height: 20px;}
  .mecism{word-wrap: break-word;word-break: normal;}

  @media screen and (max-width: 1200px) {
  	.headline,.blockdetail-box{margin: 0 10px;}
  }
  @media screen and (max-width: 820px) {
  	.detail-list .detail-title{width: 20%;}
  }
  @media screen and (max-width: 770px) {
  	.detail-list .detail-title{width: 100px;}
  }
  @media screen and (max-width: 720px) {
  	.mecism{width: 100%;margin-top: 5px;}
  }
  @media screen and (max-width: 650px) {
  	.headline .headline-text{font-size: 18px;}
    .detail-list{font-size: 13px;}
  }
  
  @media screen and (max-width: 480px) {
    .headline{height: 65px;line-height: 65px;}
  	.headline .headline-text{font-size: 15px;}
    .realtime{top: 20px;}
    .detail-list .detail-title{width: 69px;}
    .detail-list .mecism-address{font-size: 12px;letter-spacing: -1px;}
  }
  @media screen and (max-width: 360px) {
    .overview{text-indent: 8px;}
    .detail-list{margin: 0 8px;}
    .detail-list .detail-title{width: 72px;}
    .detail-list .mecism-address{font-size: 11px;}
  }
  
</style>
