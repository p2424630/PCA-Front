<template>
  <div id="app">
    <nav-bar :title="title" />
    <router-view id="views" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <footer>
      <a id="github" href="https://github.com/p2424630/PCA-Front">
        <i title="GitHub" class="fab fa-github fa-lg"></i>
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
  flex-grow: 1;
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
#errFetching {
  margin: 0 0.5em;
  color: red;
}
footer {
  background-color: rgba(0, 0, 15, 0.8);
  line-height: 30px;
  text-align: center;
}
footer a {
  color: gray;
}
footer a:hover {
  color: white;
  transition: 0.2s;
}
</style>
