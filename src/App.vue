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
      <label id="themeSwitch" class="fas fa-sun fa-lg" ref="themeSwitch"></label>
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
  mounted() {
    themeSwitch.addEventListener("click", () => {
      if (document.documentElement.classList.contains("light")) {
        document.documentElement.classList.remove("light");
        this.$refs.themeSwitch.classList.replace("fa-moon", "fa-sun");
      } else {
        document.documentElement.classList.add("light");
        this.$refs.themeSwitch.classList.replace("fa-sun", "fa-moon");
      }
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
:root {
  --bg-darker: #1f2933;
  --bg: #323f4b;
  --primary: #6bf8e5;
  --white: #f0f0f0;
  --black: #121212;
  --true: #abfa60;
  --false: #ff6b86;
  --loader-out: #16695e;
  --loader-in: #81e6d9;
  --text-color: var(--white);
  --shadow1dp: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  --shadow2dp: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.light {
  --bg-darker: var(--white);
  --bg: #e4e4e4;
  --primary: #00a4d6;
  --true: #55b100;
  --false: #c70024;
  --text-color: var(--black);
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
  box-shadow: var(--shadow1dp);
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
}
button.btn-calc::before {
  font-family: fontAwesome;
  content: "\f1ec\00a0";
}
button:enabled:hover {
  cursor: pointer;
  background-color: var(--primary);
  transition: 0.2s;
}
button:focus {
  outline: none;
}
input,
select {
  background-color: var(--bg-darker);
  box-shadow: var(--shadow1dp);
  border-radius: 5px;
  color: var(--text-color);
  border: 1px solid transparent;
}
select,
button {
  height: 35px;
}
input:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
}
.resDataT {
  margin: 0;
  text-transform: capitalize;
  color: var(--true);
  font-weight: bold;
}
.resDataF {
  margin: 0;
  text-transform: capitalize;
  color: var(--false);
  font-weight: bold;
}
footer {
  box-shadow: var(--shadow2dp);
  display: flex;
  white-space: nowrap;
  background-color: var(--bg);
  line-height: 30px;
}
footer #themeSwitch,
footer #github {
  line-height: 30px;
}
footer a:hover,
footer #themeSwitch:hover {
  color: var(--primary);
  transition: 0.2s;
}
footer #github {
  position: absolute;
  left: calc(50vw - 1em);
}
footer #themeSwitch {
  margin-left: auto;
  margin-right: 1em;
}
footer #themeSwitch:hover {
  cursor: pointer;
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
@media screen and (min-width: 1050px) {
  body {
    font-size: 100%;
  }
}
</style>
