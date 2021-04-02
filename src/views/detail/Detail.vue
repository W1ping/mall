<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" 
    ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />

      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>


  </div>
</template>
 
<script>

  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailRecommendInfo from './childComps/DetailRecommendInfo';
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from "components/content/backTop/BackTop";

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
  import { debounce } from 'common/utils';
  import { itemListenerMixin, backTopMixin } from 'common/mixin';

  import { mapActions } from 'vuex';

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1. 保存传入的 iid
      this.iid = this.$route.params.iid;

      // 2. 根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        // 1. 获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3. 创建店铺信息
        this.shop = new Shop(data.shopInfo);

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo

        //5. 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
       
       // 6.取出评论信息
       if(data.rate.cRate !== 0) {
         this.commentInfo = data.rate.list[0];
       }
      })

      // 3. 请求推荐数据 
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })

      // 4. 给 getThemeTopY 赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },100)
      
    },
    

    methods: {
      //可以使用对象方式 'add':'addCart'
      ...mapActions(['addCart']),

      imageLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 500);
      },
      contentScroll(position) {
        const positionY = -position.y+44;
        for (let i = 0; i < this.themeTopYs.length; i++) {
          //console.log(i); //str 下面 i+ 1会有问题
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //
          // }
          let length = this.themeTopYs.length;
          if(this.currentIndex !== i
            && ((i < length - 1 && positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i + 1])
            || (i === length -1 && positionY >= this.themeTopYs[i]))) {
            //对于上面一长串的范围判断使用this.themeTopYs.push(Number.MAX.VALUE);
            //这样可以省去 || 之后的判断代码
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        //是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000;
      },
      addToCart() {
        // 1. 获取购物车想要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.iid = this.iid;
        product.price = this.goods.realPrice;

        // 2. 将商品添加到购物车里
        // this.$store.cartList.push(product);
        // this.$store.commit('addCart', product);
        this.$store.dispatch('addCart',product).then(res => {
          this.$toast.show(res, 2000);
        });

        //将上面 的方法影射到本组件内部(利用mapActions
      }
    }
  }
</script>
 
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>