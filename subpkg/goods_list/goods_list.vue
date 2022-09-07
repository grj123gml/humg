<template>
  <view>
   <van-card
   :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`"
   v-for="item in goods" :key="item.goods_id"
     :price="item.goods_price |toFixed"
     :title="item.goods_name"
     :thumb="item.goods_small_logo || defaultPic "
   />
  </view>
</template>

<script>
  import {getGoodsList} from "@/api/goods.js"
  import toast from "../../utils/toast.js"
  export default {
    data() {
      return {
          // 默认的空图片
          defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        queryData:{
          query:'',//关键字
          cid:'',//分类id
          pagenum:1,//页数
          pagesize:10//每页条数
        },
        total:0,
        goods:[],
        isLoading:false
      }
    },
    onLoad({query}){
      // console.log(query);
      this.queryData.query=query
      this.loadGoodsList()
    },
    methods:{
     async loadGoodsList(stopPullDown){
       this.isLoading=true
       const {message}=await getGoodsList(this.queryData)
       this.isLoading=false
       this.goods=[...this.goods,...message.goods]
       this.total=message.total
       stopPullDown && stopPullDown()
     }
    },
    // 下拉刷新
    onPullDownRefresh(){
     this.queryData={
       query:this.queryData.query,//关键字
       cid:'',//分类id
       pagenum:1,//页数
       pagesize:10//每页条数
     },
     this.total=0,
     this.goods=[],
     this.loadGoodsList(()=>{
       uni.stopPullDownRefresh()
     })
    },
    // 上拉触底
    onReachBottom(){
    if(this.queryData.pagenum * this.queryData.pagesize >=this.total) return toast('亲，无更多数据')
    if(this.isLoading) return
     this.queryData.pagenum++,
      this.loadGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
