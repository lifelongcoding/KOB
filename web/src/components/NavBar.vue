<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <!-- <a class="navbar-brand" href="/">King Of Bots</a> 非响应式 -->
    <router-link class="navbar-brand" :to="{name: 'home'}">King of Bots</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- :其实就是v-bind:的缩写 -->
          <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{name: 'pk_index'}">对战</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'record_index'}">对局列表</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'ranklist_index'}">排行榜</router-link>
        </li>
      </ul>

      <ul class="navbar-nav" v-if="$store.state.user.is_login">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ $store.state.user.username }}
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" :to="{name: 'user_bots_index'}">我的Bots</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
          </ul>
        </li>
      </ul>      
      
      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_login'}" role="button">
            登录
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_register'}" role="button">
            注册
          </router-link>
        </li>
      </ul>

    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router';
// 实时计算某个变量的值（这里是route的值
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    let route_name = computed(() => route.name);

    const logout = () => {
      store.dispatch("logout");
    }

    return {
      route_name,
      logout,
    } 
  }
}
</script>

<style scoped>

</style>
