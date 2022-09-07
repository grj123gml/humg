import fly from '@/utils/request.js'
// 获取首页轮播图
export const getBanners=()=> fly.get('/home/swiperdata')
// 获取到导航数据
export const getNavList=()=>fly.get('/home/catitems')
// 获取楼层数据
export const getFloor =  () => fly.get('/home/floordata')