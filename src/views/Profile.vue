<template>
  <div class="profile">
  <!-- display sample picture -->
  <!-- display username -->
  <!-- allow user to add and change nickname -->
    <div class="jumbotron">
      <div class="container-fluid">
        <div class="login" v-if="loggedIn==false  " >
          <h3>Login</h3>
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" v-model="user" class="form-control" id="user" aria-describedby="Username" placeholder="Enter username">
            </div>
            <button @click="login" class="btn btn-primary">Login</button>

            
          </form>
        
        </div>
        <div class="user" v-else >
          <div class="row">
            <div class="col" >
              <h5>Current user information</h5>
              <h6>Name</h6>
              <p>{{ user }}</p>
              <h6>Nickname</h6>
              <p v-if="nickname==''">None</p>
              <p v-else> {{nickname}} </p>
              <h6>Exercises</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">First item</li>
                <li class="list-group-item">Second item</li>
                <li class="list-group-item">Third item</li>
              </ul>
            </div>
            <div class="col" >
                <!--You are logged in-->
                <h5>Profile settings</h5>
                <form>
                  <div class="form-group">
                    <label for="nickname">Add/Change Nickname (optional)</label>
                    <input type="nickname" v-model="nickname" class="form-control" id="newNickname" aria-describedby="NicknameHelp" placeholder="Enter nickname">
                  </div>
                  <button @click="submitNickname" class="btn btn-primary">Submit
                  </button>

                  <div class="form-group">
                    <br />

                    <label for="exampleInputPassword1">Add Exercise</label>
                    <input type="exercise" class="form-control" id="exerciseAdded" placeholder="Enter an Exercise">
                  </div>
                  <button type="button" class="btn btn-success">Add</button>
                  <button type="button" class="btn btn-danger">Delete</button>
                  <!--
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                  -->
                </form>
              
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
// have btn execute javascript to take text from field 
// and send that post request via axios
import axios from 'axios'
export default {
  name: 'profile',
  data () {
    return {
      nickname: '',
      user: '',
      exercises: [],
      name: '',
      loggedIn: false
    }
  },
  mounted: {

  },
  methods: {
    login() {
      axios
        .post('http://localhost:3000/api/users/add' + this.user)
        .then(response => (this.user = response.data.name))
        .catch(error => {
          console.log(error.response)
        });
      this.loggedIn = true;
    },
    submitNickname() {
      //console.log(this.nickname);
      //use axios for POST request which changes nickname
      axios
        .put('http://localhost:3000/api/users/' + this.user)
        .then(response => (this.nickname = response.data.nickname))
        .catch(error => {
          console.log(error.response)
        });
    }
  }
}
</script>

<style scoped>

  .btn-success {
    margin-right: 30px;

  }
</style>

