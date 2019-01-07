<template>
  <div class="profile">
  <!-- display sample picture -->
  <!-- display username -->
  <!-- allow user to add and change nickname -->
    <div class="jumbotron">
      <div class="container-fluid">
        <div class="row">
          <div class="col" >
            <h5>Current user information</h5>
            <h6>Name</h6>
            <p>Faizan</p>
            <h6>Nickname</h6>
            <p>None</p>
            <h6>Exercises</h6>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">First item</li>
              <li class="list-group-item">Second item</li>
              <li class="list-group-item">Third item</li>
            </ul>
          </div>
          <div class="col" >
            <button v-if="user==''" type="button" class="btn btn-info">Login here</button>
            <div class="user" v-else >
              <!--You are logged in-->
              <h5>Profile settings</h5>
              <form>
                <div class="form-group">
                  <label for="nickname">Add/Change Nickname (optional)</label>
                  <input type="nickname" class="form-control" id="newNickname" aria-describedby="NicknameHelp" placeholder="Enter nickname">
                </div>
                <button type="submit" class="btn btn-primary">Submit
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
export default {
  name: 'profile',
  data () {
    return {
      nickname: '',
      user: 'faizan',
      exercises: []
    }
  }
}
</script>

<style scoped>

  .btn-success {
    margin-right: 30px;

  }
</style>

