<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
 
<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll()
    }
  }
</script>
 
<style scoped>
  
</style>