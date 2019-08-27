<template>
  <div class="blocks">

    <v-header></v-header>
    
    <div class="blocks-box">
        <div class="content">
          
          <v-search></v-search>
          
          <div class="headline p-r">
            <div class="headline-text fw-6">{{$t('blocks')}}</div>
            <div class="realtime p-a td-d" @click="backHome">{{$t('backhome')}}</div>
          </div>
          
          <div class="blocks-table p-r">
            <a-table :columns="columns" :dataSource="blocksList" :pagination="{ pageSize: 8 }" :scroll="{ x: 890 }">
              <template slot="height" slot-scope="height">
                <span class="td-d" :data-id="height" @click="blockDetails">{{height}}</span>
              </template>
              <template slot="timestamp" slot-scope="timestamp">
                <span>{{timestamp | preciseDate}}</span>
              </template>
              <template slot="numberOfTransactions" slot-scope="numberOfTransactions">
                <span class="td-d">{{numberOfTransactions}} transactions </span>
              </template>
              <template slot="generatorId" slot-scope="generatorId">
                <span class="td-d" :data-id="generatorId" @click="address">{{generatorId}}</span>
              </template>
              <template slot="reward" slot-scope="reward, data">
                <span>{{reward / 100000000}} ETM</span>
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
  import {getBlocksList} from '@/api/chain'
  
  export default {
    name: 'Blocks',
    data() {
      return {
        columns: [
          { title: i18n.t('block'), dataIndex: 'height', scopedSlots: { customRender: 'height' }, fixed: 'left'},
          { title: i18n.t('timestamp'), dataIndex: 'timestamp', scopedSlots: { customRender: 'timestamp' },},
          { title: i18n.t('block_transactions'), dataIndex: 'numberOfTransactions', scopedSlots: { customRender: 'numberOfTransactions' },},
          { title: i18n.t('miner'), dataIndex: 'generatorId', scopedSlots: { customRender: 'generatorId' },},
          { title: i18n.t('rewards'),dataIndex: 'reward', scopedSlots: { customRender: 'reward' }, },
        ],
        blocksList:[],
      };
    },
    created () {
      this._getBlocksList()
    },
    methods: {
      // 获取区块数据
      async _getBlocksList() {
        try {
          let params = {
            orderBy: 'height:desc',
          }
          const result = await getBlocksList(params)
          for (let i = 0; i < result.data.blocks.length; i++) {
            result.data.blocks[i].key = i
          }
          this.blocksList = result.data.blocks
          console.log(result.data,'区块数据')
        } catch (err) {
          console.log(err)
        }
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
  .blocks-box{min-height: 500px;padding: 20px 0 0 0;}
  .headline{height: 80px;line-height: 80px;}
  .headline .headline-text{font-size: 26px;}
  .realtime{line-height: 24px;top: 28px;right: 0;font-size: 12px;}
  
  .blocks-table{white-space: nowrap;}
  
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
