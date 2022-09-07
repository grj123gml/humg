<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in banner" :key="item.goods_id">
        <view class="swiper-item">
             <!-- 动态绑定图片的 src 属性 -->
             <image @click="goodsDetail(item.goods_id)" :src="item.image_src" mode="widthFix"></image>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域 -->
    <view class="nav-list">
       <view @click="navClick(item)" class="nav-item" v-for="(item, i) in navlist" :key="i">
         <image :src="item.image_src" class="nav-img"></image>
       </view>
    </view>
    
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        
        <view class="floor-img-box">
                  <!-- 左侧大图片的盒子 -->
                  <view class="left-img-box">
                    <image @click="godoodsList(item.product_list[0].navigator_url)" class="left-img" :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
                  </view>
                  <!-- 右侧 4 个小图片的盒子 -->
                  <view class="right-img-box">
                    <view class="right-img-item" v-for="(item2,i) in item.product_list" :key="i" v-if="i !==0">
                      <image @click="godoodsList(item2.navigator_url)"  :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
                    </view>
                  </view>
                </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getBanners,getNavList,getFloor} from "@/api/home.js"
  export default {
    data() {
      return {
        banner:[],
        navlist:[],
        floors:[]
      };
    },
    methods:{
      async getBanner(){
       const res=await getBanners() 
       // console.log(res);
       this.banner=res.message
      },
      goodsDetail(id){
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?id" + id
        })
      },
      godoodsList(url){
        // console.log(url.slice(url.indexOf('?')));
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list" + url.slice(url.indexOf('?'))
        })
      },
      async getnavList(){
       const res=await getNavList()
       // console.log(res);
       this.navlist=res.message
      },
      navClick(item){
        if(item.name ==="分类"){
          uni.switchTab({
            url:"/pages/cate/cate"
          })
        }
      },
      async getFloors(){
        const res=await getFloor()
        this.floors=res.message
      }
    },
    onLoad() {
      this.getBanner()
      this.getnavList()
      this.getFloors()
    }
  }
</script>

<style lang="scss">
.topSearch {
  width: 750rpx;
  height: 70px;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .search_btn {
    width: 600rpx;
    height: 30px;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
swiper {
 height: 330rpx;
}
 .swiper-item image {
   width: 100%;
   height: 100%;
 }
 .nav-list {
   display: flex;
   justify-content: space-around;
   margin: 15px 0;
 
   .nav-img {
     width: 128rpx;
     height: 140rpx;
   }
 }
 .floor-title {
     height: 60rpx;
     width: 100%;
     display: flex;
   }
 
   .right-img-box {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
 
     .image {
       height: 190rpx;
     }
   }
 
   .floor-img-box {
     display: flex;
     padding-left: 10rpx;
 
     .left-img {
       height: 392rpx !important;
     }
   }
</style>
