<template>
  <div id="Home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll>
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control class="tab-control" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
    

    
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

  import { getHomeMultidata, getHomeGoods } from "network/home";
  

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },

    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page:0, list: [] },  // 流行
          'new': { page:0, list: [] }, // 新款
          'sell': { page:0, list: [] }  // 精选
        },
        currentType: 'pop',
      }
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },

    methods: {
      // 事件监听相关方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },


      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
       })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res =>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          // console.log(this.goods[type].list);
        })
      }
      
    }
  }
</script>

<style scoped>
  #Home{
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>