<template>
  <div>
    <div class="crumbs p-r">
      <input class="crumbs-box" type="text" v-model="searchInput" name="crumbs" @blur="pitchInput('blur')" @focus="pitchInput('focus')" :placeholder="Placeholder"/>
      <img src="../../assets/img/icon5.svg" class="search p-a" @click="present"/>
    </div>
  </div>
</template>

<script>
  import {accounts, getBlocks, transacDetails} from '@/api/chain'
  
  export default {
    name:'Search',
    data () {
      return {
        searchInput:'',
        Placeholder: i18n.t('scarch_p'),
      }
    },
    inject:["reload"],
    methods: {
      present(){
        if(this.searchInput.length > 0 && this.searchInput.length < 9){
          this._getblocksHeight()
        }else if(this.searchInput.length > 30 && this.searchInput.length < 36){
          this._accounts()
        }else if(this.searchInput.length > 60 && this.searchInput.length < 68){
          this._getblocksId()
        }else{
          this.$message.error('请输入正确查询')
        }
      },
      // 获取账户信息
      async _accounts() {
        try {
          const params = {
            "address": this.searchInput,
          }
          const result = await accounts(params)
          if(result.data.success){
            this.reload();
            this.$router.push({path:'address',query:{addressId: this.searchInput}});
          }else{
            this.$message.error('请输入正确查询')
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 指定区块的详情
      async _getblocksId() {
        try {
          const params = {
            "id": this.searchInput,
          }
          const result = await getBlocks(params)
          if(result.data.success){
            this.reload();
            this.$router.push({path:'blockdetails',query:{blockId: this.searchInput}});
          }else{
            this._transacDetails()
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 指定区块的详情
      async _getblocksHeight() {
        try {
          const params = {
            "height": this.searchInput,
          }
          const result = await getBlocks(params)
          if(result.data.success){
            this.reload();
            this.$router.push({path:'blockdetails',query:{blockHeight: this.searchInput}});
          }else{
            this.$message.error('请输入正确查询')
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 查看交易详情
      async _transacDetails() {
        try {
          const params = {
            "id": this.searchInput,
          }
          const result = await transacDetails(params)
          if(result.data.success){
            this.reload();
            this.$router.push({path:'transacdetails',query:{transacId: this.searchInput}});
          }else{
            this.$message.error('请输入正确查询')
          }
        } catch (err) {
          console.log(err)
        }
      },
      
      // 查看交易详情
      pitchInput(type) {
        if (type == "blur") {
          this.Placeholder = i18n.t('scarch_p')
        }else{
          this.Placeholder = ''
        }  
      },
    }
  };

</script>
<style scoped>
  .crumbs{height: 48px;line-height: 48px;color: #fff;background: #0283FF;border-radius: 6px;}
  .crumbs-box{width: 85%;font-size: 14px;margin-left: 25px;background: none;}
  .search{top: 9px;right: 15px;width: 30px;height: 30px;cursor: pointer;}
  
  @media screen and (max-width: 1200px) {
  	.crumbs{margin: 0 10px;}
  }
  
  @media screen and (max-width: 480px) {
    .crumbs{height: 42px;line-height: 42px;}
    .crumbs-box{width: 85%;font-size: 13px;margin-left: 15px;background: none;}
    .search{top: 7px;right: 10px;width: 30px;height: 30px;}
  }
</style>
