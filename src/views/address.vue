<template>
  <div class="address">

    <v-header></v-header>
    
    <div class="address-box">
        <div class="content">
          
          <v-search></v-search>
          
          <div class="headline p-r">
            <div class="headline-text fw-6">{{$t('address')}}</div>
            <div class="realtime p-a td-d" @click="backHome">{{$t('backhome')}}</div>
          </div>
          
          <div class="addressdetail-box">
            <div class="overview">{{$t('overview')}}</div>
            <div class="detail-list">
              <p class="detail-title">{{$t('address')}}:</p>
              <p class="d-ib" id="key">{{addressData.address || '0'}}</p>
              <a-icon title="复制" type="copy" class="copy"  data-clipboard-target="#key" @click="copy" ></a-icon>
            </div>
            <div class="detail-list" v-if="!addressData.balance">
              <p class="detail-title">{{$t('balance')}}:</p>
              <p class="d-ib">0 ETM</p>
            </div>
            <div class="detail-list" v-else>
              <p class="detail-title">{{$t('balance')}}:</p>
              <p class="d-ib">{{(addressData.balance / 100000000).toFixed(2) || 0}} ETM</p>
            </div>
          </div>
          
          <div class="blocks-table p-r">
            <a-table :columns="columns" :dataSource="transacList" :pagination="{ pageSize: 8 }" :scroll="{ x: 1030 }">
              <template slot="id" slot-scope="id">
                <a-tooltip :trigger="['hover','click']">
                  <template slot='title'>{{id}}</template>
                  <span class="txnid td-d" :data-id="id" @click="transacDetails">{{id}}</span>
                </a-tooltip>
              </template>
              <template slot="confirmations" slot-scope="confirmations">
                <span class="td-d" :data-id="confirmations" @click="blockDetails">{{confirmations}}</span>
              </template>
              <template slot="timestamp" slot-scope="timestamp">
                <span>{{timestamp | formatDate}}</span>
              </template>
              <template slot="senderId" slot-scope="senderId">
                <a-tooltip :trigger="['hover','click']">
                  <template slot='title'>{{senderId}}</template>
                  <span class="td-d" :data-id="senderId" @click="address">{{senderId}}</span>
                </a-tooltip>
              </template>
              <template slot="type" slot-scope="type, data">
                <span class="typeicon typeout" v-if="type == 0 && data.state">OUT</span>
                <span class="typeicon typein" v-else-if="type == 0 && !data.state">IN</span>
                <span class="typeicon typeself" v-else>SELF</span>
              </template>
              <template slot="recipientId" slot-scope="recipientId">
                <a-tooltip :trigger="['hover','click']">
                  <template slot='title'>{{recipientId}}</template>
                  <span class="td-d" :data-id="recipientId" @click="address">{{recipientId}}</span>
                </a-tooltip>
              </template>
              <template slot="amount" slot-scope="amount">
                <span>{{amount / 100000000}} ETM</span>
              </template>
              <template slot="fee" slot-scope="fee">
                <span>{{fee / 100000000}} ETM</span>
              </template>
            </a-table>
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
  import {formatDate} from '@/utils/utils'
  import {accounts, transacList} from '@/api/chain'

  
  export default {
    name: 'Address',
    data() {
      return {
        columns: [
          { title: i18n.t('txniD'), dataIndex: 'id', scopedSlots: { customRender: 'id' }, fixed: 'left'},
          { title: i18n.t('block'), dataIndex: 'confirmations', scopedSlots: { customRender: 'confirmations' },},
          { title: i18n.t('timestamp'), dataIndex: 'timestamp', scopedSlots: { customRender: 'timestamp' },},
          { title: i18n.t('from'), dataIndex: 'senderId', scopedSlots: { customRender: 'senderId' },},
          { title: '',dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: i18n.t('to'),dataIndex: 'recipientId', scopedSlots: { customRender: 'recipientId' },},
          { title: i18n.t('amount'),dataIndex: 'amount', scopedSlots: { customRender: 'amount' },},
          { title: i18n.t('fee'),dataIndex: 'fee', scopedSlots: { customRender: 'fee' },},
        ],
        addressId: this.$route.query.addressId,
        addressData:{},
        transacList:[]
      };
    },
    created () {
      this._accounts()
      this._transacList()
    },
    inject:["reload"],
    methods: {
      // 获取账户信息
      async _accounts() {
        try {
          const params = {
            "address": this.addressId,
          }
          const result = await accounts(params)
          this.addressData = result.data.account
          console.log(result.data,'获取账户信息')
        } catch (err) {
          console.log(err)
        }
      },
      // 获取账户交易信息
      async _transacList() {
        try {
          const params = {
            orderBy: 'b_height:desc',
            "ownerAddress": this.addressId,
          }
          const result = await transacList(params)
          for (let i = 0; i < result.data.transactions.length; i++) {
            result.data.transactions[i].key = i
            if(this.addressData.address == result.data.transactions[i].senderId){
              result.data.transactions[i].state = true
            }else{
              result.data.transactions[i].state = false
            }
          }
          this.transacList = result.data.transactions
          console.log(result.data,'获取账户交易信息')
        } catch (err) {
          console.log(err)
        }
      },
      
      copy(){
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
      transacDetails(e){
        this.$router.push({path:'transacdetails',query:{transacId: e.srcElement.dataset.id}});
      },
      blockDetails(e){
        this.$router.push({path:'blockdetails',query:{blockHeight: e.srcElement.dataset.id}});
      },
      address(e){
        if(e.srcElement.dataset.id != this.addressId){
          this.reload();
          this.$router.push({path:'address',query:{addressId: e.srcElement.dataset.id}});
        }
      },
    },
    components:{
      'v-header': header,
      'v-footer': footer,
      'v-search': search
    },
    filters: {   //过滤器
      formatDate
    },
  };

</script>
<style scoped>
  .address-box{min-height: 730px;padding: 20px 0 0 0;}
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{line-height: 24px;top: 28px;right: 0;font-size: 12px;}
  
  .addressdetail-box{margin-bottom: 18px;padding-bottom: 28px;border-radius: 5px;box-shadow: 0 0 10px #E5E8ED;background: #fff;}
  .overview{font-size: 18px;height: 52px;line-height: 52px;text-indent: 15px;border-bottom: 1px solid #e5e5e5;font-weight: 600;}
  .detail-list{height: 52px;line-height: 52px;font-size: 14px;margin: 0 14px;color: #808080;border-bottom: 1px solid #e5e5e5;}
  .detail-list .detail-title{width: 200px;display: inline-block;color: #505050;}
  
  .blocks-table{white-space: nowrap;}
  .blocks-table .td-d{max-width: 150px;text-overflow: ellipsis;overflow: hidden;white-space: normal;}
  .typeicon{width: 45px;height: 24px;line-height: 24px;border-radius: 5px;font-size: 12px;font-weight: 600;text-align: center;display: inline-block;}
  .typeout{color: #876cff;background: #F3F1FF;}
  .typein{color: #2cc32b;background: #EBF9EA;}
  .typeself{color: #808080;background: #F2F2F2;}
  
  @media screen and (max-width: 1200px) {
  	.headline,.blocks-table{margin: 0 10px;}
    .addressdetail-box{margin: 0 10px 18px 10px;}
    .detail-list .detail-title{width: 20%;}
  }

  @media screen and (max-width: 650px) {
  	.headline .headline-text{font-size: 18px;}
  }
  
  @media screen and (max-width: 480px) {
    .headline{height: 65px;line-height: 65px;}
  	.headline .headline-text{font-size: 15px;}
    .realtime{top: 18px;}
    
    .detail-list .detail-title{width: 60px;}
    .overview{font-size: 15px;text-indent: 10px;}
    .detail-list{height: 48px;line-height: 48px;font-size: 12px;margin: 0 10px;}
  }
  
  @media screen and (max-width: 360px) {
    .detail-list .detail-title{width: 50px;}
    .detail-list{font-size: 12px;letter-spacing: -1px;}
    
  }
  
</style>
