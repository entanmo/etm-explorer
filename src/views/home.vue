<template>
  <div class="home">

    <v-header></v-header>
    
    <div class="content">
      <div class="headline p-r">
        <div class="headline-text fw-6">{{$t('crumb_explorer')}}</div>
        <div class="realtime p-a d-ib">
          <div class='realtime-text d-ib'>{{$t('crumb_updates')}}</div>
          <a-switch defaultChecked @change='realTime'>
            <a-icon type="check" slot="checkedChildren"/>
            <a-icon type="close" slot="unCheckedChildren"/>
          </a-switch>
        </div>
      </div>
      
      <v-search></v-search>

      <div class="quick">
        <!-- <div class="quick-list">
          <p class="quick-title">{{$t('home_price')}}</p>
          <p class="quick-data">${{last}}</p>
          <p class="quick-small"><span>${{marketCap}}</span> {{$t('home_market')}}</p>
          <img src="../assets/img/icon1.svg" class="quick-img quick-img1 p-a"/>
        </div> -->
        <div class="quick-list">
          <p class="quick-title">{{$t('home_height')}}</p>
          <p class="quick-data">{{height}}</p>
          <p class="quick-small"><span>{{blockTime}}s</span> {{$t('home_averaget')}}</p>
          <img src="../assets/img/icon2.svg" class="quick-img quick-img2 p-a"/>
        </div>
        <div class="quick-list">
          <p class="quick-title">{{$t('home_operational')}}</p>
          <p class="quick-data">{{sectionTime}}</p>
          <p class="quick-small"><span>{{versionData}}</span> {{$t('home_version')}}</p>
          <img src="../assets/img/icon3.svg" class="quick-img quick-img3 p-a"/>
        </div>
        <div class="quick-list">
          <p class="quick-title">{{$t('home_users')}}</p>
          <p class="quick-data">{{count}}</p>
          <p class="quick-small"><span>{{minersData}}</span> {{$t('home_miners')}}</p>
          <img src="../assets/img/icon4.svg" class="quick-img quick-img4 p-a"/>
        </div>
        <div class="quick-list">
          <p class="quick-title">{{$t('home_issued')}}</p>
          <p class="quick-data">{{assetsData}}</p>
          <p class="quick-small"><span>{{dappData}}</span> DApp</p>
          <img src="../assets/img/icon9.svg" class="quick-img quick-img5 p-a"/>
        </div>
      </div>
      
      <div class="details">
        <div class="details-latest d-ib f-l p-r">
          <div class="view-all" @click="blockAll">{{$t('home_viewall')}}</div>
          <div class="details-title">{{$t('home_latest')}}</div>
          <div class="latest-list c-a6a6a6">
            <div class="list-box" v-for="(item,index) in blocksList" :key="index">
              <img src="../assets/img/icon6.svg" class="portrait d-ib f-l"/>
              <div class="list-area1 d-ib f-l">
                <p class="c-0283ff td-u" @click="blockDetails" :data-id="item.id">{{item.height}}</p>
                <p>{{(nowTime - item.timestamp) | divisionTime}} {{$t('home_sesago')}}</p>
              </div>
              <div class="list-area2 d-ib f-l">
                <p>{{$t('home_miner')}}: <span class="c-0283ff td-u" @click="address" :data-id="item.generatorId">{{item.generatorId}}</span></p>
                <p>{{$t('home_txns')}}: <span class="c-0283ff">{{item.numberOfTransactions}}</span></p>
              </div>
              <a-tooltip :trigger="['hover','click']">
                <template slot='title'>{{$t('home_rewards')}} {{item.reward / 100000000 || 0}} ETM</template>
                <div class="list-area3 d-ib f-r">
                  <img src="../assets/img/icon8.svg"/>
                  <p>{{(item.totalAmount+item.totalFee+item.totalForged) / 100000000  || 0}} ETM</p>
                </div>
              </a-tooltip>
              <div class="c-b"></div>
            </div>
          </div>
        </div>
        <div class="details-transac d-ib f-r p-r">
          <div class="view-all" @click="transacAll">{{$t('home_viewall')}}</div>
          <div class="details-title">{{$t('home_transactions')}}</div>
          <div class="latest-list c-a6a6a6">
            <div class="list-box" v-for="(item,index) in transacList" :key="index">
              <img src="../assets/img/icon7.svg" class="portrait d-ib f-l"/>
              <div class="list-area1 d-ib f-l">
                <a-tooltip :trigger="['hover','click']">
                  <template slot='title'>{{item.blockId}}</template>
                  <p class="ellipsis c-0283ff td-u" @click="transacDetails" :data-id="item.id">{{item.blockId}}</p>
                </a-tooltip>
                <p>{{(item.timestamp === 0 ? (Date.now() - (new Date("2019/11/27 12:00:00")).getTime())/1000 : (nowTime - item.timestamp)) | divisionTime}} {{$t('home_sesago')}}</p>
              </div>
              <div class="list-area2 d-ib f-l">
                <p>{{$t('from')}}: <span class="c-0283ff td-u" @click="address" :data-id="item.senderId">{{item.senderId}}</span></p>
                <p>{{$t('to')}}: 
                  <span class="c-0283ff td-u" v-if="item.recipientId" @click="address" :data-id="item.recipientId">{{item.recipientId}}</span>
                  <span class="c-0283ff" v-else>—</span>
                </p>
              </div>
              <a-tooltip :trigger="['hover','click']">
                <template slot='title'>{{$t('fee')}} {{item.fee / 100000000}} ETM</template>
                <div class="list-area3 d-ib f-r">
                  <img src="../assets/img/icon8.svg"/>
                  <p>{{Math.floor(item.amount / 100000000 * 100) / 100}} ETM</p>
                </div>
              </a-tooltip>
              <div class="c-b"></div>
            </div>
          </div>
        </div>
        <div class="c-b"></div>
      </div>
      
    </div>

    <v-footer></v-footer>
  </div>
</template>
<script>
  import header from "@/components/header/header"
  import footer from "@/components/footer/footer"
  import search from "@/components/search/search"
  import {divisionTime} from '@/utils/utils'
  import {ticker, tokens} from '@/api/explorer'
  import {getHeight, getCount, Miners, version, assets, dapps,getBlocksList, transacList} from '@/api/chain'
  
  export default {
    name: 'Home',
    sockets: {
      'okex_ticker': function(data){
        if(this.realtime){
          this.last = data.last || this.last
          this._tokens()
        }
      },
      '/blocks/change': function (data) {
        if(this.realtime){
          this.height = data.height || this.height
          this._getBlocksList()
          this._transacList()
        }
      },
    },
    data() {
      return {
        nowTime: '', //当前时间
        realtime: true,  //是否实时监听
        last: '0',  //ETM当前币价美元
        marketCap: '0',  //ETM市场价值
        height: '0',  //区块链高度
        blockTime: '0',  //100出块平均时间
        sectionTime: '0',  //成立天数
        count: '0',  //账户总数
        minersData: '0',  //矿工数量
        assetsData: '0',  //资产发行数量
        dappData: '0',  //dapp数量
        versionData: '0',  //版本号
        blocksList: [], //区块列表
        transacList: [], //交易列表
      };
    },
    created () {
      this._ticker()
      this._getHeight()
      this._establish()
      this._version()
      this._getCount()
      this._Miners()
      this._getBlocksList()
      this._transacList()
      this._assets()
      this._dapps()
    },
    methods: {
      realTime(e){
        this.realtime = e
      },
      // 获取ETM当前币价
      async _ticker() {
        try {
          const result = await ticker()
          this.last = result.data.data.last
          this._tokens()
        } catch (err) {
          console.log(err)
        }
      },
      // 获取发行量
      async _tokens() {
        try {
          const result = await tokens()
          this.marketCap = parseFloat(result.data.data.tokenCount) * parseFloat(this.last)
        } catch (err) {
          console.log(err)
        }
      },
      // 获取区块链高度
      async _getHeight() {
        try {
          const result = await getHeight()
          this.height = result.data.height
        } catch (err) {
          console.log(err)
        }
      },
      //成立时间计算
      _establish(){
        let date = '2019-11-27 12:00:00';
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        let beforeTime = new Date(date).getTime();
        let nowTime = parseInt(new Date().getTime());
        let sectionTime = (nowTime-beforeTime) / 86400000
        this.sectionTime = parseInt(sectionTime)
      },
      // 获取节点版本号
      async _version() {
        try {
          const result = await version()
          this.versionData = result.data.version
        } catch (err) {
          console.log(err)
        }
      },
      // 获取当前链上账户总个数
      async _getCount() {
        try {
          const result = await getCount()
          this.count = result.data.count
        } catch (err) {
          console.log(err)
        }
      },
      // 矿工数量
      async _Miners() {
        try {
          const result = await Miners()
          this.minersData = result.data.count
        } catch (err) {
          console.log(err)
        }
      },
      // 资产发行数量
      async _assets() {
        try {
          let params = {limit: 1}
          const result = await assets(params)
          this.assetsData = result.data.count
        } catch (err) {
          console.log(err)
        }
      },
      // dapp数量
      async _dapps() {
        try {
          let params = {limit: 1}
          const result = await dapps(params)
          this.dappData = result.data.count.count
        } catch (err) {
          console.log(err)
        }
      },
      // 获取区块数据
      async _getBlocksList() {
        try {
          let params = {
            orderBy: 'height:desc',
          }
          const result = await getBlocksList(params)
          this.nowTime = parseInt((new Date().getTime() - 1539316800000 - 8*60*60*1000) / 1000)
          this.blocksList = result.data.blocks.slice(0,6)
          this.blockTime = (result.data.blocks[0].timestamp - result.data.blocks[99].timestamp) / 99
        } catch (err) {
          console.log(err)
        }
      },
      // 获取交易信息
      async _transacList() {
        try {
          let params = {
            orderBy: 'b_height:desc',
          }
          const result = await transacList(params)
          this.nowTime = parseInt((new Date().getTime() - 1539316800000 - 8*60*60*1000) / 1000)
          this.transacList = result.data.transactions.slice(0,6)
        } catch (err) {
          console.log(err)
        }
      },
      
      blockAll(){
        this.$router.push({path:'blocks'});
      },
      blockDetails(e){
        this.$router.push({path:'blockdetails',query:{blockId: e.srcElement.dataset.id}});
      },
      transacAll(){
        this.$router.push({path:'transac'});
      },
      transacDetails(e){
        this.$router.push({path:'transacdetails',query:{transacId: e.srcElement.dataset.id}});
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
      divisionTime
    },
  };

</script>
<style scoped>
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{top: 0;right: 0;}
  .realtime .realtime-text{font-size: 16px;margin-right: 18px;}
  
  .quick{margin: 20px 0 10px 0;height: 100%;display: flex;justify-content: space-between;flex-wrap: wrap;}
  .quick-list{width: 23.8%;height: 115px;margin-bottom: 10px;border-radius: 5px;box-shadow: 0 0 10px #E5E8ED;text-align: left;display: inline-block;background: #fff;position: relative;transition: all .4s;
  -webkit-transition: all .5s; /* Safari */}
  .quick-list:hover{box-shadow: 0 0 10px #ccc;cursor: pointer;transform: scale(1.05);}
  .quick-list:hover .quick-img{transform:rotate(360deg);}
  .quick-title{font-size: 12px;color: #808080;margin: 14px 0 0 15px;}
  .quick-data{font-size: 32px;color: #505050;font-weight: 600;margin: -2px 0 0 14px;}
  .quick-small{font-size: 12px;color: #808080;margin: 0 0 0 15px;}
  .quick-small span{color: #0283ff;font-weight: 600;}
  .quick-img{top: 40px;right: 13px;width: 35px;height: 35px;padding: 8px;border-radius: 50%;transition: all .4s;
  -webkit-transition: all .5s; /* Safari */}
  .quick-img1{background: #FFF8E4;}
  .quick-img2{background: #F3F1FF;}
  .quick-img3{background: #EBF9EA;}
  .quick-img4{background: #FDDFDF;}
  .quick-img5{background: #E5F3FE;}
  
  .view-all{position: absolute;top: 12px;right: 14px;padding: 4px 9px;font-size: 12px;border-radius: 3px;font-weight: 600;color: #0283ff;background: #E5F3FE;cursor: pointer;}
  .view-all:hover{background: #0283FF;color: #fff;}
  .details-latest,.details-transac{width: 49.2%;;margin-bottom: 20px;background: #fff;box-shadow: 0 0 10px #E5E8ED;border-radius: 5px;}
  .details-title{height: 50px;line-height: 50px;font-size: 18px;border-bottom: 1px solid #e5e5e5;padding-left: 15px;font-weight: 600;}
  
  .latest-list{padding-bottom: 50px;}
  .latest-list .list-box{padding: 15px 0 10px 0;font-size: 12px;border-bottom: 1px solid #e5e5e5;margin: 0 15px;font-weight: 600;position: relative;}
  .latest-list .list-box .portrait{width: 35px;height: 35px;padding: 8px;margin: 0 12px 0 0;border-radius: 50%;background: #E5F3FE;}
  .list-box .list-area1{width: 77px;margin:0 8px 5px 0;text-overflow:ellipsis;overflow: hidden;white-space: normal;}
  .list-box .list-area2{width: 360px;}
  .list-box .list-area3{height: 24px;line-height: 24px;margin: 5px 0 0 0;padding: 0 6px;text-align: center;background: #FFF8E4;color: #fec118;border-radius: 4px;cursor: pointer;position: absolute;top: 16px;right: 0;}
  .list-box .list-area3 img{width: 18px;height: 18px;margin:3px 1px 0 0;vertical-align: top;}
  .list-box .list-area3 p{display: inline-block;}
  .details-transac .list-box .list-area1{width: 82px;}
  
  .ellipsis{margin-bottom: -5px;width: 100%;text-overflow:ellipsis;overflow: hidden;white-space: normal;}
  
  @media screen and (max-width: 1200px) {
  	.headline,.details{margin: 0 10px;}
    .quick{margin: 20px 10px 10px 10px;}
    .details-latest,.details-transac{width: 100%;}
  }
  
  @media screen and (max-width: 1050px) {
  	.quick .quick-list{width: 49%;}
    .quick .quick-list:nth-last-child(1),.quick .quick-list:nth-last-child(2),.quick .quick-list:nth-last-child(3){width: 32%;}
  }
  
  @media screen and (max-width: 650px) {
  	.headline .headline-text{font-size: 18px;}
  	.realtime .realtime-text{font-size: 14px;margin-right: 18px;}
  }
  
  @media screen and (max-width: 480px) {
    .headline{height: 65px;line-height: 65px;}
  	.headline .headline-text{font-size: 15px;}
  	.realtime .realtime-text{font-size: 13px;margin-right: 3px;}
    
    .quick .quick-list{width: 100%;height: 105px;}
    .quick-title{margin: 11px 0 0 15px;}
    .quick-img{top: 36px;}
    .quick .quick-list:nth-last-child(1),.quick .quick-list:nth-last-child(2),.quick .quick-list:nth-last-child(3){width: 100%;}
  }
  @media screen and (max-width: 360px) {
  	.latest-list .list-box{font-size: 10px;}
    .headline .headline-text{font-size: 12px;}
    .realtime .realtime-text{font-size: 11px;margin-right: 0;}
  }
  
</style>
