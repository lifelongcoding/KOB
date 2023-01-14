<template>
  <NavBar />
  <router-view/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
// import $ from 'jquery'

export default {
  components: {
    NavBar
  },
  setup() {
    // $.ajax({
    //   url: "http://localhost:7070/user/account/token/",
    //   type: "post",
    //   data: {
    //     username: "Zhicheng Dai",
    //     password: "020119",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });

    // $.ajax({
    //   url: "http://localhost:7070/user/account/info/",
    //   type: "get",
    //   headers: {
    //     Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZjRlZjUyMjhhZjk0MGVhOTE2ZjkxNGNmYzEyOWI5MSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY3MzY3Mjg4MiwiZXhwIjoxNjc0ODgyNDgyfQ.MSOhjgvnEGE0T0kHlwqc7AC--fimDIHTMFDGrSZUMo8",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });

    // $.ajax({
    //   url: "http://localhost:7070/user/account/register/",
    //   type: "post",
    //   data: {
    //     username: "test",
    //     password: "123",
    //     confirmedPassword: "123",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })
  }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
