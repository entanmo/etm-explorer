<template>
  <div class="blockdetails">

    <v-header></v-header>
    
    <div class="blocks-box">
        <div class="content">
          
          <v-search></v-search>
          
          <div class="headline p-r">
            <div class="headline-text fw-6">{{$t('block_details')}}</div>
            <div class="realtime p-a td-d" @click="backHome">{{$t('backhome')}}</div>
          </div>
          
          <div class="blockdetail-box">
            <div class="overview">{{$t('overview')}}</div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_height')}}:</p>
              <div class="detail-height d-ib">
                <p class="d-ib fw-6">{{blockData.height}}</p>
                <img src="../assets/img/icon10.svg" v-if="blockCut" class="height-img last" @click="blockLast"/>
                <img src="../assets/img/icon10.svg" v-else class="height-img last"/>
                <img src="../assets/img/icon11.svg" v-if="blockCut" class="height-img next" @click="blockNext"/>
                <img src="../assets/img/icon11.svg" v-else class="height-img next"/>
              </div>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('timestamp')}}:</p>
              <p class="d-ib">{{(blockData.timestamp || 0) | preciseDate}}</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_transactions')}}:</p>
              <p class="d-ib td-d">{{blockData.numberOfTransactions}} {{$t('block_transactions')}}</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_mined')}}:</p>
              <p class="mecism-address d-ib td-d" :data-id="blockData.generatorId" @click="address">{{blockData.generatorId}}</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_amount')}}:</p>
              <p class="d-ib">{{(blockData.totalAmount+blockData.totalFee) / 100000000 || 0}} ETM</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_reward')}}:</p>
              <p class="td-h d-ib">{{blockData.reward / 100000000 || 0}} ETM</p>
            </div>
            <div class="detail-list">
              <p class="detail-title">{{$t('block_id')}}:</p>
              <p class="mecism d-ib">{{blockData.id}}</p>
            </div>
            <!-- <div class="detail-list">
              <p class="detail-title">Extra Data:</p>
              <p class="d-ib">{{blockData.payloadHash}}</p>
            </div> -->
            <div class="detail-list">
              <p class="detail-title">{{$t('publickey')}}:</p>
              <p class="mecism d-ib">{{blockData.generatorPublicKey}}</p>
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
  import {preciseDate} from '@/utils/utils'
  import {getBlocks} from '@/api/chain'
  
  export default {
    name: 'Blockdetails',
    data() {
      return {
        blockId: this.$route.query.blockId,
        blockHeight: this.$route.query.blockHeight,
        blockData: {},
        blockCut: true,
      };
    },
    created () {
      this.$message.loading(i18n.t('tip.loading'), 1.3)
      if( this.$route.query.blockId){
        this._getblocksId()
      }else{
        this._getblocksHeight()
      }
    },
    methods: {
      // 指定区块的详情
      async _getblocksId() {
        try {
          const params = {
            "id": this.blockId,
          }
          const result = await getBlocks(params)
          this.blockData = result.data.block
          console.log(result.data,'区块的详情')
          this.$message.success(i18n.t('tip.loading_finished'), 2)
        } catch (err) {
          console.log(err)
        }
      },
      // 指定区块的详情
      async _getblocksHeight() {
        try {
          const params = {
            "height": this.blockHeight,
          }
          const result = await getBlocks(params)
          this.blockData = result.data.block
          console.log(result.data,'区块的详情')
          this.$message.success(i18n.t('tip.loading_finished'), 2)
        } catch (err) {
          console.log(err)
        }
      },
      // 上一个区块的详情
      async blockLast(){
        try {
          this.$message.loading(i18n.t('tip.loading'), 1)
          this.blockCut = false
          const params = {
            "height": this.blockData.height - 1,
          }
          const result = await getBlocks(params)
          this.blockCut = true
          this.blockData = result.data.block
          console.log(result.data,'区块的详情')
          this.$message.success(i18n.t('tip.loading_finished'), 2)
        } catch (err) {
          console.log(err)
        }
      },
      // 下一个区块的详情
      async blockNext(){
        try {
          this.$message.loading(i18n.t('tip.loading'), 1)
          this.blockCut = false
          const params = {
            "height": this.blockData.height + 1,
          }
          const result = await getBlocks(params)
          this.blockCut = true
          this.blockData = result.data.block
          console.log(result.data,'区块的详情')
          this.$message.success(i18n.t('tip.loading_finished'), 2)
        } catch (err) {
          console.log(err)
        }
      },
      backHome(){
        this.$router.push({path:'/'});
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
  .blocks-box{padding: 20px 0 0 0;}
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{line-height: 24px;top: 28px;right: 0;font-size: 12px;}
  
  .blockdetail-box{padding-bottom: 55px;border-radius: 5px;box-shadow: 0 0 10px #E5E8ED;background: #fff;}
  .overview{font-size: 18px;height: 52px;line-height: 52px;text-indent: 15px;border-bottom: 1px solid #e5e5e5;font-weight: 600;}
  .detail-list{padding:18px 0;font-size: 14px;margin: 0 14px;color: #808080;border-bottom: 1px solid #e5e5e5;}
  .detail-list .detail-title{width: 200px;display: inline-block;color: #505050;}
  .detail-height p{margin-right: 5px;color: #0283ff; vertical-align: middle;}
  .detail-height .height-img{width: 25px;line-height: 25px;border-radius: 25px;background: #E5F3FE;margin-left: 3px;cursor: pointer;}
  .detail-list .td-d,.detail-list .td-h{line-height: 20px;}
  .mecism{word-wrap: break-word;word-break: normal;}

  @media screen and (max-width: 1200px) {
  	.headline,.blockdetail-box{margin: 0 10px;}
  }
  @media screen and (max-width: 820px) {
  	.detail-list .detail-title{width: 20%;}
  }
  @media screen and (max-width: 720px) {
  	.mecism{width: 100%;margin-top: 5px;}
  }
  @media screen and (max-width: 650px) {
  	.headline .headline-text{font-size: 18px;}
    .detail-list .detail-title{width: 105px;}
    .detail-list{font-size: 13px;}
  }
  
  @media screen and (max-width: 480px) {
    .headline{height: 65px;line-height: 65px;}
  	.headline .headline-text{font-size: 15px;}
    .realtime{top: 20px;}
    .detail-list .detail-title{width: 86px;}
    .detail-list .mecism-address{font-size: 12px;letter-spacing: -1px;}
  }
  @media screen and (max-width: 360px) {
    .overview{text-indent: 8px;}
    .detail-list{margin: 0 8px;}
    .detail-list .detail-title{width: 90px;}
    .detail-list .mecism-address{font-size: 11px;}
  }
  
</style>
