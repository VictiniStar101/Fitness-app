<template>
  <div id="app" class="container">
    <div class="display-3">
      <img alt="Vue logo" src="./assets/logo.png" id="logo">
        Fitness app
    </div>
    <Nav />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
#logo { height: 50px;}

</style>
<script>
import Nav from '@/components/Nav.vue'
// imports needed for dropdown to work
import 'bootstrap'
import 'popper.js'
import 'jquery'
import 'ajv'
export default {
  name: 'home',
  components: {
    Nav
  }
}
</script>
