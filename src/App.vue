<template>
  <div id="app">
    <nav-bar :title="title" />
    <router-view id="views" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <footer>
      <a id="github" href="https://github.com/p2424630/PCA-Front" target="_blank">
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
body {
  font-family: "Open Sans", sans-serif;
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
  background-color: hsl(240, 30%, 10%);
  line-height: 30px;
  text-align: center;
  opacity: 0.8;
}
footer a {
  color: gray;
}
footer a:hover {
  color: white;
  transition: 0.5s;
}
.max-width {
  width: 100%;
}
input {
  padding: 0 0.5rem;
}
</style>
