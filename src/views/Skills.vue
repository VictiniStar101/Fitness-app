
<template>
  <!-- where HTML goes -->
  <div class="hello">
    <div class="holder">
      <!-- for loop example -->
      
      <ul>
        <li v-for="(data, index) in skills" :key='index'> {{index}}. {{data.skill}}
        </li>
      </ul>
      
      <!-- conditional example
      <p v-if="skills.length >= 1"> You have more than one skill</p>
      <p v-else>You have less than one skill</p>
      -->
    </div>
  <!-- btn example
    About
    {{ name }}
    {{ btnState ? 'The button is disabled' : 'The button is active'}}
    <button v-on:click="changeName" v-bind:disabled="btnState">Change Name</button>
  -->
  </div>
</template>

<script>
// where logic goes
export default {
  name: 'Skills',
  data () {
    return {
      skills: [
        { 'skill': 'Vue.js' },
        { 'skill': 'Python' }
      ]
    // name: 'Faizan',
    // btnState: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// where CSS goes
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
