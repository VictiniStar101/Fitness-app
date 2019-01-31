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
              <h6>Steps Taken</h6>
              <p v-if="clientSteps != ''">{{ clientSteps }}</p>
              <p v-else>0</p>
              <h6>Steps (in miles)</h6>
              <p v-if="miles != ''">{{ miles }}</p>
              <p v-else>0</p>
              <h6>Exercises</h6>
              <!--<div class="list-group list-group-flush">-->
              <div class="list-group list-group-flush">
  
                <!-- iterates through clientExercises and displays values-->
                <a href="#" class="list-group-item d-flex justify-content-between align-items-center" v-for="(data, index) in clientExercises" :key='index'>
                {{ data }}
                <span v-if="clientReps[index] != undefined" class="badge badge-primary badge-pill">{{ clientReps[index] }} </span>
                <span v-else class="badge badge-primary badge-pill">0</span>
                </a>                
              </div>
              <br />
              <button @click="logout" type="button" class="btn btn-dark">Log out</button>
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
                <br />
                <div class="form-group">
                  <br />
                  <label for="steps">Change number of steps taken)</label>
                  <!-- one way binding used -->
                  <input v-model="stepsHolder" type="stepsInput" class="form-control" id="stepCount" aria-describedby="NicknameHelp" placeholder="Enter steps taken">
                </div>
                <button @click="changeSteps" class="btn btn-primary">Submit</button>
                <button @click="resetSteps" class="btn btn-danger">Reset steps</button>
                
                <div class="form-group">
                  <br />
                  <label for="exampleInputPassword1">Add Exercise</label>
                  <input v-model="exerciseHolder" type="exercise" class="form-control" id="exerciseAdded" placeholder="Enter an Exercise">
                </div>
                <button @click="addExercises" type="button" class="btn btn-success">Add</button>
                <button @click="fetchExercises" type="button" class="btn btn-danger">Delete</button>
                
              </form>
              <br />
              <h6>Add/remove reps</h6>
              <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  {{ dropdownText }}
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#!" v-for="(data, index) in clientExercises" :key='index'
                  @click="dropdownText = data" >
                    {{ data }}
                  </a>
                  
                  
                </div>
              </div>
              <br />
              <button @click="changeReps('add')" type="button" class="btn btn-success">Add</button>
              <button @click="changeReps('remove')" type="button" class="btn btn-danger">Delete</button>
                
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
      dropdownText: "Select an exercise",
      clientExercises: [],
      loggedIn: false,
      clientSteps: '',
      stepsHolder: '',
      miles: '',
      clientReps: []
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
      this.clientSteps = '';
      this.miles = '';
      this.clientReps = [];
    },
    login() {
      axios
        // check to see if user trying to login exists
        .get('http://localhost:3000/api/users/' + this.user)
        // if user exists then login with that user
        .then(response => {
          console.log("user exists, logging in...")
          this.user = response.data.name
          this.clientNickname = response.data.nickname  
          if (response.data.steps > 0)
            this.clientSteps = response.data.steps
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
          // clears nickname text field
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
          this.clientReps = response.data.reps
          for (let i = 0; i < this.clientExercises.length; i++) {
            console.log(this.clientExercises[i] + "reps: " + this.clientReps[i]);
          }
      });
    },
    addExercises() {
      // performs POST request to add exercises to string at backend
      axios
        .put('http://localhost:3000/api/users/update/' + this.user, {
          // adds value to exercises string instead of replacing it
          "exercises": this.exerciseHolder
        })
        // eslint-disable-next-line
        .then(response => {
          // fetch exercises
          this.fetchExercises() 
          
        })
        .catch(error => {
          console.log(error.response)
      });
    },
    changeSteps() {
      axios
        .put('http://localhost:3000/api/users/update/' + this.user, {
          // grabs value of stepsHolder (a string)
          // converts it to int, places value in response in clientSteps
          // holder var is used to clear text field
          steps: parseInt(this.stepsHolder)
        })
        .then(response => {
          // stores response in clientSteps
          this.stepsHolder = response.data.steps.toString()
          this.clientSteps = this.stepsHolder
          // clears text field
          this.stepsHolder = ''
          this.miles = (parseFloat(this.clientSteps).toPrecision(12) / 2000 )
        })
        .catch(error => {
          console.log(error.response)
      });        
    },
    resetSteps() {
      // sends a steps value of 0
      // resets step counter 0
      axios
        .put('http://localhost:3000/api/users/update/' + this.user, {
          steps: 0
        })
        // eslint-disable-next-line
        .then(response => {
          this.clientSteps = ''
          this.stepsHolder = ''
          this.miles = ''
        })
        .catch(error => {
          console.log(error.response)
      });         

    },
    changeReps(operation) {
      // if add is passed, 
      if (operation === 'add') {
        for (let i = 0; i < this.clientExercises.length; i++) {
          //get exercise that is selected from dropdown
          if (this.dropdownText === this.clientExercises[i]) {
            //adds to rep counter which corresponds to exercise selected
            this.clientReps[i] = this.clientReps[i] + 1;
            axios
              .put('http://localhost:3000/api/users/update/' + this.user, {
                //replaces reps array on server with clientReps
                reps: this.clientReps
              })
              .then(response => {
                // stores response in clientReps
                this.clientReps = response.data.reps
              })
              .catch(error => {
                console.log(error.response)
            });
          }
        }
      // if remove is passed to function
      } else if (operation === 'remove') {
        //get exercise that is selected from dropdown
        for (let i = 0; i < this.clientExercises.length; i++) {
          if (this.dropdownText === this.clientExercises[i]) {
            //subtracts one from rep counter which corresponds to exercise selected
            this.clientReps[i] = this.clientReps[i] - 1;
            axios
              .put('http://localhost:3000/api/users/update/' + this.user, {
                reps: this.clientReps
              })
              .then(response => {
                // stores response in clientReps
                this.clientReps = response.data.reps
              })
              .catch(error => {
                console.log(error.response)
            });
          }
        }
      } else {
        console.log("error has occured");
      }
    }
  }

}
</script>

<style scoped>

  .btn-danger {
    margin-left: 30px;
  
  }
</style>

