<template>
  <div class="about">
    {{ info }}
    <p>This is a webapp made using Express and Vue which allows you to log your exercises</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .get('http://localhost:3000/api/users')
      .then(response => (this.info = response.data))
      .catch(error => {
        console.log(error.response)
      });
  }
}
</script>
