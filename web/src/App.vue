<template>
  <div>Bot1昵称：{{ bot_name1 }}</div>
  <div>Bot1战力：{{ bot_rating1 }}</div>
  <div>Bot2昵称：{{ bot_name2 }}</div>
  <div>Bot2战力：{{ bot_rating2 }}</div>
  <router-view/>
</template>

<script>
import $ from 'jquery';
import { ref } from 'vue';

export default {
  name: "App",
  setup: () => {
    let bot_name1 = ref("");
    let bot_rating1 = ref("");
    let bot_name2 = ref("");
    let bot_rating2 = ref("");

    $.ajax({
      url: "http://localhost:7070/pk/getbotinfo/",
      type: "get",
      success: resp => {
        bot_name1.value = resp[0].name;
        bot_rating1.value = resp[0].rating;
        bot_name2.value = resp[1].name;
        bot_rating2.value = resp[1].rating;
        console.log(resp);
      }
    })

    return {
      bot_name1,
      bot_rating1,
      bot_name2,
      bot_rating2,
    }
  }
}
</script>

<style>
body {
  background-image: url("@/assets/background.png");
  background-size: cover;
}
</style>
