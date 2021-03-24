<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 如果直接把 v-bind/ : 直接绑定给 slot 则 slot 到时候会被整个替换掉，效果讲不能呈现 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
  </div>
</template>
 
<script>
  export default {
    name: 'TabBarItem',

    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },

    data() {
      return {
        // isActive: true
      }
    },

    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },

    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>
 
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width:24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px ;
    vertical-align: middle;
  }

  .active{
    color: rgb(168, 97, 118);
  }
</style>