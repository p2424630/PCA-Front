<template>
  <div id="app">
    <nav-bar :title="title" />
    <router-view id="views" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <footer>
      <a id="github" title="Go to GitHub" href="https://github.com/p2424630/PCA-Front" target="_blank">
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
:root {
  --bg-darker: #1f2933;
  --bg: #323f4b;
  --bg-lighter: #3e4c59;
  --primary: #6bf8e5;
  --secondary: #6ad8fa;
  --white: #ffffff;
  --true: #abfa60;
  --false: #ff6b86;
  --loader-out: #16695e;
  --loader-in: #81e6d9;
  --text-color: var(--white);
}
body {
  font-family: "Open Sans", sans-serif;
  color: var(--text-color);
  margin: 0;
  font-size: 80%;
  background-color: var(--bg-darker);
}
p,
h3 {
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#views {
  flex-grow: 1;
}
button {
  text-transform: uppercase;
  background-color: var(--primary);
  border: none;
  border-radius: 5px;
}
button.btn-calc::before {
  font-family: fontAwesome;
  content: "\f1ec\00a0";
}
button:enabled:hover {
  cursor: pointer;
  animation: fadeOut 0.2s forwards;
}
button:focus {
  outline: none;
}
input,
select {
  font-size: 1rem;
  background-color: var(--bg-lighter);
  border: none;
  border-radius: 5px;
  color: var(--white);
  border: 1px solid transparent;
}
select,
button {
  height: 35px;
}
input:focus,
select:focus {
  outline: none;
  border-color: var(--secondary);
}
.resDataT {
  margin: 0;
  text-transform: capitalize;
  color: var(--true);
}
.resDataF {
  margin: 0;
  text-transform: capitalize;
  color: var(--false);
}
footer {
  background-color: var(--bg);
  line-height: 30px;
  text-align: center;
  opacity: 0.8;
}
footer a:hover {
  color: var(--primary);
  transition: 0.2s;
}
.max-width {
  width: 100%;
}
input {
  padding: 0 0.5rem;
}
#loader {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  position: fixed;
  left: calc(50vw - 0.75em);
  top: calc(50vh - 0.75em);
  border: 0.5em solid var(--loader-out);
  border-top: 0.5em solid var(--loader-in);
  opacity: 0;
  z-index: 0;
  animation: spin 1s infinite;
}
#loader.waiting {
  opacity: 1;
  z-index: 1;
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fadeOut {
  100% {
    opacity: 0.75;
  }
}
@media screen and (min-width: 1000px) {
  body {
    font-size: 100%;
  }
}
</style>
