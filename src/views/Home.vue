<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width:100px;height:100px">
    <About msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'
// import Nav from '@/components/Nav.vue'
export default {
  name: 'home',
  components: {
    About
  }
}
</script>
