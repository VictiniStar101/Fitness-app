<template>
  <div class="home">
    
    <!--
    <img alt="Vue logo" src="../assets/logo.png" style="width:100px;height:100px">
    <About msg="Welcome to Your Vue.js App"/>
    -->
    <div class="jumbotron">
      <p>
        Click the button below to access the app
      </p>
      <a href="#/profile" class="btn btn-primary">App</a>
      <!--<button type="button" class="btn btn-primary">
        App
        <router-link class="btn btn-primary" to="/profile">
        </router-link>
      </button>-->  
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
}
</script>
