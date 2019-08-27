<template>
  <div class="transac">

    <v-header></v-header>
    
    <div class="transac-box">
        <div class="content">
          
          <v-search></v-search>
          
          <div class="headline p-r">
            <div class="headline-text fw-6">{{$t('transactions')}}</div>
            <div class="realtime p-a td-d" @click="backHome">{{$t('backhome')}}</div>
          </div>
          
          <div class="blocks-table p-r">
            <a-table :columns="columns" :dataSource="transacList" :pagination="{ pageSize: 8 }" :scroll="{ x: 1030 }">
              <template slot="id" slot-scope="id">
                <span class="td-d" :data-id="id" @click="transacDetails">{{id}}</span>
              </template>
              <template slot="block" slot-scope="block">
                <span class="td-d" :data-id="block" @click="blockDetails">{{block}}</span>
              </template>
              <template slot="timestamp" slot-scope="timestamp">
                <span>{{timestamp | preciseDate}}</span>
              </template>
              <template slot="senderId" slot-scope="senderId">
                <span class="td-d" :data-id="senderId" @click="address">{{senderId}}</span>
              </template>
              <template slot="icon" slot-scope="icon">
                <img src="../assets/img/icon12.svg" class="fromto-img"/>
              </template>
              <template slot="recipientId" slot-scope="recipientId">
                <span class="td-d" v-if="recipientId" :data-id="recipientId" @click="address">{{recipientId}}</span>
                <span class="td-d" v-else> </span>
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
  import {preciseDate} from '@/utils/utils'
  import {transacList} from '@/api/chain'
  
  
  export default {
    name: 'Transac',
    data() {
      return {
        transacList: [],
        columns: [
          { title: i18n.t('txniD'), dataIndex: 'id', scopedSlots: { customRender: 'id' }, fixed: 'left'},
          { title: i18n.t('block'), dataIndex: 'height', scopedSlots: { customRender: 'block' },},
          { title: i18n.t('timestamp'), dataIndex: 'timestamp', scopedSlots: { customRender: 'timestamp' },},
          { title: i18n.t('from'), dataIndex: 'senderId', scopedSlots: { customRender: 'senderId' },},
          { title: '', scopedSlots: { customRender: 'icon' }, },
          { title: i18n.t('to'),dataIndex: 'recipientId', scopedSlots: { customRender: 'recipientId' },},
          { title: i18n.t('amount'),dataIndex: 'amount', scopedSlots: { customRender: 'amount' },},
          { title: i18n.t('fee'),dataIndex: 'fee', scopedSlots: { customRender: 'fee' },},
        ],
      };
    },
    created () {
      this._transacList()
    },
    methods: {
      // 获取交易信息
      async _transacList() {
        try {
          let params = {
            orderBy: 'b_height:desc',
          }
          const result = await transacList(params)
          for (let i = 0; i < result.data.transactions.length; i++) {
            result.data.transactions[i].key = i
          }
          this.transacList = result.data.transactions
          console.log(result.data,'交易信息')
        } catch (err) {
          console.log(err)
        }
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
  .transac-box{min-height: 500px;padding: 20px 0 0 0;}
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{line-height: 24px;top: 28px;right: 0;font-size: 12px;}

  .blocks-table{white-space: nowrap;}
  .blocks-table .td-d{max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: normal;}
  .fromto-img{width: 28px;height: 28px;padding: 6px;border-radius: 50%;background: #EBF9EA;}
  
  @media screen and (max-width: 1200px) {
  	.headline,.blocks-table{margin: 0 10px;}
  }

  @media screen and (max-width: 650px) {
  	.headline .headline-text{font-size: 18px;}
  }
  
  @media screen and (max-width: 480px) {
    .headline{height: 65px;line-height: 65px;}
  	.headline .headline-text{font-size: 15px;}
    .realtime{top: 20px;}
  }
  
</style>
