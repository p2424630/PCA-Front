<template>
  <div id="app">
    <nav-bar :title="title" />
    <router-view id="views" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <footer>
      <a href="https://github.com/p2424630/PCA-Front">
        <i class="fab fa-github fa-lg"></i>
      </a>
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: "PCA",
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#views {
  flex: 1;
}
.resDataT {
  margin: 0;
  text-transform: capitalize;
  color: green;
}
.resDataF {
  margin: 0;
  text-transform: capitalize;
  color: red;
}
.errorFetching {
  color: red;
}
footer {
  background-color: rgba(0, 0, 15, 0.8);
  width: 100%;
  padding: 0.25em 0;
  text-align: center;
}
footer a {
  text-decoration: none;
  color: #1eaedb;
}
footer i:hover {
  border-radius: 50%;
  background-color: #1eaedb;
  color: initial;
}
</style>
