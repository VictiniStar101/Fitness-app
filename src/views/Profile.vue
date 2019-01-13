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
              <p v-if="clientNickname==''">None</p>
              <p v-else> {{ clientNickname }} </p>
              <h6>Exercises</h6>
              <ul class="list-group list-group-flush">
                  <li v-for="(data) in clientExercises"  class="list-group-item">{{data}}</li>                
              </ul>
              <br />
              <button @click="logout" type="button" class="btn btn-danger">Log out</button>
            </div>
            <div class="col" >
              <!--You are logged in-->
              <h5>Profile settings</h5>
              <form>
                
                <div class="form-group">
                  <label for="nickname">Add/Change Nickname (optional)</label>
                  <input type="nicknameInput" v-model="nicknameHolder" class="form-control" id="newNickname" aria-describedby="NicknameHelp" placeholder="Enter nickname">
                </div>
                
                <button @click="submitNickname" class="btn btn-primary">Submit</button>
                
                <div class="form-group">
                  <br />
                  <label for="exampleInputPassword1">Add Exercise</label>
                  <input v-model="exerciseHolder" type="exercise" class="form-control" id="exerciseAdded" placeholder="Enter an Exercise">
                </div>
                <button @click="addExercises" type="button" class="btn btn-success">Add</button>
                <button @click="fetchExercises" type="button" class="btn btn-danger">Delete</button>
                
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
      nicknameHolder: "",
      clientNickname: "",
      nickname: "",
      user: "",
      exercise: "",
      exerciseHolder: "",
      clientExercises: ["this"],
      loggedIn: false
    }
  },
  methods: {
    logout() {
      this.loggedIn = false;
      this.clientNickname = "";
      this.nicknameHolder = "";
      this.exercises = [];
      this.exerciseHolder = "";
      this.user = "";
    },
    login() {
      axios
        // check to see if user trying to login exists
        .get('http://localhost:3000/api/users/' + this.user)
        // if user exists then login with that user
        .then(response => {
          console.log("user exists, logging in...")
          this.user = response.data.name
          //console.log(response.data.nickname)
          this.clientNickname = response.data.nickname  
          })
        // else if error is 404, create new user
        .catch(error => {
          console.log(error)
          // if status code is 404
          if (error.response.status == 404) {
            console.log("creating new user");
          // create new user and get their name back
          axios
            // POST request which adds user
            .post('http://localhost:3000/api/users/add' + this.user)
            // sets name to user that was just created
            .then(response => {this.user = response.data.name
              this.nicknameHolder = response.data.nickname
              this.clientNickname = this.nicknameHolder
              this.$data.nicknameHolder = ""  })
            .catch(error => {
              console.log(error.response)
            });
          }
      });
      this.loggedIn = true;
      this.fetchExercises();
    },
    submitNickname() {
      //console.log(this.nickname);
      //use axios for POST request which changes nickname
      axios.put('http://localhost:3000/api/users/update/' + this.user ,{
        nickname: this.nicknameHolder
        })
        .then(response => {this.clientNickname = response.data.nickname
          this.nicknameHolder = ''})
        .catch(error => {
          console.log(error.response)
      });
    },
    fetchExercises() {
      // fetch full string from user
      // store string into exercises array above
      // iterate through them using vue lists
      // use push method on array
      axios
        .get('http://localhost:3000/api/users/' + this.user)
        .then(response => {
          this.clientExercises = response.data.exercises.split(", ")
          for (let i = 0; i < this.clientExercises.length; i++) {
            console.log(this.clientExercises[i]);
          }
      });
    },
    addExercises() {
      // console.log("exercise added")
      axios
        .put('http://localhost:3000/api/users/update/' + this.user, {
          "exercises": this.exerciseHolder
        })
        .then(response => {
          //console.log("\n " + this.exercise)
          //this.exercise = response.data.exercises
          this.fetchExercises() 
          //console.log("function has executed")
          //console.log("\n " + this.exercise)
          //this.exercise = "" 
          })
        .catch(error => {
          console.log(error.response)
      });
    }
  }
  // beforeMount() {
  //   this.fetchExercises()
  // }
}
</script>

<style scoped>

  .btn-success {
    margin-right: 30px;

  }
</style>

