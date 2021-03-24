<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
 
<script>
  export default {
    name: 'BackTop',
    methods: {
      backClick() {
        this.$emit('backClick')
      }
    }
  }
</script>
 
<style scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 60px;
  }

  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>