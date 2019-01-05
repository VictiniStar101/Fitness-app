<template>
  <div class="profile">
  <!-- display sample picture -->
  <!-- display username -->
  <!-- allow user to add and change nickname -->
    <div class="jumbotron">
      <button v-if="user==''" type="button" class="btn btn-info">Login here</button>

      <div class="user" v-else >
        <!--You are logged in-->

        <form>
          <div class="form-group">
            <label for="nickname">Add/Change Nickname (optional)</label>
            <input type="nickname" class="form-control" id="newNickname" aria-describedby="NicknameHelp" placeholder="Enter nickname">
          </div>
          <!--<div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          -->
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      user: 'faizan'
    }
  }
}
</script>
